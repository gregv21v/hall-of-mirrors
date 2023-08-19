import Player from "../Player";
import FillDistortion from "../distortions/FillDistortion";
import RectangleDistortion from "../distortions/RectangleDistortion";
import ShadowDistortion from "../distortions/ShadowDistortion";
import SizeDistortion from "../distortions/SizeDistortion";
import StarDistortion from "../distortions/StarDistortion";
import StrokeDistortion from "../distortions/StrokeDistortion";
import { getRandomInt, swap } from "../util";
import Room from "./Room";

/**
 * Maze - a graph of rooms connected by doors
 */
export default class Maze {


    /**
     * constructor()
     * @param {Player} player the player that is playing the game
     * @param {Point} roomPosition the position of the room
     * @param {Number} roomSize the size of the room
     */
    constructor(player, roomPosition, roomSize) {
        this._roomPosition = roomPosition;
        this._roomSize = roomSize;
        this._player = player;
        this._rooms = this.createRandomRooms(20);
        this._currentRoom = this._rooms[0];
        this._startRoom = this._rooms[0];

        // distortions are ordered in such a way that the 
        // more apparent ones come last
        this._avaliableDistortions = [
            new ShadowDistortion(),
            new StrokeDistortion("pink"),
            new FillDistortion("blue"),
            new SizeDistortion(0.5),
            new RectangleDistortion(),
            new StarDistortion()
        ]


    }


    /**
     * draw() 
     * @description draws the maze's current room
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    draw(context) {
        this._currentRoom.draw(context);
    }


    /**
     * update() 
     * @description updates the maze
     */
    update() {
        this._currentRoom.update()
    }


    /**
     * shows debug information for the room
     */
    debug() {

    }
    


    /**
     * create()
     * @description creates the maze
     * @param {Array[Room]} rooms a list of rooms
     */
    create() {
        var northRooms = [];
        var eastRooms = [];
        var southRooms = [];
        var westRooms = [];
        // Create path to end
        var avaliableDoors = ["north", "east", "south", "west"];
        var currentRoom = this._rooms[0];
        let currentDisorder = 0;
        this._startRoom = this._rooms[0];

        for (let i = 1; i < this._rooms.length; i++) {
            currentRoom.disorder = currentDisorder;
            currentDisorder++;
            var rand = getRandomInt(0, 3);
            
            let wall = this.getWall(this._rooms[i-1], avaliableDoors[rand]);
            // add the distortions 
            for (let i = 0; i < this._avaliableDistortions.length && i < currentDisorder; i++) {
                wall.mirror.addDistortion(
                    this._avaliableDistortions[i]
                )
            }

            
            console.log(avaliableDoors[rand]);
            this.linkTwoRooms(this._rooms[i-1], this._rooms[i], avaliableDoors[rand]);

            currentRoom = this._rooms[i];
            
            if (avaliableDoors[rand] === "north") {
                northRooms.push(this._rooms[i]);
                avaliableDoors = swap(avaliableDoors, avaliableDoors.indexOf("south"), 3)
            } else if (avaliableDoors[rand] === "east") {
                eastRooms.push(this._rooms[i]);
                avaliableDoors = swap(avaliableDoors, avaliableDoors.indexOf("west"), 3)
            } else if (avaliableDoors[rand] === "south") {
                southRooms.push(this._rooms[i]);
                avaliableDoors = swap(avaliableDoors, avaliableDoors.indexOf("north"), 3)
            } else if (avaliableDoors[rand] === "west") {
                westRooms.push(this._rooms[i]);
                avaliableDoors = swap(avaliableDoors, avaliableDoors.indexOf("east"), 3)
            }

        }
        this._endRoom = currentRoom;
        this._endRoom.fill.color = "rgb(0, 255, 255)";
        this._endRoom.name = "End"

        // Connect empty doors
        /*
        for (let i = 0; i < this._rooms.length; i++) {
            let index = 0;


            if (this._rooms[i].northWall.door.connectedRoom == null) {
                index = getRandomInt(0, northRooms.length)
                this.linkTwoRooms(northRooms[index], this._rooms[i], "north")
            }

            if (this._rooms[i].southWall.door.connectedRoom == null) {
                index = getRandomInt(0, southRooms.length)
                this.linkTwoRooms(southRooms[index], this._rooms[i], "south")
            }

            if (this._rooms[i].eastWall.door.connectedRoom == null) {
                index = getRandomInt(0, eastRooms.length)
                this.linkTwoRooms(eastRooms[index], this._rooms[i], "east")
            }

            if (this._rooms[i].westWall.door.connectedRoom == null) {
                index = getRandomInt(0, westRooms.length)
                this.linkTwoRooms(westRooms[index], this._rooms[i], "west")
            }
        }*/
    }


