import Character from './Character.js';
import KeyListener from './KeyListener.js';
export default class Player extends Character {
    keyListener;
    map;
    constructor(xcoord, ycoord, keyListener, map) {
        super(xcoord, ycoord);
        this.keyListener = keyListener;
        this.map = map;
    }
    processPlayerMovement(tdt) {
        let xvector = 0;
        let yvector = 0;
        if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
            || this.keyListener.isKeyDown(KeyListener.KEY_A))
            && true) {
            console.log('left');
            xvector += -1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_UP)
            || this.keyListener.isKeyDown(KeyListener.KEY_W))
            && true) {
            console.log('up');
            yvector += -1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
            || this.keyListener.isKeyDown(KeyListener.KEY_D))
            && true) {
            console.log('right');
            xvector += 1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
            || this.keyListener.isKeyDown(KeyListener.KEY_S))
            && true) {
            console.log('down');
            yvector += 1;
        }
        if (xvector !== 0 && yvector !== 0) {
            xvector /= Math.sqrt(2);
            yvector /= Math.sqrt(2);
        }
        const newxcoord = this.xcoord + xvector * tdt * 250;
        const newycoord = this.ycoord + yvector * tdt * 250;
        if (this.playerCollisionCheck(newxcoord, newycoord)) {
            this.xcoord = newxcoord;
            this.ycoord = newycoord;
        }
    }
    playerCollisionCheck(xcoord, ycoord) {
        let isOnFreeSpot = true;
        for (let i = xcoord; i < xcoord + this.collisionW; i++) {
            for (let j = ycoord; j < ycoord + this.collisionH; j++) {
                if (this.map.gameMap[Math.floor(j / this.map.tileH)][Math.floor(i / this.map.tileW)] === 1) {
                    isOnFreeSpot = false;
                }
            }
        }
        return isOnFreeSpot;
    }
}
//# sourceMappingURL=Player.js.map