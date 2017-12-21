import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';

/**
 * Each claim on the graph and all it's children
 */

const claimApi = new Api('/api/v1/claims');

export default class GraphClaim {
  @observable rootClaim;

  constructor(rootClaim) {
    this.rootClaim = rootClaim;
  }

  @action
  setRootClaim(claim) {
    //may not be a full claim - get it's children
    console.log('setting root claim: ', claim);
    this.rootClaim = claim;

    claimApi.get(`/${claim._key}`).then((res) => {
      this.rootClaim = res.data.claim;
    }).catch((err) => {
      console.error('Get claim detail error: ', err);
    });
  }
}

class GraphRow {

}

class GraphColumn {
  
}

// export default class GraphClaims {
//   @observable graphClaims;

//   constructor() {
//     this.graphClaims = [];
//   }
// }
