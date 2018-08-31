var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game = (function (_super) {
    __extends(game, _super);
    function game() {
        var _this = _super.call(this) || this;
        _this.glodBg_Array = [];
        _this.ISCANDOWN = false;
        _this.move_Y = 200;
        data.Game_Layer = _this;
        var readDateArray = JSON.parse(egret.localStorage.getItem("saveDataArray"));
        data.readDateArray = readDateArray;
        console.log(data.readDateArray);
        _this.createGameScene();
        return _this;
    }
    game.prototype.createGameScene = function () {
        this.main_map = new Map();
        this.addChildAt(this.main_map, 1);
        this.addBtn();
        this._GroupRect = new GroupRect();
        this.addChildAt(this._GroupRect, 5);
        this.touchEnabled = true;
        this.addScorePanel();
        if (data.readDateArray && data.readDateArray._level != null) {
            data._level = data.readDateArray._level - 1;
        }
        else {
            data._level = 0;
        }
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick_This_Move, this); //将组加上监听
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick_This_End, this); //将组加上监听
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick_This_Begin, this); //将组的每个方块加上监听
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onClick_This_Cancel, this);
        this.CheckGameOVer();
    };
    game.prototype.onClick_This_Begin = function (evt) {
        var click_index = 0;
        for (var a = 0; a < data.click_post.length; a++) {
            var min_x = data.click_post[a].minx;
            var max_x = data.click_post[a].maxX;
            var min_y = data.click_post[a].miny;
            var max_y = data.click_post[a].maxy;
            if (data.click_post[a].click && evt.stageX < max_x && evt.stageX >= min_x && evt.stageY >= min_y && evt.stageY < max_y) {
                click_index = a;
                this._GroupRect.ISCLICK = true;
            }
        }
        if (this._GroupRect.ISCLICK) {
            this._GroupRect.getid = click_index;
            this._GroupRect._group[this._GroupRect.getid].scaleX = 1;
            this._GroupRect._group[this._GroupRect.getid].scaleY = 1;
            this._GroupRect._group[this._GroupRect.getid].x = evt.stageX;
            this._GroupRect._group[this._GroupRect.getid].y = evt.stageY - this.move_Y;
            this.setChildIndex(this._GroupRect, this.numChildren - 1);
        }
    };
    game.prototype.onClick_This_Move = function (evt) {
        if (this._GroupRect.ISCLICK) {
            var min_x = data.rect_x - 30;
            var max_x = data.rect_x + data.map_col * data.rect_width - 30;
            var min_y = data.rect_y - 30;
            var max_y = data.rect_y + data.map_row * data.rect_width - 30;
            if (evt.stageX >= min_x && evt.stageX <= max_x && evt.stageY - this.move_Y > min_y && evt.stageY - this.move_Y < max_y) {
                var len_num = 0;
                for (var a = 0; a < this._GroupRect._group[this._GroupRect.getid]._rect.length; a++) {
                    var sp_x1 = this._GroupRect._group[this._GroupRect.getid]._rect[a].x + evt.stageX;
                    var sp_y1 = this._GroupRect._group[this._GroupRect.getid]._rect[a].y + evt.stageY - this.move_Y;
                    if (sp_x1 >= min_x && sp_x1 <= max_x && sp_y1 > min_y && sp_y1 < max_y) {
                        len_num++;
                    }
                }
                if (len_num == this._GroupRect._group[this._GroupRect.getid]._rect.length) {
                    var len = this.main_map.Map_Array.length; //表示存储棋盘的数组 默认整个棋盘的每个格子都为null
                    var len1 = this._GroupRect._group[this._GroupRect.getid]._rect.length; //表示每种形状的图形中小方块个数
                    this.click_num = this._GroupRect._group[this._GroupRect.getid]._rect.length; //表示每种形状的图形中小方块个数
                    var sp_x1 = this._GroupRect._group[this._GroupRect.getid]._rect[0].x + evt.stageX;
                    var sp_x2 = this.main_map.Map_Array[0].x;
                    var sp_x = Math.pow((sp_x1 - sp_x2), 2);
                    var sp_y1 = this._GroupRect._group[this._GroupRect.getid]._rect[0].y + evt.stageY - this.move_Y;
                    var sp_y2 = this.main_map.Map_Array[0].y;
                    var sp_y = Math.pow((sp_y1 - sp_y2), 2);
                    var min = Math.sqrt(sp_x + sp_y);
                    var index_Array = [];
                    var min_index = 0;
                    for (var a = 0; a < len1; a++) {
                        for (var b = 0; b < len; b++) {
                            var sp_x1 = this._GroupRect._group[this._GroupRect.getid]._rect[a].x + evt.stageX;
                            var sp_x2 = this.main_map.Map_Array[b].x;
                            var sp_x = Math.pow((sp_x1 - sp_x2), 2);
                            var sp_y1 = this._GroupRect._group[this._GroupRect.getid]._rect[a].y + evt.stageY - this.move_Y;
                            var sp_y2 = this.main_map.Map_Array[b].y;
                            var sp_y = Math.pow((sp_y1 - sp_y2), 2);
                            var min1 = Math.sqrt(sp_x + sp_y);
                            if (min >= min1) {
                                min = min1;
                                min_index = b;
                            }
                        }
                        if (min <= 30 && !this.main_map.Map_Array[min_index].canDown) {
                            index_Array.push({
                                Map_index: min_index,
                                _index: a,
                                min_xy: min
                            });
                        }
                    }
                    if (index_Array.length == len1) {
                        var glod_len = this.glodBg_Array.length;
                        if (glod_len > 0) {
                            if (this.main_map.Map_Array[0].x == this.glodBg_Array[0].x && this.main_map.Map_Array[0].y == this.glodBg_Array[0].y) {
                                //提示框没有变化
                            }
                            else {
                                //提示框变化了
                                for (var a = 0; a < glod_len; a++) {
                                    for (var b = 0; b < index_Array.length; b++) {
                                        this.glodBg_Array[a].x = this.main_map.Map_Array[index_Array[a].Map_index].x;
                                        this.glodBg_Array[a].y = this.main_map.Map_Array[index_Array[a].Map_index].y;
                                    }
                                }
                            }
                        }
                        else {
                            //还没有提示框
                            for (var a = 0; a < index_Array.length; a++) {
                                this.createGoldSprite(this.main_map.Map_Array[index_Array[a].Map_index].x, this.main_map.Map_Array[index_Array[a].Map_index].y);
                            }
                        }
                    }
                    else {
                        this.remove_glodBg_Array(); //移除背景提示框
                    }
                }
                else {
                    this.remove_glodBg_Array(); //移除背景提示框
                }
            }
            else {
                this.remove_glodBg_Array(); //移除背景提示框
            }
            this._GroupRect._group[this._GroupRect.getid].x = evt.stageX;
            this._GroupRect._group[this._GroupRect.getid].y = evt.stageY - this.move_Y;
        }
    };
    game.prototype.onClick_This_End = function (evt) {
        if (this._GroupRect.ISCLICK) {
            var _scoreLen = this._GroupRect._group[this._GroupRect.getid]._rect.length;
            if (this._GroupRect._group[this._GroupRect.getid]._rect.length == this.glodBg_Array.length) {
                for (var a = 0; a < this._GroupRect._group[this._GroupRect.getid]._rect.length; a++) {
                    var sp = this._GroupRect._group[this._GroupRect.getid]._rect[a];
                    if (this._GroupRect._group[this._GroupRect.getid]._rect[a].parent) {
                        this._GroupRect._group[this._GroupRect.getid]._rect[a].parent.removeChild(this._GroupRect._group[this._GroupRect.getid]._rect[a]);
                        this.addChild(sp);
                        sp.x = this.glodBg_Array[a].x;
                        sp.y = this.glodBg_Array[a].y;
                        for (var b = 0; b < this.main_map.Map_Array.length; b++) {
                            if (sp.x == this.main_map.Map_Array[b].x && sp.y == this.main_map.Map_Array[b].y) {
                                this.main_map.Map_Array[b].canDown = true;
                                var row = Math.floor(b / 10);
                                var col = b % 10;
                                sp.ROW = row;
                                sp.COL = col;
                                data.Block_Array[row * data.map_row + col] = sp;
                            }
                        }
                    }
                }
                //当格子移动到目标区域时 判断棋盘上是否可以消除一整行或者一整列；
                this.checkRect();
                data.CLICKNUM--;
                console.log("  data.CLICKNUM", data.CLICKNUM);
                for (var i = 0; i < data.rect_num_Array.length; i++) {
                    if (data.rect_num_Array[i] == this._GroupRect.getid) {
                        data.rect_num_Array.splice(i, 1);
                    }
                }
                data.click_post[this._GroupRect.getid].click = false;
                if (data.CLICKNUM == 0) {
                    this.CreateNewGroupRect(); //创建新的可选择方块组
                }
                data.Score += _scoreLen;
                this.Score_text.text = data.Score.toString();
                this.timerHandler(_scoreLen); //进度条工作
                data.Start_Layer.sound2.play(0, 1);
                /*保存数据*/
                var _savedata = [];
                var _saveDowndata = [];
                for (var i = 0; i < data.Block_Array.length; i++) {
                    if (data.Block_Array[i]) {
                        var _object = data.Block_Array[i];
                        _savedata.push({
                            rect_color: _object.COLOR,
                            rect_x: _object.x,
                            rect_y: _object.y,
                            rect_row: _object.ROW,
                            rect_col: _object.COL,
                            rect_type: _object.TYPE,
                            rect_rotationtype: _object.ROTATIONTYPE,
                            rect_canremove: _object.CANREMOVE,
                        });
                    }
                }
                for (var j = 0; j < data.rect_num_Array.length; j++) {
                    var _downdata = [];
                    if (this._GroupRect._group[j]) {
                        for (var m = 0; m < this._GroupRect._group[j]._rect.length; m++) {
                            var _object = this._GroupRect._group[j]._rect[m];
                            _downdata.push({
                                rect_color: _object.COLOR,
                                rect_x: _object.x,
                                rect_y: _object.y,
                                rect_row: _object.ROW,
                                rect_col: _object.COL,
                                rect_type: _object.TYPE,
                                rect_rotationtype: _object.ROTATIONTYPE,
                                rect_canremove: _object.CANREMOVE,
                                rect_CLICKNUM: data.rect_num_Array[j]
                            });
                        }
                        _saveDowndata[_saveDowndata.length] = _downdata;
                    }
                }
                var _value = this._progressBar.value;
                var _score = data.Score;
                if (data.readDateArray && data.readDateArray._bestScore != null) {
                    if (data.Score > data.BestScore) {
                        data.BestScore = data.Score;
                    }
                    else {
                        data.BestScore = data.readDateArray._bestScore;
                    }
                }
                else {
                    data.BestScore = data.Score;
                }
                var _bestScore = data.BestScore;
                var _update_num = data.UPDATE_data;
                var _rotation_num = data.ROTATION_data;
                var _Maxvalue = this._progressBar.maximum;
                var level1 = data._level + 1;
                this.SaveData(_savedata, _saveDowndata, _value, _Maxvalue, _score, _bestScore, _update_num, _rotation_num, level1);
                /*保存数据    ----------end*/
            }
            else {
                this._GroupRect._group[this._GroupRect.getid].scaleX = 0.5;
                this._GroupRect._group[this._GroupRect.getid].scaleY = 0.5;
                this._GroupRect._group[this._GroupRect.getid].x = data.DOWN_POSTION[this._GroupRect.getid][0];
                this._GroupRect._group[this._GroupRect.getid].y = data.DOWN_POSTION[this._GroupRect.getid][1];
            }
            this.remove_glodBg_Array(); //移除背景提示框;
            this._GroupRect.ISCLICK = false; //判断是否点击到目标方块。
            this.CheckGameOVer();
        }
    };
    game.prototype.SaveData = function (_upData, _downData, _value, _Maxvalue, _score, _bestScore, _update_num, _rotation_num, _level) {
        if (_upData) {
            data.saveDataArray.gameArray.up_game = _upData;
        }
        if (_downData) {
            data.saveDataArray.gameArray.down_game = [];
            for (var i = 0; i < data.saveDataArray.gameArray.down_game.length; i++) {
                data.saveDataArray.gameArray.down_game.splice(i, 1);
                i--;
            }
            data.saveDataArray.gameArray.down_game = _downData;
        }
        if (_value) {
            data.saveDataArray._value = _value;
        }
        if (_Maxvalue || _Maxvalue == 0) {
            data.saveDataArray._Maxvalue = _Maxvalue;
        }
        if (_level) {
            data.saveDataArray._level = _level;
        }
        if (_score) {
            data.saveDataArray._score = _score;
        }
        if (_bestScore) {
            data.saveDataArray._bestScore = _bestScore;
        }
        if (_update_num || _update_num == 0) {
            data.saveDataArray._update_num = _update_num;
        }
        if (_rotation_num || _rotation_num == 0) {
            data.saveDataArray._rotation_num = _rotation_num;
        }
        console.log("保存", data.saveDataArray);
        egret.localStorage.setItem("saveDataArray", JSON.stringify(data.saveDataArray));
    };
    game.prototype.CheckGameOVer = function () {
        /*data.rect_num_Array 数组表示存储屏幕上剩余方块在数组中的下标*/
        var Is_exist = true; //判断地图上是否有位置可以放方块组
        for (var a = 0; a < data.rect_num_Array.length; a++) {
            for (var c = 0; c < this.main_map.Map_Array.length; c++) {
                var _Array = [];
                for (var b = 0; b < this._GroupRect._group[data.rect_num_Array[a]]._rect.length; b++) {
                    var sp_x1 = this._GroupRect._group[data.rect_num_Array[a]]._rect[0].x;
                    var sp_x2 = this._GroupRect._group[data.rect_num_Array[a]]._rect[b].x;
                    var sp_y1 = this._GroupRect._group[data.rect_num_Array[a]]._rect[0].y;
                    var sp_y2 = this._GroupRect._group[data.rect_num_Array[a]]._rect[b].y;
                    var row = this.main_map.Map_Array[c].row - (sp_y1 - sp_y2) / 60;
                    var col = this.main_map.Map_Array[c].col - (sp_x1 - sp_x2) / 60;
                    _Array.push({
                        _row: row,
                        _col: col
                    });
                }
                var candownNum = 0;
                for (var d = 0; d < _Array.length; d++) {
                    var d_row = _Array[d]._row;
                    var d_col = _Array[d]._col;
                    if (d_row >= 0 && d_row < data.map_row && d_col >= 0 && d_col < data.map_col) {
                        if (this.main_map.Map_Array[d_row * data.map_row + d_col] && !this.main_map.Map_Array[d_row * data.map_row + d_col].canDown) {
                            candownNum++;
                        }
                    }
                    else {
                        Is_exist = false;
                        break;
                    }
                }
                if (candownNum == _Array.length) {
                    Is_exist = true;
                    break;
                }
                else {
                    Is_exist = false;
                }
            }
            if (Is_exist) {
                break;
            }
        }
        if (Is_exist) {
        }
        else {
            //游戏结束
            var _timerPanel = new TimerPanel();
            data.Main_Layer.addChild(_timerPanel);
            _timerPanel.start();
        }
    };
    game.prototype.CreateNewGroupRect = function () {
        data.CLICKNUM = 3;
        data.rect_num_Array = [0, 1, 2];
        // this.removeChild(this._GroupRect);
        this._GroupRect = new GroupRect();
        this.addChildAt(this._GroupRect, 5);
        for (var a = 0; a < data.click_post.length; a++) {
            data.click_post[a].click = true;
        }
        //判断棋盘上是否能放下新创建的方块。
    };
    game.prototype.onClick_This_Cancel = function () {
        if (this._GroupRect.ISCLICK) {
            this._GroupRect._group[this._GroupRect.getid].scaleX = 0.5;
            this._GroupRect._group[this._GroupRect.getid].scaleY = 0.5;
            this._GroupRect._group[this._GroupRect.getid].x = data.DOWN_POSTION[this._GroupRect.getid][0];
            this._GroupRect._group[this._GroupRect.getid].y = data.DOWN_POSTION[this._GroupRect.getid][1];
            this._GroupRect.ISCLICK = false;
        }
    };
    game.prototype.checkRect = function () {
        var _needRemoveRectRow = [];
        var _needRemoveRectCol = [];
        //先从每行判断
        for (var a = 0; a < data.map_row; a++) {
            var index_row = 0;
            for (var b = 0; b < data.map_col; b++) {
                if (!data.Block_Array[a * data.map_row + b]) {
                    index_row++;
                    // break;
                }
            }
            if (index_row == 0) {
                var needRemoveRect_row = [];
                for (var i = 0; i < data.map_col; i++) {
                    needRemoveRect_row.push(data.Block_Array[a * data.map_row + i]);
                }
                var title_x = egret.MainContext.instance.stage.stageWidth / 2;
                var title_y = needRemoveRect_row[0].y;
                var COLOR_NUM = needRemoveRect_row[0].COLOR;
                var COLOR_BOOL = true;
                for (var j = 0; j < needRemoveRect_row.length; j++) {
                    if (needRemoveRect_row[j].COLOR != COLOR_NUM) {
                        COLOR_BOOL = false;
                    }
                }
                _needRemoveRectRow[_needRemoveRectRow.length] = {
                    needRemoveRect: needRemoveRect_row,
                    x: title_x,
                    y: title_y,
                    rotation: 0,
                    color: COLOR_BOOL
                };
                //  needRemoveRect_row;
            }
        }
        //从每列判断
        for (var a = 0; a < data.map_col; a++) {
            var index_col = 0;
            for (var b = 0; b < data.map_row; b++) {
                if (!data.Block_Array[b * data.map_row + a]) {
                    index_col++;
                    // break;
                }
            }
            if (index_col == 0) {
                var needRemoveRect_col = [];
                for (var i = 0; i < data.map_row; i++) {
                    needRemoveRect_col.push(data.Block_Array[i * data.map_row + a]);
                }
                /*判断这一行是否是有相同颜色的方块*/
                var COLOR_NUM = needRemoveRect_col[0].COLOR;
                var COLOR_col = true;
                for (var j = 0; j < needRemoveRect_col.length; j++) {
                    if (needRemoveRect_col[j].COLOR != COLOR_NUM) {
                        COLOR_col = false;
                    }
                }
                // _needRemoveRectCol[_needRemoveRectCol.length] = needRemoveRect_col;
                /*计算消除动画的坐标*/
                var col_x = needRemoveRect_col[0].x + 60;
                var rect_min = data.rect_y;
                var rect_max = data.rect_y + data.map_col * data.rect_width;
                var col_y = (rect_max - rect_min) / 2 + rect_min;
                /*计算消除动画的坐标     end*/
                _needRemoveRectCol[_needRemoveRectCol.length] = {
                    needRemoveRect: needRemoveRect_col,
                    x: col_x,
                    y: col_y,
                    rotation: 90,
                    color: COLOR_col
                };
            }
        }
        // console.log("横向：", needRemoveRect_row, "纵向：needRemoveRect_row.length", needRemoveRect_col.length)
        //将横向遍历和竖向遍历的统一在一个数组中
        var All_Array = [];
        for (var a = 0; a < _needRemoveRectCol.length; a++) {
            All_Array.push(_needRemoveRectCol[a]);
        }
        for (var a = 0; a < _needRemoveRectRow.length; a++) {
            All_Array.push(_needRemoveRectRow[a]);
        }
        if (All_Array.length > 0) {
            this.deleteRect(All_Array);
        }
    };
    game.prototype.deleteRect = function (_Array) {
        var same_color_num = 0;
        for (var a = 0; a < _Array.length; a++) {
            for (var b = 0; b < _Array[a].needRemoveRect.length; b++) {
                if (_Array[a].color) {
                    same_color_num++;
                }
                if (_Array[a].needRemoveRect[b].parent) {
                    _Array[a].needRemoveRect[b].parent.removeChild(_Array[a].needRemoveRect[b]);
                    data.Block_Array[_Array[a].needRemoveRect[b].ROW * data.map_row + _Array[a].needRemoveRect[b].COL] = null;
                    this.main_map.Map_Array[_Array[a].needRemoveRect[b].ROW * data.map_row + _Array[a].needRemoveRect[b].COL].canDown = false;
                    b--;
                }
            }
            this.CreateAnction(_Array[a].x, _Array[a].y, _Array[a].rotation);
            // this.click_num表示的是点击的方块组中有多少小方块。 same_color_num表示的是相同的方块有多少
            var _score = 0;
            if (same_color_num > 0) {
                _score = 2 * (Math.pow(2, same_color_num) * 10 + (same_color_num - 1) * 10) + (Math.pow(2, (_Array.length - same_color_num)) * 10 + ((_Array.length - same_color_num - 1)) * 10);
            }
            else {
                _score = (Math.pow(2, _Array.length) * 10 + (_Array.length - 1) * 10);
            }
            data.Score += _score;
            this.Score_text.text = data.Score.toString();
            this.timerHandler(_score); //进度条工作
            data.saveDataArray._score = data.Score; //保存数据
            data.Start_Layer.sound1.play(0, 1);
            this.SaveData(null, null, null, null, data.Score, null, null, null, null);
        }
    };
    game.prototype.remove_glodBg_Array = function () {
        for (var a = 0; a < this.glodBg_Array.length; a++) {
            if (this.glodBg_Array[a].parent) {
                this.glodBg_Array[a].parent.removeChild(this.glodBg_Array[a]);
                this.glodBg_Array.splice(a, 1);
                a--;
            }
        }
    };
    game.prototype.CreateAnction = function (x, y, _rotation) {
        // var data = RES.getRes("rainbow_ef_json");
        // var txtr = RES.getRes("rainbow_ef_png");
        var data = RES.getRes("test_json");
        var txtr = RES.getRes("test_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
        this.addChild(mc1);
        mc1.play(1);
        mc1.rotation = _rotation;
        mc1.anchorOffsetX = mc1.width / 2;
        mc1.anchorOffsetY = mc1.height / 2;
        mc1.x = x;
        mc1.y = y;
        mc1.addEventListener(egret.Event.COMPLETE, function (e) {
            if (mc1.parent) {
                mc1.parent.removeChild(mc1);
            }
        }, this);
    };
    game.prototype.addBtn = function () {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        var self = this;
        data.createBtn("button_01_png", function () {
            var _munu = new munu();
            self.addChild(_munu);
        }, egret_width - 80, 120, this);
        var btn1 = this.createBitmapByName("refresh_png");
        this.addChildAt(btn1, 10);
        btn1.x = egret.MainContext.instance.stage.stageWidth / 2 + btn1.width / 2;
        btn1.y = data.map_row * data.rect_width + data.rect_y + btn1.height / 2;
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //刷新底部出现的方块
            if (data.UPDATE_data > 0) {
                data.UPDATE_data--;
                this._updatedata.text = data.UPDATE_data.toString();
                for (var a = 0; a < this._GroupRect._group.length; a++) {
                    if (this._GroupRect._group[a]) {
                        this._GroupRect._group[a].parent.removeChild(this._GroupRect._group[a]);
                    }
                    // this._GroupRect._group[a] = null;
                }
                this.CreateNewGroupRect();
                this.SaveData(null, null, null, null, null, null, data.UPDATE_data, null, null);
            }
        }, this);
        var btn2 = this.createBitmapByName("transform_png");
        btn2.x = btn1.x + btn2.width / 2 + 100;
        btn2.y = data.map_row * data.rect_width + data.rect_y + btn2.height / 2;
        this.addChildAt(btn2, 10);
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //旋转底部出现的方块
            console.log("旋转底部出现的方块");
            if (data.ROTATION_data > 0) {
                data.ROTATION_data--;
                this._rotationdata.text = data.ROTATION_data.toString();
                this.SaveData(null, null, null, null, null, null, null, data.ROTATION_data, null);
                var _rotaPanel = new rotationPanel();
                data.Main_Layer.addChild(_rotaPanel);
            }
        }, this);
        var bg1 = new egret.Bitmap();
        bg1.texture = RES.getRes("number_bg_png");
        this.addChildAt(bg1, 11);
        bg1.x = egret.MainContext.instance.stage.stageWidth / 2 + btn1.width / 2 + 65;
        bg1.y = data.map_row * data.rect_width + data.rect_y + btn1.height / 2 - 5;
        this._updatedata = new egret.TextField();
        if (data.readDateArray && (data.readDateArray._update_num || data.readDateArray._update_num == 0)) {
            data.UPDATE_data = data.readDateArray._update_num;
        }
        if (data.readDateArray && (data.readDateArray._rotation_num || data.readDateArray._rotation_num == 0)) {
            data.ROTATION_data = data.readDateArray._rotation_num;
        }
        this._updatedata.text = data.UPDATE_data.toString();
        // data.UPDATE_data = parseInt(u_date);
        this.addChild(this._updatedata);
        this._updatedata.size = 20;
        this._updatedata.bold = true;
        this._updatedata.x = bg1.x + bg1.width / 2;
        this._updatedata.y = bg1.y + bg1.height / 2;
        this._updatedata.textColor = 0xffffff;
        this._updatedata.anchorOffsetX = this._updatedata.width / 2;
        this._updatedata.anchorOffsetY = this._updatedata.height / 2;
        var bg2 = new egret.Bitmap();
        bg2.texture = RES.getRes("number_bg_png");
        this.addChildAt(bg2, 11);
        bg2.x = btn1.x + btn2.width / 2 + 165;
        bg2.y = data.map_row * data.rect_width + data.rect_y + btn2.height / 2 - 5;
        this._rotationdata = new egret.TextField();
        this._rotationdata.text = data.ROTATION_data.toString();
        // data.ROTATION_data = parseInt(_rData);
        this.addChild(this._rotationdata);
        this._rotationdata.size = 20;
        this._rotationdata.bold = true;
        this._rotationdata.x = bg2.x + bg2.width / 2;
        this._rotationdata.y = bg2.y + bg2.height / 2;
        this._rotationdata.textColor = 0xffffff;
        this._rotationdata.anchorOffsetX = this._rotationdata.width / 2;
        this._rotationdata.anchorOffsetY = this._rotationdata.height / 2;
    };
    game.prototype.createGoldSprite = function (x, y) {
        var sp = this.createBitmapByName("geizibg_png");
        this.addChildAt(sp, 2);
        sp.x = x;
        sp.y = y;
        this.glodBg_Array.push(sp);
        this.setChildIndex(sp, 2);
    };
    game.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    ;
    game.prototype.addScorePanel = function () {
        if (data.readDateArray && data.readDateArray._score != null) {
            data.Score = data.readDateArray._score;
        }
        if (data.readDateArray && data.readDateArray._bestScore != null) {
            data.BestScore = data.readDateArray._bestScore;
        }
        this.Score_text = new egret.TextField();
        this.Score_text.text = data.Score.toString();
        this.Score_text.bold = false;
        this.addChild(this.Score_text);
        this.Score_text.size = 40;
        this.Score_text.bold = true;
        // text.width = 400;
        this.Score_text.x = egret.MainContext.instance.stage.stageWidth / 2 - 200;
        this.Score_text.y = 100;
        this.Score_text.anchorOffsetX = this.Score_text.width / 2;
        this.Score_text.anchorOffsetY = this.Score_text.height / 2;
        this.BestScore_text = new egret.TextField();
        this.BestScore_text.text = data.BestScore.toString();
        this.BestScore_text.bold = false;
        this.addChild(this.BestScore_text);
        this.BestScore_text.size = 40;
        this.BestScore_text.bold = true;
        // text.width = 400;
        this.BestScore_text.x = egret.MainContext.instance.stage.stageWidth / 2 + 150;
        this.BestScore_text.y = 100;
        this.BestScore_text.anchorOffsetX = this.BestScore_text.width / 2;
        this.BestScore_text.anchorOffsetY = this.BestScore_text.height / 2;
        // data.BestScore = parseInt(xcdmx);
        this.BestScore_text.textColor = 0xf0ff32;
        this.CreateTimerTiao();
    };
    game.prototype.CreateTimerTiao = function () {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var sp_height = 180;
        var btn2 = this.createBitmapByName("bar_empty_png");
        btn2.x = egret_width / 2;
        btn2.y = sp_height;
        this.addChildAt(btn2, 1);
        btn2.anchorOffsetX = btn2.width / 2;
        btn2.anchorOffsetY = btn2.height / 2;
        var exml = "<e:ProgressBar xmlns:e=\"http://ns.egret.com/eui\">\n                <e:Skin>\n                    <e:Image id=\"thumb\" width=\"100%\" height=\"100%\" source=\"resource/img/bar_fill.png\" scale9Grid=\"1,1,4,4\"/>\n                    <e:Label id=\"labelDisplay\" textColor=\"0xffffff\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n                </e:Skin>\n            </e:ProgressBar>";
        var clazz = EXML.parse(exml);
        this._progressBar = new clazz();
        this._progressBar.width = 260;
        this._progressBar.height = 26;
        if (data.readDateArray && data.readDateArray._value != null) {
            this._progressBar.minimum = data.readDateArray._value;
        }
        else {
            this._progressBar.minimum = 0;
        }
        if (data.readDateArray && data.readDateArray._Maxvalue != null) {
            this._progressBar.maximum = data.readDateArray._Maxvalue;
        }
        else {
            this._progressBar.maximum = data.addDaoju[data._level];
        }
        this._progressBar.maximum = data.addDaoju[data._level];
        this._progressBar.labelDisplay = null; //将进度条上的文本置为null
        this._progressBar.value = 0; //设置进度条的初始值
        this.addChildAt(this._progressBar, 5);
        this._progressBar.x = egret_width / 2;
        this._progressBar.y = sp_height;
        this._progressBar.anchorOffsetX = this._progressBar.width / 2;
        this._progressBar.anchorOffsetY = this._progressBar.height / 2;
        var btn = this.createBitmapByName("bar_leaf_png");
        btn.x = egret_width / 2;
        btn.y = sp_height;
        this.addChildAt(btn, 6);
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
    };
    game.prototype.timerHandler = function (value) {
        this._progressBar.value += value;
        console.log(this._progressBar.maximum);
        if (this._progressBar.value >= data.addDaoju[data._level]) {
            this._progressBar.value = 0;
            data._level++;
            this._progressBar.maximum = data.addDaoju[data._level];
            this.SaveData(null, null, null, this._progressBar.maximum, null, null, null, null, data._level + 1);
            var _addDaoju = new addDaoju();
            this.addChild(_addDaoju);
        }
    };
    return game;
}(egret.Sprite));
__reflect(game.prototype, "game");
