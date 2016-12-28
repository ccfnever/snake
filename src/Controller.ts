class Controller extends egret.Sprite{
	public constructor(r,c) {
		super()
		this.init(r,c);
	}

	
	
	public steeringWheel:egret.Sprite;//方向盘
	public insideSt:egret.Shape; //里边的圈
	private radius:number;	//半径

	private init(r:number,c:number):void{
		
		this.steeringWheel = new egret.Sprite();
		this.steeringWheel.graphics.beginFill(c,0.2);
		this.steeringWheel.graphics.drawCircle(0,0,r);
		this.steeringWheel.graphics.endFill();
		this.steeringWheel.x = r;
		this.steeringWheel.y = r;
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
		
	}

}