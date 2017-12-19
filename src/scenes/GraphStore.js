import { observable } from 'mobx';
import SearchStore from '../stores/search.js';

//main pulls in the scene and assigns this controller as it's state.
// post about this. Nearly went down the route of splitting up the areas in a scene into 'views', but realised that way 
// lies infinit ui taxonomies. better keep it simple. Scene and Component.
// Mapped it out, then thought state is basically the same, map it out alongside
// taken to it's conclusion, the scene needs a state - but as scenes are seperate from components, so shall their 
// state be seperate from stores. Enter the controller! The state's version of a scene!
export default class GraphController {
  //set up the search component & store
  @observable search = new SearchStore();
  //set up the list component & store
  //set up the graph component & store
}
