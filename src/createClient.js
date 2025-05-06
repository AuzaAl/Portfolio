import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://krwohqgunvfcwkrpwqbd.supabase.co"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd29ocWd1bnZmY3drcnB3cWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NjE3MDEsImV4cCI6MjA2MDUzNzcwMX0.RjfUBwjHWTm9OCFXrDfB18yPxHLDNKgY9jI4IxGnu4k'
export const supabase = createClient(supabaseUrl, supabaseKey)

