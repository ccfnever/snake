/**
 * 
 * 游戏视图参数配置
 */
class GameConfig {
	
	public static snakeSize:number = 25; 				//蛇的尺寸
	public static snakeColor:number = 0x33ffcc;			//蛇的颜色
	public static snakeInsideColor:number = 0x74dec4;	//蛇的身体内部

	public static snakeSpeed:number = 20;				//蛇运动速度

	public static foodSizeList:number[] = [3,3,3,5,10];		//食物大小
	public static foodNmu:number = 130; 	//食物数量

	public static stX:number = 60;		//方向盘
	public static stY:number;
	public static stColor:number = 0x000000; 
	public static stSize:number = 150; 


	public static fullSize:number = 10; //控制吃多少分数身体长大
	public static onceEated:number = 0;
	public static initData(){
		
	}
}