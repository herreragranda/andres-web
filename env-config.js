
<script>
  window.__ENV__ = {
    SUPABASE_URL: '${SUPABASE_URL}',
    SUPABASE_ANON_KEY: '${SUPABASE_ANON_KEY}'
  };
  
  // Debug: mostrar si están cargadas (sin mostrar los valores reales)
  if (window.__ENV__.SUPABASE_URL && window.__ENV__.SUPABASE_ANON_KEY) {
    console.log('✓ Variables de entorno cargadas correctamente');
  }
</script>
