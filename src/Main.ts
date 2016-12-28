//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    private food:Food;
    private snake:Snake;
    private steeringWheel:Controller;
    private stageW:number;
    private stageH:number;
    private radius:number = 15;


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        let bg = new egret.Shape();
        let lineSpace = 25;
        let xLineLength = this.stageW / lineSpace;
        let yLineLength = this.stageH / lineSpace;
        bg.graphics.beginFill(0xf2f2f2);
        bg.graphics.lineStyle(1,0xe3e3e3);

        for( let i = 0; i < xLineLength;i++){
            bg.graphics.moveTo(0,lineSpace * i);
            bg.graphics.lineTo(this.stageW,lineSpace * i)
        }
        for( let j = 0; j < xLineLength;j++){
            bg.graphics.moveTo(lineSpace * j,0);
            bg.graphics.lineTo(lineSpace * j,this.stageH)
        }
        // bg.graphics.moveTo(0,0);
        // bg.graphics.lineTo(this.stageW,this.stageH)

        bg.graphics.drawRect(0,0,this.stageW,this.stageH);

        bg.graphics.endFill();
        this.addChild(bg);
        
        //创建食物
        this.createFood();

        //创建蛇
        this.snake = new Snake(this.stageW * 0.5, this.stageH * 0.5, this.radius,0x33ffcc);
        this.addChild(this.snake);

        //创建方向控制器
        this.steeringWheel = new Controller(100,0x000000);
        this.addChild(this.steeringWheel);
        this.steeringWheel.x = 60;
		this.steeringWheel.y = this.stage.stageHeight - (100 * 3);

   

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.move,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.moveEnd,this);
    }

    
    private color = 0x4c8dae;

    private onEat (){
        this.removeChild(this.food);
        this.snake.afterEat(this.food.color);
        this.createFood();
    }

    private createFood():void{
        //随机坐标
        let tmpx = Math.random() * (this.stageW - this.radius * 2);
        let tmpy = Math.random() * (this.stageH - this.radius * 2);

        this.food = new Food(tmpx,tmpy,this.radius);
        this.addChild(this.food);

        

    }


    private timer:egret.Timer;
    private during:number = 40;
    private moveEvent:egret.TouchEvent;
    private head:egret.Shape;

    private move(e:egret.TouchEvent){
        this.snake.move(e, this.during);
    }

    private onMove(e: egret.TouchEvent) {
        this.moveEvent = e;
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }
    }
    private moveEnd(e: egret.TouchEvent) {
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
        }
    }
    private onTimer(e: egret.TimerEvent) {
        this.head = this.snake.getHead();
        if (this.hit(this.head, this.food))
            this.onEat();
        this.snake.move(this.moveEvent, this.during);
    }

    private hit(a, b) {
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
            .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    }
}


