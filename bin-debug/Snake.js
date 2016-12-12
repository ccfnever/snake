var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y, r, color) {
        _super.call(this);
        this.bodyList = [];
        this.speed = 20;
        this.init(x, y, r, color);
    }
    var d = __define,c=Snake,p=c.prototype;
    p.init = function (x, y, r, color) {
        this.head = new egret.Shape();
        this.head.graphics.beginFill(color);
        this.head.graphics.drawCircle(r, r, r);
        this.head.graphics.endFill();
        this.head.x = 0;
        this.head.y = 0;
        this.radius = r;
        this.x = x;
        this.y = y;
        this.bodyList.push(this.head);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], -999);
    };
    p.afterEat = function (color) {
        var node = new egret.Shape();
        node.graphics.beginFill(color);
        node.graphics.drawCircle(this.radius, this.radius, this.radius);
        node.graphics.endFill();
        //指定新增节点的位置在蛇身节点list的最后一个节点，也就是蛇尾的一个坐标偏移（这里可以随便指定合理的位置即可）
        node.x = this.bodyList[this.bodyList.length - 1].x + this.radius * 0.6;
        node.y = this.bodyList[this.bodyList.length - 1].y + this.radius * 0.6;
        //将新增节点添加入蛇身和蛇身节点list
        this.bodyList.push(node);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        //指定新增节点的显示索引，我们将它放在所有节点的最下面。
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], 0);
    };
    p.move = function (e, during) {
        var mx = e.stageX;
        var my = e.stageY;
    };
    return Snake;
}(egret.Sprite));
egret.registerClass(Snake,'Snake');
