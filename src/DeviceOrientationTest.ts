/**
 *
 * @author 
 *
 */
class DeviceOrientationTest {
    private orientation: egret.DeviceOrientation;
    private lastAngle:number;
    private callback:Function;
	constructor(callback:Function) {
    	  this.callback = callback;
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);   
        this.orientation.start();
	}
    private onOrientation(e: egret.OrientationEvent) {

        var newAngle: number = e.alpha;
        if(this.lastAngle === undefined) {
            this.lastAngle = newAngle;
        } 
        this.callback(newAngle - this.lastAngle); 
        this.lastAngle = newAngle;
    }	
}
