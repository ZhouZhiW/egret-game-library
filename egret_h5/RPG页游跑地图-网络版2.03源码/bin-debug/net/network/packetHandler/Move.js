/**
 *
 * @author
 *
 */
var Move = (function () {
    function Move() {
    }
    var d = __define,c=Move,p=c.prototype;
    Move.move = function (Obj) {
        var ms;
        var mapXY = new egret.Point();
        var grid_z = [];
        ms = Obj["move"]["point"].split(","); //分割消息
        if (ms.length > 1) {
            mapXY.x = parseInt(ms[0]);
            mapXY.y = parseInt(ms[1]);
        }
        //console.log("A " + mapXY.x + " " + mapXY.y);
        ms = Obj["move"]["astar"].split("|"); //分割消息
        for (var i = 0; i < ms.length; i++) {
            var mm = ms[i].split(","); //分割消息
            if (mm.length > 1) {
                var ar = new egret.Point();
                ar.x = parseInt(mm[0]);
                ar.y = parseInt(mm[1]);
                grid_z.push(ar);
            }
        }
        //console.log("bb " + mapXY.x + " " + mapXY.y);
        GameLayer.gameScene.mapOk(mapXY.x, mapXY.y, grid_z);
    };
    return Move;
})();
egret.registerClass(Move,'Move');
//# sourceMappingURL=Move.js.map