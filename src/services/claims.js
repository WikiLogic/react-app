import Api from '../utils/api.js';

/**
 * The search results, newly created claims, claims in detail, everything claim data!
 */

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

export default {
  init,
  getList
};
