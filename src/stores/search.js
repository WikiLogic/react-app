import { observable, action } from 'mobx';
import Api from '../utils/api.js';
//Holds onto all the searches & their settings

const claimApi = new Api('/api/v1/claims');

export default class Search {
  @observable term;
  @observable results;

  constructor() {
    this.term = '';
    this.results = [];

    claimApi.get('/').then((res) => {
      this.results = res.data.results;
    }).catch((err) => {
      console.error('Plain claim get error: ', err);
    });
  }

  @action
  submit() {
    let url = '/';
    if (this.term !== '') {
      url = `/search?s=${this.term}`;
    }

    claimApi.get(url).then((res) => {
      this.results = res.data.results;
    }).catch((err) => {
      console.error('Claim search error: ', err);
    });
  }
}
