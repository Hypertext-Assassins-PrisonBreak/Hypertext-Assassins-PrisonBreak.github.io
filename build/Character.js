export default class Character {
    xcoord;
    ycoord;
    collisionW = 40;
    collisionH = 40;
    constructor(xcoord, ycoord) {
        this.xcoord = xcoord;
        this.ycoord = ycoord;
    }
    renderCharacter(canvasContext) {
        canvasContext.fillRect(this.xcoord, this.ycoord, this.collisionW, this.collisionH);
    }
}
//# sourceMappingURL=Character.js.map