import Shape from "./Shape";

export default class Star extends Shape {

    constructor(center, spikeCount, innerRadius, outerRadius) {
        super(center);
        this._spikeCount = spikeCount;
        this._innerRadius = innerRadius;
        this._outerRadius = outerRadius;
    }



    /**
     * draw()
     * @description draws the star
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    draw(context) {
        super.draw(context);
        var rotation = Math.PI / 2 * 3;
        var x = this._position.x;
        var y = this._position.y;
        var step = Math.PI / this._spikeCount;

        context.beginPath();
        context.moveTo(this._position.x, this._position.y - this._outerRadius)
        for (let i = 0; i < this._spikeCount; i++) {
            x = this._position.x + Math.cos(rotation) * this._outerRadius;
            y = this._position.y + Math.sin(rotation) * this._outerRadius;
            context.lineTo(x, y)
            rotation += step

            x = this._position.x + Math.cos(rotation) * this._innerRadius;
            y = this._position.y + Math.sin(rotation) * this._innerRadius;
            context.lineTo(x, y)
            rotation += step
        }
        context.lineTo(this._position.x, this._position.y - this._outerRadius);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = 'blue';
        context.stroke();
        context.fillStyle = 'skyblue';
        context.fill();
    }



    /**
     * get outerRadius()
     * @description gets the outer radius
     * @return {Number} outerRadius
     */
    get outerRadius() {
        return this._outerRadius;
    }

    /**
     * get innerRadius()
     * @description gets the outer radius
     * @return {Number} innerRadius
     */
    get innerRadius() {
        return this._innerRadius;
    }

}