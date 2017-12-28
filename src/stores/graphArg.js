import { observable, action, computed } from 'mobx';

export default class GraphArg {
  @observable premises = [];

  constructor(arg, graphConfig) {
    this.premises = arg.premises;
  }
}
