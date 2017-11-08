/**
 *
 * @author 
 *
 */
class HitTest {
    private ball:Ball;
    public tSkipTimes: number = 1;// 特殊处理，修复addchild图片出现的bug
    
    constructor(b: Ball, tSkipTimes: number = 1) {
        this.ball = b;
        this.tSkipTimes = tSkipTimes;
	}
    public watchHitOnTop(o:Obstacle,callback:Function):void{
        var This = this;
        var obstacle = o;            
        function _watchHitOnTop():void{
            var ballL = This.ball.shape.x - This.ball.shape.width / 2,
                ballR = This.ball.shape.x + This.ball.shape.width / 2,
                ballT = This.ball.shape.y - This.ball.shape.height / 2,
                ballB = This.ball.shape.y + This.ball.shape.height / 2,
                obstacleL = obstacle.shape.x - obstacle.shape.width / 2 - This.ball.shape.width / 2,
                obstacleR = obstacle.shape.x + obstacle.shape.width / 2 + This.ball.shape.width / 2,
                obstacleT = obstacle.shape.y - obstacle.shape.height / 2,
                obstacleB = obstacle.shape.y + obstacle.shape.height / 2;
            if(ballL >= obstacleL && ballR <= obstacleR && ballB >= obstacleT && ballB < obstacleB) {
                callback();
            }
            requestAnimationFrame(_watchHitOnTop);
        }
        _watchHitOnTop();
	}
	
    public watchHitOnLeftNRightEdge(edgeX:number,callback: Function):void{
        var This = this;  
        function _watchHitOnLREdge(): void {
            var ballL = This.ball.shape.x - This.ball.shape.width / 2,
                ballR = This.ball.shape.x + This.ball.shape.width / 2;
            if(ballR < 0 || ballL > edgeX) {
                callback();
            }
            requestAnimationFrame(_watchHitOnLREdge);
        }
        _watchHitOnLREdge();            
    }
    public watchHitOnTopNBottomEdge(edgeY: number,onTop: Function,onBottom: Function): void {
        var This = this;
        function _watchHitOnTBEdge(): void {
            var ballT = This.ball.shape.y - This.ball.shape.height / 2,
                ballB = This.ball.shape.y + This.ball.shape.height / 2;
            if(ballT < -1 * This.ball.shape.height) {
                if(This.ball.shape.height != 0){ // 特殊处理，修复addchild图片出现的bug
                    onTop();              
                }
            } else if(ballB > edgeY + This.ball.shape.height){
                onBottom();
            }
            requestAnimationFrame(_watchHitOnTBEdge);
        }
        _watchHitOnTBEdge();
    }    
}
