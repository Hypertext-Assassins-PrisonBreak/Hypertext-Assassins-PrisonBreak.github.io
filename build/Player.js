import Character from './Character.js';
import KeyListener from './KeyListener.js';
export default class Player extends Character {
    keyListener;
    xvector;
    yvector;
    constructor(xcoord, ycoord, keyListener, map) {
        super(xcoord, ycoord, map);
        this.keyListener = keyListener;
    }
    processPlayerMovement(tdt) {
        this.xvector = 0;
        this.yvector = 0;
        if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
            || this.keyListener.isKeyDown(KeyListener.KEY_A))
            && true) {
            console.log('left');
            this.xvector += -1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_UP)
            || this.keyListener.isKeyDown(KeyListener.KEY_W))
            && true) {
            console.log('up');
            this.yvector += -1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
            || this.keyListener.isKeyDown(KeyListener.KEY_D))
            && true) {
            console.log('right');
            this.xvector += 1;
        }
        if ((this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
            || this.keyListener.isKeyDown(KeyListener.KEY_S))
            && true) {
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
        for (let i = xcoord; i < xcoord + this.collisionW; i++) {
            for (let j = ycoord; j < ycoord + this.collisionH; j++) {
                if (this.map.gameMap[Math.floor(j / this.map.tileH)][Math.floor(i / this.map.tileW)]
                    === 1) {
                    isOnFreeSpot = false;
                }
            }
        }
        return isOnFreeSpot;
    }
    renderCharacter(canvasContext, flag) {
        this.characterClear(canvasContext);
        const walking = new Image();
        walking.src = '../Assets/spriteWalkDown1.png';
        if (this.xvector === -1) {
            walking.src = '../Assets/spriteWalkLeft1.png';
            if (flag) {
                walking.src = '../Assets/spriteWalkLeft2.png';
            }
        }
        else if (this.xvector === 1) {
            walking.src = '../Assets/spriteWalkRight1.png';
            if (flag) {
                walking.src = '../Assets/spriteWalkRight2.png';
            }
        }
        if (this.yvector === -1) {
            walking.src = '../Assets/spriteWalkUp1.png';
            if (flag) {
                walking.src = '../Assets/spriteWalkUp2.png';
            }
        }
        else if (this.yvector === 1) {
            walking.src = '../Assets/spriteWalkDown1.png';
            if (flag) {
                walking.src = '../Assets/spriteWalkDown2.png';
            }
        }
        canvasContext.drawImage(walking, this.xcoord, this.ycoord, this.collisionW, this.collisionH);
    }
}
//# sourceMappingURL=Player.js.map