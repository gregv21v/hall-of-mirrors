import Group from "../shapes/Group";
import Rectangle from "../shapes/Rectangle";

export default class Door extends Group {

    
    /**
     * constructor()
     * @description constructs the Mirror
     * @param {Room} room the room the Mirror is in
     * @param {Point} position the position of the Mirror, top left corner
     * @param {Number} width the width of the Mirror
     * @param {Number} height the height of the Mirror
     */
    constructor(room, position, width, height) {
        super()

        this._position = position;
        this._width = width;
        this._height = height;
        this._room = room;
        this._connectedRoom = undefined;
        
        this._base = new Rectangle(
            position, width, height
        )

        this.add(this._base, "base");
        
        this._base.fill.color = "rgb(102, 51, 0)"
        this._dividents = [];
        let gap = 5;
        this._dividentCount = 2;
        let dividentSize = (width - gap * (this._dividentCount + 1)) / this._dividentCount;
        
        for (let x = 0; x < this._dividentCount; x++) {
            this._dividents.push([]);
            for (let y = 0; y < this._dividentCount; y++) {
                this._dividents[x].push(
                    new Rectangle(
                        {
                            x: this._position.x + x * (dividentSize + gap) + gap,
                            y: this._position.y + y * (dividentSize + gap) + gap
                        },
                        dividentSize, dividentSize
                    )
                )
                this._dividents[x][y].fill.color = "rgb(153, 102, 51)"
                this._dividents[x][y].stroke.color = "rgb(77, 51, 25)"
                this.add(this._dividents[x][y], "divident_" + x + "_" + y)
            }
        }
    }
    

    /**
     * playerTouches()
     * @description checks if a player touched the door
     * @param {Player} player the player to check collision with
     */
    playerTouches(player) {
        const distX = Math.abs(player.x - this._base.x - this._base.width / 2);
        const distY = Math.abs(player.y - this._base.y - this._base.height / 2);

        if (distX > (this._base.width / 2 + player.radius)) {
            return false;
        }
        if (distY > (this._base.height / 2 + player.radius)) {
            return false;
        }
    
        if (distX <= (this._base.width / 2)) {
            return true;
        }
        if (distY <= (this._base.height / 2)) {
            return true;
        }

        let deltaX = distX - this._base.width / 2
        let deltaY = distY - this._height / 2
        return deltaX * deltaX + deltaY * deltaY <= player.radius * player.radius
    }


    /**
     * enterRoom()
     * @description enters the connected room
     */
    enterRoom(maze, player) {
        if(this.playerTouches(player) && this.connectedRoom) {
            maze.currentRoom = this.connectedRoom;
            player.position = this.connectedRoom.center

            console.log(maze.currentRoom);
        }
    }




    /**
     * rotateAroundBase() 
     * @description rotates the door around its base 
     * @param {Number} angle the angle to rotate
     */
    rotateAroundBase(angle) {
        this.rotateAroundPoint(this._base.center, angle);
    }



    /**
     * get connectedRoom()
     * @description gets the connected room
     */
    get connectedRoom() {
        return this._connectedRoom;
    }

    /**
     * set connectedRoom()
     * @description sets the connected room
     * @param {Room} value the room to connect to
     */
    set connectedRoom(value) { 
        this._connectedRoom = value;
    }
}