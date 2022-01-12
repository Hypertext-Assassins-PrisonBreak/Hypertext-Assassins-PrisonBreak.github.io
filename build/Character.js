export default class Character {
    xcoord;
    ycoord;
    constructor(xcoord, ycoord) {
        this.xcoord = xcoord;
        this.ycoord = ycoord;
    }
    renderCharacter(canvasContext) {
        canvasContext.fillRect(this.xcoord, this.ycoord, 20, 20);
    }
}
//# sourceMappingURL=Character.js.map