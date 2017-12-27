import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';

/**
 * A claim in the graph
 */

const claimApi = new Api('/api/v1/claims');

export default class GraphClaim {
  @observable claim;
  @observable x;
  @observable y;
  @observable width;
  @observable height;

  constructor(claim) {
    this.claim = claim;
  }

  @action
  loadArgs() {
    //create the row of arguments for this claim - extends out to the right of the current claim
    //each gets an x position depending on the number of premises
    claimApi.get(`/${this.claim._key}`).then((res) => {
      //find the claim / add it
      // this.rootClaim = res.data.claim;
      console.log('claim got claim data: ', res.data);

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
}
