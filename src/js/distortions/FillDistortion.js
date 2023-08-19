import Distortion from "./Distortion";

/**
 * FillDistortion - a distortion that effects fill colors of objects in mirrors
 */
export default class FillDistortion extends Distortion {

    /**
     * constructor()
     * @param {Color} fill the fill color to change to  
     */
    constructor(fill) {
        super();
        this._fill = fill;
    }


    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {Group} group the group in the mirror to apply to
     */
    apply(mirror, group) {
        if(group) group.objects["player"].fill.color = this._fill;
        return group;
    }
}