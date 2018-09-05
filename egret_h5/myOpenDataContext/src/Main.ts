var showLoading = function (title) {
    wx.showLoading({
        title: title,
        mask: true,
        success: (res: any) => { },
        fail: (res: any) => { },
        complete: (res: any) => { }
    })
}
var closeLoading = function () {
    wx.hideLoading({
        success: (res: any) => { },
        fail: (res: any) => { },
        complete: (res: any) => { }
    })
}
class Main extends egret.DisplayObjectContainer {

    constructor() {
        super();

        wx.onMessage(data => {
            console.log("主域传过来的数据", data);
            // showLoading("正在加载")
            if (data.isDisplay) {
                this.stage_w = data.stage_w;
                this.stage_h = data.stage_h;
                this.openid = data.openid;
                this.userInfo = data.userInfo;
                this.rankType = data.dataType;
                var _obj = wx.getSystemInfoSync();
                if (1136 / _obj.windowHeight > 640 / _obj.windowWidth) {
                    console.log("'sssss");

                    this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                }
                switch (data.dataType) {
                    case 1:
                        this.getFriend();

                        break
                    case 2:
                        this.getGroup(data.shareTicket)
                        break
                    case 3:
                        this.getworld(data.gamedata);
                        break
                }
                //监听消息 isDisplay
            } else {
                var _obj = wx.getSystemInfoSync();
                if (1136 / _obj.windowHeight > 640 / _obj.windowWidth) {
                    console.log("'sssss");

                    this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                }
                this.cancelGame();
                if (data.isOpenfirend) {
                    this.openFriend(data);
                }

                // this.deleteRanktitle();
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

        var imgUrl = "openDataContext/assets"
        let title1 = new egret.ImageLoader();
        title1.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.title1 = new egret.Texture();
            this.title1._setBitmapData(imageLoader.data);

        }, this);
        title1.load(imgUrl + "/rankingtitle1.png");
        let title2 = new egret.ImageLoader();
        title2.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.title2 = new egret.Texture();
            this.title2._setBitmapData(imageLoader.data);

        }, this);
        title2.load(imgUrl + "/rankingtitle2.png");
        let title3 = new egret.ImageLoader();
        title3.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.title3 = new egret.Texture();
            this.title3._setBitmapData(imageLoader.data);

        }, this);
        title3.load(imgUrl + "/rankingtitle3.png");

        let imageLoader1 = new egret.ImageLoader();
        imageLoader1.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.panel_01 = new egret.Texture();
            this.panel_01._setBitmapData(imageLoader.data);
        }, this);
        imageLoader1.load(imgUrl + "/panel.png");

        let leftbtn = new egret.ImageLoader();
        leftbtn.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.leftbtn = new egret.Texture();
            this.leftbtn._setBitmapData(imageLoader.data);
        }, this);
        leftbtn.load(imgUrl + "/leftbutton.png");

        let righttbtn = new egret.ImageLoader();
        righttbtn.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.rightbtn = new egret.Texture();
            this.rightbtn._setBitmapData(imageLoader.data);
        }, this);
        righttbtn.load(imgUrl + "/rightbutton.png");

        let rankIdx = new egret.ImageLoader();
        rankIdx.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.rankIdx = new egret.Texture();
            this.rankIdx._setBitmapData(imageLoader.data);
        }, this);
        rankIdx.load(imgUrl + "/num.png");
        let gamets = new egret.ImageLoader();
        gamets.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            this.game_ts = new egret.Texture();
            this.game_ts._setBitmapData(imageLoader.data);
        }, this);
        gamets.load(imgUrl + "/endfrinedbg.png");




    }
    private game_ts
    private rankType = 1;
    private Rankbg;/*排版榜背景图*/
    private panel_01: egret.Texture;
    private leftbtn;
    private rightbtn;
    private rankIdx;
    private title;
    private title1;
    private title2;
    private title3;
    private userInfo;

    private openid;/* 接受从主域传来的openid*/


    private stage_w;/*舞台宽度*/
    private stage_h;/*舞台高度*/
    private Rank_w;/*排行榜宽度*/
    private Rank_h;/*排行榜高度*/
    private RankNum = 5;/*排行榜的展示最多排名个数*/
    private Rankpage = 0;/*排行榜起始页数*/
    private Ranklist = [];/*存储排行榜除背景的所有子类*/
    /**
     * 便于演示数据，这里使用家数据
     * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
     */
    private gameData = [

    ]
    /*获取好友排行的详细信息*/
    private getFriend() {
        this.gameData = [];
        wx.getFriendCloudStorage({
            keyList: ["score"],
            success: res => {
                // closeLoading();
                this.gameData = this.sortData(res.data);
                this.runGame();
                this.getDataOwn();
            },
            fail: err => {
                console.log(err);
            },
            complete: () => {

            }
        });

    }
    /*获取组排行的排位信息*/
    private getGroup(shareTicket) {
        this.gameData = [];
        wx.getGroupCloudStorage({
            shareTicket: shareTicket,
            keyList: ["score"],
            success: res => {
                // closeLoading();
                console.log("getGroupCloudStorage", res);
                this.gameData = this.sortData(res.data);

                this.runGame();
                this.getDataOwn();
            },
            fail: err => {
                console.log(err);
            },
            complete: () => {

            }
        });
    }
    /*打开世界榜*/
    private getworld(data) {
        // closeLoading();
        this.gameData = [];
        this.gameData = data[0];
        this.runGame();
        var idx = null
        if (data) {
            idx = data[1][0].rankNo;
            this.drawOwn(data[1][0], idx);
        } else {
            idx = null;
            this.drawOwn([], idx);
        }
    }
    /*打开好友榜*/
    private openFriend(data) {
        var _w = data.stage_w;
        var _h = data.stage_h;
        var _score = data.socre;
        wx.getFriendCloudStorage({
            keyList: ["score"],
            success: res => {
                var data = this.sortData(res.data);
                this.addbit(data, _w, _h, _score)
            },
            fail: err => {
                console.log(err);
            },
            complete: () => {

            }
        });
    }
    /*部分逻辑实现*/
    private addbit(gameArr: Array<any>, _w, _h, socre) {
        var _sco;
        var _url;
        for (var a = gameArr.length - 1; a > 0; a--) {
            if (socre < gameArr[a].KVDataList[0].value) {
                _sco = gameArr[a].KVDataList[0].value + "m";
                _url = gameArr[a].avatarUrl;
                break;
            }
        }
        if (_sco && _url) {
            var _obj = wx.getSystemInfoSync();
            var bili = 1136 / _obj.windowHeight;
            if (1136 / _obj.windowHeight > 640 / _obj.windowWidth) {
                bili = 1136 / 640 / _obj.windowWidth
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            var gamtts_h = 98 / bili
            this.friendBg = new egret.DisplayObjectContainer();
            this.friendBg.x = _w / 2;
            this.friendBg.y = _h * 9 / 100;
            this.friendBg.width = 9 / 10 * _w;
            this.friendBg.height = gamtts_h;
            this.friendBg.anchorOffsetX = this.friendBg.width / 2;
            this.friendBg.anchorOffsetY = this.friendBg.height / 2;
            this.addChild(this.friendBg);
            var shape = new egret.Bitmap(this.game_ts);
            this.friendBg.addChild(shape);
            shape.width = 9 / 10 * _w;
            shape.height = gamtts_h;
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            shape.x = this.friendBg.width / 2;
            shape.y = this.friendBg.y;

            this.drawFrined(_sco, _url);

        }

    }
    private friendBg;
    /*超越好友*/
    private drawFrined(_txt, _url) {
        var _text = "下一个即将超越的好友:";
        var txt = new egret.TextField();
        txt.text = _text
        txt.size = 25;
        txt.textColor = 0xe5e375;
        this.friendBg.addChild(txt);
        txt.anchorOffsetY = txt.height / 2
        txt.y = this.friendBg.y;
        txt.x = 50;
        var _len = _text.length * txt.size

        let image1 = new egret.ImageLoader();
        var image;
        var that = this;
        let _bitmap
        image1.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            image = new egret.Texture();
            image._setBitmapData(imageLoader.data);
            _bitmap = new egret.Bitmap(image);
            _bitmap.width = this.friendBg.height * 8 / 10;
            _bitmap.height = this.friendBg.height * 8 / 10;
            that.friendBg.addChild(_bitmap);
            _bitmap.anchorOffsetY = _bitmap.height / 2;
            _bitmap.x = txt.x + _len
            _bitmap.y = this.friendBg.y

        }, this);
        image1.load(_url);
        var txt1 = new egret.TextField();
        txt1.text = _txt;
        txt1.textColor = 0xe5e375;
        txt1.size = 25;
        this.friendBg.addChild(txt1);
        txt1.anchorOffsetY = txt.height / 2
        txt1.y = this.friendBg.y;
        txt1.x = txt.x + _len + 5 + this.friendBg.height * 8 / 10 + 5;

    }

    private runGame() {
        console.log("ss", this.numChildren)
        if (this.Rank_title && this.Rank_title.parent) {
            this.Rank_title.parent.removeChild(this.Rank_title)
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

        let bitmap = new egret.Bitmap(this.panel_01);
        bitmap.width = this.Rank_w;
        bitmap.height = this.Rank_h;
        this.Rankbg.addChild(bitmap);
        switch (this.rankType) {
            case 1:
                this.title = this.title1;
                break
            case 2:
                this.title = this.title2;
                break
            case 3:
                this.title = this.title3;
                break
        }
        if (this.Rank_title && this.Rank_title.parent) {
            this.Rank_title.parent.removeChild(this.Rank_title);
            this.Rank_title = new egret.Bitmap(this.title);
            this.addChild(this.Rank_title);
            this.Rank_title.anchorOffsetX = this.Rank_title.width / 2;
            this.Rank_title.anchorOffsetY = this.Rank_title.height;
            this.Rank_title.x = this.stage_w / 2;
            this.Rank_title.y = this.stage_h / 2 - this.Rank_h / 2;

        } else {
            this.Rank_title = new egret.Bitmap(this.title);
            this.addChild(this.Rank_title);
            this.Rank_title.anchorOffsetX = this.Rank_title.width / 2;
            this.Rank_title.anchorOffsetY = this.Rank_title.height;
            this.Rank_title.x = this.stage_w / 2;
            this.Rank_title.y = this.stage_h / 2 - this.Rank_h / 2;
        }



        let leftbtn = new egret.Bitmap(this.leftbtn);
        leftbtn.x = this.stage_w / 2 - 150;
        leftbtn.y = (this.stage_h - this.Rank_h) / 2 + this.Rank_h + 60;
        leftbtn.anchorOffsetX = leftbtn.width / 2;
        leftbtn.anchorOffsetY = leftbtn.height / 2;
        this.addChild(leftbtn);
        leftbtn.touchEnabled = true;
        leftbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upPage, this)

        let rightbtn = new egret.Bitmap(this.rightbtn);
        rightbtn.x = this.stage_w / 2 + 150;
        rightbtn.y = (this.stage_h - this.Rank_h) / 2 + this.Rank_h + 60;
        rightbtn.anchorOffsetX = rightbtn.width / 2;
        rightbtn.anchorOffsetY = rightbtn.height / 2;
        this.addChild(rightbtn);
        rightbtn.touchEnabled = true;
        rightbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)

        this.initData();

    }
    private getDataOwn() {
        var data = null;
        var idx = null;
        for (var a = 0; a < this.gameData.length; a++) {
            if (this.gameData[a].openid == this.openid) {
                data = this.gameData[a];
                idx = a + 1;
                break;
            }
        }
        this.drawOwn(data, idx);

    }
    /*绘制没有上榜的玩家*/
    private drawOwn(data, idx) {
        var v = this.Rank_h / 360;
        var itemH = 5 * v * 55
        var itemH1 = v * 63
        var start_y = v * 12 + itemH;
        var _y = start_y + itemH1 / 2;
        if (data == null || data.length <= 0) {
            /*则没有上榜*/
            data = {
                KVDataList: [{ key: "score", value: 0 }],
                avatarUrl: this.userInfo.avatarUrl,
                nickname: this.userInfo.nickName,
                openid: this.openid
            }
            this.drawRank(data, _y, "未上榜", 1);
        } else {
            if (idx > data.length) {
                this.drawRank(data, _y, "未上榜", 1);
            } else {
                this.drawRank(data, _y, idx, 1);
            }
        }
    }
    private getChar(_str: string, _len: number): string {
        var _ba: egret.ByteArray = new egret.ByteArray;
        _ba.writeUTFBytes(_str);
        if (_ba.length < _len) return _str;
        _ba.position = 0;
        return _ba.readUTFBytes(_len) + "...";
    }
    /*向上翻页*/
    private upPage() {
        if (this.Rankpage >= 1) {
            this.Rankpage--
            this.initData()
        }
    }
    /*向下翻页*/
    private nextPage() {
        this.Rankpage++
        if (this.Rankpage * this.RankNum < this.gameData.length) {
            this.initData()
        } else {
            this.Rankpage--
        }
    }
    /*初始化数据*/
    private initData() {
        if (this.rankArr) {
            for (var a = 0; a < this.rankArr.length; a++) {
                if (this.rankArr[a].parent) {
                    this.rankArr[a].parent.removeChild(this.rankArr[a]);
                    this.rankArr.splice(a, 1);
                    a--;
                }
            }
        }
        var startidx = this.RankNum * this.Rankpage;
        var v = this.Rank_h / 360;
        var itemH = v * 55
        var start_y = v * 12 + itemH / 2;
        if (this.gameData.length > 0) {
            for (var a = startidx; a < startidx + this.RankNum; a++) {
                if (this.gameData[a]) {
                    var _y = start_y + (a - startidx) * itemH;
                    this.drawRank(this.gameData[a], _y, a + 1, 0)
                } else {
                    break;
                }
            }
        } else {
            let text = new egret.TextField();
            text.text = "暂无排名";
            text.size = 30;
            this.Rankbg.addChild(text);
            text.anchorOffsetY = text.height / 2
            text.anchorOffsetX = text.width / 2
            text.y = start_y;
            text.x = this.Rank_w / 2;

        }

    }
    /*对数组进行排序*/
    private sortData(array: Array<any>) {
        if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
            var len = array.length, temp;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (array[j].KVDataList.length == 0) {
                        array[j].KVDataList = [{ value: '0' }]
                    }
                    if (array[j + 1].KVDataList.length == 0) {
                        array[j + 1].KVDataList = [{ value: '0' }]
                    }
                    if (parseInt(array[j].KVDataList[0].value) < parseInt(array[j + 1].KVDataList[0].value)) {
                        temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            }
            return array;
          
        }
    }
    private rankArr = [];
    private Rank_title: egret.Bitmap
    /*绘制排行榜*/
    private drawRank(data, _y, idx, num) {

        // let start_y = (this.stage_h - this.Rank_h) / 2 + 12 + itemH / 2;

        var _num = idx;
        var _headUrl = data.avatarUrl;
        var _str = this.getChar(data.nickname, 20)
        var _nickName = _str;
        var _score = data.KVDataList[0].value + "m";
        var _bili = this.Rank_w / 285
        var s_x = 12 * _bili
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

            let text = new egret.TextField();
            text.text = _num + "";
            text.size = 30;
            this.Rankbg.addChild(text);
            text.anchorOffsetY = text.height / 2
            text.anchorOffsetX = text.width / 2
            text.y = _y;
            text.x = s_x + rankIdx.width / 2;
            if (num == 0) {
                this.rankArr.push(text)
            }

        } else {
            rankIdx = new egret.TextField();
            rankIdx.text = _num;
            rankIdx.size = 20;
            this.Rankbg.addChild(rankIdx);
            rankIdx.anchorOffsetY = rankIdx.height / 2
            rankIdx.anchorOffsetX = rankIdx.width / 2
            rankIdx.y = _y;
            rankIdx.x = s_x + rankIdx.width / 2;
            if (num == 0) {
                this.rankArr.push(rankIdx)
            }

        }






        let image1 = new egret.ImageLoader();
        var image;
        var that = this;
        let url = _headUrl
        let _bitmap
        image1.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
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

                this.rankArr.push(_bitmap)
            }
        }, this);
        image1.load(url);


        let nicktxt = new egret.TextField();

        nicktxt.text = _nickName;
        this.Rankbg.addChild(nicktxt);
        if (num == 0) {

            this.rankArr.push(nicktxt)
        }
        nicktxt.anchorOffsetY = nicktxt.height / 2;
        nicktxt.y = _y;
        // nicktxt.x = 3 * s_x / 2 + 110+10
        nicktxt.x = rankIdx.x + rankIdx.width / 2 + 60 + s_x;



        let numtxt = new egret.TextField();
        this.Rankbg.addChild(numtxt);
        numtxt.text = _score;
        numtxt.anchorOffsetX = numtxt.width;
        numtxt.anchorOffsetY = numtxt.height / 2;
        numtxt.y = _y;
        numtxt.x = this.Rank_w - 50;
        if (num == 0) {

            this.rankArr.push(numtxt)
        }

    }
    private cancelGame(): void {
        console.log("447");
        for (let i = 0; i < this.rankArr.length; i++) {
            this.rankArr[i].parent.removeChild(this.rankArr[i]);
            this.rankArr.splice(i, 1);
            i--
        }
        if (this.Rankbg && this.Rankbg.parent) {
            this.Rankbg.parent.removeChild(this.Rankbg);
        }
        if (this.friendBg && this.friendBg.parent) {
            this.friendBg.parent.removeChild(this.friendBg);
        }
        for (let i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
        console.log('停止开放数据域');
    }
}

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