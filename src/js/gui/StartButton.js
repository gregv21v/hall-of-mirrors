import Button from "./Button";

export default class StartButton extends Button {

    constructor(position, width, height, label) {
        super(position, width, height);
        this._label = label;
    }


    /**
     * onMouseDown()
     * @description called when the mouse is pressed
     * @param {Event} event the mouse event
     */
    onMouseDown(event) {

    }


    /**
     * onClick()
     * @description the function that is called when this button is clicked
     */
    onClick() {
        console.log("Button clicked");
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