import { observable } from 'mobx';

export default class GraphConfig {
  @observable gridUnit = 100;
  @observable padUnit = 4;
  @observable spaceBetweenArgs = 50;
}
