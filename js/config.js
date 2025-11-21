// Configuración de Supabase - Reemplazar con tus valores reales
const SUPABASE_URL = 'your-supabase-url-here';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
