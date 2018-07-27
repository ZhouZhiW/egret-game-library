var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boss_Challenge = (function (_super) {
    __extends(Boss_Challenge, _super);
    function Boss_Challenge() {
        var _this = _super.call(this) || this;
        _this.visible = false;
        _this.challengestatus = 0;
        _this.touchEnabled = false;
        _this.loadMovieClipDataFactory("resource/mc/scene/boss_challenge", _this.getChallengeMovieClip);
        return _this;
    }
    Boss_Challenge.prototype.onCreate = function () {
    };
    Boss_Challenge.prototype.onDestroy = function () {
        this.challenge = null;
    };
    Boss_Challenge.prototype.getChallengeMovieClip = function (mcdf) {
        this.challenge = new egret.MovieClip(mcdf.generateMovieClipData("challenge"));
        this.addChild(this.challenge);
        this.setChallengeStatus(this.challengestatus);
    };
    Boss_Challenge.prototype.setChallengeStatus = function (status) {
        this.challengestatus = status;
        if (this.challenge == null) {
            return;
        }
        switch (status) {
            case 0:
                this.visible = false;
                this.challenge.gotoAndStop("none");
                break;
            case 1:
                this.visible = true;
                this.challenge.gotoAndPlay("challenge", -1);
                break;
            case 2:
                this.visible = true;
                this.challenge.gotoAndPlay("cancle", -1);
                break;
        }
    };
    Boss_Challenge.prototype.checkClick = function (stageX, stageY) {
        var b = this.hitTestPoint(stageX, stageY, false) && this.challengestatus != 0;
        if (b) {
            this.clickChallenge();
        }
        return b;
    };
    Boss_Challenge.prototype.clickChallenge = function () {
        switch (this.challengestatus) {
            case 0:
                return;
            case 1:
                FightLayer.inst.sceneLayer.jumpGameLevel();
                break;
            case 2:
                FightLayer.inst.sceneLayer.jumpGameLevel();
                break;
        }
    };
    return Boss_Challenge;
}(BaseMovieClip));
__reflect(Boss_Challenge.prototype, "Boss_Challenge");
//# sourceMappingURL=Boss_Challenge.js.map