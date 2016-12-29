class Controller extends egret.Sprite{
	public constructor(r,c) {
		super()
		this.init(r,c);
	}

	
	
	public steeringWheel:egret.Sprite;//方向盘
	public insideSt:egret.Shape; //里边的圈
	public angle:number; //方向盘角度
	private radius:number;	//半径


	private init(r:number,c:number):void{
		
		this.steeringWheel = new egret.Sprite();
		this.steeringWheel.graphics.beginFill(c,0.2);
		this.steeringWheel.graphics.drawCircle(0,0,r);
		this.steeringWheel.graphics.endFill();
		this.steeringWheel.x = r;
		this.steeringWheel.y = r;
		this.radius = r;
		this.angle = 0;
		// this.x = 30;
		// this.y = this.stage.stageHeight - (r * 3 + 30);

		this.insideSt = new egret.Shape();
		this.insideSt.graphics.beginFill(c,0.2);
		this.insideSt.graphics.drawCircle(0,0,r/2);
		
		this.insideSt.graphics.endFill();
		this.steeringWheel.addChild(this.insideSt);

		this.addChild(this.steeringWheel);

	}

	public controllerMove(e:egret.TouchEvent){
		// let tween:egret.Tween;
		// egret.Tween.get(this.insideSt).to({x:e.stageX,y:e.stageY},300);
		

		//方向盘中心点 
		let sX = 60 + this.radius;
		let sY = 836 + this.radius;
		
		let relativeX = e.stageX - sX;
		let relativeY = e.stageY - sY;

		let newX:number,	
			newY:number,
			distance:number;	//摇杆跟方向盘中心点的距离

		distance = Math.sqrt( relativeX * relativeX + relativeY * relativeY);
		console.log(distance)

		this.angle = Math.atan2(relativeX,relativeY);
		this.angle = 180 * this.angle / Math.PI;

		distance = distance < this.radius/2 ? distance : this.radius/2;

		newX = Math.sin( this.angle * Math.PI/180 ) * distance;
		newY = Math.cos( this.angle * Math.PI/180 ) * distance;


		egret.Tween.get(this.insideSt).to({x:newX,y:newY},60);
		// console.log(this.angle)
		// console.log(newX,newY)

	}

	public reset(){
		egret.Tween.get(this.insideSt).to({x:0,y:0},100);
	}

}