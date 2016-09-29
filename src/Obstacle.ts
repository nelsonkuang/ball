/**
 *
 * @author 
 *
 */
class Obstacle extends egret.DisplayObjectContainer {
    public shape: egret.Shape = new egret.Shape();    
    constructor(x: number = 0,y: number = 0,width:number = 150,height:number = 10) {
        super();
        var This = this;
        This.addEventListener(egret.Event.ADDED_TO_STAGE,function() {
            // ball
            This.addChild(This.shape);
            This.shape.graphics.beginFill(0x0000ff,1);
            This.shape.graphics.drawRect(0,0,width,height);
            This.shape.graphics.endFill(); 
            This.shape.anchorOffsetX = This.shape.width / 2;
            This.shape.anchorOffsetY = -1 * This.shape.height / 2;            
            This.shape.x = x;
            This.shape.y = y;
        },This);      	
	}
	public onHited():void{
    	  var This = this,
    	      step = -0.2,
    	      done = false;      
        This.addEventListener(egret.Event.ENTER_FRAME,transformScale,This);
        function transformScale(){
            This.shape.scaleY += step;
            if(This.shape.scaleY <= 0.5) {
                step *= -1;
            } else if(This.shape.scaleY > 1) {
                This.shape.scaleY = 1;
                This.removeEventListener(egret.Event.ENTER_FRAME,transformScale,This);
            }           
        }
	}
}
