import { observable, action } from 'mobx';
import Api from 'src/utils/api.js';

const claimApi = new Api('/api/v1/claims');

export default class NewClaim {
  @observable text;
  @observable probability;
  @observable statusMessage;

  constructor(text) {
    this.text = text;
    this.probability = 50;
    this.statusMessage = '';
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
  submit() {
    const claimData = JSON.stringify({ text: this.text, probability: this.probability });
    claimApi.post('', claimData).then((res) => {
      console.log('New claim returned! ', res);
    }).catch((err) => {
      console.log(typeof err);
      
      if (typeof err === 'number') {
        if (err === 401) {
          this.statusMessage = '401: log in to submit new claims';
        } else if (err === 400) {
          this.statusMessage = '400: Not sure but something\'s wrong';
        }
        console.error('http error', err);
      } else {
        console.error('New claim error: ', err);
      }
    });
  }
}
