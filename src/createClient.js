import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "<<YourURL>>"
const supabaseKey = '<<YourKEY>>'
export const supabase = createClient(supabaseUrl, supabaseKey)

