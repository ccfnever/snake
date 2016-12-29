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
    GameConfig.snakeSize = 15; //蛇的尺寸
    GameConfig.snakeColor = 0x33ffcc; //蛇的颜色
    GameConfig.snakeInsideColor = 0x74dec4; //蛇的身体内部
    GameConfig.snakeSpeed = 15; //蛇运动速度
    GameConfig.foodSize = 10;
    GameConfig.stX = 60;
    GameConfig.stColor = 0x000000;
    return GameConfig;
}());
egret.registerClass(GameConfig,'GameConfig');