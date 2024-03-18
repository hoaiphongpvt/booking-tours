// import '@babel/polyfill';
import { login } from './login.js';
import { logout } from './logout.js';
import { updateData } from './updateSettings.js';
import { bookTour } from './stripe.js';

// DOM ELEMENTS
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const btnUpdate = document.getElementById('btn-update');
const btnUpdatePassword = document.getElementById('btn-updatePassword');
const btnBook = document.getElementById('book-tour');
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

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateData(form, 'data');
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

if (btnBook) {
  btnBook.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const tourID = e.target.dataset.tourId;
    const userID = e.target.dataset.userId;
    bookTour(tourID, userID);
  });
}
