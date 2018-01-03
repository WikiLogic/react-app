import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';

const claimApi = new Api('/api/v1/claims');

export default class NewClaim {
  @observable text;
  @observable probability;

  constructor(text) {
    this.text = text;
    this.probability = 50;
  }

  @action
  setText(text) {
    this.text = text;
  }

  @action
  setProbability(probability) {
    this.probability = probability;
  }

  @action
  submit(claim) {
    claimApi.post('', JSON.stringify(claim)).then((res) => {
      console.log('New claim returned! ', res);
    }).catch((err) => {
      console.error('New claim error: ', err);
    });
  }
}
