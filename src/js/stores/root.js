import { observable } from "mobx";
import UserStore from "./user.js";
import ClaimDetailModal from "./claimDetailModal.js";
import GraphSceneStore from "./GraphScene.js";

// import Api from 'src/utils/api.js';
//Holds onto all the searches & their settings

// const claimApi = new Api('/api/v1/claims');

export default class Root {
    @observable isLoggedIn;
    @observable UserStore;
    @observable GraphSceneStore;
    @observable claimDetailModal;

    constructor() {
        this.isLoggedIn = false;
        this.UserStore = new UserStore();
        window.wl.user = this.UserStore;
        this.GraphSceneStore = new GraphSceneStore();
        // Find out if the user is logged in
        this.claimDetailModal = new ClaimDetailModal();
        window.wl.claimDetailModal = this.claimDetailModal;
    }
}
