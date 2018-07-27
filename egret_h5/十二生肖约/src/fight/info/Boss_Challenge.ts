class Boss_Challenge extends BaseMovieClip {
    private challengestatus: number; // 0:隐藏状态 1：可进入boss 2：可退出boss
    private challenge: egret.MovieClip;
    public constructor() {
        super();
        this.visible = false;
        this.challengestatus = 0;
        this.touchEnabled = false;
        this.loadMovieClipDataFactory("resource/mc/scene/boss_challenge", this.getChallengeMovieClip);
    }
    protected onCreate() {

    }

    protected onDestroy() {
        this.challenge = null;
    }

    private getChallengeMovieClip(mcdf: egret.MovieClipDataFactory) {
        this.challenge = new egret.MovieClip(mcdf.generateMovieClipData("challenge"));
        this.addChild(this.challenge);
        this.setChallengeStatus(this.challengestatus);
    }

    public setChallengeStatus(status: number) {
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
    }

    public checkClick(stageX: number, stageY: number): boolean {
        const b = this.hitTestPoint(stageX, stageY, false) && this.challengestatus != 0;
        if (b) {
            this.clickChallenge();
        }
        return b;
    }


    private clickChallenge() {// 0:隐藏状态 1：可进入boss 2：可退出boss
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
    }

}