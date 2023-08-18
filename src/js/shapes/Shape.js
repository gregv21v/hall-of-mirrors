
/**
 * Shape - a graphic shape
 */
export default class Shape {
    constructor(position) {
        this._position = position;
        this._hidden = false;
        // opacity is part of the color
        this._fill = {
			color: "orange"
		};
		this._stroke = {
			color: "blue",
			width: 1
		};
    }





    /**
     * draw()
     * @description draws the player
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    draw(context) {
        context.fillStyle = this._fill.color;
        context.strokeStyle = this._stroke.color;
        context.lineWidth = this._stroke.width;
    }


	/**
	 * scale()
	 * @description scales the rectangle by the given amount
	 * @param {Number} amount the amount to scale the rectangle by
	 */
	scale(amount) {}


	/**
	 * scaleHeight()
	 * @description scales the y dimension of all objects in the group
	 * @param {Number} amount the amount to scale the y dimension by
	 */
	scaleY(amount) {}

	/**
	 * scaleWidth()
	 * @description scales the x dimension of all objects in the group
	 * @param {Number} amount the amount to scale the x dimension by
	 */
	scaleX(amount) {}

    /**
	 * set fill()
	 * @description sets the fill of the shape
	 * @param {Object} value the object to set the fill to. The object has a color, and opacity values
	 */
	set fill(value) {
		this._fill = value;
	}

	/**
	 * get fill()
	 * @description gets the fill of this shape
	 */
	get fill() {
		return this._fill
	}

	/**
	 * set stroke()
	 * @description sets the stroke of the shape
	 * @param {Object} value the object to set the stoke to. The object has a color, and width values
	 */
	set stroke(value) {
		this._stroke = value;
	}

	/**
	 * get stroke()
	 * @description gets the stroke of this shape
	 */
	get stroke() {
		return this._stroke
	}


    /**
	 * get position()
	 * @returns the position of the shape
	 */
	get position() {
		return this._position;
	}

	/**
	 * set position()
	 * @description sets the position of the shape
	 */
	set position(value) {
		this._position = value;
	}

	/**
	 * get x()
	 * @description gets the x position of the shape
	 * @returns the x position of the shape
	 */
	get x() {
		return this._position.x;
	}

	/**
	 * set x()
	 * @description sets the x position of the shape
	 * @param {Number} value the value to set x position
	 */
	set x(value) {
		this._position.x = value;
	}


	/**
	 * get x()
	 * @description gets the x position of the shape
	 * @returns the x position of the shape
	 */
	get y() {
		return this._position.y;
	}

	/**
	 * set y()
	 * @description sets the y position of the shape
	 * @param {Number} value the value to set y position
	 */
	set y(value) {
		this._position.y = value;
	}


	/**
	 * hide()
	 * @description hides the shape from view
	 */
	hide() {
		this._hidden = true;
	}

	/**
	 * show()
	 * @description shows the shape
	 */
	show() {
		this._hidden = false;
	}
}