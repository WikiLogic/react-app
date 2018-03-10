import { observable, action } from "mobx";
import Api from "src/utils/api.js";

const claimApi = new Api("/api/v1/claims");

export default class NewClaim {
    @observable text;
    @observable probability;
    @observable statusMessage;
    @observable errors;
    @observable publishedClaim;
    @observable isPublished;

    constructor() {
        this.text = "";
        this.probability = 50;
        this.statusMessage = "";
        this.errors = [];
        this.publishedClaim = null;
        this.isPublished = false;
    }

    @action
    setText(text) {
        this.text = text;
    }

    @action
    setProbability(probability) {
        this.probability = probability;
    }

    @action
    submit() {
        claimApi
            .post("", { text: this.text, probability: this.probability })
            .then(res => {
                if (Object.prototype.hasOwnProperty.call(res, "errors")) {
                    this.errors = res.errors;
                } else {
                    // this.publishedClaim = res.data.claim;
                    // this.isPublished = true;
                    this.creationHandler(res.data.claim);
                }
            })
            .catch(err => {
                console.error("New claim error: ", err);
            });
    }

    @action
    creationHandler(claim) {
        this.publishedClaim = claim;
    }
}
