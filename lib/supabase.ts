import { createClient } from '@supabase/supabase-js';
import { env } from './env';
export function getSupabaseAnon() { return createClient(env.supabaseUrl, env.supabaseAnonKey); }
export function getSupabaseAdmin() { return createClient(env.supabaseUrl, env.supabaseServiceRoleKey); }
