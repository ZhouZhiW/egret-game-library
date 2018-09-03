var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropViewManage = (function () {
    function PropViewManage(root) {
        this._currentID = -1;
        this._layer = root;
        this.init();
    }
    PropViewManage.prototype.init = function () {
        this._props = new Array();
        this.testdata();
    };
    /**
     * (测试)随机生成 道具 数量
     */
    PropViewManage.prototype.testdata = function () {
        for (var i = 0; i < 5; i++) {
            var prop = new PropView(i);
            prop.x = 15 + (5 + prop.width) * i;
            //console.log("道具宽度",prop.width);
            prop.y = GameData.stageH - prop.height - 10; //- 15;
            this._layer.addChild(prop);
            this._props.push(prop);
            prop.num = Math.floor(Math.random() * 5) + 10;
            prop.id = i;
            prop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        }
    };
    /**
     * 处理道具被点击事件
     */
    PropViewManage.prototype.click = function (evt) {
        if (this._currentID != -1) {
            this._props[this._currentID].setFocus(false);
            if (this._currentID == evt.currentTarget.id) {
                this._currentID = -1;
                PropViewManage.propType = -1;
            }
            else {
                this._currentID = evt.currentTarget.id;
                this._props[this._currentID].setFocus(true);
                PropViewManage.propType = this._props[this._currentID].proptype;
            }
        }
        else {
            this._currentID = evt.currentTarget.id;
            this._props[this._currentID].setFocus(true);
            PropViewManage.propType = this._props[this._currentID].proptype;
        }
    };
    /**
     * 使用道具
     */
    PropViewManage.prototype.useProp = function () {
        console.log("当前焦点ID", this._currentID);
        this._props[this._currentID].num--;
        this._props[this._currentID].setFocus(false);
        this._currentID = -1;
        PropViewManage.propType = -1;
    };
    return PropViewManage;
}());
PropViewManage.propType = -1; //道具类型
__reflect(PropViewManage.prototype, "PropViewManage");
//# sourceMappingURL=PropViewManage.js.map