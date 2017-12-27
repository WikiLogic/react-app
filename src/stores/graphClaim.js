import { observable, action, computed } from 'mobx';
import Api from 'src/utils/api.js';

/**
 * A claim in the graph
 */

const claimApi = new Api('/api/v1/claims');

export default class GraphClaim {
  @observable claim;
  @observable args;
  @observable x;
  @observable y;
  @observable width;
  // @observable height; height is always 1, we don't count the children here.

  constructor(claim) {
    this.claim = claim;
    this.args = [];
  }

  @action
  loadArgs() {
    claimApi.get(`/${this.claim._key}`).then((res) => {
      console.log('claim got claim arg data: ', res.data.claim.arguments);
      this.args = res.data.claim.arguments;
    }).catch((err) => {
      console.error('Get claim detail error: ', err);
    });

    //TODO: tell the graph that it needs to align things again
  }

  // ? Move to graph probably
  loadPremise() {
    //take a premise, drop it down into it's own row as a childClaim
    //childClaims inherit their x position from their parent premise
    //childClaims get their Y from right to left total of other child premises

    //TODO: tell the graph that it needs to align things again
  }

  @action
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  @computed
  get width() {
    // count the number of premises used by arguments open for this claim
    // + 1 for the claim itself

  }
}
