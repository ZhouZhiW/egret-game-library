class Assistor extends BaseMovieClip {

    private AttackFrameRate = 15;
    private BreatchFrameRate = 8;



    private data: Data_Assistor;

    private currentAttackFrameRate;
    private isNull: boolean;
    private userId: number;
    private index: string;
    private assistorInfo: AssistorInfo;

    private assistMC: egret.MovieClip;
    private altarMC: egret.MovieClip;


    private attactReady: boolean;

    private baseDamage: number;
    private baseDimagePercent: number;
    private baseCritPercent: number;
    private baseCritRatePercent: number;

    private attackTimer: egret.Timer;
    private timeTimer: egret.Timer;
    private restTime: number;
    private saveTime: number;


    public constructor(data: Data_Assistor) {
        super();
        this.isNull = true;
        this.x = 400;
        this.y = 615;

        this.timeTimer = new egret.Timer(1000, 0);
        this.timeTimer.addEventListener(egret.TimerEvent.TIMER, this.timeChange, this);

        this.makeLabel();
        data.addDataListener(this.refreshAssistor, this);
        this.loadMovieClipDataFactory("resource/mc/altar/assist_altar", this.getAltarMovieClip);
    }

    protected onCreate() {
        super.onCreate();
    }

    protected onDestroy() {
        if (this.timeTimer != null) {
            this.timeTimer.stop();
            this.timeTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeChange, this);
            this.timeTimer = null;
        }
        this.destroyAttackTimer();
        super.onDestroy();
    }

    private destroyAttackTimer() {
        if (this.attackTimer != null) {
            this.attackTimer.stop();
            this.attackTimer.removeEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
            this.attackTimer = null;
        }
    }

    private makeLabel() {
        this.assistorInfo = new AssistorInfo();
        this.assistorInfo.visible = false;
        this.assistorInfo.horizontalCenter = 0;
        this.assistorInfo.bottom = -40;
        this.addChild(this.assistorInfo);
    }

    private refreshAssistor(e: DataEvent) {// 星座返回是错误的，换同一星座
        this.data = e.data;
        this.isNull = (this.data.index == "");
        this.setAltarLevel(this.data.altarLevel);
        this.setAltarValue(this.data.altarValue);
        if (this.userId != null && this.userId == e.data.userId + e.data.assistorType) {
            return;//同一个人+同一身份
        }
        this.userId = this.data.userId + this.data.assistorType;
        this.setIndex(this.data.index);
        if (this.isNull) {
            this.assistorTimeEvent(false);
        } else {
            this.baseDamage = this.data.damage;
            this.baseDimagePercent = this.data.damagePercent;
            this.restTime = this.data.restTime;
            this.saveTime = this.data.saveTime;
            this.assistorTimeEvent(true);
            this.assistorInfo.setAvatar(this.data.userAvatar);
            this.assistorInfo.setLevel(this.data.userLevel);
            this.assistorInfo.setTime(this.restTime, this.restTime > this.saveTime);
        }
    }

    private assistorTimeEvent(start: boolean) {
        if (this.timeTimer == null) {
            return;
        }
        this.timeTimer.reset();
        if (start) {
            this.timeTimer.start();
        }
        this.assistorInfo.visible = start;
    }

    private setIndex(index: string) {
        if (this.index == index) {
            return;
        }
        this.index = index;
        if (this.index == "") {
            this.loadMovieClipDataFactory("resource/mc/player/player_door", this.getAssistorMovieClip);
        } else {
            this.loadMovieClipDataFactory("resource/mc/player/player_" + index, this.getAssistorMovieClip);
        }
    }

    private getAssistorMovieClip(mcdf: egret.MovieClipDataFactory) {
        if (this.assistMC != null) {
            this.removeChild(this.assistMC);
            this.assistMC = null;
        }
        this.assistMC = new egret.MovieClip(mcdf.generateMovieClipData("player"));
        this.assistMC.scaleX = -1;
        if (this.altarMC == null) {
            this.addChildAt(this.assistMC, 0);
        } else if (this.altarMC != null) {
            this.addChildAt(this.assistMC, 1);
        } else {
            this.addChild(this.assistMC);
        }
        this.breatch();
    }

    private getAltarMovieClip(mcdf: egret.MovieClipDataFactory) {
        this.altarMC = new egret.MovieClip(mcdf.generateMovieClipData("altar"));
        this.addChildAt(this.altarMC, 0);
        this.setAltarLevel(this.data.altarLevel);
    }

    private setAltarValue(value: number) {
        if (this.isNull) {
            this.destroyAttackTimer();
            return;
        }
        const d = Math.round(1000 / value);
        if (this.attackTimer != null && this.attackTimer.delay == d) {
            return;//相同不处理
        }
        this.destroyAttackTimer();
        this.attackTimer = new egret.Timer(d, 0);
        this.attackTimer.addEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
        this.currentAttackFrameRate = Math.ceil(this.AttackFrameRate * value);
        this.attackTimer.start();
    }

    private setAltarLevel(level: number) {
        if (this.altarMC == null) {
            return;
        }
        const l = Math.ceil(level / 10);
        if (this.altarMC && !this.isNull) {
            this.altarMC.gotoAndPlay("level" + l, -1);
        }

    }

    private breatch() {
        if (this.assistMC == null) {
            return;
        }
        this.assistMC.frameRate = this.BreatchFrameRate;
        this.assistMC.gotoAndPlay("breath", -1);
    }

    private attack() {
        if (this.isNull || FightLayer.inst.monsterLayer.isComplete()) {
            return;
        }
        this.attackMonster();
        this.attackPlay();
    }

    private attackMonster() {
        if (!this.attactReady) {
            return;
        }
        const attackValue = this.getAttackValue();
        const v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, true, 0, null);
    }

    private attackPlay() {
        this.attactReady = true;
        if (this.assistMC == null) {
            return;
        }
        if (this.assistMC.currentLabel == "breath") {
            this.assistMC.stop();
            this.assistMC.frameRate = this.currentAttackFrameRate;
        }
        this.assistMC.gotoAndPlay("attack", 1);
    }

    private getAttackValue(): number {
        return this.baseDamage * this.baseDimagePercent;
    }

    private attackEvent() {
        this.attack();
    }

    private timeChange() {
        const offsetTime = this.restTime + this.timeTimer.currentCount;
        if (offsetTime >= this.saveTime) {
            this.assistorInfo.setTime(offsetTime, true);
        } else {
            this.assistorInfo.setTime(offsetTime, false);
        }
    }

    public checkClick(stageX: number, stageY: number): boolean {
        if (this.isNull && this.assistMC != null && this.assistMC.hitTestPoint(stageX, stageY, false)) {
            UILayer.inst.home.showTab(4, 1);
            return true;
        } else {
            return false;
        }
    }
}

class AssistorInfo extends BaseComponent {
    private infoAvatar: eui.Image;
    private infoAvatarMask: eui.Image;

    private infoLevel: eui.Label;
    private infoTime: eui.Label;

    public constructor() {
        super();
    }


    protected onCreate() {
        this.infoAvatar.mask = this.infoAvatarMask;
    }

    protected onDestroy() {

    }

    public setAvatar(url: string) {
        this.infoAvatar.source = url;
    }

    public setLevel(level: number) {
        this.infoLevel.text = "LV. " + level;
    }

    public setTime(time: number, overtime: boolean) {
        this.infoTime.textColor = overtime ? 0xFF4B00 : 0x39B7CA;
        this.infoTime.strokeColor = overtime ? 0x3B1301 : 0x05293F;
        this.infoTime.text = Utils.formatLongTime(time);
    }



    protected get skinPath(): String {
        return "resource/skins/game/AssistorInfoSkin.exml";
    }



}