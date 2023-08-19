

/**
 * Distortion - a change in the room that indicates to the player
 *  that they are closer to the end of the maze
 */
export default class Distortion {

    /**
     * apply()
     * @description apply this distortion
     * @param {Mirror} mirror the mirror to apply to
     * @param {Group} group the group in the mirror to apply to
     */
    apply(mirror, group) {
        return group;
    }
}