# Proyecto de Autenticación con Supabase

Un proyecto básico de HTML, CSS y JavaScript para aprender los conceptos fundamentales de desarrollo web con autenticación en Supabase.

## Estructura del Proyecto

```
andres-web/
├── index.html           # HTML principal
├── styles/
│   └── style.css       # Estilos CSS
├── js/
│   ├── config.js       # Configuración de Supabase
│   ├── auth.js         # Lógica de autenticación
│   └── main.js         # Script principal
├── .env.example        # Plantilla de variables de entorno
└── .gitignore          # Archivos a ignorar en git
```

## Características

- ✅ Formulario de registro con validaciones
- ✅ Formulario de inicio de sesión
- ✅ Panel de usuario con información
- ✅ Cierre de sesión
- ✅ Persistencia de sesión (mantiene sesión activa)
- ✅ Diseño responsivo
- ✅ Loader de carga
- ✅ Mensajes de error y éxito
- ✅ Escucha de cambios en autenticación

## Configuración de Supabase

### Paso 1: Crear cuenta en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Sign Up" o "Get Started"
3. Crea una cuenta con tu correo o GitHub

### Paso 2: Crear un proyecto
1. Haz clic en "New Project"
2. Rellena los datos:
   - Nombre del proyecto
   - Contraseña de base de datos
   - Región (elige la más cercana)
3. Espera a que se cree el proyecto (2-3 minutos)

### Paso 3: Obtener credenciales
1. Ve a **Settings** → **API** (en el menú izquierdo)
2. Busca la sección "Project Settings"
3. Copia:
   - **Project URL**
   - **Project API Key** (anon public)

### Paso 4: Configurar GitHub Secrets

⚠️ **IMPORTANTE: Usa GitHub Secrets en lugar de guardar credenciales en el código**

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**
4. Crea dos secretos con exactamente estos nombres:
   - **Nombre:** `SUPABASE_URL` → **Valor:** Tu URL de Supabase
   - **Nombre:** `SUPABASE_ANON_KEY` → **Valor:** Tu clave anon API

```
Ejemplo de ubicación en GitHub:
repositorio → Settings → Secrets and variables → Actions → New repository secret
```

### Paso 5: Configurar para desarrollo local

1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Abre `.env.local` y agrega tus credenciales:
   ```
   SUPABASE_URL=https://tuproyecto.supabase.co
   SUPABASE_ANON_KEY=tu_clave_anon_aqui
   ```

3. ⚠️ `.env.local` está en `.gitignore` - nunca se sube a GitHub

## Cómo Ejecutar

### Opción 1: Servidor de Desarrollo (Recomendado - Con soporte de variables de entorno)

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador: `http://localhost:8000`

### Opción 2: Servidor HTTP simple (Sin soporte de variables de entorno)
```bash
# Con Python 3
python -m http.server 8000

# O con Node.js http-server
npx http-server
```

⚠️ **Nota:** Esta opción no cargará las variables de `.env.local`. Usa la Opción 1 para desarrollo.

## Probar Funcionalidades

### Prueba de Registro
1. Ve a la sección "Regístrate aquí"
2. Ingresa un email y contraseña (mínimo 6 caracteres)
3. Verifica tu correo (Supabase enviará un link)
4. Inicia sesión con tus credenciales

### Prueba de Login
1. Usa las credenciales que registraste
2. Verás tu panel de usuario personalizado
3. Haz clic en "Cerrar Sesión"

## Variables de Entorno

Las credenciales se inyectan de dos formas:

### En Desarrollo Local
- Lee del archivo `.env.local`
- El servidor Node.js (`dev-server.js`) procesa y reemplaza `${VARIABLE}`
- Nunca se exponen en Git gracias a `.gitignore`

### En Producción (GitHub Actions)
- Lee de `GitHub Secrets`
- El workflow `.github/workflows/deploy.yml` inyecta automáticamente los secretos
- Se despliega con `GitHub Pages` (opcional)

## Flujo de Seguridad

