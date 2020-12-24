var Rain = /** @class */ (function () {
    function Rain(width, height) {
        this.width = width;
        this.height = height;
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        if (!canvas.getContext) {
            throw new Error("canvas unsupported");
        }
        this.context = canvas.getContext("2d");
        this.setBg();
    }
    Rain.prototype.setBg = function (color) {
        if (color === void 0) { color = "black"; }
        var ctx = this.context;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.width, this.height);
    };
    Rain.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Rain;
}());
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
new Rain(screenWidth, screenHeight);
