import Character from './Character.js';
import Levels from '../data/Levels.js';
export default class Player extends Character {
    xvector;
    yvector;
    constructor(xcoord, ycoord) {
        super(xcoord, ycoord);
    }
    processPlayerMovement(doors, movementControls, tdt) {
        this.xvector = 0;
        this.yvector = 0;
        if (movementControls[0]) {
            this.xvector += -1;
        }
        if (movementControls[1]) {
            this.yvector += -1;
        }
        if (movementControls[2]) {
            this.xvector += 1;
        }
        if (movementControls[3]) {
            this.yvector += 1;
        }
        let dx = this.xvector;
        let dy = this.yvector;
        if (this.xvector !== 0 && this.yvector !== 0) {
            dx /= Math.sqrt(2);
            dy /= Math.sqrt(2);
        }
        const newxcoord = this.xcoord + dx * tdt * 250;
        const newycoord = this.ycoord + dy * tdt * 250;
        if (this.playerCollisionCheck(doors, newxcoord, newycoord)) {
            this.xcoord = newxcoord;
            this.ycoord = newycoord;
            return true;
        }
        if (this.playerCollisionCheck(doors, newxcoord, this.ycoord)) {
            this.xcoord = newxcoord;
            return true;
        }
        if (this.playerCollisionCheck(doors, this.xcoord, newycoord)) {
            this.ycoord = newycoord;
            return true;
        }
        return false;
    }
    playerCollisionCheck(doors, xcoord = this.xcoord, ycoord = this.ycoord) {
        let isOnFreeSpot = true;
        for (let i = xcoord; i < xcoord + this.characterW; i++) {
            for (let j = ycoord; j < ycoord + this.characterH; j++) {
                const collisionTestedTileX = Math.floor(i / Levels.tileW);
                const collisionTestedTileY = Math.floor(j / Levels.tileH);
                if (Levels.gameLevels.get('level0')[collisionTestedTileY][collisionTestedTileX] >= 20) {
                    isOnFreeSpot = false;
                }
                doors.doors.forEach((door, id) => {
                    if (door.tileX === collisionTestedTileX && door.tileY === collisionTestedTileY
                        && !door.isOpen) {
                        isOnFreeSpot = false;
                    }
                });
            }
        }
        return isOnFreeSpot;
    }
    playerInteractCheck(interactables, xcoord = this.xcoord, ycoord = this.ycoord) {
        let interactableID = '';
        interactables.interactables.forEach((interactable, id) => {
            for (let i = xcoord; i < xcoord + this.characterW; i++) {
                for (let j = ycoord; j < ycoord + this.characterH; j++) {
                    const collisionTestedTileX = Math.floor(i / Levels.tileW);
                    const collisionTestedTileY = Math.floor(j / Levels.tileH);
                    if (collisionTestedTileX === interactable.tileX
                        && collisionTestedTileY === interactable.tileY) {
                        interactableID = id;
                        return;
                    }
                }
            }
        });
        return interactableID;
    }
}
//# sourceMappingURL=Player.js.map