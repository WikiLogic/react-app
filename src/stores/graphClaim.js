import { observable, action } from 'mobx';
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
  @observable childClaims;
  @observable totalHeight;
  parent;

  constructor(claim, position, parent) {
    this.claim = claim;
    this.x = position.x;
    this.y = position.y;
    //width and height probably assume no arguments are yet loaded
    this.w = position.w;
    this.h = position.h;
    this.totalHeight = position.h;
    this.args = [];
    this.argsX = (GraphConfig.gridUnit * 2);
    this.argsY = 0;
    this.argsW = 0;
    this.argsH = 0;
    this.childClaims = [];
    this.parent = parent;
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
  @action
  loadPremise(premiseStore) {
    //x is claim + parent arg position
    const x = (GraphConfig.gridUnit * 2) + premiseStore.x;
    //set y to one down by default
    const y = GraphConfig.gridUnit;

    const childPositin = {
      x: x,
      y: y,
      w: (GraphConfig.gridUnit * 2),
      h: GraphConfig.gridUnit
    };

    const baby = new GraphClaim(premiseStore, childPositin, this);
    this.childClaims.push(baby);
    this.updateLayout();
  }

  @action
  updateLayout() {
    this.childClaims = this.childClaims.sort((a, b) => {
      return b.x - a.x; //sort in reverse order
    });

    //set their y positions
    let yTracker = GraphConfig.gridUnit;
    this.childClaims.forEach((child) => {
      child.y = yTracker;
      yTracker += child.totalHeight;
    });

    //update this claim to keep track of it's total height
    this.totalHeight = yTracker;
    //now make the parent run it's layout again
    if (typeof this.parent !== 'undefined') {
      this.parent.updateLayout();
    }
  }
}
