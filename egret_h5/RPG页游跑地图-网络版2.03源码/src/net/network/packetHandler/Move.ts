/**
 *
 * @author 
 *
 */
class Move {
	public constructor() {
	}
    public static move(Obj:any):void{
        var ms: String[];
        var mapXY: egret.Point = new egret.Point();
        var grid_z: egret.Point[] = [];

        ms = Obj["move"]["point"].split(",");//分割消息
        if(ms.length > 1) {
            mapXY.x = parseInt(<string>ms[0]);
            mapXY.y = parseInt(<string>ms[1]);
        }
        //console.log("A " + mapXY.x + " " + mapXY.y);
        ms = Obj["move"]["astar"].split("|");//分割消息
        for(var i: number = 0;i < ms.length;i++) {
            var mm: String[] = ms[i].split(",");//分割消息
            if(mm.length > 1) {
                var ar: egret.Point = new egret.Point();
                ar.x = parseInt(<string>mm[0]);
                ar.y = parseInt(<string>mm[1]);
                grid_z.push(ar);
            }
        }
        //console.log("bb " + mapXY.x + " " + mapXY.y);
        GameLayer.gameScene.mapOk(mapXY.x,mapXY.y,grid_z);

	}
}
