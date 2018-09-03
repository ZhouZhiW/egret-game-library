
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/wor/role/RoleBase.js",
	"bin-debug/nodep/stage/BaseStage.js",
	"bin-debug/BaseLib/IGameLoad.js",
	"bin-debug/Datas/Base/BaseDataArrayCollection.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/nodep/comman/Comman.js",
	"bin-debug/nodep/config/GameConfig.js",
	"bin-debug/nodep/config/SceneConfig.js",
	"bin-debug/nodep/config/StartGameStageConfig.js",
	"bin-debug/nodep/config/StoryTitleConfig.js",
	"bin-debug/nodep/enum/MoveEnum.js",
	"bin-debug/nodep/map/MapInformation.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/nodep/sto/Local.js",
	"bin-debug/nodep/util/CreateMbUtil.js",
	"bin-debug/nodep/util/FogTileUtil.js",
	"bin-debug/nodep/util/FogUtil.js",
	"bin-debug/nodep/util/HeroUtil.js",
	"bin-debug/nodep/util/LayerUtil.js",
	"bin-debug/nodep/util/MapBlockUtil.js",
	"bin-debug/nodep/util/MoveUtil.js",
	"bin-debug/nodep/util/OperateLayterUtil.js",
	"bin-debug/BaseLib/IGameInterface.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/components/Base.js",
	"bin-debug/ui/components/DecoratorH.js",
	"bin-debug/ui/components/MoveBar.js",
	"bin-debug/ui/components/OvButton.js",
	"bin-debug/ui/components/StoryTitle.js",
	"bin-debug/ui/GemIcon.js",
	"bin-debug/ui/GreenButton.js",
	"bin-debug/ui/layer/FogLayer.js",
	"bin-debug/ui/stage/ControlStage.js",
	"bin-debug/ui/stage/GameManager.js",
	"bin-debug/ui/stage/StartGameStage.js",
	"bin-debug/ui/stage/UIStage.js",
	"bin-debug/ui/YellowButton.js",
	"bin-debug/Utils/GameData.js",
	"bin-debug/wor/map/CreateMapBlock.js",
	"bin-debug/wor/map/fog/FogLayerOperate.js",
	"bin-debug/wor/map/Move.js",
	"bin-debug/wor/map/SplitMap.js",
	"bin-debug/wor/role/hero/Hero.js",
	"bin-debug/wor/role/monster/Monster.js",
	"bin-debug/wor/role/npc/NPC.js",
	"bin-debug/nodep/util/SceneUtil.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:200,y:400,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};