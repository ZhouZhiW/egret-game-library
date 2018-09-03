var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 */
var ElementViewManage = (function (_super) {
    __extends(ElementViewManage, _super);
    function ElementViewManage(elementLayer) {
        var _this = _super.call(this) || this;
        /*-----------------------------焦点相关控制--------------------------------------*/
        _this._currentTapID = -1; //当前被点击（即将获取焦点）的元素ID，如为-1则表示没有元素获取焦点或无点击对象
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*-----------------------------动画播放控制--------------------------------------*/
        _this.moveEleNum = 0;
        _this.moveLocElementNum = 0;
        _this._layer = elementLayer;
        _this.init();
        return _this;
    }
    /**
     * 初始化所有数据变量
     */
    ElementViewManage.prototype.init = function () {
        this.elementViews = new Array();
        var len = GameData.MaxColumn * GameData.MaxRow;
        var el;
        for (var i = 0; i < len; i++) {
            el = new ElementView(this._layer);
            el.id = i;
            el.location = GameData.elements[i].location;
            this.elementViews.push(el);
            el.evm = this; // 给ElementView用来触发 ElementViewManageEvent事件
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.elTap, this);
        }
    };
    ElementViewManage.prototype.elTap = function (evt) {
        var ev = evt.currentTarget;
        if (PropViewManage.propType == -1) {
            //console.log(this._currentTapID);			
            if (this._currentTapID != -1) {
                if (ev.id == this._currentTapID) {
                    ev.setFocus(false);
                    this._currentTapID = -1;
                }
                else {
                    var event_1 = new ElementViewManageEvent(ElementViewManageEvent.TAP_TWO_ELEMENT); //点击第二个元素 回掉函数
                    event_1.ele1 = this._currentTapID;
                    event_1.ele2 = ev.id;
                    //console.log(event.ele1+"  "+event.ele2);
                    this.dispatchEvent(event_1);
                }
            }
            else {
                ev.setFocus(true);
                this._currentTapID = ev.id;
            }
        }
        else {
            if (this._currentTapID != -1) {
                this._currentTapID = -1;
            }
            var evt_1 = new ElementViewManageEvent(ElementViewManageEvent.USE_PROP_CLICK);
            evt_1.propToElementLocation = ev.location;
            this.dispatchEvent(evt_1);
        }
    };
    ElementViewManage.prototype.setNewElementFocus = function (location) {
        this.elementViews[this._currentTapID].setFocus(false);
        this.elementViews[location].setFocus(true);
        this._currentTapID = location;
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------显示所有元素，并播放出场动画--------------------------------------*/
    ElementViewManage.prototype.showAllElements = function () {
        this._layer.removeChildren();
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
        var ele;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    ele = this.elementViews[GameData.mapData[i][t]];
                    ele.setTexture("e" + GameData.elements[GameData.mapData[i][t]].type + "_png");
                    ele.x = ele.targetX();
                    ele.y = startY - ele.width;
                    ele.show((50 * GameData.MaxColumn * GameData.MaxRow - 50 * GameData.unmapnum) - (i * GameData.MaxRow + t) * 50);
                }
            }
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------播放 删除动画--------------------------------------*/
    /**
     * isBack = true
     * 可以交换，但是交换后没有发生位置移动
     * 移除焦点
     * 播放一个交换的动画，然后两个位置再换回来
     * isBack=false
     * 播放 删除动画-
    */
    ElementViewManage.prototype.changeLocationWithScaleOrBack = function (id1, id2, isBack) {
        if (isBack === void 0) { isBack = false; }
        //从 e1id 交换到 e2id
        var e1id = id1; //有焦点的元素
        var e2id = id2;
        if (this.elementViews[id2].focus) {
            e1id = id2;
            e2id = id1;
        }
        this.elementViews[e1id].setFocus(false);
        if (this._layer.getChildIndex(this.elementViews[e1id]) < this._layer.getChildIndex(this.elementViews[e2id])) {
            this._layer.swapChildren(this.elementViews[e1id], this.elementViews[e2id]);
        }
        if (isBack) {
            this.elementViews[e1id].moveAndBack(this.elementViews[e2id].location, true);
            this.elementViews[e2id].moveAndBack(this.elementViews[e1id].location);
        }
        else {
            this.elementViews[e1id].moveAndScale(this.elementViews[e2id].location, true);
            this.elementViews[e2id].moveAndScale(this.elementViews[e1id].location);
        }
        this._currentTapID = -1;
    };
    /**
     * 播放曲线动画，此类型动画用于可消除过关条件得情况
     */
    ElementViewManage.prototype.playReqRemoveAn = function (id, tx, ty) {
        this.moveEleNum++;
        var el = this.elementViews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playCurveMove(tx, ty);
    };
    /**
     * 播放放大动画，播放后直接删除,用于可删除元素，但元素类型不是关卡过关条件
     */
    ElementViewManage.prototype.playRemoveAni = function (id) {
        this.moveEleNum++;
        var el = this.elementViews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playRemoveAni();
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    //删除动画完成，现在更新地图元素
    ElementViewManage.prototype.updateMap = function (evt) {
        this.moveEleNum--;
        if (this.moveEleNum == 0) {
            this.dispatchEvent(evt);
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------更新整个地图中元素位置--------------------------------------*/
    ElementViewManage.prototype.updateMapData = function () {
        console.log("重新布局");
        var len = this.elementViews.length;
        //this.moveLocElementNum = 0;
        for (var i = 0; i < len; i++) {
            this.elementViews[i].location = GameData.elements[i].location;
            this.elementViews[i].setTexture("e" + GameData.elements[i].type + "_png");
            this.elementViews[i].moveNewLocation();
        }
    };
    ElementViewManage.prototype.moveNewLocationOver = function (event) {
        this.moveLocElementNum++;
        if (this.moveLocElementNum == (GameData.MaxColumn * GameData.MaxRow)) {
            var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
            this.dispatchEvent(evt);
            this.moveLocElementNum = 0; //重置
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------乱序操作，移动全部元素位置--------------------------------*/
    ElementViewManage.prototype.updateOrder = function () {
        //乱序移动指令触发
        var len = this.elementViews.length;
        egret.Tween.removeAllTweens();
        for (var i = 0; i < len; i++) {
            this.elementViews[i].location = GameData.elements[i].location;
            this.elementViews[i].move();
        }
    };
    return ElementViewManage;
}(egret.EventDispatcher));
__reflect(ElementViewManage.prototype, "ElementViewManage");
//# sourceMappingURL=ElementViewManage.js.map