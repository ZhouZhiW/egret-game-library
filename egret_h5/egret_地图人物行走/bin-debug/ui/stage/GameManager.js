var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**展现内容类，只要涉及到更改地图，需要设置此为null，必须先设置地图信息，再设置其他
 *
 */
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super.call(this) || this;
        /**地图信息
         *
         */
        _this.mapInfo = new MapInformation();
        _this.createMb = new CreateMapBlock();
        //人物移动类
        _this.roleMove = new Move();
        /**迷雾层处理类
         *
         */
        _this.fogOperate = new FogLayerOperate();
        _this.skinName = "resource/eui_skins/stageSkin/GameManagerSkin.exml";
        //绑定摄像机与其展现内容
        _this.camera.viewport = _this.goodsLayer;
        //添加ui界面
        _this.uiLayer.addChild(new UIStage(_this));
        return _this;
    }
    Object.defineProperty(GameManager.prototype, "hero", {
        get: function () {
            return this._hero;
        },
        set: function (value) {
            this._hero = value;
            //防止重复添加英雄
            if (this.heroLayer.numChildren == 0) {
                this.heroLayer.addChild(this._hero);
                this.mapInfoName = value.heroUtil.onMap;
                this.setGoodsLayer(value.heroUtil.onMap, value.x, value.y);
                this.setViewPort(this.mapInfo.width, this.mapInfo.height);
                this.fogOperate.fogLayer = this.fogLayer;
                this.fogOperate.init(value.x, value.y, 1, this.mapInfo);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**根据地图的大小设置摄像机大小及其所在的位置
     *
     * @param width 地图宽度
     * @param height 地图高度
     */
    GameManager.prototype.setViewPort = function (width, height) {
        var spaceH = this.camera.width - width;
        if (spaceH > 0) {
            this.camera.x = spaceH / 2;
            this.camera.width = width;
        }
        var spaceV = this.camera.height - height;
        if (spaceV > 0) {
            this.camera.y = spaceV / 2;
            this.camera.height = height;
        }
    };
    /**根据人物坐标设置3个层,此代码可做简化，暂时先不做了
     *
     * @param roleX role x坐标
     * @param roleY role y坐标
     */
    GameManager.prototype.setGoodsLayer = function (mapName, roleX, roleY) {
        var mapLayer = this.mapLayer;
        var npcLayer = this.npcLayer;
        var fogLayer = this.fogLayer;
        var existsLayerArray = new Array();
        //获取存在的mapBlock的名字集合 
        for (var childNumber = 0; childNumber < this.mapLayer.numChildren; childNumber++) {
            existsLayerArray.push(mapLayer.getChildAt(childNumber).name);
        }
        var operate = this.createMb.calculateNeedMbArray(mapName, roleX, roleY, this.camera.width, this.camera.height, this.mapInfo, existsLayerArray);
        //删除
        for (var deleteNumber = 0; deleteNumber < operate.deleteMbArray.length; deleteNumber++) {
            var name_1 = operate.deleteMbArray[deleteNumber];
            this.doRemove(name_1, mapLayer, GameConfig.MAP_LAYER);
            this.doRemove(name_1, npcLayer, GameConfig.NPC_LAYER);
            this.doRemove(name_1, fogLayer, GameConfig.FOG_LAYER);
        }
        //添加
        for (var addNumber = 0; addNumber < operate.needMbArray.length; addNumber++) {
            var layer = operate.needMbArray[addNumber];
            this.doAdd(layer.goodsLayer.get(GameConfig.MAP_LAYER), mapLayer);
            this.doAdd(layer.goodsLayer.get(GameConfig.NPC_LAYER), npcLayer);
            this.doAdd(layer.goodsLayer.get(GameConfig.FOG_LAYER), fogLayer);
        }
    };
    //删除layer
    GameManager.prototype.doRemove = function (name, layer, layerName) {
        var group = layer.getChildByName(name);
        if (group) {
            if (layerName == GameConfig.FOG_LAYER) {
                this.fogOperate.saveFog(this.hero.heroUtil.onMap, group.name, this.fogLayer.getChildAt(0).fogUtil);
            }
            layer.removeChild(group);
        }
    };
    //添加layer
    GameManager.prototype.doAdd = function (group, layer) {
        if (group.name != "") {
            layer.addChild(group);
        }
    };
    Object.defineProperty(GameManager.prototype, "mapInfoName", {
        get: function () {
            return this._mapInfoName;
        },
        set: function (value) {
            //获取地图信息资源并拷贝
            Comman.copyFrom(Comman.getRes(value), this.mapInfo);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager, "ins", {
        /**获取类单例，若为null则new一个
         *
         */
        get: function () {
            if (this._ins == null) {
                var res = Comman.getRes(GameConfig.START_CONFIG);
                this._ins = new GameManager();
            }
            return this._ins;
        },
        /**只能设置此为null
         *
         */
        set: function (value) {
            if (value != null) {
                return;
            }
            if (this._ins.parent) {
                this._ins.parent.removeChild(this._ins);
            }
            this._ins = value;
        },
        enumerable: true,
        configurable: true
    });
    //移动
    GameManager.prototype.move = function (moveEnum) {
        var movePoint = this.roleMove.move(moveEnum, this.hero, this.camera, this.mapInfo);
        //判断左右
        if (moveEnum == MoveEnum.LEFT || moveEnum == MoveEnum.RIGHT) {
            this.calculatePositionX(this.hero, this.camera, movePoint);
        }
        else if (moveEnum == MoveEnum.TOP || moveEnum == MoveEnum.BOTTOM) {
            this.calculatePositionY(this.hero, this.camera, movePoint);
        }
        //重新设置地图块
        this.setGoodsLayer(this.hero.heroUtil.onMap, this.hero.x, this.hero.y);
        this.fogOperate.init(this.hero.x, this.hero.y, 1, this.mapInfo);
    };
    //计算摄像机和人物在横向的坐标
    GameManager.prototype.calculatePositionX = function (hero, camera, movePoint) {
        hero.x = movePoint.realPosition;
        camera.viewport.scrollH = movePoint.scrollPosition;
    };
    //计算摄像机和人物在纵向的坐标
    GameManager.prototype.calculatePositionY = function (hero, camera, movePoint) {
        hero.y = movePoint.realPosition;
        camera.viewport.scrollV = movePoint.scrollPosition;
    };
    return GameManager;
}(BaseStage));
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map