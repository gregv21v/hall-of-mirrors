
import { Distance, rotatePoint } from "./Point";
import Shape from "./Shape";

/**
 * Circle - a circle
 */
export default class Circle extends Shape {

	/**
	 * constructor()
	 * @param {Point} center the center of the circle
	 * @param {Number} radius the radius of the circle
	 */
	constructor(center, radius) {
        super(center);
		this._radius = radius;	
	}


    /**
     * draw()
     * @description draws the circle
     */
    draw(context) {
        super.draw(context);

        context.beginPath();

        context.arc(
            this._position.x,
            this._position.y,
            this._radius, 0, 2 * Math.PI, false
        );

		context.fill();
		context.stroke();

        context.closePath();
    }


	/**
	 * clone()
	 * @description clones the Circle
	 */
	clone() {
		let circle = new Circle({...this._position}, this._radius);
		circle.fill.color = this.fill.color;
		return circle;
	}


	/**
	 * create()
	 * @description creates the graphic
	 */
	create() {

	}


	update() {

	}

	/**
	 * toPoints()
	 * @description converts the circle to points
	 */
	toPoints() {
		let sides = 6;
		let angle = 360 / sides
		let points = [];

		for (let i = 0; i < sides; i++) {
			points.push({
				x: this.center.x + this._radius * Math.cos((i * angle) * Math.PI / 180), 
				y: this.center.y + this._radius * Math.sin((i * angle) * Math.PI / 180)
            })
		}

		return points;
	}




	/**
     * moveBy() 
     * @description moves the circle by a delta x, and y
     * @param {Number} deltaX the difference in x to move the circle
     * @param {Number} deltaY the difference in y to move the circle
     */
    moveBy(deltaX, deltaY) {
        this.center.x += deltaX;
        this.center.y += deltaY;
    }


	/**
	 * moveTo()
	 * @description move the circle to the specified location
	 * @param {Number} x the x coordinate to move the circle to
	 * @param {Number} y the y coordinate to move the circle to
	 */
	moveTo(x, y) {
		this._position.x = x;
		this._position.y = y;
	}

	/**
	 * contains()
	 * @description checks whether the given point is within the circle
	 * @param {Point} point the point to check for containment
	 * @returns true if the point is within the circle, false otherwise
	 */
	contains (point) {
	  return Distance(this.center, point) <= this._radius;
	}


	/**
	 * scale()
	 * @description scales the rectangle by the given amount
	 * @param {Number} amount the amount to scale the rectangle by
	 */
	scale(amount) {
		this._radius *= amount;
	}

	/**
	 * rotateAroundPoint() 
	 * @description rotates the circle around a point
	 * @param {Point} point the point to rotate the circle around
	 * @param {Degrees} angle the angle to rotate the circle by in degrees
	 */
	rotateAroundPoint(point, angle) {
		this._position = rotatePoint(this._position, point, angle);
	}

	/**
	 * set center()
	 * @description sets the center of the circle
	 * @param {Number} center the center of the circle
	 */
	set center(value) {
		this._position = value;
	}

	/**
	 * get center() 
	 * @description gets the center of the circle
	 * @return {Point} the center of the circle
	 */
	get center() {
		return this._position;
	}



	/**
	 * get radius()
	 * @description gets the radius of the circle
	 */
	get radius() {
		return this._radius;
	}



}
