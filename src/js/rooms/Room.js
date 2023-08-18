import Rectangle from "../shapes/Rectangle";
import Wall from "./Wall";

export default class Room extends Rectangle {
    constructor(maze, player, position, width, height, color) {
        super(position, width, height);
        this._maze = maze;
        this._player = player;
        this.fill.color = color;
        this._name = "";

        this._disorder = 0;

        let wallHeight = 100;
        
        this._northWall = new Wall(this, "north", wallHeight, 0);
        this._southWall = new Wall(this, "south", wallHeight, 180);

        // left wall
        this._westWall = new Wall(this, "west", wallHeight, 270);

        // right wall
        this._eastWall = new Wall(this, "east", wallHeight, 90);
    }

    /**
     * draw()
     * @description draws the room
     */
    draw(context) {
        super.draw(context);

        this._northWall.draw(context)
        this._southWall.draw(context)
        this._westWall.draw(context)
        this._eastWall.draw(context)

        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.font = "30px Arial";
        context.fillText(this._name, this._position.x + this._width / 2, this._position.y + this._height / 2)
        context.fillText(this._disorder, this._position.x + this._width / 2, this._position.y + this._height / 2 + 30)
    }


    /**
     * update()
     * @description updates the room
     * @param {CanvasRenderingContext2D} context the rendering context
     */
    update(context) {
        this._northWall.update(context)
        this._southWall.update(context)
        this._westWall.update(context)
        this._eastWall.update(context)

        this._northWall.door.enterRoom(this._maze, this._player)
        this._southWall.door.enterRoom(this._maze, this._player)
        this._eastWall.door.enterRoom(this._maze, this._player)
        this._westWall.door.enterRoom(this._maze, this._player)

        
    }

    /**
     * get player() 
     * @description gets the player in this room
     * @returns {Player} the player in this room
     */
    get player() {
        return this._player;
    }


    /**
     * set name()
     * @description sets the name of this room
     * @param {String} value the name of the room
     */
    set name(value) {
        this._name = value;
    }


    /**
     * get name()
     * @description gets the name of this room
     * @return {String} the name of the room
     */
    get name() {
        return this._name;
    }


    /**
     * get disorder()
     * @description gets the amount of distorter for this room
     * @return {Number} the amount of distorter for this room
     */
    get disorder() {
        return this._disorder;
    }

    /**
     * set disorder()
     * @description sets the amount of distorter for this room
     * @param {Integer} disorder the amount of distorter for this room
     */
    set disorder(value) {
        this._disorder = value;
    }


    /**
     * get northWall() 
     * @description gets the north wall of this room
     */
    get northWall() {
        return this._northWall;
    }

    /**
     * get southWall() 
     * @description gets the south wall of this room
     */
    get southWall() {
        return this._southWall;
    }

    /**
     * get eastWall() 
     * @description gets the east wall of this room
     */
    get eastWall() {
        return this._eastWall;
    }

    /**
     * get westWall() 
     * @description gets the west wall of this room
     */
    get westWall() {
        return this._westWall;
    }

}