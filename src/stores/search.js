import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';
//Holds onto all the searches & their settings

const claimApi = new Api('/api/v1/claims');

export default class Search {
  @observable term;
  @observable results;
  @observable searchIsRunning;
  @observable searchHasRun;

  constructor() {
    this.term = '';
    this.searchIsRunning = false;
    this.searchHasRun = false;
    this.results = [];

    claimApi.get('/').then((res) => {
      this.results = res.data.results;
    }).catch((err) => {
      console.error('Plain claim get error: ', err);
    });
  }

  @action
  submit() {
    this.searchIsRunning = true;
    console.log('search submitted');
    let url = '/';
    if (this.term !== '') {
      url = `/search?s=${this.term}`;
    }

    claimApi.get(url).then((res) => {
      this.results = res.data.results;
      this.searchIsRunning = false;
      this.searchHasRun = true;
    }).catch((err) => {
      console.error('Claim search error: ', err);
      this.searchIsRunning = false;
      this.searchHasRun = true;
    });
  }
}
