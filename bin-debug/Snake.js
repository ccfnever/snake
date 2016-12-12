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
        var tween;
        for (var i = this.bodyList.length - 1; i > 0; i--) {
            var element = array[i];
            tween = egret.Tween.get(this.bodyList[i]);
            tween.to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, during);
        }
        var hx = this.x + this.bodyList[0].x;
        var hy = this.y + this.bodyList[0].y;
        //设置当前缓动对象为蛇头
        tween = egret.Tween.get(this.bodyList[0]);
        var tmpx, tmpy;
        if (hx == mx && hy == my) {
            //位置相同
            return;
        }
        if (hx != mx) {
            //非垂直
            //斜率
            var mk = (my - hy) / (mx - hx);
            //角度
            var mangle = Math.atan(mk);
            if (mx < hx) {
                //左边
                tmpx = this.bodyList[0].x - this.speed * Math.cos(mangle);
                tmpy = this.bodyList[0].y - this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy }, during);
            }
            else {
                //右边
                tmpx = this.bodyList[0].x + this.speed * Math.cos(mangle);
                tmpy = this.bodyList[0].y + this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy }, during);
            }
        }
        else {
            //垂直
            if (mx < hx) {
                //水平向左
                tmpx = this.bodyList[0].x - this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
            else {
                //水平向右
                tmpx = this.bodyList[0].x + this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
        }
    };
    p.getHead = function () {
        return this.bodyList[0];
    };
    return Snake;
}(egret.Sprite));
egret.registerClass(Snake,'Snake');
