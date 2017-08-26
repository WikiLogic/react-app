import Cookies from './cookies';
import Formatter from './formatter';

let JWT = '';
const apiRouteRoot = '/api';

function login(user, password) {
  const loggedInPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Formatter.objectToFormData({
        name: user,
        password,
      }),
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        JWT = res.data.token;
        Cookies.set('JWT', `JWT ${res.data.token}`);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return loggedInPromise;
}

function logout() {
  JWT = '';
  Cookies.set('JWT', '');
  // tell the server?
}

function get() {
  if (JWT === '') {
    JWT = Cookies.get('JWT');
    if (JWT === '') {
      return false;
    }
  }

  const userPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/user`, {
      headers: {
        Authorization: Cookies.get('JWT'),
      },
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        resolve(res.data.user);
      })
      .catch((err) => {
        console.log("error", err);
        reject(err);
      });
  });

  return userPromise;
}

export default {
  login,
  get,
  logout,
};