```
┌─────────────────────────────────────────────────────────┐
│  DESARROLLO LOCAL                                       │
├─────────────────────────────────────────────────────────┤
│  .env.local (secreto, en .gitignore)                    │
│        ↓                                                  │
│  dev-server.js (procesa variables)                      │
│        ↓                                                  │
│  env-config.js (inyecta en window.__ENV__)             │
│        ↓                                                  │
│  config.js (lee de window.__ENV__)                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PRODUCCIÓN (GITHUB ACTIONS)                            │
├─────────────────────────────────────────────────────────┤
│  GitHub Secrets (SUPABASE_URL, SUPABASE_ANON_KEY)       │
│        ↓                                                  │
│  deploy.yml (workflow inyecta secretos)                 │
│        ↓                                                  │
│  env-config.js (inyecta en window.__ENV__)             │
│        ↓                                                  │
│  config.js (lee de window.__ENV__)                      │
└─────────────────────────────────────────────────────────┘
```
1. Ve a la sección "Regístrate aquí"
2. Ingresa un email y contraseña
3. Verifica tu correo (Supabase enviará un link de confirmación)
4. Inicia sesión

### 3. Probar el login
1. Usa las credenciales que registraste
2. Verás el panel de usuario
3. Haz clic en "Cerrar Sesión"

## Conceptos Aprendidos

### HTML
- Estructura semántica
- Formularios y validación HTML5
- Atributos data y métodos de DOM

### CSS
- Flexbox y Grid
- Gradientes lineales
- Animaciones y transiciones
- Media queries (responsive)
- Selecciones de pseudo-clases

### JavaScript
- Event listeners y manejadores de eventos
- Async/await y Promises
- Manipulación del DOM
- LocalStorage (implícito con Supabase)
- Manejo de errores try/catch
- Validaciones de formularios
- Callbacks y listeners

### Supabase
- Autenticación con correo/contraseña
- JWT (JSON Web Tokens)
- Sesiones y tokens de acceso
- Listener de cambios en autenticación

## Estructura de Archivos Explicada

### `index.html`
Define la estructura de la aplicación:
- Formularios de login y registro
- Panel de usuario
- Elementos para mensajes

### `styles/style.css`
Estilos de la aplicación:
- Variables de color con gradientes
- Diseño responsivo
- Animaciones suaves
- Estados de hover y focus

### `js/config.js`
Configuración de Supabase:
- URL del proyecto
- Clave API
- Inicialización del cliente

### `js/auth.js`
Lógica de autenticación:
- Registro de usuarios
- Login
- Logout
- Verificación de sesión
- Listeners de cambios

### `js/main.js`
Punto de entrada principal (puedes agregar más aquí)

## Endpoints y Métodos Importantes de Supabase

```javascript
// Registro
supabase.auth.signUp({ email, password })

// Login
supabase.auth.signInWithPassword({ email, password })

// Logout
supabase.auth.signOut()

// Obtener sesión actual
supabase.auth.getSession()

// Escuchar cambios de autenticación
supabase.auth.onAuthStateChange((event, session) => {})

// Obtener usuario actual
supabase.auth.getUser()
```

## Mejoras Futuras

- [ ] Recuperación de contraseña
- [ ] Autenticación social (Google, GitHub)
- [ ] Perfil de usuario editable
- [ ] Base de datos de usuarios
- [ ] Roles y permisos
- [ ] Two-factor authentication (2FA)

## Seguridad

⚠️ **Importante:**
- La clave `ANON_KEY` es pública y se ve en el navegador
- Las restricciones de seguridad se configuran en Supabase con RLS (Row Level Security)
- Nunca expongas la `SERVICE_KEY` en el frontend
- Las contraseñas se hashean automáticamente en Supabase

## Troubleshooting

### "TypeError: supabase is undefined"
- Verifica que `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén configuradas correctamente
- Comprueba que el script de Supabase se carga desde el CDN

### "Error: Invalid login credentials"
- El email no está confirmado (verifica tu correo)
- Las credenciales son incorrectas

### CORS errors
- Asegúrate de usar `http://localhost` o dominio autorizado en Supabase
- Ve a Authentication → URL Configuration en Supabase

## Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [SDK de JavaScript](https://supabase.com/docs/reference/javascript/introduction)
- [MDN Web Docs](https://developer.mozilla.org/es/)

---

¡A programar! 🚀
