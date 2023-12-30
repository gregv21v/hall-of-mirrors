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
     * @param {Group} group the group in the mirror to apply to
     */
    apply(mirror, group) {
        if(group == null) return null;

        let player = group.objects["player"];
        let star = new Star(
            {...player.position},
            5, player.radius / 2,
            player.radius
        )

        star.fill = player.fill;
        star.stroke = player.stroke;

        group.add(star, "star")
    }
}