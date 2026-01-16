import { createClient } from "@supabase/supabase-js";

const API_KEY = "sb_publishable_1DCy0grXJBKUgjjjviR7qQ_FrbT7QQ2";
const URL = "https://bfqgqwamjlddhuhymogw.supabase.co";

export const supabase = createClient(URL, API_KEY);
