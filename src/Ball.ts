/**
 *
 * @author 
 *
 */
class Ball extends egret.DisplayObjectContainer {
    public shape: egret.Bitmap = new egret.Bitmap();
    private animationID: number = 0;   
    public speedX: number = 1;
    public AccY: number = 0.06;
    public speedY: number = 0;
    public rotateSpeed: number = 5;
    public tx: number = 0;
    public ty: number = 0;
 
    constructor(x: number = 0,y: number = 0,speedX: number = 0,speedY: number = 0) {
        super();  
        this.tx = x;//10;
        this.ty = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.startLoad();       
	}

    private startLoad(): void {
        //创建 ImageLoader 对象
        var loader: egret.ImageLoader = new egret.ImageLoader();
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        var url: string = "resource/assets/q.png";
        //开始加载
        loader.load(url);
    }	
	
    private onLoadComplete(event: egret.Event): void {
        var loader: egret.ImageLoader = <egret.ImageLoader>event.target;
        //获取加载到的纹理对象
        var bitmapData: egret.BitmapData = loader.data;
        //创建 Bitmap 进行显示
        var shape = this.shape;
        shape.bitmapData = bitmapData;
        shape.width = 50;
        shape.height = 50;
        shape.anchorOffsetX = shape.width / 2;
        shape.anchorOffsetY = shape.height / 2;
        shape.x = this.tx;//10;
        shape.y = this.tx;//This.stage.stageHeight / 2 - 10;    
        //shape.alpha = 0.8;
        shape.rotation = 0;
        this.addChild(shape);
        this.move();
    }
	
    public move():void{
	    var This = this;
	    function _move():void{
	        This.shape.x += This.speedX;
            This.speedY += This.AccY;
            This.shape.y += This.speedY;
            This.shape.rotation += This.rotateSpeed;
            This.animationID = requestAnimationFrame(_move);
	    }
        _move();
	}
	public stop():void{
        cancelAnimationFrame(this.animationID);
	}
	public setX(x: number):void{
        this.shape.x = x;
	}
    public setY(y: number): void {
        this.shape.y = y;
    }	
}
