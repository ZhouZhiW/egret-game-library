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
var CONST_SCORE_HIGHEST = "playBall score highest"; //最高分数
var GamePanel = { rank: null, over: null, game: null };
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameMain.prototype.initView = function () {
        //this.createBgGradientFill();
        //面板－主要逻辑处理
        this.panelGame = new GameControl;
        this.panelGame.addEvent(MoonEvent.OVER, this.onOver, this);
        this.addChild(this.panelGame);
        GamePanel.game = this.panelGame;
        //面板－设置
        this.panelSet = new GameSet;
        this.panelSet.addEvent(MoonEvent.PLAY, this.onSetHandler, this);
        this.panelSet.addEvent(MoonEvent.CHANGE, this.onSetHandler, this);
        //面板－开始
        this.panelStart = new GameStart;
        this.panelStart.addEvent(moon.MoonEvent.START, this.start, this);
        this.addChild(this.panelStart);
        //面板－结束
        this.panelOver = new GameOver;
        this.panelOver.addEvent(moon.MoonEvent.START, this.start, this);
        //this.addChild(this.panelOver);
        //按钮－设置
        this.setBtn = new moon.SetButton;
        this.setBtn.x = 100;
        this.setBtn.y = 100;
        this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetPanel, this);
        //this.addChild(this.setBtn);
        //读取历史最高分
        GameData.scoreHighest = Number(moon.BasicGameStorage.localRead(CONST_SCORE_HIGHEST));
    };
    return GameMain;
}(moon.BasicGameMain));
__reflect(GameMain.prototype, "GameMain");
/**开始界面*/
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameStart.prototype.initView = function () {
        this.createImageBg("startPanel_png");
        var btn = new MButton(new MImage("btnStart_png"), new MImage("btnStart_png"));
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        btn.x = (this.stageWidth - btn.width) >> 1;
        btn.y = 650;
    };
    return GameStart;
}(moon.BasicGameStart));
__reflect(GameStart.prototype, "GameStart");
/**游戏结束 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = Layout.getIns();
        return _this;
    }
    GameOver.prototype.initView = function () {
        this.gameRank = new GameRank();
        GamePanel.rank = this.gameRank;
        GamePanel.over = this;
        this.layout.setStageWH(this.stageWidth, this.stageHeight);
        this.createImageBg("overPanel_png");
        this.btnRestart = this.createMButton("btnRestart_png", 264, 700);
        this.btnScore = this.createMButton("btnScore_png", 425, 700);
        this.btnRank = this.createMButton("btnRank_png", 107, 700);
        this.txtScore = this.createText(333, 400);
        this.txtScoreMax = this.createText(333, 525);
        this.txtScore.size = this.txtScoreMax.size = 50;
        //this.txtScore.text=this.txtScoreMax.text="99999";
    };
    GameOver.prototype.createMButton = function (name, x, y) {
        var btn = this.createSkinBtn(name, name);
        btn.x = x;
        btn.y = y;
        return btn;
    };
    GameOver.prototype.createSkinBtn = function (value1, value2) {
        var skin = new Scale9Image(value1);
        var skin2 = new Scale9Image(value2);
        skin2.alpha = 0.5;
        var btn = new MButton(skin, skin2);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addChild(btn);
        return btn;
    };
    GameOver.prototype.onClick = function (e) {
        if (e.currentTarget == this.btnRestart) {
            this.dispEvent(MoonEvent.START);
            Tween.get(this).to({ alpha: 0 }, 300).call(this.backCall, this);
        }
        else if (e.currentTarget == this.btnScore) {
            platform.submitScore(GameData.score, this.callback, this);
        }
        else if (e.currentTarget == this.btnRank) {
            this.addChild(this.gameRank);
            this.gameRank.updateScore();
        }
        SoundControl.getIns().play(MUSIC_CLICK_BTN);
    };
    /**提交分数返回函数 */
    GameOver.prototype.callback = function (obj) {
        console.log("代码:" + obj.code + ",消息:" + obj.message + ",数据:" + obj.data);
        if (obj.code == 10000) {
            console.log("上传成功");
            alertAuto("分数提交成功");
        }
        else {
            console.log("上传失败");
        }
    };
    GameOver.prototype.update = function (data) {
        GameData.score = data["score"];
        if (GameData.score > GameData.scoreHighest) {
            GameData.scoreHighest = GameData.score;
            moon.BasicGameStorage.localWrite(CONST_SCORE_HIGHEST, GameData.scoreHighest.toString());
        }
        this.txtScore.text = String(GameData.score);
        this.txtScoreMax.text = String(GameData.scoreHighest);
    };
    return GameOver;
}(moon.BasicGameOver));
__reflect(GameOver.prototype, "GameOver");
/**分数排行*/
var GameRank = (function (_super) {
    __extends(GameRank, _super);
    function GameRank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRank.prototype.updateScore = function () {
        platform.getRank(this.update, this);
    };
    /**查看排行榜返回函数 */
    GameRank.prototype.update = function (obj) {
        console.log("代码:" + obj.code + ",消息:" + obj.message + ",数据:" + obj.data);
        var _this = GamePanel.rank;
        if (obj.code == 10000) {
            console.log("获取成功");
            var data = obj.data;
            var len = data.length;
            var myRank = -1;
            for (var i = 0; i < len; i++) {
                //this.txtRank.text+=("积分:" + data[i].score + ",排名:" + data[i].rank+"\n");
                var score = data[i].score;
                console.log(i, score, _this.max);
                if (i < _this.max) {
                    var item = _this.items[i];
                    item.txtScore.text = score;
                    console.log("item", item.txtScore.text, score);
                }
                if (i < len - 1) {
                    var next = Number(data[i + 1].score);
                    score = Number(score);
                    console.log(GameData.score, next, score);
                    if (GameData.score == score) {
                        myRank = i + 1;
                    }
                    else if (GameData.score > next && GameData.score <= score) {
                        myRank = i + 2;
                    }
                    else if (GameData.score >= data[0].score) {
                        myRank = 1;
                    }
                    else if (GameData.score <= data[len - 1].score) {
                        myRank = len;
                    }
                }
            }
            if (_this.txtRank) {
                if (myRank > 0)
                    _this.txtRank.text = "你本次得" + GameData.score + "分，排在第" + myRank + "名。";
                else
                    _this.txtRank.text = "未上榜";
            }
        }
        else {
            console.log("获取失败");
        }
    };
    return GameRank;
}(moon.BasicGameRank));
__reflect(GameRank.prototype, "GameRank");
/**分数设置*/
var GameSet = (function (_super) {
    __extends(GameSet, _super);
    function GameSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GameSet;
}(moon.BasicGameSet));
__reflect(GameSet.prototype, "GameSet");
//# sourceMappingURL=GamePanel.js.map