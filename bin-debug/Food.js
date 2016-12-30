var Food = (function (_super) {
    __extends(Food, _super);
    /**
     * @param x 横坐标
     * @param y 纵坐标
     * @param r 半径
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
    /**
     * 食物颜色
     */
    Food.colorList = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];
    return Food;
}(egret.Sprite));
egret.registerClass(Food,'Food');
