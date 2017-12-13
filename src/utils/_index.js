import Cookies from './cookies.js';
import urlParameter from './urlParameter.js';

//run all the utilities
function init() {
  Cookies.init();
  urlParameter.init();
}

export default {
  init
};
