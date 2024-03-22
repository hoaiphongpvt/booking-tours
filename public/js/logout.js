import showAlert from './alert.js';
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      location.assign('/login');
    }
  } catch (err) {
    showAlert('error', 'Error loging out! Try again!');
  }
};
