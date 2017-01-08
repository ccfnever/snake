/**
 * 游戏 限时 分数等数据及相关面板
 * 
 * */
class GameData {
	public static score:number = 0;
    public static scoreText:egret.TextField;
    public static TimeText:egret.TextField;
    
    public static scorePanel:egret.Sprite;// 得分面板
    public static TimePanel:egret.Sprite; // 倒计时面板

	public static limited:boolean = false;
	public static limitedTime:number = 5;

    public static timer:any = null;

    public static gameOverPanel:eui.Rect;// GAME OVER 面板
    public static gameOver:boolean = false;

    public static gameOverScore:eui.Label;
    public static gameOverScoreText:number;


    public static initData(stageW:number,stageH:number){
        //创建得分面板
        this.scorePanel = new egret.Sprite();
        let scoreBg = new egret.Bitmap();
        
        scoreBg.texture = RES.getRes('score_png');
        scoreBg.width = scoreBg.width *1.5;
        scoreBg.height = scoreBg.height *1.5;
        this.scorePanel.width = scoreBg.width;
        this.scorePanel.height = scoreBg.height;
        this.scorePanel.x = stageW - this.scorePanel.width - 20;
        this.scorePanel.y = 20;
        this.scorePanel.addChild(scoreBg);
        
        this.scoreText = new egret.TextField();
        this.scoreText.text = this.score + '';
        this.scoreText.textColor = 0xffffff;
        this.scoreText.x = this.scorePanel.width / 2.3;
        this.scoreText.y = this.scorePanel.height / 3;
        this.scoreText.size = this.scorePanel.height / 3 + 2; 
        this.scorePanel.addChild(this.scoreText);

        //创建倒计时面板
        this.TimePanel = new egret.Sprite();
        let TimeBg = new egret.Bitmap();
        TimeBg.texture = RES.getRes('time_png');
        TimeBg.width = TimeBg.width *1.5;
        TimeBg.height = TimeBg.height *1.5;
        this.TimePanel.width = TimeBg.width;
        this.TimePanel.height = TimeBg.height;
        this.TimePanel.x = this.scorePanel.x - this.TimePanel.width - 20;
        this.TimePanel.y = 20;
        this.TimePanel.addChild(TimeBg);

        this.TimeText = new egret.TextField();
        this.TimeText.text = this.limitedTime + '';
        this.TimeText.textColor = 0xffffff;
        this.TimeText.x = this.TimePanel.width / 2.3;
        this.TimeText.y = this.TimePanel.height / 3;
        this.TimeText.size = this.TimePanel.height / 3 + 2; 
        this.TimePanel.addChild(this.TimeText);
        // this.addChild(this.scorePanel)

        //游戏结束面板
        this.gameOverPanel = new eui.Rect();
        this.gameOverPanel.width = stageW * .6;
        this.gameOverPanel.height = stageH * .6;
        this.gameOverPanel.x = stageW/2 - this.gameOverPanel.width/2;
        this.gameOverPanel.y = stageH/2 - this.gameOverPanel.height/2;
        this.gameOverPanel.fillColor = 0xf3d14b;
        this.gameOverPanel.ellipseWidth = 50;
        this.gameOverPanel.ellipseHeight = 50;
        this.gameOverPanel.strokeColor = 0xffffff;
        this.gameOverPanel.strokeWeight = 10;

        let label:eui.Label = new eui.Label();
            label.text = "GAME OVER";
            label.textColor = 0xffffff;
            label.size = 120;
            label.lineSpacing = 20;
            label.x = this.gameOverPanel.width/2 - label.width/2;
            label.y = this.gameOverPanel.width/8;

        this.gameOverScore = new eui.Label();
        this.gameOverScore.text = "得分:" + this.score;
        this.gameOverScore.textColor = 0xffffff;
        this.gameOverScore.size = 120;
        this.gameOverScore.lineSpacing = 20;
        this.gameOverScore.x = this.gameOverPanel.width/2 - label.width/2;
        this.gameOverScore.y = this.gameOverPanel.width/4;

        this.gameOverPanel.addChild(label);
        this.gameOverPanel.addChild(this.gameOverScore);
          
        
    }
    public static timeStart(callBack,scope){
        this.timer = setInterval(()=>{
            this.limitedTime --;
            this.TimeText.text = this.limitedTime + '';
            if(this.limitedTime == 0){
                clearInterval(this.timer);
                this.timer = null;
                callBack.call(scope);
            } 
        },1000)
    }


}