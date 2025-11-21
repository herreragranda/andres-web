/**
 * Configuración de Supabase
 * 
 * Las credenciales se cargan desde:
 * 1. Variables de entorno en desarrollo (.env.local)
 * 2. GitHub Secrets en producción (inyectadas por GitHub Actions)
 * 
 * Para obtener estas credenciales:
 * 1. Ve a https://supabase.com
 * 2. Crea una nueva cuenta o inicia sesión
 * 3. Crea un nuevo proyecto
 * 4. Ve a Settings -> API -> Project Settings
 * 5. Copia la URL y la clave anon
 * 
 * ⚠️ IMPORTANTE: Estas credenciales se exponen en el navegador.
 * Solo usa la clave anon (no la clave de servicio).
 * Las restricciones de seguridad se configuran en Supabase con RLS.
 */

// Leer variables de entorno (inyectadas por GitHub Actions o desde .env.local)
const SUPABASE_URL = window.__ENV__.SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.__ENV__.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// Validar que las credenciales estén configuradas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Error: Credenciales de Supabase no configuradas');
    console.error('Por favor, configura SUPABASE_URL y SUPABASE_ANON_KEY como GitHub Secrets');
    console.error('Instrucciones: https://docs.github.com/es/actions/security-guides/encrypted-secrets');
}

// Inicializar cliente de Supabase solo si las credenciales están disponibles
let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn('⚠️ Supabase no se pudo inicializar. Verifica la configuración de variables de entorno.');
}