    /**
     * createRandomRooms()
     * @description creates a list of random rooms
     * @param {Number} count thhe number of rooms to create
     */
    createRandomRooms(count) {
        let randomColor = () => {
            return "rgb(" + 
                getRandomInt(0, 255) + "," + 
                getRandomInt(0, 255) + "," + 
                getRandomInt(0, 255) + 
            ")";
        }
        let rooms = [];
        
        for (let i = 0; i < count; i++) {
            let room = new Room(
                this,
                this._player, 
                {...this._roomPosition},
                this._roomSize, this._roomSize,
                "grey"
            )
            room.name = "" + i;
            rooms.push(room);     
        }

        return rooms;
    }



    /** 
     * getWall()
     * @description gets a wall by side
     * @param {Room} room the room to get the wall from
     * @param {String} side the side of the room
     */
    getWall(room, side) {
        switch(side) {
            case "north":
                return room.northWall;
            case "south": 
                return room.southWall;
            case "east":
                return room.eastWall;
            case "west":
                return room.westWall;
            default: 
                console.warn("Invalid wall side");
        }
    }
    



    /**
     * linkTwoRooms()
     * @description This function links two rooms to each other at a specified side.
     *  The roomA will copy its mirror to roomB removing the existing mirror
     */
    linkTwoRooms(roomA, roomB, side) {
        switch (side) { 
            case 'north': 
                roomA.northWall.door.connectedRoom = roomB;
                roomB.southWall.door.connectedRoom = roomA;
                roomB.southWall.mirror = roomA.northWall.mirror.cloneTo(roomB, roomB.southWall)
                break; 
            case 'south': 
                roomA.southWall.door.connectedRoom = roomB;
                roomB.northWall.door.connectedRoom = roomA;
                roomB.northWall.mirror = roomA.southWall.mirror.cloneTo(roomB, roomB.northWall)
                break; 
            case 'east': 
                roomA.eastWall.door.connectedRoom = roomB;
                roomB.westWall.door.connectedRoom = roomA;
                roomB.westWall.mirror = roomA.eastWall.mirror.cloneTo(roomB, roomB.westWall)
                break; 
            case 'west': 
                roomA.westWall.door.connectedRoom = roomB;
                roomB.eastWall.door.connectedRoom = roomA;
                roomB.eastWall.mirror = roomA.westWall.mirror.cloneTo(roomB, roomB.eastWall)
                break; 
            default:
                console.warn("Not a valid side for linking rooms");
                break;
        }
    }


    /**
     * linkAllRooms()
     * @description links a list of rooms
     * @param {Array[Room]} rooms the rooms to link
     */
    linkAllRooms(rooms) {
        for (let i = 0; i < rooms.length-1; i++) {
            let rand = getRandomInt(0, 3);

            switch(rand) {
                case 0:
                    rooms[i].northWall.door.connectedRoom = rooms[i+1];
                    break;
                case 1:
                    rooms[i].southWall.door.connectedRoom = rooms[i+1];
                    break;
                case 2:
                    rooms[i].eastWall.door.connectedRoom = rooms[i+1];
                    break;
                case 3:
                    rooms[i].westWall.door.connectedRoom = rooms[i+1];
                    break;
                default: 
                    console.warn("linkRooms() found an invalid connected room choice.");
                    break;
            }

        }

        return rooms;
    }


    /**
     * get currentRoom() 
     * @description gets the current room
     */
    get currentRoom() {
        return this._currentRoom;
    }


    /**
     * set currentRoom()
     * @description sets the current room
     * @param {Room} value the room to set the current room to
     */
    set currentRoom(value) {
        this._currentRoom = value;
    }

    
}