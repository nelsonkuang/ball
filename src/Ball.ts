/**
 *
 * @author 
 *
 */
class Ball extends egret.DisplayObjectContainer {
    public shape: egret.Shape = new egret.Shape();
    private animationID: number = 0;   
    public speedX: number = 1;
    public AccY: number = 0.06;
    public speedY: number = 0;
 
	constructor(x:number = 0,y:number = 0) {
        super();
        var This = this;
        This.addEventListener(egret.Event.ADDED_TO_STAGE,function(){
            // ball
            This.addChild(This.shape);
            This.shape.graphics.beginFill(0xff0000,1);
            This.shape.graphics.drawCircle(0,0,10);
            This.shape.graphics.endFill();
            This.shape.anchorOffsetX = This.shape.width/2;
            This.shape.anchorOffsetY = -1*This.shape.height/2;
            This.shape.x = x;//10;
            This.shape.y = y;//This.stage.stageHeight / 2 - 10;
        },This);    	
	}
	
    public move():void{
	    var This = this;
	    function _move():void{
	        This.shape.x += This.speedX;
            This.speedY += This.AccY;
            This.shape.y += This.speedY;
            This.animationID = requestAnimationFrame(_move);
	    }
        _move();
	}
	public stop():void{
        cancelAnimationFrame(this.animationID);
	}
	public setX(x:number):void{
        this.shape.x = x;
	}
    public setY(y: number): void {
        this.shape.y = y;
    }	
}
