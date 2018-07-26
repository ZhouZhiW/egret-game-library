
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"bin-debug/astar/AStar.js",
	"bin-debug/astar/ITile.js",
	"bin-debug/astar/Tile.js",
	"bin-debug/GameLayer.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/net/network/packetHandler/Login.js",
	"bin-debug/Main.js",
	"bin-debug/MapLoad.js",
	"bin-debug/MapPoint.js",
	"bin-debug/net/DateEvent.js",
	"bin-debug/net/network/Connection.js",
	"bin-debug/net/network/MsgType.js",
	"bin-debug/net/network/NetMsg.js",
	"bin-debug/net/network/packetHandler/Move.js",
	"bin-debug/net/network/PacketHandler.js",
	"bin-debug/Nmd.js",
	"bin-debug/PromptUI.js",
	"bin-debug/role/Hero.js",
	"bin-debug/role/Monster.js",
	"bin-debug/role/ResPlayer.js",
	"bin-debug/role/Role.js",
	"bin-debug/role/RolePool.js",
	"bin-debug/Type.js",
	"bin-debug/role/RoleConstant.js",
	"bin-debug/role/Tmd.js",
	"bin-debug/scene/GameScene.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
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
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: true,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};