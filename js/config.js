/**
 * Configuración de Supabase
 */

// GitHub Actions reemplazará estas líneas con los valores reales
const SUPABASE_URL = 'https://pddwgzblisqfbaesafek.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkZHdnemJsaXNxZmJhZXNhZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Nzg2NTcsImV4cCI6MjA3OTI1NDY1N30.Z7U95zFR3LPFJZHyroEQohkDgO1ryK_pjcrHudtSz0M';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✓ Supabase inicializado');
