import { observable, action } from 'mobx';
//Holds onto all the searches & their settings

export default class Search {
  @observable term = '';
  @observable history = [];

  @action
  setTerm(term) {
    if (this.term !== '') {
      this.history.push(this.term);
    }
    this.term = term;
  }
}
