import { observable, action } from 'mobx';
import GraphClaimStore from 'src/stores/graphClaim.js';
import Api from 'src/utils/api.js';

/**
 * Manages the claims in a graph
 */

const claimApi = new Api('/api/v1/claims');

export default class Graph {
  @observable rootClaim;

  @action
  setRootClaim(claim) {
    //may not be a full claim - get it's children
    console.log('setting root claim: ', claim);
    this.rootClaim = new GraphClaimStore(claim);

    claimApi.get(`/${claim._key}`).then((res) => {
      this.rootClaim = res.data.claim;
    }).catch((err) => {
      console.error('Get claim detail error: ', err);
    });
  }

}
