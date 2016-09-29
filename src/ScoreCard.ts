/**
 *
 * @author 
 *
 */
class ScoreCard extends egret.DisplayObjectContainer  {
    public timeLabel: egret.TextField;
    public scoreLabel: egret.TextField;
    public resultLabel: egret.TextField;
    public score:number = 0;
	constructor() {
        super();
        var This = this;
        This.addEventListener(egret.Event.ADDED_TO_STAGE,() => {
            // timeLabel
            This.timeLabel = new egret.TextField;
            This.timeLabel.textColor = 0x000000;
            This.timeLabel.size = 24;
            This.timeLabel.lineSpacing = 10;
            This.timeLabel.text = '游戏剩余时间：60';
            This.timeLabel.x = 30;
            This.timeLabel.y = 30;
            This.addChild(This.timeLabel);
            // scoreLabel
            This.scoreLabel = new egret.TextField;
            This.scoreLabel.textColor = 0xFFFFFF;
            This.scoreLabel.size = 24;
            This.scoreLabel.lineSpacing = 10;
            This.scoreLabel.text = '当前得分：0';
            This.scoreLabel.x = 250;
            This.scoreLabel.y = 30;
            This.addChild(This.scoreLabel);
            
            // resultLabel
            This.resultLabel = new egret.TextField;
            This.resultLabel.textColor = 0xff9800;
            This.resultLabel.size = 24;
            This.resultLabel.lineSpacing = 10;
            This.resultLabel.x = This.stage.stageWidth / 2;
            This.resultLabel.y = This.stage.stageHeight / 2;
            This.resultLabel.text = '';
            This.addChild(This.resultLabel); 
            
        },This);      	
	}
	public countDown(time:number,callback:Function):void{
	    var startTime = time,
	        timer,
	        This = this;
	    updateT(startTime);
        function updateT(startTime){
            startTime --;
            if(startTime>=0){
                timer = setTimeout(() => {
                    This.timeLabel.text = '游戏剩余时间：' + startTime;
                    updateT(startTime);
                },1000);
            }else{
                clearTimeout(timer);
                callback();
            }
	    }
	}
	
	public add(val:number):void{
	    this.score += val;
        this.scoreLabel.text = '当前得分：' + this.score;
        this.resultLabel.text = '+1';
        this.resultLabel.anchorOffsetX = this.resultLabel.width / 2;
        this.resultLabel.anchorOffsetY = this.resultLabel.height / 2;
        this.resultLabel.scaleX = 4;
        this.resultLabel.scaleY = 4;
        setTimeout(()=>{
            this.resultLabel.text ='';
            this.resultLabel.scaleX = 1;
            this.resultLabel.scaleY = 1;            
        },1000);
	}
	
	public showResult(onClick:Function):void{
        this.resultLabel.text = '游戏结束，你得到了：' + this.score +'分!! 重新游戏 >>';
        this.resultLabel.anchorOffsetX = this.resultLabel.width / 2;
        this.resultLabel.anchorOffsetY = this.resultLabel.height / 2;
        var This = this;
        This.stage.once(egret.TouchEvent.TOUCH_TAP,()=>{
            This.resultLabel.text = '';
            onClick();
        },This);
	}
}
