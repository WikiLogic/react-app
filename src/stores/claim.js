import { observable } from 'mobx';
// import Api from '../utils/api.js';

export default class Claim {
  @observable text;

  //0. or % ? 0. would give us more flexability - the ability to extend "accuracy"
  @observable probability; //might be computed value...

  //an array of strings, eg 'axiom'
  @observable labels;
  @observable _key;
  @observable _id;
  @observable args;

  constructor(claim) {
    this.text = claim.text;
    this.probability = claim.probability;
    this.labels = claim.labels;
    this._key = claim._key;
    this._id = claim._id;
    this.arguments = claim.args || [];
    console.log('TODO: check claim with arguments:', this);
  }
}
