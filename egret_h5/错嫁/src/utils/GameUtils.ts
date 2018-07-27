/**
 *
 * @author 
 *
 */
class GameUtils {
    public static firstChapterId: number = 100000000000;
    public static is_iphone_x: boolean = false;
    public static loadingType: number;
    public static messageTime: egret.Timer;
    public static showADTime: egret.Timer;
    public static shortcutTime: egret.Timer;
    public static petTime: egret.Timer;
    public static petTimeindex: number = 0;
    public static checkAd: boolean = false;
    public static checktime: number = 60;
    public static check_ad_reward: number = 1;
    public static rewardsList: Array<RewardsBean> = new Array();
    public static messageList: Array<MessageBean> = new Array();
    public static propertyModeList: Array<PropertyModeBean> = new Array();
    public static shopModelList: Array<ShopModelBean> = new Array();
    public static endModelList: Array<TriggerModelBean> = new Array();
    public static openEndList: Array<TriggerOpenModelBean> = new Array();
    public static shopGoodsList: Array<ShopListBean> = new Array();
    public static friendBeanList: Array<FriendListBean> = new Array();
    public static tencentfriendBeanList: Array<FriendListTencentBean> = new Array();
    public static rankOtherList: Array<RankBean> = new Array();
    public static rankSelfList: Array<RankBean> = new Array();
    public static moregame_list: Array<MoreGameBean> = new Array();
    public static VipBean: VipBean;
    public static SHOUCHONG_GOODS_ID: number = -1;
    public static shareListBean: ShareListBean;
    public static playerBean: PlayerBean;
    public static playerfriendbean: PlayerFriendBean;
    public static fuhuo_zuanshi: number = 20;
    public static dateEventSprite: EventSprite;
    // public static tongji_url: string = "&chn=1758_cjtzf";
    public static tongji_url: string = "";
    public static noMoreGameStr: string = "hlmy_gw";
    public static hlmy_gw: string = "119_105566__";
    public static GAME_APPKEY_STR: string = "app_key";
    public static hlmygp_str: string = "hlmy_gp";
    public static hlmy_gp: string = "";
    public static INIT_STATE_STR: string = "state";
    public static HLMY_GIFT_STR: string = "GIFT";//玩吧专用
    public static HLMY_GIFTID_STR: string = "giftId";//1758专用
    public static hlmy_gift: string = "";
    public static is_hlmy_gift: boolean = false;
    public static isfrompet: boolean = false;
    public static FROMPET_STR: string = "isfrompet";
    public static initState: number = 0;
    public static noMoreGame: boolean = false;
    public static noYaoQing: boolean = false;
    public static noShare: boolean = false;
    public static noGongGao: boolean = false;
    public static noGuanZhu: boolean = false;
    public static noqqQun: boolean = false;
    public static qqGroupNum: string;
    public static noFriend: boolean = false;
    public static noDress: boolean = false;
    public static noRank: boolean = false;
    public static noFacialRecognition: boolean = false;//面部识别
    public static sequelUrl: string = "";//跳转第二季或者跳转到其他游戏
    public static openShortCutTime: boolean = false;
    public static noNationalDay: boolean = false;
    public static nationalDayidArr: Array<number> = new Array();
    public static addShortcut: boolean = false;//添加桌面图标
    public static setQQbackground: boolean = false;//设置QQ空间背景
    public static isQQcoin: boolean = false;//Q币充值活动
    public static show_off: boolean = false;//好友列表炫耀
    public static channelStr: string = "";//渠道名称
    public static isShowRecallList: boolean = false;//唤醒功能
    public static is_xuanyao_success: boolean = false;
    public static isNewPlayerFourDay: boolean = false;
    public static xingqubuluoUrl: string = "";//兴趣部落跳转
    public static isShowxingqubuluo: boolean = false;//兴趣部落跳转
    public static isWanbaQQshipin: boolean = false;//玩吧QQ视频
    public static dressUrl: string;
    public static noBookurl: boolean = false;
    public static firstOpenGame: boolean = false;
    public static MIANSI_ITEMCODE: number = 107716;//107253;
    public static isShowMiansiIcon: Boolean = false;
    public static isShowLibaoIcon: Boolean = false;
    public static gameSandPause: Boolean = false;
    public static isSound: boolean = true;
    public static gameSound: egret.Sound;
    public static gameSoundChannel: egret.SoundChannel;
    public static gameSoundName: string = "";
    public static TEXT_SIZE_LARGE: number = 36;
    public static TEXT_SIZE_MIDDLE: number = 28;
    public static TEXT_SIZE_SMALL: number = 20;
    public static SAVE_SOUND: string = "savesound";
    public static isLoadSoundError: boolean = false;
    public static SOUND_LOAD_TIMEOUT: number = 10000;
    public static draw_yuanbao_num: number;
    public static draw_jinpai_num: number;
    public static draw_tili_num: number;
    public static draw_miansi_num: number;
    public static miansi_price: number;
    public static checkFollow: number = 0;
    public static checkFollowSceneType: number = 0;
    public static isShopDiscounts: boolean = false;//商店折扣活动
    public static isMiansiDiscounts: boolean = false;//免死金牌折扣活动
    public static miansipriceStr: number = 28;//免死金牌原价
    public static isShowHongdongShop: boolean = false;//留存用户商店
    public static isShowVipShop: boolean = false;//VIP特价商品
    public static huodongShopGoodsList: Array<ShopListBean> = new Array();//留存用户商店
    //腾讯统计开关
    public static openMTA: boolean = true;
    //版本控制，上线版本号
    public static GAME_VERSION: string = "R103";
    //控制发送消息地址：0上线版本，1本地测试，2外网测试
    public static RELEASE_STAGE: number = 1;
    public static SEND_URL_RELEASE: string = "//cuojia.game.miaoware.cn/protocol";
    public static SEND_URL_TEST: string = "//192.168.10.62:9090/protocol";//高
    // public static SEND_URL_TEST: string = "//192.168.1.136:9090/protocol";//自己
    public static SEND_URL_NETTEST: string = "//cuojia.test.miaoware.cn/protocol";
    //
    public static APPKEY_1758: string = "55d4fbe9fae219129e05f39c6f733fde";
    public static MYAPPKEY_1758: string = "55d4fbe9fae219129e05f39c6f733fde";
    public static SCREEN_W: number = 540;
    public static SCREEN_H: number = 850;
    public static MAX_TILI: number = 12;

