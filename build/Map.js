export default class Map {
    static ballCount = 2;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth - 1;
        this.canvas.height = window.innerHeight - 4;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//# sourceMappingURL=Map.js.map