var Food = (function (_super) {
    __extends(Food, _super);
    /**
     * @param x 横坐标
     * @param y 纵坐标
     *  */
    function Food(x, y) {
        _super.call(this);
        this.init(x, y);
    }
    var d = __define,c=Food,p=c.prototype;
    p.init = function (x, y) {
        var foodSize = GameConfig.foodSizeList[Math.floor(Math.random() * (GameConfig.foodSizeList.length - 0.1))];
        this.color = parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
        this.food = new egret.Shape();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0, 0, foodSize);
        this.food.graphics.endFill();
        this.food.x = foodSize;
        this.food.y = foodSize;
        this.x = x;
        this.y = y;
        this.addChild(this.food);
        this.setChildIndex(this.food, -1);
    };
    return Food;
}(egret.Sprite));
egret.registerClass(Food,'Food');
