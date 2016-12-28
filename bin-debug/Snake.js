var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y, r, color) {
        _super.call(this);
        this.bodyList = [];
        this.speed = 15;
        this.init(x, y, r, color);
    }
    var d = __define,c=Snake,p=c.prototype;
    p.init = function (x, y, r, color) {
        //蛇头容器
        this.head = new egret.Sprite();
        this.head.graphics.beginFill(color);
        this.head.graphics.drawCircle(r, r, r);
        this.head.graphics.endFill();
        var eyeLeft = new egret.Sprite(); //左眼
        var eyeRight = new egret.Sprite(); //右眼
        var eyeBlcak = new egret.Sprite();
        var eyeBlcak2 = new egret.Sprite();
        var eyeWhite = new egret.Shape();
        var eyeWhite2 = new egret.Shape();
        eyeLeft.graphics.beginFill(0xffffff);
        eyeLeft.graphics.drawCircle(r / 2.5, r / 1.2, r / 2);
        eyeLeft.graphics.endFill();
        eyeLeft.x = 0;
        eyeLeft.y = 0;
        eyeRight.graphics.beginFill(0xffffff);
        eyeRight.graphics.drawCircle(r * 1.6, r / 1.2, r / 2);
        eyeRight.graphics.endFill();
        eyeRight.y = 0;
        eyeBlcak.graphics.beginFill(0x000000);
        eyeBlcak.graphics.drawCircle(r / 2.5, r / 1.2, r / 3.5);
        eyeBlcak.graphics.endFill();
        eyeBlcak2.graphics.beginFill(0x000000);
        eyeBlcak2.graphics.drawCircle(r * 1.6, r / 1.2, r / 3.5);
        eyeBlcak2.graphics.endFill();
        eyeWhite.graphics.beginFill(0xffffff);
        eyeWhite.graphics.drawCircle(r / 3, r / 1.5, r / 7);
        eyeWhite.graphics.endFill();
        eyeWhite2.graphics.beginFill(0xffffff);
        eyeWhite2.graphics.drawCircle(r * 1.6, r / 1.5, r / 7);
        eyeWhite2.graphics.endFill();
        eyeBlcak.addChild(eyeWhite);
        eyeBlcak2.addChild(eyeWhite2);
        eyeLeft.addChild(eyeBlcak);
        eyeRight.addChild(eyeBlcak2);
        this.head.addChild(eyeLeft);
        this.head.addChild(eyeRight);
        this.head.x = this.head.width / 2;
        this.head.y = this.head.height / 2;
        this.head.anchorOffsetX = this.head.width / 2;
        this.head.anchorOffsetY = this.head.height / 2;
        this.radius = r;
        // this.head.rotation = 300
        this.x = x;
        this.y = y;
        this.bodyList.push(this.head);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], -999);
    };
    p.afterEat = function (color) {
        var node = new egret.Shape();
        node.graphics.beginFill(color);
        node.graphics.drawCircle(0, 0, this.radius);
        node.graphics.endFill();
        // node.anchorOffsetX = node.width/2;
        // node.anchorOffsetY = node.height/2;
        //指定新增节点的位置在蛇身节点list的最后一个节点，也就是蛇尾的一个坐标偏移（这里可以随便指定合理的位置即可）
        node.x = this.bodyList[this.bodyList.length - 1].x - 1;
        node.y = this.bodyList[this.bodyList.length - 1].y - 1;
        //将新增节点添加入蛇身和蛇身节点list
        this.bodyList.push(node);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        //指定新增节点的显示索引，我们将它放在所有节点的最下面。
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], 0);
    };
    p.move = function (e, during) {
        var mx = e.stageX;
        var my = e.stageY;
        var hx = this.x + this.bodyList[0].x;
        var hy = this.y + this.bodyList[0].y;
        var tween;
        var relativeX = mx - hx;
        var relativeY = hy - my;
        var R = Math.atan2(relativeX, relativeY);
        R = 180 * R / Math.PI;
        for (var i = this.bodyList.length - 1; i > 0; i--) {
            tween = egret.Tween.get(this.bodyList[i]);
            tween.to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, during);
        }
        //设置蛇头朝向
        this.head.rotation = R;
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
        //撞墙啦
        if (this.getTheWall(this.head.x, this.head.y)) {
            alert('撞墙啦');
            window.location.reload();
        }
    };
    p.getHead = function () {
        return this.bodyList[0];
    };
    //撞墙检测
    p.getTheWall = function (x, y) {
        if (Math.abs(x) >= this.x - this.radius || Math.abs(y) >= this.y - this.radius) {
            return true;
        }
        else {
            return false;
        }
    };
    return Snake;
}(egret.Sprite));
egret.registerClass(Snake,'Snake');
