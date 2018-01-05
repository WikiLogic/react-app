import { observable, action } from 'mobx';
import UserStore from './user.js';
import GraphSceneStore from './GraphScene.js';

// import Api from 'src/utils/api.js';
//Holds onto all the searches & their settings

// const claimApi = new Api('/api/v1/claims');

export default class Root {
  @observable isLoggedIn;
  @observable UserStore;
  @observable GraphSceneStore;
  @observable authModal;

  constructor() {
    this.isLoggedIn = false;
    this.UserStore = new UserStore();
    this.GraphSceneStore = new GraphSceneStore();
    this.authModal = false;
    // Find out if the user is logged in
  }

  @action
  openAuthModal(type) {
    this.authModal = type; //Login or Signup
  }

  @action
  closeAuthModal() {
    this.authModal = false;
  }
}
