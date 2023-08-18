import StartButton from "../gui/StartButton";
import Scene from "./Scene";

export default class WelcomeScene extends Scene {
    /**
     * constructor()
     * @description constructs the scene
     */
    constructor(game, context) {
        super(game, context)

        this._instructionFontSize = 14;
        this._instructionSpacing = 4;
        this._instructions = [
            "Find your way through the rooms to the end room.",
            "Look at the mirrors on the walls of each room to determine which room to enter.",
            "The mirrors closer to the end room will more",
            "and more different from what you'd expect to see in a mirror.",
            "Use the WASD keys to navigate the rooms.",
            "Press start to begin."
        ]
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
            this._game.nextScene();
        }
    }


    /**
     * create()
     * @description creates the scene
     */
    create() {

        
        this._startButton = new StartButton(
            {
                x: window.innerWidth / 2 - 50, 
                y: window.innerHeight / 2 + 10 + this._instructions.length * (this._instructionFontSize + this._instructionSpacing)
            },
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

        

        context.font = this._instructionFontSize + "px Arial";

        for (let i = 0; i < this._instructions.length; i++) {
            context.fillText(
                this._instructions[i], 
                window.innerWidth / 2,
                window.innerHeight / 2 + i * (this._instructionFontSize + this._instructionSpacing)
            )
        }
        this._startButton.draw(context);


    }



    /**
     * update()
     * @description updates the scene
     */
    update() {}
}