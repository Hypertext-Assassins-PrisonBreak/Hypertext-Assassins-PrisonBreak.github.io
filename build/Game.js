import Map from './Map.js';
export default class Game {
    map;
    constructor(canvas) {
        this.map = new Map(canvas);
    }
    launchGame() {
        this.map.renderMap();
    }
    renderFrame() {
    }
}
//# sourceMappingURL=Game.js.map