import { observable, action } from 'mobx';

export default class Graph {
  @observable rootClaim;

  constructor(rootClaim) {
    this.rootClaim = rootClaim;
  }

  @action
  expandClaim() {
    //hmm
  }
}
