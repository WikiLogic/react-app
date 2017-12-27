import { observable, action } from 'mobx';
import SearchStore from 'src/stores/search.js';
import GraphStore from 'src/stores/graph.js';

/**
 * Manages the graph scene stores
 */

export default class GraphScene {
  //Search & results
  @observable searchStore;
  //set up the graph component & store
  @observable graphClaimStore;
  @observable hasGraphData;

  constructor() {
    this.searchStore = new SearchStore();
    this.graphStore = new GraphStore();
    this.hasGraphData = false;
  }

  @action
  loadClaim(claim) {
    this.graphStore.setRootClaim(claim);
    this.hasGraphData = true;
  }
}
