import { observable, action } from 'mobx';
import GraphClaimStore from 'src/stores/graphClaim.js';

/**
 * Manages the claims in a graph
 */

export default class Graph {
  @observable rootClaim;
  gridUnit = 100;
  padUnit = 4;

  @action
  setRootClaim(claim) {
    //may not be a full claim - get it's children
    console.log('setting root claim: ', claim);
    this.rootClaim = new GraphClaimStore(claim);
  }
}
