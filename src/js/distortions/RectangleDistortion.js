import Group from "../shapes/Group";
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
     * @param {Group} group the group in the mirror to apply to
     */
    apply(mirror, group) {
        if(group == null) return group;

        let player = group.objects["player"];
        console.log(player);
        let rect = new Rectangle(
            {x: group.center.x - player.radius, y: group.center.y - player.radius},
            player.radius * 2, player.radius * 2
        )
        rect.fill = player.fill;
        rect.stroke = player.stroke;
        group.add(rect, "rectangle")
    }
}