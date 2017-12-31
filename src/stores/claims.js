import { observable, action } from 'mobx';
// import Api from '../utils/api.js';

class Claim {
  @observable text;

  //0. or % ? 0. would give us more flexability - the ability to extend "accuracy"
  @observable probability; //might be computed value...

  //an array of strings, eg 'axiom'
  @observable labels;
  @observable _key;
  @observable _id;

  constructor(claim) {
    this.text = claim.text;
    this.probability = claim.probability;
    this.labels = claim.labels;
    this._key = claim._key;
    this._id = claim._id;
  }
}

export default class ClaimList {
  @observable claims = [];

  @action
  addClaim(claim) {
    this.claims.push(new Claim(claim));
  }
}
