/**
 * Configuración de Supabase
 */

// GitHub Actions reemplazará estas líneas con los valores reales
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Esperar a que la librería de Supabase esté disponible
let supabase = null;

function initSupabase() {
    if (typeof window.supabase === 'undefined') {
        console.warn('Esperando a que Supabase se cargue...');
        setTimeout(initSupabase, 100);
        return;
    }
    
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✓ Supabase inicializado');
}

initSupabase();
