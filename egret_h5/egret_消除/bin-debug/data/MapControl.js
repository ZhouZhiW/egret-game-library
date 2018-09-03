var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapControl = (function () {
    function MapControl() {
    }
    /**
     * 创建全地图元素
    */
    MapControl.prototype.createElementAllMap = function () {
        this.createAllMap();
    };
    /**
     * 创建全部地图元素
     * 游戏开始时调用
     */
    MapControl.prototype.createAllMap = function () {
        var len = GameData.MaxColumn * GameData.MaxRow;
        var type = "";
        var haveLink = true;
        var id = 0;
        var ztype = "";
        var htype = "";
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    while (haveLink) {
                        type = this.createType();
                        if (i > 1 && GameData.mapData[i - 1][t] != -1 && GameData.mapData[i - 2][t] != -1) {
                            if (GameData.elements[GameData.mapData[i - 1][t]].type == GameData.elements[GameData.mapData[i - 2][t]].type) {
                                ztype = GameData.elements[GameData.mapData[i - 1][t]].type;
                            }
                        }
                        if (t > 1 && GameData.mapData[i][t - 1] != -1 && GameData.mapData[i][t - 2] != -1) {
                            if (GameData.elements[GameData.mapData[i][t - 1]].type == GameData.elements[GameData.mapData[i][t - 2]].type) {
                                htype = GameData.elements[GameData.mapData[i][t - 1]].type;
                            }
                        }
                        if (type != ztype && type != htype) {
                            haveLink = false;
                        }
                    }
                    //console.log(type);
                    id = GameData.unusedElements[0];
                    GameData.elements[id].type = type;
                    GameData.elements[id].location = i * GameData.MaxRow + t;
                    GameData.mapData[i][t] = id;
                    GameData.unusedElements.shift();
                    haveLink = true;
                    ztype = "";
                    htype = "";
                }
            }
        }
    };
    /**
     * 随机创建一个类型元素
     */
    MapControl.prototype.createType = function () {
        return GameData.elementTypes[Math.floor(Math.random() * GameData.elementTypes.length)].toString();
    };
    /**
     * 针对某一个数据元素更新它得类型
     */
    MapControl.prototype.changeTypeByID = function (id) {
        GameData.elements[id].type = this.createType();
        console.log(id, GameData.elements[id].type);
    };
    /**
     * 根据当前删除得地图元素，刷新所有元素得位置
     */
    MapControl.prototype.updateMapLocation = function () {
        //ID 去重
        var ids = new Array();
        var len = LinkLogic.lines.length;
        for (var i = 0; i < len; i++) {
            var l = LinkLogic.lines[i].length;
            for (var t = 0; t < l; t++) {
                //	console.log(ids.indexOf(LinkLogic.lines[i][t]));
                if (ids.indexOf(LinkLogic.lines[i][t]) == -1) {
                    this.changeTypeByID(LinkLogic.lines[i][t]); //定制新的类型
                    ids.push(LinkLogic.lines[i][t]);
                }
            }
        }
        //ids是此次被删除得元素ID,要更新其他得元素位置
        len = ids.length;
        var colArr = new Array(); //存储列编号得数据，记录共有几列需要移动位置
        for (var i = 0; i < len; i++) {
            var col = GameData.elements[ids[i]].location % GameData.MaxColumn;
            if (colArr.indexOf(col) == -1) {
                colArr.push(col);
            }
        }
        //重新得到当前这列ID的排序
        len = colArr.length;
        for (var i = 0; i < len; i++) {
            var removeIds = new Array();
            var newColIds = new Array();
            for (var t = GameData.MaxRow - 1; t >= 0; t--) {
                //console.log(ids.indexOf(GameData.mapData[t][colArr[i]]));
                if (ids.indexOf(GameData.mapData[t][colArr[i]]) == -1) {
                    if (GameData.mapData[t][colArr[i]] != -1) {
                        newColIds.push(GameData.mapData[t][colArr[i]]);
                    }
                }
                else {
                    removeIds.push(GameData.mapData[t][colArr[i]]);
                }
            }
            //合并两个数组
            newColIds = newColIds.concat(removeIds);
            //将元素重新放入map中，并改变元素Location
            for (var t = GameData.MaxRow - 1; t >= 0; t--) {
                if (GameData.mapData[t][colArr[i]] != -1) {
                    GameData.mapData[t][colArr[i]] = newColIds[0];
                    //console.log(t,GameData.elements[newColIds[0]].type);
                    GameData.elements[newColIds[0]].location = t * GameData.MaxRow + colArr[i];
                    newColIds.shift();
                }
            }
        }
    };
    return MapControl;
}());
__reflect(MapControl.prototype, "MapControl");
//# sourceMappingURL=MapControl.js.map