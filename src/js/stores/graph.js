import { observable, action } from "mobx";
import GraphConfig from "./_graphConfig.js";
import GraphClaimStore from "src/stores/graphClaim.js";

/**
 * Manages the claims in a graph
 */

export default class Graph {
    @observable rootClaim;

    @action
    setRootClaim(claim) {
        //the initial claim position - assuming no arguments are loaded
        const claimPositin = {
            x: 0,
            y: 0,
            w: GraphConfig.gridUnit * 2,
            h: GraphConfig.gridUnit
        };

        this.rootClaim = new GraphClaimStore(claim, claimPositin);
    }
}
