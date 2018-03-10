import { observable } from "mobx";

//essentially a claim (inherit?) but this is speciically to handle the UI requirments of being a premise in an argument group
export default class GraphPremise {
    @observable text;

    //0. or % ? 0. would give us more flexability - the ability to extend "accuracy"
    @observable probability; //might be computed value...

    //an array of strings, eg 'axiom'
    @observable labels;
    @observable _key;
    @observable _id;

    @observable x;
    @observable y;
    @observable w;
    @observable h;

    constructor(claim, position) {
        this.text = claim.text;
        this.probability = claim.probability;
        this.labels = claim.labels;
        this._key = claim._key;
        this._id = claim._id;

        this.x = position.x;
        this.y = position.y;
        this.w = position.w;
        this.h = position.h;
    }
}
