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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.rankType = 1;
        _this.RankNum = 5; /*排行榜的展示最多排名个数*/
        _this.Rankpage = 0; /*排行榜起始页数*/
        _this.Ranklist = []; /*存储排行榜除背景的所有子类*/
        /**
         * 便于演示数据，这里使用家数据
         * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
         */
        _this.gameData = [];
        _this.rankArr = [];
        wx.onMessage(function (data) {
            console.log("主域传过来的数据", data);
            if (data.isDisplay) {
                _this.stage_w = data.stage_w;
                _this.stage_h = data.stage_h;
                _this.openid = data.openid;
                _this.userInfo = data.userInfo;
                _this.rankType = data.dataType;
                switch (data.dataType) {
                    case 1:
                        _this.getFriend();
                        break;
                    case 2:
                        _this.getGroup(data.shareTicket);
                        break;
                    case 3:
                        _this.getworld(data.gamedata);
                        break;
                }
                //监听消息 isDisplay
            }
            else {
                _this.cancelGame();
            }
        });
        //获取小游戏开放数据接口 --- 结束        
        // let imageLoader = new egret.ImageLoader();
        // imageLoader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
        //     let imageLoader = <egret.ImageLoader>event.currentTarget;
        //     this.bgtexture = new egret.Texture();
        //     this.bgtexture._setBitmapData(imageLoader.data);
        // }, this);
        // imageLoader.load("resource/assets/panel_shop_01.png");
        var imageLoader1 = new egret.ImageLoader();
        imageLoader1.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            _this.panel_01 = new egret.Texture();
            _this.panel_01._setBitmapData(imageLoader.data);
        }, _this);
        imageLoader1.load("resource/panel.png");
        var leftbtn = new egret.ImageLoader();
        leftbtn.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            _this.leftbtn = new egret.Texture();
            _this.leftbtn._setBitmapData(imageLoader.data);
        }, _this);
        leftbtn.load("resource/leftbutton.png");
        var righttbtn = new egret.ImageLoader();
        righttbtn.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            _this.rightbtn = new egret.Texture();
            _this.rightbtn._setBitmapData(imageLoader.data);
        }, _this);
        righttbtn.load("resource/rightbutton.png");
        var rankIdx = new egret.ImageLoader();
        rankIdx.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            _this.rankIdx = new egret.Texture();
            _this.rankIdx._setBitmapData(imageLoader.data);
        }, _this);
        rankIdx.load("resource/num.png");
        return _this;
    }
    Main.prototype.getFriend = function () {
        var _this = this;
        this.gameData = [];
        wx.getFriendCloudStorage({
            keyList: ["score"],
            success: function (res) {
                _this.gameData = _this.sortData(res.data);
                _this.runGame();
                _this.getDataOwn();
            },
            fail: function (err) {
                console.log(err);
            },
            complete: function () {
            }
        });
    };
    Main.prototype.getGroup = function (shareTicket) {
        var _this = this;
        this.gameData = [];
        wx.getGroupCloudStorage({
            shareTicket: shareTicket,
            keyList: ["score"],
            success: function (res) {
                console.log("getGroupCloudStorage", res);
                _this.gameData = _this.sortData(res.data);
                _this.runGame();
                _this.getDataOwn();
            },
            fail: function (err) {
                console.log(err);
            },
            complete: function () {
            }
        });
    };
    Main.prototype.getworld = function (data) {
        this.gameData = [];
        this.gameData = data[0];
        this.runGame();
        this.drawOwn(data[1][0], 1);
    };
    Main.prototype.runGame = function () {
        var _this = this;
        console.log("ss", this.numChildren);
        if (this.Rank_title) {
            this.Rank_title.parent.removeChild(this.Rank_title);
        }
        this.rankArr = [];
        this.Rankpage = 0;
        this.Rank_w = this.stage_w * 9 / 10;
        this.Rank_h = this.stage_h * 3 / 5;
        this.Rankbg = new egret.DisplayObjectContainer();
        this.Rankbg.x = this.stage_w / 2;
        this.Rankbg.y = this.stage_h / 2;
        this.Rankbg.width = this.Rank_w;
        this.Rankbg.height = this.Rank_h;
        this.Rankbg.anchorOffsetX = this.Rankbg.width / 2;
        this.Rankbg.anchorOffsetY = this.Rankbg.height / 2;
        this.addChild(this.Rankbg);
        var bitmap = new egret.Bitmap(this.panel_01);
        bitmap.width = this.Rank_w;
        bitmap.height = this.Rank_h;
        this.Rankbg.addChild(bitmap);
        var leftbtn = new egret.Bitmap(this.leftbtn);
        leftbtn.x = this.stage_w / 2 - 150;
        leftbtn.y = (this.stage_h - this.Rank_h) / 2 + this.Rank_h + 60;
        leftbtn.anchorOffsetX = leftbtn.width / 2;
        leftbtn.anchorOffsetY = leftbtn.height / 2;
        this.addChild(leftbtn);
        leftbtn.touchEnabled = true;
        leftbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upPage, this);
        var rightbtn = new egret.Bitmap(this.rightbtn);
        rightbtn.x = this.stage_w / 2 + 150;
        rightbtn.y = (this.stage_h - this.Rank_h) / 2 + this.Rank_h + 60;
        rightbtn.anchorOffsetX = rightbtn.width / 2;
        rightbtn.anchorOffsetY = rightbtn.height / 2;
        this.addChild(rightbtn);
        rightbtn.touchEnabled = true;
        rightbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
        var title1 = new egret.ImageLoader();
        title1.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            _this.title = new egret.Texture();
            _this.title._setBitmapData(imageLoader.data);
            _this.Rank_title = new egret.Bitmap(_this.title);
            _this.addChild(_this.Rank_title);
            _this.Rank_title.anchorOffsetX = _this.Rank_title.width / 2;
            _this.Rank_title.anchorOffsetY = _this.Rank_title.height;
            _this.Rank_title.x = _this.stage_w / 2;
            _this.Rank_title.y = _this.stage_h / 2 - _this.Rank_h / 2;
        }, this);
        title1.load("resource/rankingtitle" + this.rankType + ".png");
        console.log("this.rankType", this.rankType);
        this.initData();
    };
    Main.prototype.getDataOwn = function () {
        var data = null;
        var idx;
        for (var a = 0; a < this.gameData.length; a++) {
            if (this.gameData[a].openid == this.openid) {
                data = this.gameData[a];
                idx = a + 1;
                break;
            }
        }
        this.drawOwn(data, idx);
    };
    Main.prototype.drawOwn = function (data, idx) {
        var v = this.Rank_h / 360;
        var itemH = 5 * v * 55;
        var itemH1 = v * 63;
        var start_y = v * 12 + itemH;
        var _y = start_y + itemH1 / 2;
        if (data == null) {
            /*则没有上榜*/
            data = {
                KVDataList: [{ key: "score" }, { value: 0 }],
                avatarUrl: this.userInfo.avatarUrl,
                nickname: this.userInfo.nickname,
                openid: this.openid
            };
            this.drawRank(data, _y, "无", 1);
        }
        this.drawRank(data, _y, idx, 1);
    };
    Main.prototype.getChar = function (_str, _len) {
        var _ba = new egret.ByteArray;
        _ba.writeUTFBytes(_str);
        if (_ba.length < _len)
            return _str;
        _ba.position = 0;
        return _ba.readUTFBytes(_len) + "...";
    };
    Main.prototype.upPage = function () {
        if (this.Rankpage >= 1) {
            this.Rankpage--;
            this.initData();
        }
    };
    Main.prototype.nextPage = function () {
        this.Rankpage++;
        if (this.Rankpage * this.RankNum < this.gameData.length) {
            this.initData();
        }
        else {
            this.Rankpage--;
        }
    };
    Main.prototype.initData = function () {
        if (this.rankArr) {
            for (var a = 0; a < this.rankArr.length; a++) {
                this.rankArr[a].parent.removeChild(this.rankArr[a]);
                this.rankArr.splice(a, 1);
                a--;
            }
        }
        var startidx = this.RankNum * this.Rankpage;
        var v = this.Rank_h / 360;
        var itemH = v * 55;
        var start_y = v * 12 + itemH / 2;
        for (var a = startidx; a < startidx + this.RankNum; a++) {
            if (this.gameData[a]) {
                var _y = start_y + (a - startidx) * itemH;
                this.drawRank(this.gameData[a], _y, a + 1, 0);
            }
            else {
                break;
            }
        }
    };
    /*对数组进行排序*/
    Main.prototype.sortData = function (data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                var _score1 = data[j].KVDataList[0].value;
                var _score2 = data[j + 1].KVDataList[0].value;
                if (_score1 < _score2) {
                    var temp = data[j + 1]; //元素交换
                    data[j + 1] = data[j];
                    data[j] = temp;
                }
            }
        }
        return data;
    };
    Main.prototype.drawRank = function (data, _y, idx, num) {
        // let start_y = (this.stage_h - this.Rank_h) / 2 + 12 + itemH / 2;
        var _this = this;
        var _num = idx;
        var _headUrl = data.avatarUrl;
        var _str = this.getChar(data.nickname, 20);
        var _nickName = _str;
        var _score = data.KVDataList[0].value + "m";
        var _bili = this.Rank_w / 285;
        var s_x = 12 * _bili;
        var rankIdx;
        if (typeof _num == "number") {
            rankIdx = new egret.Bitmap(this.rankIdx);
            this.Rankbg.addChild(rankIdx);
            rankIdx.width = 50;
            rankIdx.height = 50;
            rankIdx.anchorOffsetY = rankIdx.height / 2;
            rankIdx.anchorOffsetX = rankIdx.width / 2;
            rankIdx.x = s_x + rankIdx.width / 2;
            rankIdx.y = _y;
            if (num == 0) {
                this.rankArr.push(rankIdx);
            }
            var text = new egret.TextField();
            text.text = _num + "";
            text.size = 30;
            this.Rankbg.addChild(text);
            text.anchorOffsetY = text.height / 2;
            text.anchorOffsetX = text.width / 2;
            text.y = _y;
            text.x = s_x + rankIdx.width / 2;
            if (num == 0) {
                this.rankArr.push(text);
            }
        }
        else {
            rankIdx = new egret.TextField();
            rankIdx.text = _num;
            this.Rankbg.addChild(rankIdx);
            rankIdx.anchorOffsetY = rankIdx.height / 2;
            rankIdx.anchorOffsetX = rankIdx.width / 2;
            rankIdx.y = _y;
            rankIdx.x = s_x + rankIdx.width / 2;
            if (num == 0) {
                this.rankArr.push(rankIdx);
            }
        }
        var image1 = new egret.ImageLoader();
        var image;
        var that = this;
        var url = _headUrl;
        var _bitmap;
        image1.addEventListener(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            image = new egret.Texture();
            image._setBitmapData(imageLoader.data);
            _bitmap = new egret.Bitmap(image);
            _bitmap.width = 60;
            _bitmap.height = 60;
            that.Rankbg.addChild(_bitmap);
            _bitmap.anchorOffsetY = _bitmap.height / 2;
            _bitmap.x = rankIdx.width / 2 + rankIdx.x + s_x / 2;
            _bitmap.y = _y;
            if (num == 0) {
                _this.rankArr.push(_bitmap);
            }
        }, this);
        image1.load(url);
        var nicktxt = new egret.TextField();
        nicktxt.text = _nickName;
        this.Rankbg.addChild(nicktxt);
        if (num == 0) {
            this.rankArr.push(nicktxt);
        }
        nicktxt.anchorOffsetY = nicktxt.height / 2;
        nicktxt.y = _y;
        // nicktxt.x = 3 * s_x / 2 + 110+10
        nicktxt.x = rankIdx.x + rankIdx.width / 2 + 60 + s_x;
        var numtxt = new egret.TextField();
        this.Rankbg.addChild(numtxt);
        numtxt.text = _score;
        numtxt.anchorOffsetX = numtxt.width;
        numtxt.anchorOffsetY = numtxt.height / 2;
        numtxt.y = _y;
        numtxt.x = this.Rank_w - 50;
        if (num == 0) {
            this.rankArr.push(numtxt);
        }
    };
    Main.prototype.cancelGame = function () {
        for (var i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
        console.log('停止开放数据域');
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
// // 微信关系数据的获取
// // 上传方法类似、开发者自行填写
// declare namespace wx {
//     /**
//      * 监听消息
//      */
//     const onMessage: (callback: (data: { [key: string]: any }) => void) => void;
//     /**
//      * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 	接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getFriendCloudStorage: (Object: {
//         keyList?: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
//      * @param shareTicket 群分享对应的 shareTicket
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getGroupCloudStorage: (Object: {
//         shareTicket: string,
//         keyList: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err?: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 用户数据
//      */
//     type UserGameData = {
//         /** 用户的微信头像 url */
//         avatarUrl: string,
//         /** 用户的微信昵称 */
//         nickName: string,
//         /** 用户的 openId */
//         openId: string,
//         /**用户自定义数据 */
//         KVList: KVData[]
//     }
//     type KVData = {
//         key: string,
//         value: string
//     }
// } 
