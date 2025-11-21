/**
 * Módulo de Autenticación
 */

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

function showLoader(show = true) {
    loader.classList.toggle('hidden', !show);
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 5000);
}

function showSuccess(element, message) {
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 5000);
}

function toggleForms() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

toggleRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

toggleLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!email || !password || !confirmPassword) {
        showError(registerError, 'Completa todos los campos');
        return;
    }
    if (password !== confirmPassword) {
        showError(registerError, 'Las contraseñas no coinciden');
        return;
    }
    if (password.length < 6) {
        showError(registerError, 'Mínimo 6 caracteres');
        return;
    }

    showLoader(true);
    try {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        showSuccess(registerSuccess, '¡Registrado! Verifica tu correo');
        formRegister.reset();
        setTimeout(toggleForms, 2000);
    } catch (error) {
        showError(registerError, error.message);
    } finally {
        showLoader(false);
    }
});

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError(loginError, 'Completa todos los campos');
        return;
    }

    showLoader(true);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showSuccess(loginSuccess, '¡Bienvenido!');
        formLogin.reset();
        showUserPanel(data.user);
    } catch (error) {
        showError(loginError, error.message);
    } finally {
        showLoader(false);
    }
});

logoutBtn.addEventListener('click', async () => {
    showLoader(true);
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        hideUserPanel();
        showSuccess(loginSuccess, 'Sesión cerrada');
    } catch (error) {
        showError(loginError, error.message);
    } finally {
        showLoader(false);
    }
});

function showUserPanel(user) {
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    userPanel.classList.remove('hidden');
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userId').textContent = `ID: ${user.id}`;
    document.getElementById('userDetails').innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Creado:</strong> ${new Date(user.created_at).toLocaleDateString('es-ES')}</p>
    `;
}

function hideUserPanel() {
    userPanel.classList.add('hidden');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

async function checkActiveSession() {
    try {
        const { data } = await supabase.auth.getSession();
        if (data.session) showUserPanel(data.session.user);
    } catch (error) {
        console.error('Error:', error);
    }
}

supabase.auth.onAuthStateChange((event, session) => {
    if (session) showUserPanel(session.user);
    else hideUserPanel();
});

checkActiveSession();
