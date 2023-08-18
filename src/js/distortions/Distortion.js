

/**
 * Distortion - a change in the room that indicates to the player
 *  that they are closer to the end of the maze
 */
export default class Distortion {

    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {MirrorImage} image the image in the mirror to apply to
     * @returns {MirrorImage} the new image 
     */
    apply(mirror, image) {
        return image;
    }
}