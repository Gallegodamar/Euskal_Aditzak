
import { createClient } from '@supabase/supabase-js';

// Asumimos que estas variables están disponibles en el entorno
const supabaseUrl = (window as any)._env_?.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = (window as any)._env_?.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
