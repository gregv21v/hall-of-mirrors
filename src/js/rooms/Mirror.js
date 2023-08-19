import Distortion from "../distortions/Distortion";
import Group from "../shapes/Group";
import Rectangle from "../shapes/Rectangle";


export default class Mirror extends Rectangle {


    /**
     * constructor()
     * @description constructs the Mirror
     * @param {Room} room the room the Mirror is in
     * @param {Point} position the position of the Mirror, top left corner
     * @param {Number} width the width of the Mirror
     * @param {Number} height the height of the Mirror
     */
    constructor(room, wall, position, width, height) {
        super(position, width, height)
        this._room = room;
        this._wall = wall;
        this.fill.color = "grey"


        this._distortions = [];
    }


    /**
     * clone()
     * @description clones this mirror
     * @returns a copy of this mirror
     */
    clone() {
        let newMirror = new Mirror(this._room, this._wall, {...this._position}, this._width, this._height);
        newMirror._mirrorImage = this._room.player.createImage();
        newMirror._distortions = this._distortions;
        return newMirror;
    }


    /**
     * cloneTo()
     * @description clones this mirror to a new wall in a new room
     * @param {Room} room the room to clone to
     * @param {Wall} wall the wall to add the new mirror to
     * @returns a copy of this mirror on a specific wall
     */
    cloneTo(room, wall) {
        let newMirror = new Mirror(room, wall, {...this._position}, this._width, this._height)
        console.log(this._wall.rotation);
        newMirror.rotateAroundPoint(this._room.center, 360-this._wall.rotation);
        newMirror.rotateAroundPoint(room.center, wall.rotation);
        newMirror._distortions = [...this._distortions];
        return newMirror;
    }



    /**
     * copyDistortionsTo()
     * @description copies the distortions to a different mirror
     * @param {Mirror} mirror to copy the distortions to
     */
    copyDistortionsTo(mirror) {
        mirror._distortions = [...this._distortions]
    }

    /**
     * addDistortion()
     * @description adds a distortion to the mirror
     * @param {Distortion} distortion the distortion on the mirror
     */
    addDistortion(distortion) {
        this._distortions.push(distortion);
    }


    /**
     * draw() 
     * @description draws the mirror
     * @param {CanvasRenderingContext2D} context the context to draw
     */
    draw(context) {
        super.draw(context);

        context.save();
        context.rect(this._position.x, this._position.y, this._width, this._height);
        context.clip();
        if(this._imageGroup) this._imageGroup.draw(context);

        context.restore(); 
    }


    update() {
        let xInRange = (this._room.player.position.x > this.x && this._room.player.position.x < this.x + this._width);
        let yInRange = (this._room.player.position.y > this.y && this._room.player.position.y < this.y + this._height);

        // if the player is within the x range or y range of the mirror
        // display the player on the mirror at a size proportional to the
        // distance from the mirror

        this._mirrorImage = this._room.player.createImage(); // the mirror image of the player
        this._imageGroup = new Group();
        this._imageGroup.add(this._mirrorImage, "player");

        let heightScaleRatio = this._height / this._room.height;
        let widthScaleRatio = this._width / this._room.width;

        let mirrorPosition = {
            x: widthScaleRatio * this._wall.xDistanceTo(this._room.player.position.x),
            y: heightScaleRatio * this._wall.yDistanceTo(this._room.player.position.y) 
        }

        let scalingFactor = {
            x: Math.abs(this._width - mirrorPosition.x) / this._width,
            y: Math.abs(this._height - mirrorPosition.y) / this._height
        }

        if(xInRange) {
            this._imageGroup.scale(scalingFactor.y);
            this._imageGroup.moveTo(
                this._imageGroup.center.x,
                this.y + ((this._wall.side === "north") ? (this._height - mirrorPosition.y) : mirrorPosition.y)
            )
        }
        
        if(yInRange) {
            this._imageGroup.scale(scalingFactor.x);
            this._imageGroup.moveTo(
                this.x + ((this._wall.side === "west") ? (this._width - mirrorPosition.x) : mirrorPosition.x),
                this._imageGroup.center.y
            )
        }

        if(!xInRange && !yInRange) {
            this._imageGroup = null;
        } 


        // apply distortions
        for (const distortion of this._distortions) {
            distortion.apply(this, this._imageGroup);
        }
    }
}