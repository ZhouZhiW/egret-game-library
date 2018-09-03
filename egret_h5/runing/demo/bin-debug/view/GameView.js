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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.skinName = GameViewSkin;
        return _this;
    }
    GameView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.width = Const.SW;
        this.height = Const.SH;
        this.startGame();
        GameUtils.gameDistance = 0;
        GameManager.getInstance().addEventListener("UPDATE", this.onUpdate, this);
    };
    GameView.prototype.startGame = function () {
        GameUtils.gameDistance = 0;
        GameUtils.parseMapData(1);
        var object = ObjectPool.getInstance().createObject(GameScene);
        var data = GameUtils.getLocalLookAtByDistance(Const.SW);
        this.updateMap(data);
    };
    GameView.prototype.onUpdate = function () {
        // console.log(GameUtils.gameDistance);
        this.lookAt(GameUtils.gameDistance);
    };
    GameView.prototype.lookAt = function (value) {
        if (value > 0 && value <= Const.SW / 2) {
        }
        else if (value > Const.MAP_WIDTH - Const.SW / 2) {
        }
        else {
            var data = GameUtils.getLocalLookAtByDistance(value + Const.SW / 2);
            this.updateMap(data);
        }
    };
    /**
     * 更新数据
     */
    GameView.prototype.updateMap = function (data) {
        var groundLayer = data["groundLayer"];
        var groundBigLayer = data["groundBigLayer"];
        var groundLayes = data["groundLayes"];
        var spineLayer = data["spineLayer"];
        var spineBigLayer = data["spineBigLayer"];
        var goldLayer = data["goldLayer"];
        var stoneLayer = data["stone"];
        var boxLayer = data["box"];
        var curId = GameManager.getInstance().curMapId;
        this.updateLayer(groundLayer, GroundObject, "map_" + curId + "_ground_png");
        this.updateLayer(groundBigLayer, FloorObject, "map_" + curId + "_grass_png");
        this.updateLayer(groundLayes, GroundObject, "map_" + curId + "_ground_png");
        this.updateLayer(spineLayer, BulletObject, "map_spine_png");
        this.updateLayer(spineBigLayer, BulletObject, "map_spine_big_png");
        this.updateLayer(goldLayer, GoldObject, "gold_png");
        this.updateLayer(stoneLayer, BulletObject, "map_stone_png");
        this.updateLayer(boxLayer, BulletObject, "map_box_png");
    };
    /**
     * 更新layer
     */
    GameView.prototype.updateLayer = function (layer, classFactory, res) {
        var len = layer.length;
        for (var i = 0; i < len; i++) {
            this.createMapBody(layer[i], classFactory, res);
        }
    };
    GameView.prototype.createMapBody = function (obj, classFactory, res, isReapt) {
        if (isReapt === void 0) { isReapt = false; }
        var object = ObjectPool.getInstance().createObject(classFactory);
        var blockGroup = this.blockGroup;
        console.log(res);
        if (RES.getRes(res) != null) {
            object.id = obj.id;
            object.setInfo(res, obj);
            blockGroup.addChild(object.bodyView);
            // console.log(classFactory, obj, res);
        }
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map