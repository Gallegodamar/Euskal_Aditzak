import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkkknbnvobkwiashsrlk.supabase.co";
const supabaseAnonKey = "sb_publishable_tZgfI4lfHqzqlXaDdH047A_cjrirvQc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
