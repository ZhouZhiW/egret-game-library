var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ElementView = (function (_super) {
    __extends(ElementView, _super);
    //游戏中的元素
    function ElementView(tParent) {
        var _this = _super.call(this) || this;
        _this.location = 0; //位置编号，用于提供移动使用
        /*-----------------------------ID 编号相关，携带测试信息-----------------------------------*/
        _this._id = -1; //ID编号，对应GameData.elements中的数据ID，与数据下标相同
        /*-------------------------------------焦点管理相关----------------------------------------*/
        _this._focus = false;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*-----------------------------------移动到新位置，乱序操作使用-----------------------------------------*/
        _this.speed = 700;
        _this.thisParent = tParent;
        _this.init();
        return _this;
    }
    Object.defineProperty(ElementView.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (v) {
            this._id = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化所有数据
     */
    ElementView.prototype.init = function () {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        var bitWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitWidth - 10;
        this.bitmap.height = bitWidth - 10;
        this.bitmap.x = -1 * bitWidth / 2;
        this.bitmap.y = -1 * bitWidth / 2;
        this.addChild(this.bitmap);
    };
    /**
     * 设置贴图
     */
    ElementView.prototype.setTexture = function (val) {
        this.bitmap.texture = RES.getRes(val);
    };
    Object.defineProperty(ElementView.prototype, "focus", {
        get: function () {
            return this._focus;
        },
        enumerable: true,
        configurable: true
    });
    //private _focusImg:egret.Bitmap;
    //设置选中状态的焦点样式
    ElementView.prototype.setFocus = function (val) {
        if (val != this.focus) {
            this._focus = val;
            if (val) {
                this.setTexture("e" + GameData.elements[this.id].type + "foucs_png");
            }
            else {
                this.setTexture("e" + GameData.elements[this.id].type + "_png");
            }
        }
    };
    //移动到新位置,使用cubicInOut算法移动，直线运动
    ElementView.prototype.move = function () {
        //console.log("乱序移动开始！",this.id,this.location,this.targetX(),this.targetY(),this.x,this.y);
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.cubicInOut);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-------------------------------------显示元素，从上方掉落----------------------------------------*/
    /*-------------------------------------掉落后添加到父级别显示列表-----------------------------------*/
    ElementView.prototype.show = function (wait) {
        var tw = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut);
    };
    ElementView.prototype.addThisToParent = function () {
        if (!this.parent) {
            this.thisParent.addChild(this);
        }
    };
    ElementView.prototype.targetX = function () {
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + girdWidth * (this.location % GameData.MaxColumn) + girdWidth / 2 + 5;
        return xx;
    };
    ElementView.prototype.targetY = function () {
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
        var yy = startY + girdWidth * (Math.floor(this.location / 8)) + girdWidth / 2 + 5;
        return yy;
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*--------------------------------------移动并且返回-------------------------------------*/
    /*----------------------用于用户交换两个对象，但未找到能够连接消除的时候使用------------------------*/
    //移动到另外一个位置，然后再移动回来
    ElementView.prototype.moveAndBack = function (location, isScale) {
        if (isScale === void 0) { isScale = false; }
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + girdWidth * (location % GameData.MaxColumn) + girdWidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
        var yy = startY + girdWidth * (Math.floor(location / GameData.MaxColumn)) + girdWidth / 2 + 5;
        //移动时候，不仅会移动位置，还会放到或者缩小，移动回来时，scale都设置为1
        var tw = egret.Tween.get(this);
        if (isScale) {
            tw.to({ x: xx, y: yy, scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicOut).call(this.back, this);
            ;
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.cubicOut).call(this.back, this);
            ;
        }
    };
    ElementView.prototype.back = function () {
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY(), scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicOut);
    };
    /*-----------------------------此动画用于移动元素，然后消除--------------------------------------*/
    //移动到另外一个位置，然后再返回原始的scale
    ElementView.prototype.moveAndScale = function (location, isScale) {
        if (isScale === void 0) { isScale = false; }
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        ;
        var xx = 20 + girdWidth * (location % GameData.MaxColumn) + girdWidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
        var yy = startY + girdWidth * (Math.floor(location / GameData.MaxRow)) + girdWidth / 2 + 5;
        var tw = egret.Tween.get(this);
        if (isScale) {
            tw.to({ x: xx, y: yy, scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).call(this.backScaleNoCall, this);
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.6, scaleY: 0.6 }, 300, egret.Ease.cubicInOut).call(this.backScale, this);
        }
    };
    ElementView.prototype.backScale = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut)
            .call(this.canRemove, this);
    };
    ElementView.prototype.backScaleNoCall = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
    };
    ElementView.prototype.canRemove = function () {
        //console.log("回调");
        var evt = new ElementViewManageEvent(ElementViewManageEvent.REMOVE_ANIMATION_OVER);
        this.evm.dispatchEvent(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------此动画用于将元素移动到关卡积分器位置,然后移除显示列表----------------------------*/
    /*-------------------------删除元素，当元素不属于关卡条件时，执行此动画---------------------------------*/
    //播放直接消除动画,自己放大，然后缩回到原有大小，然后删除
    ElementView.prototype.playRemoveAni = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
    };
    ElementView.prototype.removeAniCall = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
        // this.evm.dispatchEvent(evt);
        this.evm.updateMap(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-------------------------移动到新位置，方块被消除后重新生成下落使用---------------------------------*/
    /**
     * 播放曲线动画
     */
    ElementView.prototype.playCurveMove = function (tx, ty) {
        var tw = egret.Tween.get(this);
        tw.to({ x: tx, y: ty }, 700, egret.Ease.quadOut).call(this.overCurveMove, this);
    };
    ElementView.prototype.overCurveMove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
        this.evm.updateMap(evt);
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    //根据列编号，重新计算元素X轴位置，从其实Y轴开始播放下落动画
    ElementView.prototype.moveNewLocation = function () {
        //console.log(this.id,this.parent);
        if (!this.parent) {
            var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
            var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxColumn;
            this.y = startY - this.width;
            this.scaleX = 1;
            this.scaleY = 1;
            this.x = this.targetX();
            //被删除的元素要重新加入
            this.thisParent.addChild(this);
        }
        egret.Tween.get(this).to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this);
    };
    ElementView.prototype.moveNewLocationOver = function () {
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
        //this.evm.dispatchEvent(evt);
        this.evm.moveNewLocationOver(evt);
    };
    return ElementView;
}(egret.Sprite));
__reflect(ElementView.prototype, "ElementView");
//# sourceMappingURL=ElementView.js.map