import Distortion from "../distortions/Distortion";
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
        if(this._mirrorImage) this._mirrorImage.draw(context);

        context.restore(); 
    }


    update() {
        let outOfXRange = false;
        let outOfYRange = false;

        // if the player is within the x range or y range of the mirror
        // display the player on the mirror at a size proportional to the
        // distance from the mirror

        this._mirrorImage = this._room.player.createImage(); // the mirror image of the player

        
        if(
            this._room.player.position.x > this.x && 
            this._room.player.position.x < this.x + this._width
        ) {
            let scaleRatio = this._height / this._room.height;
            let yOnMirror = scaleRatio * this._wall.yDistanceTo(this._room.player.position.y) 
            let scalingFactor = Math.abs(this._height - yOnMirror) / this._height
            this._mirrorImage.scale(scalingFactor);
            this._mirrorImage.position.y = this.y + ((this._wall.side === "north") ? (this._height-yOnMirror) : yOnMirror)
        } else {
            outOfXRange = true
        }   

        if(
            this._room.player.position.y > this.y && 
            this._room.player.position.y < this.y + this._height
        ) {
            let scaleRatio = this._width / this._room.width;
            let xOnMirror = scaleRatio * this._wall.xDistanceTo(this._room.player.position.x)

            let scalingFactor = (this._width - xOnMirror) / this._width
            
            this._mirrorImage.scale(scalingFactor);
            
            this._mirrorImage.position.x = this.x + ((this._wall.side === "west") ? (this._width - xOnMirror) : xOnMirror)
        } else {
            outOfYRange = true;
        }

        if(outOfXRange && outOfYRange) {
            this._mirrorImage = null;
        }


        // apply distortions
        for (const distortion of this._distortions) {
            this._mirrorImage = distortion.apply(this, this._mirrorImage);
        }

        

    }
}