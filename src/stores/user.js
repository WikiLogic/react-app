import { observable, action } from 'mobx';

const Formatter = window.wl.utils.formatter;
const Cookies = window.wl.utils.cookies;

export default class User {
  @observable isLoggedIn = false;
  @observable history = [];
  @observable JWT = '';
  @observable username = '';
  @observable email = '';
  @observable signUpDate = '';


  @action
  logIn(username, password) {
    console.log('sending login request: ', username, password);
    fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Formatter.objectToFormData({
        username,
        password,
      }),
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        console.log('login returnedddd: ', res);
        this.JWT = res.data.token;
        this.isLoggedIn = true;
        this.username = username;
        //TODO: go to profile page? or home
        Cookies.set('JWT', `JWT ${res.data.token}`);
      })
      .catch((err) => {
        console.error('user log in error: ', err);
      });
  }

  @action
  logOut() {
    this.JWT = '';
    this.isLoggedIn = false;
    Cookies.set('JWT', '');
    // tell the server?
  }

  @action
  signUp(email, username, password) {
    fetch('/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Formatter.objectToFormData({
        email,
        username,
        password,
      }),
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        this.JWT = res.data.token;
        this.isLoggedIn = true;
        Cookies.set('JWT', `JWT ${res.data.token}`);
      })
      .catch((err) => {
        console.error('User sign up error: ', err);
      });
  }
}
