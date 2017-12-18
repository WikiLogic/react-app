import { observable } from 'mobx';
import Api from '../utils/api.js';

/**
 * The search results, newly created claims, claims in detail, everything claim data!
 */

//This is the shape of a claim object
class Claim {
  @observable text;
  //0. or % ? 0. would give us more flexability - the ability to extend "accuracy"
  @observable probability;
  //an array of strings, eg 'axiom'
  @observable labels;
  @observable _key;
  @observable _id;

  constructor(value) {

  }
}

const claimApi = new Api('/api/v1/claims');

function init() {
  //first load, just get a list of claims
  claimApi.get('/').then((data) => {
    console.log('claims init data!', data);
  }).catch((err) => {
    console.error('claims init error: ', err);
  });
}

function getList() {
  return new Promise((resolve, reject) => {
    claimApi.get('/').then((data) => {
      resolve(data.data.results);
    }).catch((err) => {
      reject(err);
    });
  });
}

function createClaim() {}

export default {
  init,
  getList
};
