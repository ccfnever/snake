class Food extends egret.Sprite{

	/**
	 * @param x 横坐标
	 * @param y 纵坐标
	 *  */ 
	public constructor(x:number,y:number) {
		super();
		this.init(x,y)
	}

	private food:egret.Shape;

	public smallFoodList:egret.Shape[];	//小食物列表
	public color:number;

	private init(x:number,y:number):void{
		let foodSize = GameConfig.foodSizeList[Math.floor(Math.random()*(GameConfig.foodSizeList.length - 0.1))]
		this.color = parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
		this.food = new egret.Shape();
		this.food.graphics.beginFill(this.color);
		this.food.graphics.drawCircle(0,0,foodSize);
		this.food.graphics.endFill();

		this.food.x = foodSize;
		this.food.y = foodSize;

		this.x = x;
		this.y = y;
		this.addChild(this.food);
		this.setChildIndex(this.food,-1)

	}	
}