/**
 * Configuración de Supabase
 * Las credenciales se inyectan directamente en index.html desde GitHub Secrets
 */

// Leer valores inyectados en el HTML por GitHub Actions
const SUPABASE_URL = window.SUPABASE_URL || null;
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || null;


// Función para validar URL HTTP/HTTPS
function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        return false;
    }
}

// Validar que los valores estén disponibles y correctos
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase no está configurado. Asegúrate de que GitHub Actions reemplace los placeholders.');
}

if (SUPABASE_URL && !isValidHttpUrl(SUPABASE_URL)) {
    console.error('❌ Error: SUPABASE_URL no es una URL válida. Debe empezar por http:// o https://');
    console.error('Valor actual (redactado):', SUPABASE_URL ? SUPABASE_URL.slice(0, 50) + '...' : 'not set');
}

// Inicializar cliente de Supabase solo si la librería y las credenciales están disponibles y válidas
let supabase = null;
if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY && isValidHttpUrl(SUPABASE_URL)) {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
        console.error('Error al inicializar Supabase:', err);
    }
} else if (typeof window.supabase === 'undefined') {
    console.error('❌ La librería de Supabase no está cargada. Verifica que el CDN esté antes de config.js');
}

