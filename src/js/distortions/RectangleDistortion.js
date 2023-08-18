import Circle from "../shapes/Circle";
import Rectangle from "../shapes/Rectangle";
import Distortion from "./Distortion";



/**
 * RectangleDistortion - a distortion that effects size of objects in mirrors
 */
export default class RectangleDistortion extends Distortion {

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
        if(image == null) return image;

        if(image instanceof Circle) {
            let newMirrorImage = new Rectangle(
                {x: image.x - image.radius, y: image.y - image.radius},
                image.radius * 2, image.radius * 2
            )
            newMirrorImage.fill = image.fill;
            newMirrorImage.stroke = image.stroke;
            return newMirrorImage;
        } else {
            return image;
        }
    }
}