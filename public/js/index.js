// import '@babel/polyfill';
import { login } from './login.js';
import { logout } from './logout.js';

// DOM ELEMENTS
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
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
