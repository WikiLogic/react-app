import { observable, action, computed } from 'mobx';
import GraphConfig from './_graphConfig.js';
import Api from 'src/utils/api.js';
import GraphArg from './graphArg.js';

/**
 * A claim in the graph
 */

const claimApi = new Api('/api/v1/claims');

export default class GraphClaim {
  @observable claim;
  @observable x;
  @observable y;
  @observable w;
  @observable h;
  @observable args;
  @observable argsX;
  @observable argsY;
  @observable argsW;
  @observable argsH;

  constructor(claim, position) {
    this.claim = claim;
    this.args = [];
    this.x = position.x;
    this.y = position.y;
    //width and height probably assume no arguments are yet loaded
    this.w = position.w;
    this.h = position.h;
    this.argsX = (GraphConfig.gridUnit * 2);
    this.argsY = 0;
    this.argsW = 0;
    this.argsH = 0;
  }

  @action
  loadArgs() {
    claimApi.get(`/${this.claim._key}`).then((res) => {
      //turn each argument into a GraphArg class
      this.args = res.data.claim.arguments.map((arg, i) => {
        //figure out the position of each premise
        const argPosition = {
          x: i * (GraphConfig.gridUnit * 2),
          y: 0
        };

        return new GraphArg(arg, argPosition);
      });
    }).catch((err) => {
      console.error('Load claim arguments error: ', err);
    });
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
