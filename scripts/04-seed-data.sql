-- Insert sample categories and circles
INSERT INTO circles (name, description, category, location, is_virtual, created_by) VALUES
  ('Tech Innovators', 'A community for technology enthusiasts and innovators', 'Technology', 'San Francisco, CA', true, (SELECT id FROM profiles LIMIT 1)),
  ('Sustainable Living', 'Learn and share tips for eco-friendly living', 'Environment', 'Portland, OR', false, (SELECT id FROM profiles LIMIT 1)),
  ('Creative Writers Circle', 'Support and feedback for aspiring writers', 'Arts & Culture', 'New York, NY', true, (SELECT id FROM profiles LIMIT 1)),
  ('Fitness Accountability', 'Stay motivated on your fitness journey', 'Health & Wellness', 'Los Angeles, CA', false, (SELECT id FROM profiles LIMIT 1)),
  ('Entrepreneur Network', 'Connect with fellow entrepreneurs and business owners', 'Business', 'Austin, TX', true, (SELECT id FROM profiles LIMIT 1))
ON CONFLICT DO NOTHING;
