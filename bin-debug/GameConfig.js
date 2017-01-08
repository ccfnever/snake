/**
 *
 * 游戏视图参数配置
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    var d = __define,c=GameConfig,p=c.prototype;
    GameConfig.initData = function () {
    };
    GameConfig.snakeSize = 25; //蛇的尺寸
    GameConfig.snakeColor = 0x33ffcc; //蛇的颜色
    GameConfig.snakeInsideColor = 0x74dec4; //蛇的身体内部
    GameConfig.snakeSpeed = 20; //蛇运动速度
    GameConfig.foodSizeList = [3, 3, 3, 5, 10]; //食物大小
    GameConfig.foodNmu = 130; //食物数量
    GameConfig.stX = 60; //方向盘
    GameConfig.stColor = 0x000000;
    GameConfig.stSize = 150;
    GameConfig.fullSize = 10; //控制吃多少分数身体长大
    GameConfig.onceEated = 0;
    return GameConfig;
}());
egret.registerClass(GameConfig,'GameConfig');
