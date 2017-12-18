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

// const claimApi = new Api('/api/v1/claims');

// function init() {
//   //first load, just get a list of claims
//   claimApi.get('/').then((data) => {
//     console.log('claims init data!', data);
//   }).catch((err) => {
//     console.error('claims init error: ', err);
//   });
// }

// function getList() {
//   return new Promise((resolve, reject) => {
//     claimApi.get('/').then((data) => {
//       resolve(data.data.results);
//     }).catch((err) => {
//       reject(err);
//     });
//   });
// }

// function createClaim() {}

// export default {
//   init,
//   getList
// };
