// Configuración de Supabase - Reemplazar con tus valores reales
const SUPABASE_URL = 'https://pddwgzblisqfbaesafek.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
