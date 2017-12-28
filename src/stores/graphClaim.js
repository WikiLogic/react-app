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

  constructor(claim, graphConfig) {
    this.claim = claim;
    this.args = [];
    this.graphConfig = graphConfig;
  }

  @action
  loadArgs() {
    claimApi.get(`/${this.claim._key}`).then((res) => {
      console.log('claim got claim arg data: ', res.data.claim.arguments);
      // this.args = res.data.claim.arguments;

      let premiseCounter = 0;
      const spaceBetweenArgs = 50;

      //set x position for each arg & it's premises
      this.args = res.data.claim.arguments.map((arg, i) => {
        //move it right by n previous premises * the gridUnit, premises are 2 units wide too
        arg.x = (premiseCounter * (this.graphConfig.gridUnit * 2)) + (spaceBetweenArgs * i);
        premiseCounter += arg.premises.length;
        return arg;
      });

      console.log('this.args', this.args);

    }).catch((err) => {
      console.error('Load claim arguments error: ', err);
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

    let width = 1;
    this.args.forEach((arg) => {
      width += arg.premises.length;
    });

    return width;
  }
}
