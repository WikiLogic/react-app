import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';

const userApi = new Api('/api/v1/user');
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
  @observable authModal;

  constructor() {
    this.isLoggedIn = false;
    this.isLoggingIn = false;
    this.loginResponceMessage = 'Login';
    this.signupResponceMessage = 'Signup!';
    this.history = [];
    this.username = '';
    this.password = '';
    this.email = '';
    this.signUpDate = '';
    this.authModal = false;
    this.JWT = '';
  }

  @action
  openAuthModal(type) {
    this.authModal = type; //Login or Signup
  }

  @action
  closeAuthModal() {
    this.authModal = false;
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
          this.username = res.data.user.username;
          this.email = res.data.user.email;
          this.signUpDate = res.data.user.signUpDate;
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
    this.isLoggedIn = false;
    Cookies.set('JWT', '');
    // tell the server?
  }

  @action
  signup() {
    fetch('/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Formatter.objectToFormData({
        email: this.email,
        username: this.username,
        password: this.password
      }),
    })
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        console.log('res', res);
        this.JWT = res.data.token;
        this.isLoggedIn = true;
        this.isLoggingIn = false;
        this.signupResponceMessage = 'Success!';
        Cookies.set('JWT', `JWT ${res.data.token}`);
        this.username = res.data.user.username;
        this.email = res.data.user.email;
        this.signUpDate = res.data.user.signUpDate;
      })
      .catch((err) => {
        console.error('User sign up error: ', err);
        this.isLoggingIn = false;
        this.signupResponceMessage = 'Sign up failed :(';
      });
  }

  @action
  getUserData() {
    const cookieJWT = Cookies.get('JWT');
    if (cookieJWT) {
      this.isLoggingIn = true;
      this.JWT = cookieJWT;
      userApi.get('').then((res) => {
        this.username = res.data.user.username;
        this.email = res.data.user.email;
        this.signUpDate = res.data.user.signUpDate;
        this.isLoggedIn = true;
        this.isLoggingIn = false;
      }).catch((err) => {
        console.log('get user data err', err);
      });
      //TODO try to get userdata with this JWT, if it works - we're logged in!
    }
  }
}
