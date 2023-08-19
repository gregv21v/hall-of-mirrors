import Circle from "./shapes/Circle";

export default class Player extends Circle {


    /**
     * constructor()
     * @description constructs the player 
     * @param {Point} center the center of the circle
     * @param {Point} radius the radius of the circle
     */
    constructor(center, radius) {
        super(center, radius);
        this._fill.color = "red"
        this._stroke.color = "red"
    }

    createImage() {
        let image = new Circle({...this._position}, this._radius);
		image.fill.color = this._fill.color;
        image.stroke.color = this._stroke.color;
		return image;
    }
}