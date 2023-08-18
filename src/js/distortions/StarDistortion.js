import Rectangle from "../shapes/Rectangle";
import Distortion from "./Distortion";



/**
 * StarDistortion - a distortion that effects size of objects in mirrors
 */
export default class StarDistortion extends Distortion {

    /**
     * constructor()
     * @param {Color} color the color to change to  
     */
    constructor() {
        super();
    }


    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {MirrorImage} image the image in the mirror to apply to
     */
    apply(mirror, image) {
        if(image == null) return null;

        if(image instanceof Circle) {
            let newMirrorImage = new Rectangle(
                {...image.position},
                image.radius, image.radius
            )
            newMirrorImage.fill = image.fill;
            newMirrorImage.stroke = image.stroke;
            return image;
        } else if(image instanceof Rectangle) {
            return image;
        }
    }
}