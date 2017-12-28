import { observable, action } from 'mobx';
import GraphClaimStore from 'src/stores/graphClaim.js';

/**
 * Manages the claims in a graph
 */

export default class Graph {
  @observable rootClaim;

  @action
  setRootClaim(claim) {
    const claimPositin = {
      x: 0,
      y: 0,
      w: 100,
      h: 100
    };

    this.rootClaim = new GraphClaimStore(claim, claimPositin);
  }
}
