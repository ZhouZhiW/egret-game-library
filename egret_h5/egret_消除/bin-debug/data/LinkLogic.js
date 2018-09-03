var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LinkLogic = (function () {
    function LinkLogic() {
    }
    /**
     * 检查是否存在可消除项目
     */
    LinkLogic.isHaveLine = function () {
        this.lines = new Array();
        var currentType = "";
        var typeNum = 0;
        //按行检测， 左—>右
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (currentType != GameData.elements[GameData.mapData[i][t]].type) {
                        if (typeNum >= 3) {
                            var arr = new Array();
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[i][t - q - 1]);
                                console.log("横压入数组", i, (t - q - 1), GameData.mapData[i][t - q - 1]);
                            }
                            this.lines.push(arr);
                        }
                        currentType = GameData.elements[GameData.mapData[i][t]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    //上一组检测结束了，把数据存储进去
                    if (typeNum >= 3) {
                        var arr = new Array();
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[i][t - q - 1]);
                            console.log("横压入数组", i, (t - q - 1), GameData.mapData[i][t - q - 1]);
                        }
                        this.lines.push(arr);
                    }
                    currentType = "";
                    typeNum = 0;
                }
            }
            //一行结束后，再次判断
            if (typeNum >= 3) {
                var t = GameData.MaxColumn;
                var arr = new Array();
                for (var q = 0; q < typeNum; q++) {
                    console.log("横压入数组2", i, (t - q - 1), GameData.mapData[i][t - q - 1]);
                    arr.push(GameData.mapData[i][t - q - 1]);
                }
                this.lines.push(arr);
            }
            //一行结束后，清空数据
            currentType = "";
            typeNum = 0;
        }
        //按列检测， 上—>下
        for (var t = 0; t < GameData.MaxColumn; t++) {
            for (var i = 0; i < GameData.MaxRow; i++) {
                if (GameData.mapData[i][t] != -1) {
                    //console.log( i ,t ,GameData.elements[GameData.mapData[i][t]].type)
                    if (currentType != GameData.elements[GameData.mapData[i][t]].type) {
                        if (typeNum >= 3) {
                            var arr = new Array();
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[i - q - 1][t]);
                                console.log("纵压入数组", (i - q - 1), t, GameData.mapData[i - q - 1][t]);
                            }
                            this.lines.push(arr);
                        }
                        currentType = GameData.elements[GameData.mapData[i][t]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    if (typeNum >= 3) {
                        var arr = new Array();
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[i - q - 1][t]);
                            console.log("纵压入数组", (i - q - 1), t, GameData.mapData[i - q - 1][t]);
                        }
                        this.lines.push(arr);
                    }
                    currentType = "";
                    typeNum = 0;
                }
            }
            if (typeNum >= 3) {
                var i = GameData.MaxRow;
                var arr = new Array();
                for (var q = 0; q < typeNum; q++) {
                    arr.push(GameData.mapData[i - q - 1][t]);
                    console.log("纵压入数组", (i - q - 1), t, GameData.mapData[i - q - 1][t]);
                }
                this.lines.push(arr);
            }
            //一列结束后，清空数据
            currentType = "";
            typeNum = 0;
        }
        if (LinkLogic.lines.length != 0) {
            console.log("未过滤数组", LinkLogic.lines);
            return true;
        }
        return false;
    };
    /**
     * /根据移动后的某一点，检测消除项目
     * 参数未互换得两个点得位置,0-63编号
     * 在地图中，将ID互换，然后检查舞台中有没有能消除得格子，如果有，返回true，如果没有，把数据切换回来
     */
    LinkLogic.isHaveLineByIndex = function (p1, p2) {
        var p1id = GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow];
        var p2id = GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow];
        //console.log(GameData.elements[GameData.mapData[Math.floor(p1/GameData.MaxColumn)][p1%GameData.MaxRow] ].type+"  "+GameData.elements[GameData.mapData[Math.floor(p2/GameData.MaxColumn)][p2%GameData.MaxRow] ].type );
        //交换元素ID
        GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p2id;
        GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p1id;
        //console.log(GameData.elements[GameData.mapData[Math.floor(p1/GameData.MaxColumn)][p1%GameData.MaxRow] ].type+"  "+GameData.elements[GameData.mapData[Math.floor(p2/GameData.MaxColumn)][p2%GameData.MaxRow] ].type );
        var rel = this.isHaveLine();
        if (rel) {
            GameData.elements[p1id].location = p2;
            GameData.elements[p2id].location = p1;
            return true;
        }
        else {
            GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p1id;
            GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p2id;
        }
        return false;
    };
    /**
     * 判断两个点是否可以互相移动，关系是否为上下，左右
     */
    LinkLogic.canMove = function (id1, id2) {
        var l1row = Math.floor(GameData.elements[id1].location / GameData.MaxRow);
        var l1col = GameData.elements[id1].location % GameData.MaxColumn;
        var l2row = Math.floor(GameData.elements[id2].location / GameData.MaxRow);
        var l2col = GameData.elements[id2].location % GameData.MaxColumn;
        console.log("判断两点互换位置", id1, GameData.elements[id1].location, l1row, l1col, "第二个", id2, GameData.elements[id2].location, l2row, l2col);
        if (l1row == l2row) {
            if ((l1col - l2col) == 1 || (l1col - l2col) == -1) {
                return true;
            }
        }
        else if (l1col == l2col) {
            if ((l1row - l2row) == 1 || (l1row - l2row) == -1) {
                return true;
            }
        }
        return false;
    };
    /**
     *检查是否存在移动一步后能够消除的项目
     */
    LinkLogic.isNextHaveLine = function () {
        //逐个分析，搜索横向与纵向两种情况，同时每个方向有两种拼接方式
        //-------方式1-------
        //   口    口
        // 口  ▇ ▇  口
        //   口    口
        //-------方式2--------
        //    口
        // ▇    ▇
        //    口
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    //横向 方式1
                    //console.log(i,t);
                    if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t + 1]].type) {
                        if (t > 0 && GameData.mapData[i][t - 1] != -1) {
                            if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目1！！！", i, t);
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目2！！！", i, t);
                                return true;
                            }
                            if (t > 1 && GameData.mapData[i][t - 2] && GameData.mapData[i][t - 2] != -1 && GameData.elements[GameData.mapData[i][t - 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目3！！！", i, t);
                                return true;
                            }
                        }
                        if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 2] != -1) {
                            if (t < (GameData.MaxColumn - 2) && i > 0 && GameData.mapData[i - 1][t + 2] && GameData.mapData[i - 1][t + 2] != -1 && GameData.elements[GameData.mapData[i - 1][t + 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目4！！！", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 2) && i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 2] && GameData.mapData[i + 1][t + 2] != -1 && GameData.elements[GameData.mapData[i + 1][t + 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目5！！！", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 3) && GameData.mapData[i][t + 3] && GameData.mapData[i][t + 3] != -1 && GameData.elements[GameData.mapData[i][t + 3]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-1能消除项目6！！！", i, t);
                                return true;
                            }
                        }
                    }
                    //纵向 方式1
                    if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 1][t]].type) {
                        if (i > 0 && GameData.mapData[i - 1][t] != -1) {
                            if (i > 1 && GameData.mapData[i - 2][t] && GameData.mapData[i - 2][t] != -1 && GameData.elements[GameData.mapData[i - 2][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目1！！！", i, t);
                                return true;
                            }
                            if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目2！！！", i, t);
                                return true;
                            }
                            if (i > 0 && t < (GameData.MaxColumn - 1) && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目3！！！", i, t);
                                return true;
                            }
                        }
                        if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1) {
                            if (i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][t] && GameData.mapData[i + 3][t] != -1 && GameData.elements[GameData.mapData[i + 3][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目4！！！", i, t);
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 2) && GameData.mapData[i + 2][t + 1] && GameData.mapData[i + 2][t + 1] != -1 && GameData.elements[GameData.mapData[i + 2][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目5！！！", i, t);
                                return true;
                            }
                            if (t > 0 && GameData.mapData[i + 2][t - 1] && GameData.mapData[i + 2][t - 1] != -1 && GameData.elements[GameData.mapData[i + 2][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|1能消除项目6！！！", i, t);
                                return true;
                            }
                        }
                    }
                    //横向 方式2
                    if (t < (GameData.MaxColumn - 2) && GameData.mapData[i][t + 2] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t + 2]].type) {
                        if (GameData.mapData[i][t + 1] != -1) {
                            if (i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-2能消除项目1！！！", i, t);
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("-2能消除项目2！！！", i, t);
                                return true;
                            }
                        }
                    }
                    //纵向 方式2
                    if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 2][t]].type) {
                        if (GameData.mapData[i + 1][t] != -1) {
                            if (t < (GameData.MaxColumn - 1) && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|2能消除项目1！！！", i, t);
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                console.log("|2能消除项目2！！！", i, t);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * 洗牌 打乱所有顺序,在没有能连接的情况下使用
     */
    LinkLogic.changeOrder = function () {
        var arr = new Array();
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    arr.push(GameData.mapData[i][t]);
                }
            }
        }
        var index = 0;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    index = Math.floor(Math.random() * arr.length);
                    GameData.mapData[i][t] = arr[index];
                    GameData.elements[arr[index]].location = i * GameData.MaxColumn + t;
                    arr.splice(index, 1); //从数组中删除 下标index的元素
                }
            }
        }
    };
    return LinkLogic;
}());
__reflect(LinkLogic.prototype, "LinkLogic");
//# sourceMappingURL=LinkLogic.js.map