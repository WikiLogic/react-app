import { observable, action } from 'mobx';
//Holds onto all the searches & their settings

export default class Search {
  @observable term;
  @observable results;

  constructor() {
    this.term = '';
    this.results = [];
  }

  @action
  submit() {
    //get claims from the server
    //update the results array
  }
}
