// import '@babel/polyfill';
import { login } from './login.js';
import { logout } from './logout.js';
import { updateData } from './updateSettings.js';

// DOM ELEMENTS
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const btnUpdate = document.getElementById('btn-update');
const btnUpdatePassword = document.getElementById('btn-updatePassword');
// VALUES

// DELEGATION
if (btnLogin) {
  btnLogin.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    logout();
  });
}

if (btnUpdate) {
  btnUpdate.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateData({ name, email }, 'data');
  });
}

if (btnUpdatePassword) {
  btnUpdatePassword.addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('btn-updatePassword').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.getElementById('btn-updatePassword').textContent = 'Save password';

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
