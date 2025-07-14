import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xrjcrlxoqcahujimtnez.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyamNybHhvcWNhaHVqaW10bmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTc5NDgsImV4cCI6MjA2NjE5Mzk0OH0.VdRvlOPta4qkBz5aTvpDTZWVH0EIlbBVitZhZMfNaCU'

export const supabase = createClient(supabaseUrl, supabaseKey)