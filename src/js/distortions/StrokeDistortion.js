import Distortion from "./Distortion";

/**
 * StrokeDistortion - a distortion that effects stoke colors of objects in mirrors
 */
export default class StrokeDistortion extends Distortion {

    /**
     * constructor()
     * @param {Color} color the color to change to  
     */
    constructor(color) {
        super();
        this._color = color;
    }


    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {MirrorImage} image the image in the mirror to apply to
     */
    apply(mirror, image) {
        if(image) image.stroke.color = this._color;
        return image;
    }
}