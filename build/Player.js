import Character from './Character.js';
import KeyListener from './KeyListener.js';
export default class Player extends Character {
    keyListener;
    constructor(xcoord, ycoord, keyListener) {
        super(xcoord, ycoord);
        this.keyListener = keyListener;
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
        this.xcoord += xvector * tdt * 250;
        this.ycoord += yvector * tdt * 250;
    }
}
//# sourceMappingURL=Player.js.map