    public static tokenObj: Object;
    public static token: string;
    public static playerToken: string = "";
    public static playerGid: string = "";
    //
    public static authBean: AuthBean;
    public static userToken: string;
    public static fromDressGame: boolean = false;
    public static FROM_DRESS_STR: string = "inner";
    public static GET_DRESS_PLAYER_AVATAR: string = "";
    public static GET_DRESS_PLAYER_NAME: string = "";
    public static GET_DRESS_PLAYER_INNER: string = "";
    //  
    public static gameoverAppKey: string = "";
    public static AppKeyArr: Array<string> = new Array(
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
        "1f2a1aa919f8c220e7fde1a22693f795",
    );
    public static gameOverImgUrlArr: Array<string> = new Array(
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
        "//wres.miaoware.cn/jump/banner_mouni.png",
    );
    //  
    public constructor() {
    }
    public static saveGameSound(savesound: string) {
        egret.localStorage.setItem(GameUtils.SAVE_SOUND, savesound);
    }

    public static getPlayerToken() {
        GameUtils.token = egret.getOption("token");
        GameUtils.userToken = egret.getOption("userToken");
    }
    public static GetIsShowMore() {
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
        } else {
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
    }
    public static getToken() {
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
    }

    // public static addArmatureToFactory(factory: dragonBones.EgretFactory, dbData: string, dbtextureData: string, dbtexture: string) {
    //     var dragonData = RES.getRes(dbData);
    //     var dragontextureData = RES.getRes(dbtextureData);
    //     var dragontexture = RES.getRes(dbtexture);
    //     factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonData));
    //     factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(dragontexture, dragontextureData));

    // }
    public static stopSound(): void {
        if (GameUtils.gameSoundChannel) {
            GameUtils.gameSoundChannel.stop();
            GameUtils.gameSoundChannel = null;
        }
    }
    public static playSound(soundname: string): void {
        GameUtils.gameSound = RES.getRes(soundname);
        GameUtils.gameSoundChannel = GameUtils.gameSound.play();
        if (GameUtils.isSound) {
            GameUtils.gameSoundChannel.volume = 1;
        } else {
            GameUtils.gameSoundChannel.volume = 0;
        }
    }
}
