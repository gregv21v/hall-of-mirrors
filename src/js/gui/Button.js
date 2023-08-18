import Rectangle from "../shapes/Rectangle";

export default class Button extends Rectangle {

    constructor(position, width, height, label) {
        super(position, width, height);
        this._label = label;
    }


    /**
     * onMouseDown()
     * @description called when the mouse is pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {}


    /**
     * onMouseUp()
     * @description called when the mouse is released
     * @param {MouseEvent} event the mouse event
     */
    onMouseUp(event) {

    }


    /**
     * onClick()
     * @description the function that is called when this button is clicked
     */
    onClick() {
        console.log("Button clicked");
    }


    /**
     * draw() 
     * @description draws the mirror
     * @param {CanvasRenderingContext2D} context the context to draw
     */
    draw(context) {
        super.draw(context);
        
        context.fillStyle = "black";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = "20px Arial";
        context.fillText(this._label, this._position.x + this._width / 2, this._position.y + this._height / 2)
    }


    /**
	 * get label()
	 * @description gets the label of the button
	 * @returns the label of the button 
	 */
	get label() {
		return this._label;
	}

	/**
	 * set label()
	 * @description sets the label of the button
	 * @param {String} value the value to set the label to
	 */
	set label(value) {
		this._label = value;
	}
}