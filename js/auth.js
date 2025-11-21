/**
 * Módulo de Autenticación
 * Maneja el registro, inicio de sesión y cierre de sesión
 */

// Función para inicializar la autenticación cuando Supabase esté listo
function initAuth() {
    // Esperar a que supabase esté disponible
    if (!supabase) {
        console.log('Esperando a que Supabase se inicialice...');
        setTimeout(initAuth, 100);
        return;
    }

    console.log('Inicializando módulo de autenticación...');

    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userPanel = document.getElementById('userPanel');
    const loader = document.getElementById('loader');

    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const toggleRegisterLink = document.getElementById('toggleRegister');
    const toggleLoginLink = document.getElementById('toggleLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    /**
     * Mostrar/ocultar loader
     */
    function showLoader(show = true) {
        loader.classList.toggle('hidden', !show);
    }

    /**
     * Mostrar mensaje de error
     */
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }

    /**
     * Mostrar mensaje de éxito
     */
    function showSuccess(element, message) {
        element.textContent = message;
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }

    /**
     * Alternar entre formularios
     */
    function toggleForms() {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    }

    toggleRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms();
        loginError.classList.remove('show');
        loginSuccess.classList.remove('show');
    });

    toggleLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms();
        registerError.classList.remove('show');
        registerSuccess.classList.remove('show');
    });

    /**
     * Registro de usuario
     */
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validaciones
        if (!email || !password || !confirmPassword) {
            showError(registerError, 'Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            showError(registerError, 'Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            showError(registerError, 'La contraseña debe tener mínimo 6 caracteres');
            return;
        }

        showLoader(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                throw error;
            }

            showSuccess(registerSuccess, '¡Registro exitoso! Por favor verifica tu correo');
            formRegister.reset();
            
            // Cambiar al formulario de login después de 2 segundos
            setTimeout(() => {
                toggleForms();
            }, 2000);

        } catch (error) {
            console.error('Error en registro:', error);
            showError(registerError, error.message || 'Error al registrarse');
        } finally {
            showLoader(false);
        }
    });

    /**
     * Inicio de sesión
     */
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showError(loginError, 'Por favor completa todos los campos');
            return;
        }

        showLoader(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                throw error;
            }

            showSuccess(loginSuccess, '¡Bienvenido!');
            formLogin.reset();
            showUserPanel(data.user);

        } catch (error) {
            console.error('Error en login:', error);
            showError(loginError, error.message || 'Error al iniciar sesión');
        } finally {
            showLoader(false);
        }
    });

    /**
     * Cerrar sesión
     */
    logoutBtn.addEventListener('click', async () => {
        showLoader(true);

        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            hideUserPanel();
            showSuccess(loginSuccess, 'Sesión cerrada correctamente');

        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            showError(loginError, error.message || 'Error al cerrar sesión');
        } finally {
            showLoader(false);
        }
    });

    /**
     * Mostrar panel del usuario
     */
    function showUserPanel(user) {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        userPanel.classList.remove('hidden');

        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userId').textContent = `ID: ${user.id}`;

        // Mostrar información adicional
        const userDetailsDiv = document.getElementById('userDetails');
        userDetailsDiv.innerHTML = `
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>ID de Usuario:</strong> ${user.id}</p>
            <p><strong>Proveedor:</strong> ${user.app_metadata?.provider || 'Email'}</p>
            <p><strong>Creado:</strong> ${new Date(user.created_at).toLocaleDateString('es-ES')}</p>
        `;
    }

    /**
     * Ocultar panel del usuario
     */
    function hideUserPanel() {
        userPanel.classList.add('hidden');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }

    /**
     * Verificar sesión activa al cargar la página
     */
    async function checkActiveSession() {
        try {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                throw error;
            }

            if (data.session) {
                showUserPanel(data.session.user);
            }

        } catch (error) {
            console.error('Error al verificar sesión:', error);
        }
    }

    /**
     * Escuchar cambios en el estado de autenticación
     */
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Estado de autenticación cambió:', event);

        if (session) {
            showUserPanel(session.user);
        } else {
            hideUserPanel();
        }
    });

    // Verificar sesión al cargar
    checkActiveSession();
}

// Inicializar autenticación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
