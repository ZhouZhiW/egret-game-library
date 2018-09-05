class playgame extends egret.DisplayObjectContainer {
    constructor() {
        super();
        /*加载这个场景需要的的ui资源*/
        Data.playlayer = this;
        Data.shareNum = 1;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onAddToStage, this);

        RES.loadGroup("game");
    }
    private Allblack = [];/*用于存储所有数字对象*/
    private checkArr = [];/*用于存储要查找对象的四周相同元素的查询结果*/
    private gamebg;/*添加遮挡背景用于数字方块的下落*/
    private speed = 150;/*物块的下落速度*/
    private _score; /*玩家得分*/
    private getScore = 0;
    public IsClick = true;/*表示的当物块下落或者移动状态时，玩家是不容点击物块的*/
    private onAddToStage() {
        /*加载位图数字文件*/
        RES.getResByUrl("resource/res/fnt/num.fnt", this.onLoadCompleteNum, this, RES.ResourceItem.TYPE_FONT);
        RES.getResByUrl("resource/res/fnt/game.fnt", this.onLoadComplete, this, RES.ResourceItem.TYPE_FONT);
    }
  
    /*添加背景*/
    private addbg() {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        var _h = this.stage.stageHeight;
        var _w = this.stage.stageWidth;
        bg.graphics.drawRect(0, 0, _w, _h);
        bg.graphics.endFill();
        this.addChild(bg);
        this.gamebg = new egret.Bitmap();
        this.gamebg.texture = RES.getRes("gameBg_png");
        this.addChild(this.gamebg);
        this.gamebg.x = 0;
        this.gamebg.y = 100;
        /*初始化数字方块*/
        this.initObj();
        var shuming = new egret.TextField();
        shuming.text = "游戏规则";
        shuming.textColor = 0xB9E6F1;
        shuming.x = this.stage.stageWidth / 2;
        shuming.y = this.stage.stageHeight - 50;
        shuming.anchorOffsetX = shuming.width / 2;
        shuming.anchorOffsetY = shuming.height / 2;
        console.log("sss", this.width, this.height, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(shuming);
        shuming.touchEnabled = true;
        var that = this;
        shuming.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var _introduction = new introduction();
            that.addChild(_introduction);
        }, this)
        console.log('addbgend')
    }
    /*添加血量*/
    public bloodArr: Array<any> = [];
    public bloodNum = 5;
    private playBlood() {
        console.log("playBlood");
        var obj_x = 30;
        var obj_y = 250;
        var blood_w = 100;
        for (var a = 0; a < 5; a++) {
            var _x = obj_x + (a) * (blood_w + 20);
            this.createBlood("s2_png", _x, obj_y);
            this.createBlood("s1_png", _x, obj_y);
        }
        // console.log("playBlood",this.bloodArr);
        // this.bloodArr[0].parent.removeChild(this.bloodArr[0]);

    }
    /*初始化地图配置*/
    public initObj() {
        var num = 0;
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                var tag = this.getTag(row, col);
                var _x = this.get_x(col);
                var _y = this.get_y(row);
                this.addObj(tag, row, col, _x, _y);
            }
        }
    }
    /*渲染配置好的显示对象*/
    private addObj(tag, row, col, _x, _y) {
        var _obj = new Rect(tag, row, col, _x, _y);
        _obj.x = _x;
        _obj.y = _y;
        this.Allblack[row * Data.Max_row + col] = _obj;
        this.addChild(_obj);
        this.setChildIndex(_obj, 2);
        this.setChildIndex(this._score, this.numChildren - 1);
        this.setChildIndex(this.gamebg, 10);
        _obj.touchEnabled = true;
        _obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickObj, this, row);
    }
    /*渲染初始化血量*/
    private createBlood(str, _x, _y) {
        var blood = new egret.Bitmap();
        blood.texture = RES.getRes(str);
        blood.width = 100;
        blood.height = 86;
        blood.x = _x;
        blood.y = _y;
        blood.anchorOffsetY = blood.height / 2;
        this.addChild(blood);
        if (str == "s1_png") {
            this.bloodArr.push(blood);
        }
    }
    /*血量更新*/
    private RestBlood(_num) {
        this.bloodNum += _num;
        if (_num > 0) {
            if (this.bloodNum >= 5) {
                this.bloodNum = 5;
            }
            this.bloodArr[this.bloodNum - 1].visible = true;
        } else {
            this.bloodArr[this.bloodNum].visible = false;
        }
    }
    /*点击显示对象的响应回调函数*/
    private clickObj(evt: egret.TouchEvent, row) {
        if (this.IsClick) {
            /*当点击该方块时该方块上的数值加一*/
            var sp = evt.currentTarget
            var _tag = sp.tag + 1;
            var tag = _tag % 9;
            if (tag == 0) {
                tag = 9;
            }
            sp._obj.texture = RES.getRes(Data.colorArr[tag - 1]);/*换纹理*/
            sp.tag = _tag;
            sp.num.text = _tag.toString();/*重置方块上的数值 和锚点*/
            sp.num.anchorOffsetX = sp.num.width / 2;
            sp.num.anchorOffsetY = sp.num.height / 2;
            /*判断玩家血量是否为零 。如果为零则游戏结束*/
            this.RestBlood(-1);
            /*判断该方块四周是否有相同的tag数量大于等于3 的没*/
            this.checkArr = [];
            this.checkArr.push(sp);
            this.getSameBlack(sp, this.checkArr);
            if (this.checkArr.length >= 3) {
                var SameArr = [];
                var _obj = {
                    Array: this.checkArr,
                    obj: sp
                }
                SameArr.push(_obj);
                this.IsClick = false;
                this.removeSprite(SameArr);
            } else {
                if (this.bloodNum <= 0) {
                    this.IsClick = false;
                    console.log("游戏结束");
                    this.overOrContinue();
                    return;
                }
            }
        }
    }
    /*递归查找 用于检查所有数字方块判断是否有可消除的*/
    private getSameBlack(sp, Array) {
        if (sp.col + 1 < 5) {
            var obj = this.Allblack[sp.row * Data.Max_row + sp.col + 1];
            if (obj) {
                if (obj.tag == sp.tag) {
                    if (Array.indexOf(obj) == -1) {
                        Array.push(obj);
                        this.getSameBlack(obj, Array);
                    }
                }
            }
        }
        if (sp.col - 1 >= 0) {
            var obj = this.Allblack[sp.row * Data.Max_row + sp.col - 1];
            if (obj) {
                if (obj.tag == sp.tag) {
                    if (Array.indexOf(obj) == -1) {
                        Array.push(obj);
                        this.getSameBlack(obj, Array);
                    }
                }
            }

        }
        if (sp.row + 1 < 5) {
            var obj = this.Allblack[(sp.row + 1) * Data.Max_row + sp.col];
            if (obj) {
                if (obj.tag == sp.tag) {
                    if (Array.indexOf(obj) == -1) {
                        Array.push(obj);
                        this.getSameBlack(obj, Array);
                    }
                }
            }

        }
        if (sp.row - 1 >= 0) {
            var obj = this.Allblack[(sp.row - 1) * Data.Max_row + sp.col];
            if (obj) {
                if (obj.tag == sp.tag) {
                    if (Array.indexOf(obj) == -1) {
                        Array.push(obj);
                        this.getSameBlack(obj, Array);
                    }
                }
            }
        }
    }
    /*删除相同元素的数字方块*/
    private removeSprite(removeArr: Array<any>) {

        console.log(removeArr, this.removeNum);
        this.removeNum = 0;
        // for (var a = 0; a < removeArr.length; a++) {
        var a = 0
        for (var b = 0; b < removeArr[a].Array.length; b++) {
            var sp = removeArr[a].Array[b];
            this.Allblack[sp.row * Data.Max_row + sp.col].run = true;
            this.Allblack[sp.row * Data.Max_row + sp.col] = null;
            sp.removeArr = this.getNodeWays(sp, removeArr[a].obj);
            var moveArr = sp.removeArr;
            var _idx = sp.removeIdx;
            var _x = this.get_x(moveArr[_idx].col);
            var _y = this.get_y(moveArr[_idx].row);
            var _a = removeArr.length - 1;
            var _b = removeArr[a].Array.length - 1;
            this.spMove(sp, _x, _y, removeArr[a].Array.length, removeArr[a].Array);
        }
        this.RestBlood(1);
        // }
    }

    private removeNum = 0/*表示的是删除的个数*/
    private spMove(sp, _x, _y, num, _removeArr) {

        var that = this;
        var time = this.speed;
        egret.Tween.get(sp).to({ x: _x, y: _y }, time, egret.Ease.sineIn).call(function () {
            sp.removeIdx++;
            if (sp.removeIdx < sp.removeArr.length) {
                var _x = that.get_x(sp.removeArr[sp.removeIdx].col);
                var _y = that.get_y(sp.removeArr[sp.removeIdx].row);
                that.spMove(sp, _x, _y, num, _removeArr);
            } else {
                that.removeNum += 1;
                console.log(that.removeNum, num);
                if (that.removeNum == num) {
                    console.log("删除完成");
                    /*表示的是最好一个方块的删除路径走完了*/
                    var _tag = sp.tag + 1;
                    var obj_row = sp.removeArr[sp.removeArr.length - 1].row;
                    var obj_col = sp.removeArr[sp.removeArr.length - 1].col;
                    var obj_x = that.get_x(sp.removeArr[sp.removeArr.length - 1].col);
                    var obj_y = that.get_y(sp.removeArr[sp.removeArr.length - 1].row);

                    var _score = _removeArr.length * sp.tag * 10
                    that.ResetScore(_score);

                    /*从显示列表中删除所有的要删除方块*/
                    for (var a = 0; a < _removeArr.length; a++) {
                        if (_removeArr[a].parent) {
                            _removeArr[a].parent.removeChild(_removeArr[a]);
                        }
                    }

                    _removeArr = [];
                    /*创建一个tag+1的数值方块*/
                    that.addObj(_tag, obj_row, obj_col, obj_x, obj_y);
                    that.removeNum = 0;
                    that.SpriteFall();
                }
                /*表示的是其他要删除的方块路径已经走完*/
            }
        });

    }
    /*数字方块的掉落实现*/
    private _isfirstFall = 0;
    private SpriteFall() {
        /*数字方块掉落 分两步处理  
        第一步将棋盘地图上的全部掉落下来，最后棋盘必然是每一列的最上面没有方块（当然前提是那一列的有要删除的方块）*/
        var iscount = 0
        for (var col = 4; col >= 0; col--) {
            var sprow = 0;
            for (var row = 4; row >= 0; row--) {
                var roleSp = this.Allblack[row * Data.Max_row + col];
                if (!roleSp) {
                    sprow++;
                } else {
                    if (sprow > 0) {
                        iscount++
                    }
                }
            }
        }
        var isNoFall = false;/*当物块没有在一步情况下下落时（在第一行时第一步时没法执行的）。*/
        for (var col = 4; col >= 0; col--) {
            var sprow = 0;
            for (var row = 4; row >= 0; row--) {
                var roleSp = this.Allblack[row * Data.Max_row + col];
                if (!roleSp) {
                    sprow++;
                } else {
                    if (sprow > 0) {
                        isNoFall = true;
                        var newRow = row + sprow;
                        var _x = this.get_x(col);
                        var _y = this.get_y(newRow);
                        var time = sprow * this.speed;
                        roleSp.row = newRow;
                        roleSp._y = this.get_y(newRow);
                        this.Allblack[newRow * Data.Max_row + col] = roleSp;
                        this.Allblack[row * Data.Max_row + col] = null;

                        var that = this;
                        egret.Tween.get(roleSp).to({ x: _x, y: _y }, time, egret.Ease.sineIn).call(function () {
                            that._isfirstFall++
                            if (that._isfirstFall == iscount) {
                                console.log("413");
                                that._isfirstFall = 0;
                                that.SpriteAngineFall();
                            }
                        });
                    }
                }
                if (!isNoFall && row == 0 && col == 0) {
                    console.log("angin");
                    this.SpriteAngineFall();
                }
            }
        }
    }
    private SpFallNum = 0;
    private SpriteAngineFall() {
        console.log("第二步");
        /*第二步 将棋盘地图上没有的数字方块 重新创建，并且下落到其合适的位置*/
        var IscreateNum = 0
        for (var col = 0; col < 5; col++) {
            for (var row = 4; row >= 0; row--) {
                if (!this.Allblack[row * Data.Max_row + col]) {
                    IscreateNum++;
                }
            }
        }
        for (var col = 0; col < 5; col++) {
            var isFrist = true;
            var max;
            for (var row = 4; row >= 0; row--) {
                if (!this.Allblack[row * Data.Max_row + col]) {
                    if (isFrist) {
                        isFrist = false;
                        max = row
                    }
                    var _maxNum = row * Data.Max_row + col;
                    var tag = Math.floor(Math.random() * 5 + 1);
                    this.addObj(tag, row, col, this.get_x(col), this.get_y(-1));
                    var _x = this.get_x(col);
                    var _y = this.get_y(row);
                    var time = (row + 1) * this.speed;
                    var sp = this.Allblack[row * Data.Max_row + col];

                    setTimeout(this.Anmation(sp, row, _x, _y, time, IscreateNum), 100 * (max - row));
                }
            }
        }
    }
    /*但数字方块落下时再次检查整个棋盘 判断是否有相同数字的数字方块在一起*/
    private SpriteFallCheck() {
        var SameArr = [];
        var _Isbreak = false;
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                console.log("***********");
                var sp = this.Allblack[row * Data.Max_row + col];
                if (sp && !sp.ischeck) {
                    this.checkArr = [];
                    this.checkArr.push(sp);
                    this.getSameBlack(sp, this.checkArr);
                    if (this.checkArr.length >= 3) {
                        var _Arr = this.ResetState(this.checkArr);
                        var _obj = {
                            Array: _Arr,
                            obj: sp
                        }
                        SameArr.push(_obj);
                        _Isbreak = true;
                        this.removeSprite(SameArr);
                        console.log("要删除了");
                        break;
                    }
                }
                if (_Isbreak) {
                    break;
                }
            }
            if (_Isbreak) {
                break;
            }
        }
        var that = this;
        if (SameArr.length > 0) {
            setTimeout(function () {
                // that.removeSprite(SameArr);
            }, 100);
        } else {
            console.log("没有了可点击的数字方块");
            this.IsClick = true;
        }
    }
    private ResetState(Array: Array<any>) {
        for (var a = 0; a < Array.length; a++) {
            Array[a].ischeck = true;
        }
        return Array;
    }
    private Anmation(sp, row, _x, _y, time, num) {
        console.log("Anmation");
        var that = this;
        return function () {
            egret.Tween.get(sp).to({ x: _x, y: _y }, time, egret.Ease.sineIn).call(function () {
                that.SpFallNum++;
                if (that.SpFallNum == num) {
                    console.log("512");
                    that.SpFallNum = 0;
                    that.SpriteFallCheck();
                }
            });
        }
    }
    /*配置数字地图的算法*/
    private getTag(row, col) {
        var numArr = [];
        var numArr1 = [];
        for (var i = 1; i < 7; i++) {
            numArr.push(i);
        }
        if (this.Allblack[row * Data.Max_row + col + 1]) {
            numArr1.push(this.Allblack[row * Data.Max_row + col + 1].tag);
        }
        if (this.Allblack[row * Data.Max_row + col - 1]) {
            numArr1.push(this.Allblack[row * Data.Max_row + col - 1].tag);
        }
        if (this.Allblack[(row + 1) * Data.Max_row + col]) {
            numArr1.push(this.Allblack[(row + 1) * Data.Max_row + col].tag);
        }
        if (this.Allblack[(row - 1) * Data.Max_row + col]) {
            numArr1.push(this.Allblack[(row - 1) * Data.Max_row + col].tag);
        }
        for (var a = 0; a < numArr1.length; a++) {
            for (var b = 0; b < numArr.length; b++) {
                if (numArr1[a] == numArr[b]) {
                    numArr.splice(b, 1);
                    b--;
                }
            }
        }
        var num = Math.floor(Math.random() * (numArr.length - 1))
        return numArr[num];
    }
    /*获取数字方块的删除路径*/
    private getNodeWays(startNode, endNode) {
        // console.log("查询的起点:", startNode.row, startNode.col);
        // console.log("查询的终点:", endNode.row, endNode.col);
        var openList = [];
        var closeList = [];
        var path_Array = [];
        startNode.ag = 0;
        startNode.ah = 0;
        startNode.af = startNode.ag + startNode.ah;
        openList.push(startNode);
        var findTheWay = false;
        while (!findTheWay) {
            var centerNode = this.findMinNode(openList)
            this.aStartRemove(openList, centerNode);
            closeList.push(centerNode);
            // console.log("------------")
            for (var i = 0; i < 4; i++) {
                var aroundNode = {
                    row: null,
                    col: null,
                    isOb: null,
                    ag: null,
                    ah: null,
                    af: null,
                    parentNode: null
                };
                var _row = Math.abs(centerNode.row - endNode.row);
                var _col = Math.abs(centerNode.col - endNode.col);
                if (_row == 0 && _col == 0) {/*如果节点和终点相同，则算法流程结束*/
                    findTheWay = true;
                    var path_Array = [];
                    var nextNode = {
                        row: centerNode.row,
                        col: centerNode.col
                    }
                    path_Array.push(nextNode);
                    return path_Array;

                    // break;
                }
                switch (i) {
                    case 0:
                        aroundNode.row = centerNode.row + 1
                        aroundNode.col = centerNode.col
                        break;
                    case 1:
                        aroundNode.row = centerNode.row - 1
                        aroundNode.col = centerNode.col
                        break;
                    case 2:
                        aroundNode.row = centerNode.row
                        aroundNode.col = centerNode.col + 1
                        break;
                    case 3:
                        aroundNode.row = centerNode.row
                        aroundNode.col = centerNode.col - 1
                        break;
                }
                if (this.Allblack[aroundNode.row * Data.Max_row + aroundNode.col]) {
                    if (!this.Allblack[aroundNode.row * Data.Max_row + aroundNode.col].run) {
                        aroundNode.isOb = false;   //判断当前节点是否是不是要删除的节点
                    } else {
                        aroundNode.isOb = true
                    }
                } else {
                    if (aroundNode.row < 5 && aroundNode.row >= 0 && aroundNode.col < 5 && aroundNode.col >= 0) {
                        aroundNode.isOb = true
                    } else {
                        aroundNode.isOb = false
                    }
                }
                if (!aroundNode.isOb) {                                       //如果是障碍物，跳过
                } else if (this.aStarthasObject(closeList, aroundNode)) {                         //如果在关闭列表里，跳过
                } else if (!this.aStarthasObject(openList, aroundNode)) {                          //如果不在开启列表里，加入到开启列表
                    aroundNode.parentNode = centerNode;
                    if (Math.abs(aroundNode.row - endNode.row) == 0 && Math.abs(aroundNode.col - endNode.col) == 0) {  //如果节点和终点的值相近，那么A*算法结束，得到路径
                        findTheWay = true;
                        var pathArry = [];
                        this.gettingAStarPath(aroundNode, pathArry);//寻找路径
                        var PathArr = [];
                        PathArr = this.swapArr(pathArry);
                        var end = {
                            row: endNode.row,
                            col: endNode.col
                        }
                        PathArr.splice(0, 1);
                        PathArr.push(end);
                        // console.log("2", pathArry);
                        return PathArr;//找到最短路径并跳出循环
                    }
                    //确定中心节点和周围节点形成的角度，正交G值消耗10*像素，斜角G值消耗14*像素
                    aroundNode.ag = centerNode.ag;
                    aroundNode.af = this.getAF(aroundNode, endNode);
                    openList.push(aroundNode);

                } else if (this.aStarthasObject(openList, aroundNode)) {

                }
            }
        }
        // while (findTheWay);
    }
    private getAF(thisNode, endNode) {
        var aHExpend = (Math.abs(thisNode.row - endNode.row) + Math.abs(thisNode.col - endNode.col));
        return aHExpend + thisNode.ag;

    }
    /*找到最小af的节点在 openList中*/
    private findMinNode(openListArr: Array<any>) {
        var minNode = openListArr[0];
        for (var i = 0; i < openListArr.length; i++) {
            if (minNode.af > openListArr[i].af) {
                minNode = openListArr[i];
            }
        }
        return minNode;
    }
    private gettingAStarPath(laseNode, array) {
        if (laseNode.parentNode != null) {
            array.push({ row: laseNode.parentNode.row, col: laseNode.parentNode.col });
            this.gettingAStarPath(laseNode.parentNode, array);
        }
    }
    /*数组增删的3个实例方法*/
    private aStartIndexof(_Array: Array<any>, val) {
        for (var a = 0; a < _Array.length; a++) {
            if (_Array[a].row == val.row && _Array[a].col == val.col) {
                return a;
            }
        }
        return -1;

    }
    private aStartRemove(_Array: Array<any>, val) {
        var index = this.aStartIndexof(_Array, val);
        if (index > -1) {
            _Array.splice(index, 1);
        }
        return _Array;
    }
    private aStarthasObject(_Array: Array<any>, val) {
        for (var a = 0; a < _Array.length; a++) {
            if (_Array[a].row == val.row && _Array[a].col == val.col) {
                return true;
            }
        }
        return false;
    }
    /*  计算坐标x 和 y*/
    private get_x(col) {
        return (col + 0.5) * (Data._width) + Data._w * (col + 1);
    }
    private get_y(row) {
        return Data.start_y + (row + 0.5) * (Data._width) + (row + 1) * Data._w;

    }
    private swapArr(Arr: Array<any>) {
        var swapArr = [];
        for (var a = Arr.length - 1; a >= 0; a--) {
            if (Arr[a]) {
                swapArr.push(Arr[a]);
            }

        }
        return swapArr;
    }
    /*渲染玩家得分值*/
    private onLoadComplete(font: egret.BitmapFont) {
        console.log("onLoadComplete---\n")
        if (!this.isOver) {
            this._score = new egret.BitmapText();
            this._score.font = font;
            this._score.text = "0";
            this._score.y = 100;
            this._score.x = this.stage.stageWidth / 2;
            this._score.anchorOffsetX = this._score.width / 2;
            this.addChild(this._score);
            this.addbg();
            this.playBlood();
        }

    }
    private _font;
    private onLoadCompleteNum(font: egret.BitmapFont) {
        this._font = font;
    }
    /*重置玩家得分*/
    private ResetScore(_score) {
        this.getScore += _score;
        this._score.text = this.getScore.toString();
        this._score.anchorOffsetX = this._score.width / 2;
        this._score.anchorOffsetY = this._score.height / 2;
    }
    private tagArr;
    private overOrContinue() {
        if (Data.shareNum < 1) {
            var _gamestart = new anginLife(this.getScore);
            this.addChild(_gamestart);
        } else {
            this.endAmation();
        }
    }
    private endAmation() {
        var tagPush = [];
        this.tagArr = [];
        var tagArr1 = [];
        var tagArr2 = [
            {
                tag: this.Allblack[0],
                num: 1
            }
        ];
        for (var a = 0; a < this.Allblack.length; a++) {
            var _tag = this.Allblack[a].tag;
            if (tagPush.indexOf(_tag) == -1) {
                tagPush.push(_tag);
            }
            var isBool = false;
            for (var b = 0; b < tagArr2.length; b++) {
                if (tagArr2[b].tag == this.Allblack[a].tag) {
                    tagArr2[b].num += 1;
                    isBool = true;
                    break;
                }
            }
            if (!isBool) {
                var _obj = {
                    tag: this.Allblack[a].tag,
                    num: 1
                }
                tagArr2.push(_obj);
            }
        }
        console.log("-----")
        tagPush.sort(this.sortArr);
        for (var a = 0; a < tagPush.length; a++) {
            for (var b = 0; b < tagArr2.length; b++) {
                if (tagPush[a] == tagArr2[b].tag) {
                    this.tagArr.push(tagArr2[b]);
                }
            }
        }
        this.getNextAnmation();



    }
    private overIdx = 0;
    private AntIdx = 0;
    private overAmation(sp, num2) {
        var _endTxt = new egret.TextField();
        // var _endTxt = new egret.BitmapText();
        // _endTxt.font = this._font;
        _endTxt.text = (sp.tag * 10).toString();
        _endTxt.textColor = 0xE6E6FA;
        _endTxt.x = sp.x;
        _endTxt.y = sp.y;
        _endTxt.size = 80;
        _endTxt.anchorOffsetX = _endTxt.width / 2;
        _endTxt.anchorOffsetY = _endTxt.height / 2;
        this.addChild(_endTxt);
        egret.Tween.get(_endTxt).to({ x: sp.x, y: sp.y - 100 }, 800).call(function () {
            if (_endTxt.parent) {
                _endTxt.parent.removeChild(_endTxt);
            }
        });
        var that = this;
        egret.Tween.get(sp).
            to({ scaleX: 0, scaleY: 1 }, 200).
            to({ scaleX: 1, scaleY: 1 }, 200).
            to({ scaleX: 0, scaleY: 1 }, 200).
            to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                that.AntIdx++;
                if (that.AntIdx == num2) {
                    that.overIdx++;
                    if (that.overIdx >= that.tagArr.length - 1) {
                        that.gameOver();
                        console.log("开始跳转");
                        return;
                    } else {
                        var _score = sp.tag * 10 * num2;
                        that.ResetScore(_score);
                        that.AntIdx = 0;
                        that.getNextAnmation();
                    }
                }
            })

    }
    private isOver = false;
    private gameOver() {
        this.isOver = true;
        var that = this;
        var overlayer = new overLayer(this.getScore);
        overlayer.x = this.width * 2;
        Data.mainlayer.addChild(overlayer);

        egret.Tween.get(overlayer).to({ x: 0 }, 1000, egret.Ease.backOut).call(function () {
            // if (that.parent) {
            //     that.parent.removeChild(that)
            // }
        })
    }
    private getNextAnmation() {
        for (var b = 0; b < this.Allblack.length; b++) {
            if (this.tagArr[this.overIdx].tag && this.tagArr[this.overIdx].tag == this.Allblack[b].tag) {
                this.overAmation(this.Allblack[b], this.tagArr[this.overIdx].num);
            }
        }
    }
    private sortArr(m, n) {
        return m > n ? 1 : (m < n ? -1 : 0);
    }
}