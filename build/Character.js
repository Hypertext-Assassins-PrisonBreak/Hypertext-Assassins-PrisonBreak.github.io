export default class Character {
    xcoord;
    ycoord;
    collisionW = 40;
    collisionH = 40;
    map;
    constructor(xcoord, ycoord, map) {
        this.xcoord = xcoord;
        this.ycoord = ycoord;
        this.map = map;
    }
    renderCharacter(canvasContext) {
        this.characterClear(canvasContext);
        canvasContext.fillStyle = '#ff0000';
        canvasContext.fillRect(this.xcoord, this.ycoord, this.collisionW, this.collisionH);
    }
    characterClear(canvasContext) {
        const clearingCornerTLx = this.xcoord - 10;
        const clearingCornerTLy = this.ycoord - 10;
        const clearingW = this.collisionW + 20;
        const clearingH = this.collisionH + 20;
        const clearingCornerBRx = this.xcoord + clearingW;
        const clearingCornerBRy = this.ycoord + clearingH;
        canvasContext.clearRect(clearingCornerTLx, clearingCornerTLy, clearingW, clearingH);
        for (let i = Math.floor(clearingCornerTLy / this.map.tileH); i <= Math.floor(clearingCornerBRy / this.map.tileH); i++) {
            for (let j = Math.floor(clearingCornerTLx / this.map.tileW); j <= Math.floor(clearingCornerBRx / this.map.tileW); j++) {
                this.map.renderMapTile(canvasContext, j, i);
            }
        }
    }
}
//# sourceMappingURL=Character.js.map