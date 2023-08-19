import Distortion from "./Distortion";



/**
 * SizeDistortion - a distortion that effects size of objects in mirrors
 */
export default class SizeDistortion extends Distortion {

    /**
     * constructor()
     * @param {Color} color the color to change to  
     */
    constructor(sizeMultiplier) {
        super();
        this._sizeMultiplier = sizeMultiplier;
    }


    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {Group} group the group in the mirror to apply to
     */
    apply(mirror, group) {
        if(group) group.scale(this._sizeMultiplier);
        return group;
    }
}