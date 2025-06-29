-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Circles policies
CREATE POLICY "Public circles are viewable by everyone" ON circles
  FOR SELECT USING (NOT is_private OR EXISTS (
    SELECT 1 FROM circle_members 
    WHERE circle_id = circles.id AND user_id = auth.uid()
  ));

CREATE POLICY "Authenticated users can create circles" ON circles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Circle creators can update their circles" ON circles
  FOR UPDATE USING (created_by = auth.uid());

-- Circle members policies
CREATE POLICY "Circle members are viewable by circle members" ON circle_members
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM circle_members cm 
    WHERE cm.circle_id = circle_members.circle_id AND cm.user_id = auth.uid()
  ));

CREATE POLICY "Users can join circles" ON circle_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave circles" ON circle_members
  FOR DELETE USING (user_id = auth.uid());

-- Posts policies
CREATE POLICY "Posts are viewable by circle members" ON posts
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM circle_members 
    WHERE circle_id = posts.circle_id AND user_id = auth.uid()
  ));

CREATE POLICY "Circle members can create posts" ON posts
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM circle_members 
    WHERE circle_id = posts.circle_id AND user_id = auth.uid()
  ));

CREATE POLICY "Post authors can update their posts" ON posts
  FOR UPDATE USING (author_id = auth.uid());

-- Comments policies
CREATE POLICY "Comments are viewable by circle members" ON comments
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM posts p
    JOIN circle_members cm ON p.circle_id = cm.circle_id
    WHERE p.id = comments.post_id AND cm.user_id = auth.uid()
  ));

CREATE POLICY "Circle members can create comments" ON comments
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM posts p
    JOIN circle_members cm ON p.circle_id = cm.circle_id
    WHERE p.id = comments.post_id AND cm.user_id = auth.uid()
  ));

-- Events policies
CREATE POLICY "Events are viewable by circle members" ON events
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM circle_members 
    WHERE circle_id = events.circle_id AND user_id = auth.uid()
  ));

CREATE POLICY "Circle members can create events" ON events
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM circle_members 
    WHERE circle_id = events.circle_id AND user_id = auth.uid()
  ));

-- Event attendees policies
CREATE POLICY "Event attendees are viewable by circle members" ON event_attendees
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM events e
    JOIN circle_members cm ON e.circle_id = cm.circle_id
    WHERE e.id = event_attendees.event_id AND cm.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their event attendance" ON event_attendees
  FOR ALL USING (user_id = auth.uid());
