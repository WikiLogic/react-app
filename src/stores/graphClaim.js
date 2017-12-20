import { observable, action } from 'mobx';

/**
 * Each claim on the graph and all it's children
 */

export default class GraphClaim {
  @observable rootClaim;

  constructor(rootClaim) {
    this.rootClaim = rootClaim;
  }

  @action
  setRootClaim(claim) {
    //may not be a full claim - get it's children
    this.rootClaim = claim;

    // API.getClaimDetailById(result._key)
    //   .then((data) => {
    //     this.setState({
    //       graphClaim: data.claim
    //     });
    //   }).catch((err) => {
    //     console.log('Trying to load claim detail error', err);
    //   });
  }
}

// export default class GraphClaims {
//   @observable graphClaims;

//   constructor() {
//     this.graphClaims = [];
//   }
// }
