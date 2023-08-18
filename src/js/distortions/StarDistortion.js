import Circle from "../shapes/Circle";
import Rectangle from "../shapes/Rectangle";
import Star from "../shapes/Star";
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
            let newMirrorImage = new Star(
                {...image.position},
                5, image.radius / 2,
                image.radius
            )

            newMirrorImage.fill = image.fill;
            newMirrorImage.stroke = image.stroke;

            return newMirrorImage;
        } else if(image instanceof Rectangle) {
            let newMirrorImage = new Star(
                {x: image.x + image.width / 2, y: image.y + image.height / 2},
                5, image.width / 2,
                image.width / 2
            )

            newMirrorImage.fill = image.fill;
            newMirrorImage.stroke = image.stroke;

            return newMirrorImage;
        } else if(image instanceof Star) {
            return image;
        }
    }
}