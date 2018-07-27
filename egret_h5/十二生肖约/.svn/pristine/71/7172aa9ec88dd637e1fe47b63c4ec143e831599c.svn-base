var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_TitleProgressBar = (function (_super) {
    __extends(UI_Home_TitleProgressBar, _super);
    function UI_Home_TitleProgressBar() {
        var _this = _super.call(this) || this;
        _this.ProgressWidth = 198;
        return _this;
    }
    UI_Home_TitleProgressBar.prototype.onCreate = function () {
        DataManager.inst.gameLevel.addDataListener(this.refreshChapter, this);
        DataManager.inst.gameLevel.addDataListener(this.refreshHP, this, Data_GameLevel.Refresh_Hp);
        DataManager.inst.gameLevel.addDataListener(this.refreshBossTime, this, Data_GameLevel.Refresh_BossTime);
    };
    UI_Home_TitleProgressBar.prototype.onDestroy = function () {
        DataManager.inst.gameLevel.removeDataListener(this.refreshChapter, this);
        DataManager.inst.gameLevel.removeDataListener(this.refreshHP, this, Data_GameLevel.Refresh_Hp);
        DataManager.inst.gameLevel.removeDataListener(this.refreshBossTime, this, Data_GameLevel.Refresh_BossTime);
    };
    UI_Home_TitleProgressBar.prototype.refreshHP = function (e) {
        var data = e.data;
        this.setHP(data.nowMonstersHp, data.maxMonstersHp);
    };
    UI_Home_TitleProgressBar.prototype.refreshBossTime = function (e) {
        var data = e.data;
        this.setBossTime(data.nowBossTime, data.maxBossTime);
    };
    UI_Home_TitleProgressBar.prototype.refreshChapter = function (e) {
        var data = e.data;
        this.homeTitleProgressTimeTx.visible = data.isBoss;
        this.homeTitleProgressTimeBg.visible = data.isBoss;
        this.homeTitleProgressTime.visible = data.isBoss;
        this.homeTitleProgressClock.visible = data.isBoss;
        this.homeTitleProgressLevel.text = EasyNumber.easyNum(data.waveIndex) + "/" + EasyNumber.easyNum(data.maxWave);
    };
    UI_Home_TitleProgressBar.prototype.setHP = function (currentHP, TotleHP) {
        egret.Tween.removeTweens(this.homeTitleProgressHP);
        if (currentHP == TotleHP) {
            this.homeTitleProgressHP.width = this.ProgressWidth;
        }
        else {
            var w = Math.round(this.ProgressWidth * currentHP / TotleHP);
            egret.Tween.get(this.homeTitleProgressHP).to({ width: w }, 200, egret.Ease.sineIn);
        }
        this.homeTitleProgressHPTx.text = EasyNumber.easyNum(currentHP) + "/" + EasyNumber.easyNum(TotleHP);
    };
    UI_Home_TitleProgressBar.prototype.setBossTime = function (currentBossTime, TotleBossTiem) {
        egret.Tween.removeTweens(this.homeTitleProgressTime);
        if (currentBossTime == TotleBossTiem) {
            this.homeTitleProgressTime.width = this.ProgressWidth;
        }
        else {
            var w = Math.round(this.ProgressWidth * currentBossTime / TotleBossTiem);
            egret.Tween.get(this.homeTitleProgressTime).to({ width: w }, 1000);
        }
        this.homeTitleProgressTimeTx.text = currentBossTime + "s";
    };
    return UI_Home_TitleProgressBar;
}(BaseComponent));
__reflect(UI_Home_TitleProgressBar.prototype, "UI_Home_TitleProgressBar");
//# sourceMappingURL=UI_Home_TitleProgressBar.js.map