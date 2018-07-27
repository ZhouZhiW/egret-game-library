class Player extends BaseMovieClip {

    private BreatchFrameRate = 8;
    private AttackFrameRate = 15;
    private autoAttackMaxNum = 10;

    private playMC: egret.MovieClip;
    private attackEffectMC: egret.MovieClip;
    private altarMC: egret.MovieClip;

    private levelabel: eui.Label;
    private autoAttackTimer: egret.Timer;

    //==========================
    private data: Data_Player;
    private index: string;
    private baseDamage: number;
    private baseDimagePercent: number;
    private baseCritPercent: number;
    private baseCritDamage: number;


    private increasesCriPercent: number;
    private increasesDamagePercent: number;

    private baseAutoAttackNum: number;
    private skillAutoAttackNum: number;


    private skillDropGoldPercent: number;
    //-------------------
    private autoAttackMC: egret.MovieClip;
    private crisMC: egret.MovieClip;
    private cdmsMC: egret.MovieClip;

    //检查外挂
    private checkTimer: egret.Timer;
    private lastX: number = -1;
    private lastY: number = -1;
    private clickFlag: number = 10;
    private clickSecondNums: number = 0;

    public constructor() {
        super();
        this.x = 80;
        this.y = 615;
        this.increasesDamagePercent = 1;
        this.increasesCriPercent = 0;
        this.skillAutoAttackNum = 0;
        this.makeLabel();
        this.loadMovieClipDataFactory("resource/mc/altar/player_altar", this.getAltarMovieClip);

    }


    protected onCreate() {
        super.onCreate();

        this.checkTimer = new egret.Timer(1000, 0);
        this.checkTimer.addEventListener(egret.TimerEvent.TIMER, this.plugEvent, this);
        this.checkTimer.start();

        DataManager.inst.roles.player.addDataListener(this.refreshPlayer, this);
    }

    protected onDestroy() {
        this.playMC.removeEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
        if (this.autoAttackTimer != null) {
            this.autoAttackTimer.stop();
            this.autoAttackTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.autoAttackTimer = null;
        }
        if (this.checkTimer != null) {
            this.checkTimer.stop();
            this.checkTimer.removeEventListener(egret.TimerEvent.TIMER, this.plugEvent, this);
            this.checkTimer = null;
        }
        super.onDestroy();
    }

    private makeLabel() {
        this.levelabel = new eui.Label();
        this.levelabel.horizontalCenter = 0;
        this.levelabel.bottom = -20;
        this.levelabel.size = 18;
        this.levelabel.italic = true;
        this.levelabel.stroke = 2;
        this.levelabel.strokeColor = 0x533f35;
        this.levelabel.fontFamily = "黑体";
        this.levelabel.textColor = 0xfff8ea;
        this.addChildAt(this.levelabel, 2);
    }

    private refreshPlayer(e: DataEvent) {
        this.data = e.data;
        this.setIndex(this.data.index);
        this.baseDamage = this.data.damage;
        this.baseDimagePercent = this.data.damagePercent;
        this.baseCritPercent = this.data.criticalPercent;
        this.baseCritDamage = this.data.criticalRatePercent;
        this.baseAutoAttackNum = this.data.autoAttack;
        if (this.levelabel != null) {
            this.levelabel.text = "LV. " + this.data.level;
        }
        this.setAltarLevel(this.data.altarLevel);
        this.checkAutoAttackTimer();
        // console.log("baseDamage: " + this.baseDamage);
        // console.log("baseDimagePercent: " + this.baseDimagePercent);
        // console.log("baseCritPercent: " + this.baseCritPercent);
        // console.log("baseCritRatePercent: " + this.baseCritRatePercent);
    }


    private setIndex(index: string) {
        if (index == null) {
            return;
        }
        if (this.index == null || this.index != index) {
            this.index = index;
            var mcpath: Array<string> = [];
            mcpath.push("resource/mc/player/player_" + index);
            mcpath.push("resource/mc/player/player_effect");
            this.loadMovieClipDataFactorys(mcpath);
        }

    }



    protected getMovieClipDataFactorys(mcdfs: Array<egret.MovieClipDataFactory>) {
        if (this.playMC != null) {
            this.playMC.removeEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
            this.removeChild(this.playMC);
            this.playMC = null;
        }
        if (this.attackEffectMC != null) {
            this.attackEffectMC.removeEventListener(egret.Event.COMPLETE, this.attackEffectPlayComplete, this);
            this.attackEffectMC = null;
        }

        this.playMC = new egret.MovieClip(mcdfs[0].generateMovieClipData("player"));
        this.playMC.addEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
        this.addChildAt(this.playMC, 1);
        this.breatch();

        this.attackEffectMC = new egret.MovieClip(mcdfs[1].generateMovieClipData("attack"));
        this.attackEffectMC.addEventListener(egret.Event.COMPLETE, this.attackEffectPlayComplete, this);


    }

    private getAltarMovieClip(mcdf: egret.MovieClipDataFactory) {
        this.altarMC = new egret.MovieClip(mcdf.generateMovieClipData("altar"));
        this.addChildAt(this.altarMC, 0);
        this.setAltarLevel(this.data.altarLevel);
    }

    private setAltarLevel(level: number) {
        if (this.altarMC == null) {
            return;
        }
        const l = Math.ceil(level / 10);
        if (this.altarMC) {
            this.altarMC.gotoAndPlay("level" + l, -1);
        }
    }


    private destroyAutoAttackTimer() {
        if (this.autoAttackTimer != null) {
            this.autoAttackTimer.stop();
            this.autoAttackTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.autoAttackTimer = null;
        }
    }

    private checkAutoAttackTimer() {
        const num = this.autoAttackNums();
        if (num < 1) {
            this.destroyAutoAttackTimer();
            return;
        }
        const delay = Math.round(1000 / num);
        if (this.autoAttackTimer != null && this.autoAttackTimer.delay == delay) {
            return;
        }
        this.destroyAutoAttackTimer();
        this.autoAttackTimer = new egret.Timer(delay, 0);
        this.autoAttackTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.autoAttackTimer.start();
    }

    private autoAttackNums(): number {
        let num = this.baseAutoAttackNum + this.skillAutoAttackNum;
        num = (num > this.autoAttackMaxNum) ? this.autoAttackMaxNum : num;
        return num;
    }

    private timerEvent() {
        const num = this.autoAttackNums();
        if (num == 0) {
            this.destroyAutoAttackTimer();
            return;
        }
        this.attack();
    }

    private attack() {
        if (FightLayer.inst.monsterLayer.isComplete()) {
            return;
        }
        const attackValue = this.getAttackValue();
        const v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, true, this.dropGoldPercent(), null);
        if (v != 0) {
            FightLayer.inst.gameStatistics.addPlayerAttackCount();
        }
        if (v < 0) {
            FightLayer.inst.gameStatistics.addPlayerCriCount();
            FightLayer.inst.roleLayer.attackCris();
        }
        this.attackPlay();
    }

    private attackPlay() {
        if (this.playMC == null) {
            return;
        }

        if (this.playMC.currentLabel == "breath") {
            this.playMC.stop();
            this.playMC.frameRate = this.AttackFrameRate;
        }

        if (this.playMC.isPlaying) {
            this.playMC.frameRate = this.AttackFrameRate * 2;
            return;
        } else {
            this.playMC.frameRate = this.AttackFrameRate
        }
        this.playMC.gotoAndPlay("attack", 1);
    }

    private attactPlayComplete() {
        this.breatch();
    }

    private attackEffectPlay(x: number, y: number) {
        if (this.attackEffectMC == null || this.attackEffectMC.parent == null) {
            return;
        }
        this.attackEffectMC.x = x;
        this.attackEffectMC.y = y;
        this.attackEffectMC.visible = true;
        this.attackEffectMC.gotoAndPlay("attack", 1);
    }

    private attackEffectPlayComplete() {
        this.attackEffectMC.visible = false;
    }

    public getAttackValue(): number {
        let currentDamage = 0;
        const random = Math.random();
        const crit: number = this.baseCritPercent + this.increasesCriPercent;
        if (random <= crit) {
            currentDamage = -1 * this.baseDamage * this.baseDimagePercent * this.baseCritDamage;
        } else {
            currentDamage = this.baseDamage * this.baseDimagePercent;
        }
        currentDamage = currentDamage * this.increasesDamagePercent;

        // console.log("attackCrit: " + this.baseDamage + " / " + this.baseDimagePercent + " / " + this.baseCritPercent + " / " + this.baseCritDamage);

        return currentDamage;
    }

    private breatch() {
        if (this.playMC == null) {
            return;
        }
        this.playMC.frameRate = this.BreatchFrameRate;
        this.playMC.gotoAndPlay("breath", -1);
    }

    public dropGoldPercent(): number {
        return this.skillDropGoldPercent;
    }

    private plugEvent() {
        this.clickSecondNums = 0;
    }

    public checkClick(stageX: number, stageY: number): boolean {

        if (this.lastX != stageX || this.lastY != stageY) {
            this.lastX = stageX;
            this.lastY = stageY;
        } else {
            this.clickSecondNums++;
            // console.log("clickSecondNums: " + this.clickSecondNums);
            if (this.clickSecondNums > this.clickFlag) {
                const dialog = new NTextDialog();
                dialog.content.text = "点击太频繁！";
                dialog.show();
            }
        }

        FightLayer.inst.roleLayer.showPlayerEffect(this.attackEffectMC);
        this.attackEffectPlay(stageX, stageY);
        this.attack();
        return true;
    }


    // ======================skill==================
    public startSkillAuts(mc: egret.MovieClip, num: number) {
        this.skillAutoAttackNum = num;
        if (this.autoAttackMC == null) {
            this.autoAttackMC = mc;
        }
        if (this.autoAttackMC == null) {
            return;
        }
        this.autoAttackMC.gotoAndPlay("effect", -1);
        this.addChild(this.autoAttackMC);
        this.checkAutoAttackTimer();
    }

    public stopSkillAuts() {
        this.skillAutoAttackNum = 0;
        if (this.autoAttackMC != null) {
            this.autoAttackMC.stop();
            if (this.autoAttackMC.parent != null) {
                this.autoAttackMC.parent.removeChild(this.autoAttackMC);
            }
        }
        this.checkAutoAttackTimer();
    }




    public startSkillCris(mc: egret.MovieClip, cris: number) {
        if (cris <= 0) {
            return;
        }
        this.increasesCriPercent = cris;
        if (this.crisMC == null) {
            this.crisMC = mc;
        }
        if (this.crisMC == null) {
            return;
        }
        this.crisMC.gotoAndPlay("effect", 1);
        this.crisMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.addChild(this.crisMC);
    }

    public stopSkillCris() {
        this.increasesCriPercent = 0;
    }

    public startSkillCdms(mc: egret.MovieClip, cdms: number) {
        if (cdms <= 0) {
            return;
        }
        this.increasesDamagePercent = cdms;

        if (this.cdmsMC == null) {
            this.cdmsMC = mc;
        }
        if (this.cdmsMC == null) {
            return;
        }
        this.cdmsMC.gotoAndPlay("effect", 1);
        this.cdmsMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.addChild(this.cdmsMC);
    }


    public stopSkillCdms() {
        this.increasesDamagePercent = 1;
    }


    public startSkillSmzms(goldPercent: number) {
        this.skillDropGoldPercent = goldPercent;
    }

    public stopskillSmzms() {
        this.skillDropGoldPercent = 0;
    }

    private skillMCComplete(e: egret.Event) {
        const mc: egret.MovieClip = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }

    }


}