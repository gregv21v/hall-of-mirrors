import Player from "../Player";
import Scene from "./Scene";
import Maze from "../rooms/Maze";

/**
 * MainScene - the main scene of the game
 */

export default class MainScene extends Scene {


    /**
     * constructor()
     * @description constructs the scene
     * @param {CanvasRenderingContext2D} context the context to draw to 
     */
    constructor(game, context) {
        super(game, context);
    }


    /**
     * create()
     * @description creates the scene
     */
    create() {
        let roomSize = 300;
        let roomPosition = {
            x: window.innerWidth / 2 - roomSize / 2, 
            y: window.innerHeight / 2 - roomSize / 2
        }
        let roomCenter = {
            x: roomPosition.x + roomSize / 2,
            y: roomPosition.y + roomSize / 2
        }

        this._player = new Player(roomCenter, 10)

        this._maze = new Maze(
            this._player, roomPosition, roomSize
        )
        this._maze.create();

        this._keysPressed = {};

        let self = this;
        this._gameLoop = setInterval(() => {
            self.handleMovement(self._keysPressed);
            self.draw(this._context);
            self.update();
        }, 40)

    }


    /**
     * onKeyUp()
     * @description called when a key has been released
     * @param {KeyboardEvent} event the keyboard event
     */
    onKeyUp(event) {
        this._keysPressed[event.key] = false;
    }

    /**
     * onKeyDown()
     * @description called when a key has been pressed
     * @param {KeyboardEvent} event the keyboard event
     */
    onKeyDown(event) {
        this._keysPressed[event.key] = true;
    }


    /**
     * destroy()
     * @description destroys the scene
     */
    destroy() {
        clearInterval(this._gameLoop);
    }

    /**
     * draw()
     * @description draws the scene
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    draw(context) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        this._maze.draw(context);
        this._player.draw(context);
    }

    /**
     * update()
     * @description updates the scene
     */
    update() {
        this._maze.update();
    }


    /**
     * movement()
     * @description determines the behavior of player movement
     * @param {Key} key the key that was pressed
     */
    handleMovement(keysPressed) {
        let speed = 5;
        let onWallAmount = 10

        if(
            keysPressed['w'] && 
            this._player.position.y - speed > this._maze.currentRoom.position.y + this._player.radius - onWallAmount
        ) {
            this._player.position.y -= speed
        }

        if(
            keysPressed['a'] && 
            this._player.position.x - speed > this._maze.currentRoom.position.x + this._player.radius - onWallAmount
        ) {
            this._player.position.x -= speed
        }

        if(
            keysPressed['s'] && 
            this._player.position.y + speed < this._maze.currentRoom.position.y + this._maze.currentRoom.height - this._player.radius + onWallAmount
        ) {
            this._player.position.y += speed
        }

        if(
            keysPressed['d'] &&
            this._player.position.x + speed < this._maze.currentRoom.position.x + this._maze.currentRoom.width - this._player.radius + onWallAmount
        ) {
            this._player.position.x += speed
        }
    }
}