/**
 * Configuración de Supabase
 */

// GitHub Actions reemplazará estas líneas con los valores reales
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✓ Supabase inicializado');
