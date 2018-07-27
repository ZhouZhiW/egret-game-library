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
/**
 *
 * @author
 *
 */
var ShareList = (function (_super) {
    __extends(ShareList, _super);
    function ShareList(thisObj) {
        var _this = _super.call(this) || this;
        _this.gameimgSheet = RES.getRes("gameimg_json");
        _this.gamescene = thisObj;
        //创建一个计时器对象
        _this.shareTime = new egret.Timer(1000, GameUtils.shareListBean.share_interval / 1000);
        //注册事件侦听器
        _this.shareTime.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this.shareTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        //开始计时
        _this.shareTime.start();
        _this.init();
        return _this;
    }
    ShareList.prototype.init = function () {
        for (var i = 0; i < GameUtils.shareListBean.share_list.length + 1; i++) {
            var bg = new egret.Bitmap();
            bg.texture = this.gameimgSheet.getTexture("propertybg3");
            bg.x = 0;
            bg.y = i * 85;
            this.addChild(bg);
            var bgrectlist = new egret.Rectangle(34, 34, 34, 34);
            bg.scale9Grid = bgrectlist;
            bg.width = GameUtils.SCREEN_W - 100;
            bg.height = 80;
            var str_name;
            var str_count_0;
            var str_count_1;
            if (i == 0) {
                str_name = "发送给朋友或群(每日)";
                var count = GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit ? GameUtils.shareListBean.share_count : GameUtils.shareListBean.share_limit;
                str_count_0 = "" + count;
                str_count_1 = "/" + GameUtils.shareListBean.share_limit;
                var nowDate = new Date();
                //                console.log(nowDate.getTime());
                var time_num = GameUtils.shareListBean.share_interval - (nowDate.getTime() - GameUtils.shareListBean.share_time);
                //                console.log(nowDate.getTime() - GameUtils.sharelistbean.share_time);
                //                console.log(time_num);
                var timestr = "";
                var timedes_1 = "";
                if (time_num > 0 && GameUtils.shareListBean.share_count > 0 && GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit) {
                    timestr = this.MillisecondToDate(time_num) + "";
                    timedes_1 = " 后分享 ";
                }
                this.timeTF = new egret.TextField();
                this.timeTF.x = 80;
                this.timeTF.y = 45 + i * 85;
                this.timeTF.textColor = 0xA0522D;
                this.timeTF.size = GameUtils.TEXT_SIZE_SMALL;
                this.timeTF.text = timestr;
                this.addChild(this.timeTF);
                this.timedesTF_1 = new egret.TextField();
                this.timedesTF_1.x = 80 + this.timeTF.textWidth;
                this.timedesTF_1.y = 45 + i * 85;
                this.timedesTF_1.textColor = 0x000000;
                this.timedesTF_1.size = GameUtils.TEXT_SIZE_SMALL;
                this.timedesTF_1.text = timedes_1;
                this.addChild(this.timedesTF_1);
                this.timedesTF_2 = new egret.TextField();
                this.timedesTF_2.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth;
                this.timedesTF_2.y = 45 + i * 85;
                this.timedesTF_2.textColor = 0xA0522D;
                this.timedesTF_2.size = GameUtils.TEXT_SIZE_SMALL;
                this.timedesTF_2.text = "奖励：";
                this.addChild(this.timedesTF_2);
                this.timetili_icon = new egret.Bitmap();
                this.timetili_icon.texture = this.gameimgSheet.getTexture("tili1");
                this.timetili_icon.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth;
                this.timetili_icon.y = 40 + i * 85;
                this.addChild(this.timetili_icon);
                var reward = GameUtils.shareListBean.share_reward;
                this.reward_arr = reward.split(",");
                var reward_index = count;
                if (reward_index >= GameUtils.shareListBean.share_limit) {
                    reward_index = GameUtils.shareListBean.share_limit - 1;
                }
                this.timedesTF_3 = new egret.TextField();
                this.timedesTF_3.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth + 35;
                this.timedesTF_3.y = 45 + i * 85;
                this.timedesTF_3.textColor = 0xff0000;
                this.timedesTF_3.size = GameUtils.TEXT_SIZE_SMALL;
                this.timedesTF_3.text = "+" + parseInt(this.reward_arr[reward_index]);
                this.addChild(this.timedesTF_3);
                this.timecount_0 = new egret.TextField();
                this.timecount_0.x = GameUtils.SCREEN_W - 40 - 126;
                this.timecount_0.y = 12 + i * 85;
                this.timecount_0.textColor = 0x000000;
                this.timecount_0.size = GameUtils.TEXT_SIZE_SMALL;
                this.timecount_0.text = str_count_0;
                this.timecount_0.anchorOffsetX = this.timecount_0.textWidth;
                this.addChild(this.timecount_0);
            }
            else {
                str_name = GameUtils.shareListBean.share_list[i - 1].sharename;
                var count = GameUtils.shareListBean.invite_count < GameUtils.shareListBean.share_list[i - 1].count ? GameUtils.shareListBean.invite_count : GameUtils.shareListBean.share_list[i - 1].count;
                str_count_0 = "" + count;
                str_count_1 = "/" + GameUtils.shareListBean.share_list[i - 1].count;
                if (GameUtils.shareListBean.share_list[i - 1].type == 10
                    || GameUtils.shareListBean.share_list[i - 1].type == 11
                    || GameUtils.shareListBean.share_list[i - 1].type == 99
                    || GameUtils.shareListBean.share_list[i - 1].type == 0
                    || GameUtils.shareListBean.share_list[i - 1].type == 1
                    || GameUtils.shareListBean.share_list[i - 1].type == 2
                    || GameUtils.shareListBean.share_list[i - 1].type == 3) {
                    var tili_icon = new egret.Bitmap();
                    tili_icon.texture = this.gameimgSheet.getTexture(this.geticonname(GameUtils.shareListBean.share_list[i - 1].type));
                    this.addChild(tili_icon);
                    tili_icon.x = 140;
                    if (GameUtils.shareListBean.share_list[i - 1].type == 0
                        || GameUtils.shareListBean.share_list[i - 1].type == 1
                        || GameUtils.shareListBean.share_list[i - 1].type == 2
                        || GameUtils.shareListBean.share_list[i - 1].type == 3) {
                        tili_icon.scaleX = 0.8;
                        tili_icon.scaleY = 0.8;
                        tili_icon.y = 44 + i * 85;
                    }
                    else if (GameUtils.shareListBean.share_list[i - 1].type == 11
                        || GameUtils.shareListBean.share_list[i - 1].type == 99) {
                        tili_icon.scaleX = 0.7;
                        tili_icon.scaleY = 0.7;
                        tili_icon.y = 40 + i * 85;
                    }
                    else {
                        tili_icon.y = 40 + i * 85;
                    }
                }
                var description = new egret.TextField();
                description.x = 80;
                description.y = 45 + i * 85;
                description.textColor = 0xA0522D;
                description.size = GameUtils.TEXT_SIZE_SMALL;
                description.text = "奖励：";
                this.addChild(description);
                var description_1 = new egret.TextField();
                description_1.textColor = 0xff0000;
                description_1.size = GameUtils.TEXT_SIZE_SMALL;
                description_1.text = GameUtils.shareListBean.share_list[i - 1].description;
                this.addChild(description_1);
                description_1.y = 45 + i * 85;
                if (GameUtils.shareListBean.share_list[i - 1].type == 0
                    || GameUtils.shareListBean.share_list[i - 1].type == 1
                    || GameUtils.shareListBean.share_list[i - 1].type == 2
                    || GameUtils.shareListBean.share_list[i - 1].type == 3) {
                    description_1.x = 190;
                }
                else if (GameUtils.shareListBean.share_list[i - 1].type == 10
                    || GameUtils.shareListBean.share_list[i - 1].type == 11
                    || GameUtils.shareListBean.share_list[i - 1].type == 99) {
                    description_1.x = 175;
                }
                else {
                    description_1.x = 140;
                }
                var count_0 = new egret.TextField();
                count_0.x = GameUtils.SCREEN_W - 40 - 126;
                count_0.y = 12 + i * 85;
                count_0.textColor = 0x000000;
                count_0.size = GameUtils.TEXT_SIZE_SMALL;
                count_0.text = str_count_0;
                count_0.anchorOffsetX = count_0.textWidth;
                this.addChild(count_0);
            }
            var icon = new egret.Bitmap();
            icon.texture = this.gameimgSheet.getTexture(i == 0 ? "shareicon0" : "shareicon1");
            icon.x = 15;
            icon.y = 15 + i * 85;
            icon.width = 50;
            icon.height = 50;
            this.addChild(icon);
            var name = new egret.TextField();
            name.x = 80;
            name.y = 12 + i * 85;
            name.textColor = 0x000000;
            name.size = GameUtils.TEXT_SIZE_SMALL;
            name.text = str_name;
            this.addChild(name);
            var count_1 = new egret.TextField();
            count_1.x = GameUtils.SCREEN_W - 40 - 126;
            count_1.y = 12 + i * 85;
            count_1.textColor = 0x000000;
            count_1.size = GameUtils.TEXT_SIZE_SMALL;
            count_1.text = str_count_1;
            this.addChild(count_1);
            if (i > 0) {
                if (GameUtils.shareListBean.share_list[i - 1].state == 0
                    || GameUtils.shareListBean.share_list[i - 1].state == 1) {
                    var btnshare = new egret.Bitmap();
                    btnshare.texture = this.gameimgSheet.getTexture(GameUtils.shareListBean.share_list[i - 1].state == 0 ? "lingqubtn" : "lingqubtn1");
                    btnshare.name = "" + (i - 1);
                    btnshare.x = GameUtils.SCREEN_W - 90 - 126;
                    btnshare.y = 35 + i * 85;
                    btnshare.scaleX = 0.8;
                    btnshare.scaleY = 0.8;
                    this.addChild(btnshare);
                    if (GameUtils.shareListBean.share_list[i - 1].state == 0) {
                        btnshare.touchEnabled = true;
                        btnshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnshare, this);
                    }
                }
            }
        }
    };
    ShareList.prototype.setTimeTextPosition = function () {
        this.timedesTF_1.x = 80 + this.timeTF.textWidth;
        this.timedesTF_2.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth;
        this.timetili_icon.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth;
        var count = GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit ? GameUtils.shareListBean.share_count : GameUtils.shareListBean.share_limit;
        var reward_index = count;
        if (reward_index >= GameUtils.shareListBean.share_limit) {
            reward_index = GameUtils.shareListBean.share_limit - 1;
        }
        this.timedesTF_3.text = "+" + parseInt(this.reward_arr[reward_index]);
        this.timedesTF_3.x = 80 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth + 35;
        this.timecount_0.text = "" + count;
    };
    ShareList.prototype.timerFunc = function () {
        var nowDate = new Date();
        var time_num = GameUtils.shareListBean.share_interval - (nowDate.getTime() - GameUtils.shareListBean.share_time);
        var timestr = "";
        var timedes_1 = "";
        if (time_num > 0 && GameUtils.shareListBean.share_count > 0 && GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit) {
            this.timeTF.text = this.MillisecondToDate(time_num) + "";
            this.timedesTF_1.text = " 后分享 ";
        }
        else {
            this.timeTF.text = timestr;
            this.timedesTF_1.text = timedes_1;
        }
        this.setTimeTextPosition();
    };
    ShareList.prototype.timerComFunc = function () {
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.shareTime.stop();
        this.shareTime.reset();
        this.timeTF.text = "";
        this.timedesTF_1.text = "";
        this.setTimeTextPosition();
    };
    ShareList.prototype.removeShareListTime = function () {
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.shareTime.stop();
        this.shareTime.reset();
    };
    ShareList.prototype.MillisecondToDate = function (msd) {
        var time = "";
        var hours = msd / 1000 / 60 / 60;
        var hoursRound = Math.floor(hours);
        if (hoursRound > 0) {
            time += hoursRound + "小时";
        }
        var minutes = msd / 1000 / 60 - (60 * hoursRound);
        var minutesRound = Math.floor(minutes);
        if (hoursRound > 0 || minutesRound > 0) {
            time += minutesRound + "分";
        }
        var seconds = msd / 1000 - (60 * 60 * hoursRound) - (60 * minutesRound);
        var secondsRound = Math.floor(seconds);
        time += secondsRound + "秒";
        return time;
    };
    ShareList.prototype.btnshare = function (evt) {
        var dianeff = new DianEff(this.gamescene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.btn_id = btnid;
            var sendsharejiangliobj = { cmd: 110, player_token: GameUtils.playerToken, award_id: GameUtils.shareListBean.share_list[btnid].award, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendsharejiangliobj, this.getsharejiangliComplete, this.onPostIOError, this.gamescene, this);
        }
    };
    ShareList.prototype.getsharejiangliComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_110.k", event);
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
        this.gamescene.addChild(tishi);
        if (obj.result == 1) {
            var clearbtn = this.getChildByName("" + this.btn_id);
            if (clearbtn) {
                if (clearbtn.parent) {
                    clearbtn.parent.removeChild(clearbtn);
                    var btnshare = new egret.Bitmap();
                    btnshare.texture = this.gameimgSheet.getTexture("lingqubtn1");
                    btnshare.name = "" + this.btn_id;
                    btnshare.x = GameUtils.SCREEN_W - 90 - 126;
                    btnshare.y = 35 + (this.btn_id + 1) * 85;
                    btnshare.scaleX = 0.8;
                    btnshare.scaleY = 0.8;
                    this.addChild(btnshare);
                }
            }
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.gamescene, this);
        }
    };
    ShareList.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
        }
    };
    ShareList.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    ShareList.prototype.geticonname = function (stype) {
        var strname = "tili1";
        if (stype == 10) {
            strname = "tili1";
        }
        else if (stype == 11) {
            strname = "zhuanshiicon";
        }
        else if (stype == 99) {
            strname = "icon_miansi_1";
        }
        else if (stype == 2) {
            strname = "property1";
        }
        else if (stype == 3) {
            strname = "property2";
        }
        else if (stype == 1) {
            strname = "property3";
        }
        else if (stype == 0) {
            strname = "property0";
        }
        return strname;
    };
    return ShareList;
}(egret.DisplayObjectContainer));
__reflect(ShareList.prototype, "ShareList");
//# sourceMappingURL=ShareList.js.map