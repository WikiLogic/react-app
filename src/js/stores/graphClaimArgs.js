import { observable, action, computed } from "mobx";

/**
 * Manages the arguments for a claim in the graph
 */

export default class GraphClaimArgs {
    @observable premises = [];

    constructor(arg, graphConfig) {
        this.premises = arg.premises;
    }
}
