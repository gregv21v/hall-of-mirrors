import Circle from "../shapes/Circle";
import Group from "../shapes/Group";
import Rectangle from "../shapes/Rectangle";
import Distortion from "./Distortion";




/**
 * ShadowDistortion - a distortion that effects size of objects in mirrors
 */
export default class ShadowDistortion extends Distortion {

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
        let shadow = new Circle(
            {x: player.x - player.radius * 2, y: player.y - player.radius * 2},
            player.radius
        )
        shadow.fill.color = "black";
        shadow.stroke.color = "black";
        group.drawOrder = ["shadow", "player"]
        group.add(shadow, "shadow")

        console.log(group);
    }
}