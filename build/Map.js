export default class Map {
    tileW = 50;
    tileH = 50;
    mapW = 24;
    mapH = 11;
    img;
    gameMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    canvasContext;
    constructor(canvas) {
        this.canvasContext = canvas.getContext('2d');
    }
    renderMap(canvasContext) {
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                this.renderMapTile(canvasContext, x, y);
            }
        }
        console.log('works');
    }
    renderMapTile(canvasContext, x, y) {
        const img1 = new Image();
        img1.src = 'https://opengameart.org/sites/default/files/styles/medium/public/textureStone_0.png';
        const img2 = new Image();
        img2.src = 'https://ecrespo210.files.wordpress.com/2013/01/grass.png';
        const pattern = canvasContext.createPattern(img1, 'repeat');
        const pattern2 = canvasContext.createPattern(img2, 'repeat');
        switch (this.gameMap[y][x]) {
            case 1:
                canvasContext.fillStyle = pattern;
                break;
            default:
                canvasContext.fillStyle = pattern2;
        }
        canvasContext.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
    }
}
//# sourceMappingURL=Map.js.map