var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic(gameStage) {
        this._gameStage = gameStage;
        this.init();
    }
    GameLogic.prototype.init = function () {
        GameData.initData(); //初始化数据
        var levelData = RES.getRes("l1_json"); //初始化GameData数据
        MapDataParse.createMapData(levelData.map); //创建地图数据
        LevelGameDataParse.parseLevelGameData(levelData);
        ElementTypeParse.creatElementTypeData(levelData.element);
        this.mapc = new MapControl();
        this.mapc.createElementAllMap();
        var gbg = new GameBackGround();
        this._gameStage.addChild(gbg);
        gbg.changeBackground();
        var lec = new egret.Sprite();
        this._gameStage.addChild(lec);
        this.levm = new LevelReqViewManage(lec);
        this.levm.createCurrentLevelReq();
        var pvmc = new egret.Sprite();
        this._gameStage.addChild(pvmc);
        this.pvm = new PropViewManage(pvmc);
        var cc = new egret.Sprite();
        this._gameStage.addChild(cc);
        this.evm = new ElementViewManage(cc);
        this.evm.showAllElements();
        // /注册侦听器，即指定事件由  哪个对象  的哪个方法来接受
        //下面监听的事件 只能有evm 来触发
        this.evm.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER, this.removeAndOver, this);
        this.evm.addEventListener(ElementViewManageEvent.TAP_TWO_ELEMENT, this.viewTouchTap, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_MAP, this.createNewElement, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER, this.checkOtherElementLink, this);
        this.evm.addEventListener(ElementViewManageEvent.USE_PROP_CLICK, this.usePropClick, this);
    };
    /*-----------------------------携带道具被点击--------------------------------------*/
    GameLogic.prototype.usePropClick = function (evt) {
        PropLogic.useProp(PropViewManage.propType, evt.propToElementLocation); //操作数据
        this.pvm.useProp();
        this.removeAndOver(null); //播放删除动画
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------视图管理器中存在两个被tap的元素，进行判断--------------------------------------*/
    GameLogic.prototype.viewTouchTap = function (evt) {
        var rel = LinkLogic.canMove(evt.ele1, evt.ele2);
        if (rel) {
            //判断两个位置移动后是否可以消除
            var lineRel = LinkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].location, GameData.elements[evt.ele2].location);
            console.log("移动后是否能消除", lineRel);
            //执行移动
            if (lineRel) {
                //移动，然后消除
                console.log("消除动画");
                this.evm.changeLocationWithScaleOrBack(evt.ele1, evt.ele2);
                //更新步数
                if (GameData.stepNum >= 1) {
                    GameData.stepNum--;
                    this.levm.updateStep();
                }
            }
            else {
                this.evm.changeLocationWithScaleOrBack(evt.ele1, evt.ele2, true);
            }
        }
        else {
            this.evm.setNewElementFocus(evt.ele2); //两个元素从空间位置上不可交换，设置新焦点
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------元素置换动画播放结束，数据操作，并播放删除动画--------------------------------------*/
    /**
     * 即将删除的元素移动结束
     * 开始搜索删除数据，并且播放删除动画
     * 更新地图数据
     * 更新其他数据
     */
    GameLogic.prototype.removeAndOver = function (evt) {
        console.log("需要消除" + LinkLogic.lines);
        var len = LinkLogic.lines.length;
        var rel;
        for (var i = 0; i < len; i++) {
            var l = LinkLogic.lines[i].length;
            var eType = "";
            for (var t = 0; t < l; t++) {
                eType = GameData.elements[LinkLogic.lines[i][t]].type;
                rel = this.levm.haveReqType(eType);
                //有相同关卡类型,运动到指定位置
                if (rel) {
                    var p = this.levm.getPointByType(eType);
                    GameData.levelReq.changeReqNum(eType, 1);
                    this.levm.update();
                    this.evm.playReqRemoveAn(LinkLogic.lines[i][t], p.x, p.y);
                }
                else {
                    this.evm.playRemoveAni(LinkLogic.lines[i][t]);
                }
            }
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*---------------------------所有元素都删除完毕后，创建新元素，并刷新视图---------------------------------*/
    GameLogic.prototype.createNewElement = function (evt) {
        //多次调用 问题 通过计数器 解决
        console.log("刷新地图数据！！！！！！！！");
        this.mapc.updateMapLocation();
        this.evm.updateMapData();
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*-----------------------------删除动画完成后，检测地图中是否存在剩余可消除元素--------------------------------------*/
    GameLogic.prototype.checkOtherElementLink = function (evt) {
        if (LinkLogic.isHaveLine()) {
            this.removeAndOver(null);
        }
        else {
            console.log("检查是否有可消除元素!");
            if (!LinkLogic.isNextHaveLine()) {
                while (true) {
                    console.log("执行乱序");
                    LinkLogic.changeOrder(); //乱序
                    if (!LinkLogic.isHaveLine() && LinkLogic.isNextHaveLine()) {
                        this.evm.updateOrder();
                        break;
                    }
                }
            }
        }
        console.log("所有动画逻辑结束");
        //检测步数和关卡数
        this.isGameOver();
    };
    GameLogic.prototype.isGameOver = function () {
        console.log("过关元素是否清空", GameData.levelReq.isClear());
        if (!this.gameoverpanel) {
            if (GameData.stepNum == 0) {
                this.gameoverpanel = new GameOverPanel();
                this._gameStage.addChild(this.gameoverpanel);
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel.show(true);
                }
                else {
                    this.gameoverpanel.show(false);
                }
            }
            else {
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel = new GameOverPanel();
                    this._gameStage.addChild(this.gameoverpanel);
                    this.gameoverpanel.show(true);
                }
            }
        }
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map