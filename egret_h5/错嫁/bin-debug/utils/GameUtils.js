var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameUtils = (function () {
    //  
    function GameUtils() {
    }
    GameUtils.saveGameSound = function (savesound) {
        egret.localStorage.setItem(GameUtils.SAVE_SOUND, savesound);
    };
    GameUtils.getPlayerToken = function () {
        GameUtils.token = egret.getOption("token");
        GameUtils.userToken = egret.getOption("userToken");
    };
    GameUtils.GetIsShowMore = function () {
        if (egret.getOption(GameUtils.noMoreGameStr)) {
            GameUtils.hlmy_gw = egret.getOption(GameUtils.noMoreGameStr);
        }
        if (egret.getOption(GameUtils.FROM_DRESS_STR)) {
            GameUtils.fromDressGame = true;
            if (egret.getOption("avatar")) {
                GameUtils.GET_DRESS_PLAYER_AVATAR = egret.getOption("avatar");
            }
            if (egret.getOption("name")) {
                GameUtils.GET_DRESS_PLAYER_NAME = egret.getOption("name");
            }
            GameUtils.GET_DRESS_PLAYER_INNER = egret.getOption(GameUtils.FROM_DRESS_STR);
        }
        else {
            GameUtils.fromDressGame = false;
        }
        if (egret.getOption(GameUtils.hlmygp_str)) {
            GameUtils.hlmy_gp = egret.getOption(GameUtils.hlmygp_str);
        }
        if (egret.getOption(GameUtils.GAME_APPKEY_STR)) {
            GameUtils.APPKEY_1758 = egret.getOption(GameUtils.GAME_APPKEY_STR);
        }
        if (egret.getOption(GameUtils.INIT_STATE_STR)) {
            if (egret.getOption(GameUtils.INIT_STATE_STR) == "t2") {
                GameUtils.initState = 2;
            }
        }
        if (egret.getOption(GameUtils.HLMY_GIFT_STR)) {
            GameUtils.is_hlmy_gift = false;
            GameUtils.hlmy_gift = egret.getOption(GameUtils.HLMY_GIFT_STR);
        }
        if (egret.getOption(GameUtils.HLMY_GIFTID_STR)) {
            GameUtils.is_hlmy_gift = true;
            GameUtils.hlmy_gift = egret.getOption(GameUtils.HLMY_GIFTID_STR);
        }
        if (egret.getOption(GameUtils.FROMPET_STR)) {
            GameUtils.isfrompet = true;
        }
    };
    GameUtils.getToken = function () {
        GameUtils.tokenObj = new Object();
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            for (var i in u) {
                var j = u[i].split("=");
                GameUtils.tokenObj[j[0]] = j[1];
            }
        }
    };
    // public static addArmatureToFactory(factory: dragonBones.EgretFactory, dbData: string, dbtextureData: string, dbtexture: string) {
    //     var dragonData = RES.getRes(dbData);
    //     var dragontextureData = RES.getRes(dbtextureData);
    //     var dragontexture = RES.getRes(dbtexture);
    //     factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonData));
    //     factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(dragontexture, dragontextureData));
    // }
    GameUtils.stopSound = function () {
        if (GameUtils.gameSoundChannel) {
            GameUtils.gameSoundChannel.stop();
            GameUtils.gameSoundChannel = null;
        }
    };
    GameUtils.playSound = function (soundname) {
        GameUtils.gameSound = RES.getRes(soundname);
        GameUtils.gameSoundChannel = GameUtils.gameSound.play();
        if (GameUtils.isSound) {
            GameUtils.gameSoundChannel.volume = 1;
        }
        else {
            GameUtils.gameSoundChannel.volume = 0;
        }
    };
    GameUtils.firstChapterId = 100000000000;
    GameUtils.is_iphone_x = false;
    GameUtils.petTimeindex = 0;
    GameUtils.checkAd = false;
    GameUtils.checktime = 60;
    GameUtils.check_ad_reward = 1;
    GameUtils.rewardsList = new Array();
    GameUtils.messageList = new Array();
    GameUtils.propertyModeList = new Array();
    GameUtils.shopModelList = new Array();
    GameUtils.endModelList = new Array();
    GameUtils.openEndList = new Array();
    GameUtils.shopGoodsList = new Array();
    GameUtils.friendBeanList = new Array();
    GameUtils.tencentfriendBeanList = new Array();
    GameUtils.rankOtherList = new Array();
    GameUtils.rankSelfList = new Array();
    GameUtils.moregame_list = new Array();
    GameUtils.SHOUCHONG_GOODS_ID = -1;
    GameUtils.fuhuo_zuanshi = 20;
    // public static tongji_url: string = "&chn=1758_cjtzf";
    GameUtils.tongji_url = "";
    GameUtils.noMoreGameStr = "hlmy_gw";
    GameUtils.hlmy_gw = "119_105566__";
    GameUtils.GAME_APPKEY_STR = "app_key";
    GameUtils.hlmygp_str = "hlmy_gp";
    GameUtils.hlmy_gp = "";
    GameUtils.INIT_STATE_STR = "state";
    GameUtils.HLMY_GIFT_STR = "GIFT"; //玩吧专用
    GameUtils.HLMY_GIFTID_STR = "giftId"; //1758专用
    GameUtils.hlmy_gift = "";
    GameUtils.is_hlmy_gift = false;
    GameUtils.isfrompet = false;
    GameUtils.FROMPET_STR = "isfrompet";
    GameUtils.initState = 0;
    GameUtils.noMoreGame = false;
    GameUtils.noYaoQing = false;
    GameUtils.noShare = false;
    GameUtils.noGongGao = false;
    GameUtils.noGuanZhu = false;
    GameUtils.noqqQun = false;
    GameUtils.noFriend = false;
    GameUtils.noDress = false;
    GameUtils.noRank = false;
    GameUtils.noFacialRecognition = false; //面部识别
    GameUtils.sequelUrl = ""; //跳转第二季或者跳转到其他游戏
    GameUtils.openShortCutTime = false;
    GameUtils.noNationalDay = false;
    GameUtils.nationalDayidArr = new Array();
    GameUtils.addShortcut = false; //添加桌面图标
    GameUtils.setQQbackground = false; //设置QQ空间背景
    GameUtils.isQQcoin = false; //Q币充值活动
    GameUtils.show_off = false; //好友列表炫耀
    GameUtils.channelStr = ""; //渠道名称
    GameUtils.isShowRecallList = false; //唤醒功能
    GameUtils.is_xuanyao_success = false;
    GameUtils.isNewPlayerFourDay = false;
    GameUtils.xingqubuluoUrl = ""; //兴趣部落跳转
    GameUtils.isShowxingqubuluo = false; //兴趣部落跳转
    GameUtils.isWanbaQQshipin = false; //玩吧QQ视频
    GameUtils.noBookurl = false;
    GameUtils.firstOpenGame = false;
    GameUtils.MIANSI_ITEMCODE = 107716; //107253;
    GameUtils.isShowMiansiIcon = false;
    GameUtils.isShowLibaoIcon = false;
    GameUtils.gameSandPause = false;
    GameUtils.isSound = true;
    GameUtils.gameSoundName = "";
    GameUtils.TEXT_SIZE_LARGE = 36;
    GameUtils.TEXT_SIZE_MIDDLE = 28;
    GameUtils.TEXT_SIZE_SMALL = 20;
    GameUtils.SAVE_SOUND = "savesound";
    GameUtils.isLoadSoundError = false;
    GameUtils.SOUND_LOAD_TIMEOUT = 10000;
    GameUtils.checkFollow = 0;
    GameUtils.checkFollowSceneType = 0;
    GameUtils.isShopDiscounts = false; //商店折扣活动
    GameUtils.isMiansiDiscounts = false; //免死金牌折扣活动
    GameUtils.miansipriceStr = 28; //免死金牌原价
    GameUtils.isShowHongdongShop = false; //留存用户商店
    GameUtils.isShowVipShop = false; //VIP特价商品
    GameUtils.huodongShopGoodsList = new Array(); //留存用户商店
    //腾讯统计开关
    GameUtils.openMTA = true;
    //版本控制，上线版本号
    GameUtils.GAME_VERSION = "R103";
    //控制发送消息地址：0上线版本，1本地测试，2外网测试
    GameUtils.RELEASE_STAGE = 1;
    GameUtils.SEND_URL_RELEASE = "//cuojia.game.miaoware.cn/protocol";
    GameUtils.SEND_URL_TEST = "//192.168.10.62:9090/protocol"; //高
    // public static SEND_URL_TEST: string = "//192.168.1.136:9090/protocol";//自己
    GameUtils.SEND_URL_NETTEST = "//cuojia.test.miaoware.cn/protocol";
    //
    GameUtils.APPKEY_1758 = "55d4fbe9fae219129e05f39c6f733fde";
    GameUtils.MYAPPKEY_1758 = "55d4fbe9fae219129e05f39c6f733fde";
    GameUtils.SCREEN_W = 540;
    GameUtils.SCREEN_H = 850;
    GameUtils.MAX_TILI = 12;
    GameUtils.playerToken = "";
    GameUtils.playerGid = "";
    GameUtils.fromDressGame = false;
    GameUtils.FROM_DRESS_STR = "inner";
    GameUtils.GET_DRESS_PLAYER_AVATAR = "";
    GameUtils.GET_DRESS_PLAYER_NAME = "";
    GameUtils.GET_DRESS_PLAYER_INNER = "";
    //  
    GameUtils.gameoverAppKey = "";
    GameUtils.AppKeyArr = new Array(
    //错嫁2
    "9829bc8ab6d7e08b466d78dc059d2c94", 
    //嫡女心计
    "f9076631616f29698692c4a854b8bb3b", 
    //阴阳契
    "e4fb1a302689bca90a745c814d651949", 
    //一只嫡女出墙来
    "c872ad1380d1e7c1d9e86b554ecc23e3", 
    //重生21岁
    "c37d1aec2ed6a80a237a443186092213", 
    //错嫁1
    "55d4fbe9fae219129e05f39c6f733fde", 
    //美男
    "35c96c7880fa2cf283453273c85c97b4", 
    //妖妃
    "102c8461270c263c49e6d341451e82ae", 
    //以爱情
    "f818535e4af81a5591ea85a85a09d00f", 
    //谋逆千金
    "1f2a1aa919f8c220e7fde1a22693f795");
    GameUtils.gameOverImgUrlArr = new Array(
    //错嫁2
    "//wres.miaoware.cn/jump/banner_cuojia2.png", 
    //嫡女心计
    "//wres.miaoware.cn/jump/banner_dinv.png", 
    //阴阳契
    "//wres.miaoware.cn/jump/banner_yinyangqi.png", 
    //一只嫡女出墙来
    "//wres.miaoware.cn/jump/banner_yizhi.png", 
    //重生21岁
    "//wres.miaoware.cn/jump/banner_chongsheng.png", 
    //错嫁1
    "//wres.miaoware.cn/jump/banner_cuojia.png", 
    //美男
    "//wres.miaoware.cn/jump/banner_meinan.png", 
    //妖妃
    "//wres.miaoware.cn/jump/banner_yaofei.png", 
    //以爱情
    "//wres.miaoware.cn/jump/banner_yiaiqing.png", 
    //谋逆千金
    "//wres.miaoware.cn/jump/banner_mouni.png");
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
//# sourceMappingURL=GameUtils.js.map