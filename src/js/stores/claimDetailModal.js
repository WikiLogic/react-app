import { observable, action } from "mobx";

// import Api from 'src/utils/api.js';
//Holds onto all the searches & their settings

// const claimApi = new Api('/api/v1/claims');

export default class ClaimDetailModal {
    @observable isOpen;
    @observable claim;

    constructor() {
        this.isOpen = false;
        this.claim = null;
    }

    @action
    openClaim(claim) {
        this.claim = claim;
        this.isOpen = true;
    }
}
