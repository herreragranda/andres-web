// script.js

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

console.log(`Mi secreto es (enmascarado): ${SUPABASE_ANON_KEY}`); 

if (SUPABASE_ANON_KEY) {
  // Lógica que utiliza el secreto, por ejemplo, para autenticación
  console.log("Secreto cargado correctamente.");
} else {
  console.log("No se pudo cargar el secreto.");
}
