import Cookies from './cookies.js';
import urlParameter from './urlParameter.js';
import formatter from './formatter.js';

//run all the utilities
window.wl = {
  utils: {}
};

Cookies.init();
urlParameter.init();
formatter.init();
