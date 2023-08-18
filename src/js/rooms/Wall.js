import Group from "../shapes/Group";
import Rectangle from "../shapes/Rectangle";
import Door from "./Door";
import Mirror from "./Mirror";
import Room from "./Room";

export default class Wall extends Group {


    /**
     * constructor()
     * @param {Room} room the room the wall belongs to
     * @param {String} side the side of the room the wall is on
     * @param {Number} height the height of the wall 
     */
    constructor(room, side, height, rotation) {
        super();

        this._mirrors = [];

        this._height = height;
        let doorWidth = room.width / 5
        let doorGap = 10;
        this._side = side;
        this._rotation = rotation;
        this._room = room;

        this._wall = new Rectangle(
            { x: room.x, y: room.y - height }, room.width, height
        )
        this._wall.fill.color = "orange"
        this.add(this._wall, "wall");
        this._door = new Door(
            room,
            {
                x: room.x + room.width / 2 - doorWidth / 2,
                y: room.y - height + doorGap
            },
            doorWidth, height - doorGap
        )
        this.add(this._door, "door");

        this._mirror = new Mirror(
            room, this,
            {x: room.x + 10, y: room.y - height + 10},
            height - 20, height - 20
        )

        this.add(this._mirror, "mirror");

        this.rotateAroundPoint(room.center, this._rotation)

        
    }


    /**
     * addMirror()
     * @description adds a mirror
     * @param {Mirror} mirror the mirror to add
     
    addMirror(mirror) {
        this._mirrors.push(mirror);

        mirror.rotateAroundPoint(this._room.center, this._rotation)
        this.add(mirror, "mirror_" + this._mirrors.length);
    }*/






    /**
     * update() 
     * @description update the wall
     * @param {CanvasRenderingContext2D} context the rendering context
     */
    update(context) { 
        this._mirror.update()
    }


    /**
     * xDistanceTo()
     * @param {Number} x the x coordinate to measure the distance to
     */
    xDistanceTo(x) {
        if(this._side === "west") { // left wall
            return Math.abs(x - (this._wall.x + this._wall.width))
        }

        if(this._side === "east") { // right wall
            return Math.abs(this._wall.x - x)
        }

        return 0;
    }


    /**
     * yDistanceTo()
     * @param {Number} y the y coordinate to measure the distance to
     */
    yDistanceTo(y) {
        if(this._side === "north") {
            return Math.abs((this._wall.y + this._wall.height) - y) 
        }

        if(this._side === "south") {
            return Math.abs(this._wall.y - y)
        }

        console.warn("Side Not valid: " + this._side);
        return 0;
    }



    /**
     * get mirror()
     * @description gets the mirror of this wall
     * @returns {Mirror} mirror of this wall
     */
    get mirror() {
        return this._mirror;
    }


    /**
     * set mirror()
     * @description sets the mirror of this wall
     * @param {Mirror} value mirror to set to
     */
    set mirror(value) {
        this._mirror = value;

        this.add(this._mirror, "mirror")
    }

    /**
     * get door()
     * @description gets the door of the wall
     * @returns {Door} door of this wall
     */
    get door() {
        return this._door;
    }


    /**
     * get side()
     * @description gets the side of the wall
     */
    get side() {
        return this._side;
    }


    /**
     * get rotation()
     * @description gets the rotation of the wall
     */
    get rotation() {
        return this._rotation;
    }


}