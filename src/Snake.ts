class Snake extends egret.Sprite{
	public constructor(x: number, y: number) {
        super();
        this.init(x, y);
    }
    //蛇头
    public head:egret.Sprite;
    public radius:number;
    private color:number;
    private insideColor:number;
    private bodyList:egret.Shape[] = [];

    private init(x:number,y:number){

        //获取GameConfig配置
        this.radius = GameConfig.snakeSize;
        this.color = GameConfig.snakeColor;
        this.insideColor = GameConfig.snakeInsideColor;

        //蛇头容器
        this.head = new egret.Sprite();
        this.head.graphics.beginFill(this.color);
        this.head.graphics.drawCircle(this.radius,this.radius,this.radius);              
        this.head.graphics.endFill();


        let eyeLeft:egret.Sprite = new egret.Sprite();  //左眼
        let eyeRight:egret.Sprite = new egret.Sprite(); //右眼
        let eyeBlcak:egret.Sprite = new egret.Sprite();
        let eyeBlcak2:egret.Sprite = new egret.Sprite();
        let eyeWhite:egret.Shape = new egret.Shape();
        let eyeWhite2:egret.Shape = new egret.Shape();

        eyeLeft.graphics.beginFill(0xffffff);
        eyeLeft.graphics.drawCircle(this.radius/2.5,this.radius/1.2,this.radius/2);
        eyeLeft.graphics.endFill();
        eyeLeft.x = 0;
        eyeLeft.y = 0;

        eyeRight.graphics.beginFill(0xffffff);
        eyeRight.graphics.drawCircle(this.radius*1.6,this.radius/1.2,this.radius/2);
        eyeRight.graphics.endFill();
    
        eyeRight.y = 0;
        
        eyeBlcak.graphics.beginFill(0x000000);
        eyeBlcak.graphics.drawCircle(this.radius/2.5,this.radius/1.2,this.radius/3.5)
        eyeBlcak.graphics.endFill();

        eyeBlcak2.graphics.beginFill(0x000000);
        eyeBlcak2.graphics.drawCircle(this.radius*1.6,this.radius/1.2,this.radius/3.5)
        eyeBlcak2.graphics.endFill();

        eyeWhite.graphics.beginFill(0xffffff);
        eyeWhite.graphics.drawCircle(this.radius/3,this.radius/1.5,this.radius/7)
        eyeWhite.graphics.endFill();

        eyeWhite2.graphics.beginFill(0xffffff);
        eyeWhite2.graphics.drawCircle(this.radius*1.6,this.radius/1.5,this.radius/7)
        eyeWhite2.graphics.endFill();


        eyeBlcak.addChild(eyeWhite)
        eyeBlcak2.addChild(eyeWhite2)

        eyeLeft.addChild(eyeBlcak)
        eyeRight.addChild(eyeBlcak2)

        

        this.head.addChild(eyeLeft)
        this.head.addChild(eyeRight)
        


        this.head.x = this.head.width/2;
        this.head.y = this.head.height/2;
        this.head.anchorOffsetX = this.head.width/2;
        this.head.anchorOffsetY = this.head.height/2;
        // this.head.rotation = 300
        this.x = x;
        this.y = y;

        this.bodyList.push(this.head);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        this.setChildIndex(this.bodyList[this.bodyList.length -1 ],-999);

        //初始带5个节点
        for(let i = 0; i<5;i++){
            this.afterEat()
        }
        
    }

    public afterEat(){

        let node:egret.Shape = new egret.Shape();
        node.graphics.beginFill(this.color);
        node.graphics.drawCircle(0,0,this.radius);
        node.graphics.beginFill(this.insideColor);
        node.graphics.drawCircle(0,0,this.radius/2);
        node.graphics.endFill();

        //指定新增节点的位置在蛇身节点list的最后一个节点，也就是蛇尾的一个坐标偏移（这里可以随便指定合理的位置即可）
        node.x = this.bodyList[this.bodyList.length - 1].x - 1;
        node.y = this.bodyList[this.bodyList.length - 1].y - 1;

        //将新增节点添加入蛇身和蛇身节点list
        this.bodyList.push(node);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        //指定新增节点的显示索引，我们将它放在所有节点的最下面。
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], 0);
    }

    public move(e:egret.TouchEvent,during:number,angle:number){
        let mx = e?e.stageX:0;
        let my = e?e.stageY:0;
        let hx = this.x + this.bodyList[0].x;
        let hy = this.y + this.bodyList[0].y;
        let tween:egret.Tween;

        let relativeX = mx - hx;
        let relativeY = hy - my;
       
        // if (angle){
        //     var angle = Math.atan2(relativeX,relativeY);
        // }
        
        // console.log(angle)
        
        // angle = 180 * angle / Math.PI;
        
        for (let i = this.bodyList.length - 1; i > 0; i--) {
            tween = egret.Tween.get(this.bodyList[i]);
            tween.to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, during);
        }

         //设置蛇头朝向         
        this.head.rotation = 180 -angle;
         
        
        //设置当前缓动对象为蛇头
        tween = egret.Tween.get(this.bodyList[0]);
        let tmpx, tmpy;
        if (hx == mx && hy == my) {
            //位置相同
            return;
        }
     
        tmpx = this.bodyList[0].x + Math.sin( angle * Math.PI/180 ) * GameConfig.snakeSpeed;
        tmpy = this.bodyList[0].y + Math.cos( angle * Math.PI/180 ) * GameConfig.snakeSpeed;
        // console.log(tmpx,tmpy)
        tween.to({ x: tmpx, y: tmpy }, during);

    
    }

    public getHead() {
        return this.bodyList[0];
    }

    //撞墙检测
    public getTheWall(x:number,y:number):boolean{

        if(Math.abs(x) >= this.x - this.radius || Math.abs(y) >= this.y - this.radius){
            return true;
        }else{
            return false;
        }
        
    }
}