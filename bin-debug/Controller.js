var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller(r, c) {
        _super.call(this);
        this.init(r, c);
    }
    var d = __define,c=Controller,p=c.prototype;
    p.init = function (r, c) {
        this.steeringWheel = new egret.Sprite();
        this.steeringWheel.graphics.beginFill(c, 0.2);
        this.steeringWheel.graphics.drawCircle(0, 0, r);
        this.steeringWheel.graphics.endFill();
        this.steeringWheel.x = r;
        this.steeringWheel.y = r;
        // this.x = 30;
        // this.y = this.stage.stageHeight - (r * 3 + 30);
        this.insideSt = new egret.Shape();
        this.insideSt.graphics.beginFill(c, 0.2);
        this.insideSt.graphics.drawCircle(0, 0, r / 2);
        this.insideSt.graphics.endFill();
        this.steeringWheel.addChild(this.insideSt);
        this.addChild(this.steeringWheel);
    };
    p.controllerMove = function (e) {
    };
    return Controller;
}(egret.Sprite));
egret.registerClass(Controller,'Controller');
