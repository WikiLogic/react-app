import { observable } from 'mobx';
import GraphConfig from './_graphConfig.js';
import GraphPremise from './graphPremise.js';

export default class GraphArg {
  @observable arg;
  @observable premises = [];
  @observable x;
  @observable y;
  @observable w;
  @observable h;

  constructor(arg, argPosition) {
    this.arg = arg;
    this.x = argPosition.x;
    this.y = argPosition.y;
    this.w = (arg.premises.length * GraphConfig.gridUnit) * 2;
    this.h = GraphConfig.gridUnit;

    arg.premises.forEach((premise, i) => {
      //set up the position of each premise in this argument
      const premisePosition = {
        x: (i * (GraphConfig.gridUnit * 2)), // + (GraphConfig.padUnit * 2), //premises sit on the innermost box
        y: 0, // GraphConfig.padUnit * 2,
        w: (GraphConfig.gridUnit * 2), //premises sit on the innermost box - (4 * GraphConfig.padUnit)
        h: (GraphConfig.gridUnit * 1) //- (4 * GraphConfig.padUnit)
      };

      this.premises.push(new GraphPremise(premise, premisePosition));
    });
  }
}
