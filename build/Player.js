import Character from './Character.js';
import Level from './Level.js';
export default class Player extends Character {
    xvector;
    yvector;
    constructor(xcoord, ycoord) {
        super(xcoord, ycoord);
    }
    processPlayerMovement(movementControls, tdt) {
        this.xvector = 0;
        this.yvector = 0;
        if (movementControls[0]) {
            console.log('left');
            this.xvector += -1;
        }
        if (movementControls[1]) {
            console.log('up');
            this.yvector += -1;
        }
        if (movementControls[2]) {
            console.log('right');
            this.xvector += 1;
        }
        if (movementControls[3]) {
            console.log('down');
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
        if (this.playerCollisionCheck(newxcoord, newycoord)) {
            this.xcoord = newxcoord;
            this.ycoord = newycoord;
            return true;
        }
        if (this.playerCollisionCheck(newxcoord, this.ycoord)) {
            this.xcoord = newxcoord;
            return true;
        }
        if (this.playerCollisionCheck(this.xcoord, newycoord)) {
            this.ycoord = newycoord;
            return true;
        }
        return false;
    }
    playerCollisionCheck(xcoord, ycoord) {
        let isOnFreeSpot = true;
        for (let i = xcoord; i < xcoord + this.characterW; i++) {
            for (let j = ycoord; j < ycoord + this.characterH; j++) {
                const collisionTestedTileY = Math.floor(j / Level.tileH);
                const collisionTestedTileX = Math.floor(i / Level.tileW);
                if (Level.gameLevel[collisionTestedTileY][collisionTestedTileX] !== 0) {
                    isOnFreeSpot = false;
                }
            }
        }
        return isOnFreeSpot;
    }
}
//# sourceMappingURL=Player.js.map