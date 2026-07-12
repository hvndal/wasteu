// Initialize Supabase Client
const supabaseUrl = 'https://rgpoiahrbrgrvzwaiomx.supabase.co';
const supabaseKey = 'sb_publishable_nVTZULjSMV_lB4ibMlyjpQ_yxs0IsoD';

// This exposes `supabase` globally for our static HTML pages
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
