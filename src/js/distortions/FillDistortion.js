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
     * @param {MirrorImage} image the image in the mirror to apply to
     */
    apply(mirror, image) {
        if(image) image.fill.color = this._fill;
        return image;
    }
}