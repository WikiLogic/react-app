import { observable, action } from 'mobx';

const Formatter = window.wl.utils.formatter;
const Cookies = window.wl.utils.cookies;

export default class User {
  @observable isLoggedIn;
  @observable isLoggingIn;
  @observable loginResponceMessage;
  @observable signupResponceMessage;
  @observable history;
  @observable JWT;
  @observable username;
  @observable password;
  @observable email;
  @observable signUpDate;

  constructor() {
    this.isLoggedIn = false;
    this.isLoggingIn = false;
    this.loginResponceMessage = 'Login';
    this.signupResponceMessage = 'Signup!';
    this.history = [];
    this.JWT = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.signUpDate = '';
  }

  @action
  logIn() {
    this.isLoggingIn = true;
    fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Formatter.objectToFormData({
        username: this.username,
        password: this.password
      }),
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        console.log('res', res);
        this.isLoggingIn = false;
        if (Object.prototype.hasOwnProperty.call(res, 'errors')) {
          if (res.errors.length > 0) {
            this.loginResponceMessage = res.errors[0].title;
            this.isLoggedIn = true;
          }
        } else {
          this.JWT = res.data.token;
          this.isLoggedIn = true;
          this.loginResponceMessage = 'Success!';
          Cookies.set('JWT', `JWT ${res.data.token}`);
        }
      })
      .catch((err) => {
        this.isLoggingIn = false;
        this.loginResponceMessage = 'login failed :(';
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
  signup(email, username, password) {
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
        this.isLoggingIn = false;
        this.signupResponceMessage = 'Success!';
        Cookies.set('JWT', `JWT ${res.data.token}`);
      })
      .catch((err) => {
        console.error('User sign up error: ', err);
        this.isLoggingIn = false;
        this.signupResponceMessage = 'Sign up failed :(';
      });
  }
}
