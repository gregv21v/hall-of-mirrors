import StartButton from "../gui/StartButton";
import Scene from "./Scene";

export default class WelcomeScene extends Scene {
    /**
     * constructor()
     * @description constructs the scene
     */
    constructor(game, context) {
        super(game, context)
    }

    /**
     * onMouseUp()
     * @description called when the mouse button has been released
     * @param {MouseEvent} event the mouse event
     */
    onMouseUp(event) {

    }

    /**
     * onMouseDown()
     * @description called when the mouse button has been pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {
        
    }


    /**
     * onMouseClick() 
     * @description called when the mouse is clicked
     * @param {MouseEvent} event the mouse event
     */
    onMouseClick(event) {
        let mousePos = {
            x: event.clientX,
            y: event.clientY
        }

        if(this._startButton.contains(mousePos)) {
            console.log("startBUtton clicked");
            this._game.nextScene();
        }
    }


    /**
     * create()
     * @description creates the scene
     */
    create() {
        
        this._startButton = new StartButton(
            {x: window.innerWidth / 2 - 50, y: window.innerHeight / 2},
            100, 50, "Start"
        )

        this._startButton.fill.color = "green"

    }

    /**
     * draw()
     * @description draws the scene
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    draw(context) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        context.textAlign = "center";
        context.textBaseline = "middle"
        context.font = "50px Arial";
        context.fillText("Hall of Mirrors", window.innerWidth / 2, window.innerHeight / 2 - 50);

        this._startButton.draw(context);


    }



    /**
     * update()
     * @description updates the scene
     */
    update() {}
}