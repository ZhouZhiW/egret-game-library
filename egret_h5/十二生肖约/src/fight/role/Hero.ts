class Hero extends BaseMovieClip {

    private baseAttackFrameRate;
    private baseAttackEffectFrameRate;
    private attackSpeed;
    private heroIndex: string;
    private heroMC: egret.MovieClip;
    private attackEffectMC: egret.MovieClip;
    private namelabel: eui.Label;
    private levelabel: eui.Label;

    private active: boolean;
    private attactReady: boolean;

    private spesMC: egret.MovieClip;
    private attackTimer: egret.Timer
    //==========================
    private data: Data_Hero;
    private index: string;

    private baseDamage: number;
    private baseDimagePercent: number;

    public constructor(data: Data_Hero) {
        super();
        this.attackSpeed = 1;
        this.active = false;
        this.attactReady = false;
        this.makeLabel();
        this.setIndex(data.index);
        data.addDataListener(this.refreshHero, this);
    }
    protected onCreate() {
        super.onCreate();
    }

    protected onDestroy() {
        this.destroyAttackTimer();
        super.onDestroy();
    }

    private makeLabel() {
        this.namelabel = new eui.Label();
        this.namelabel.horizontalCenter = 0;
        this.namelabel.bottom = 15;
        this.namelabel.stroke = 2;
        this.namelabel.strokeColor = 0x533f35;
        this.namelabel.size = 13;
        this.namelabel.fontFamily = "黑体";
        this.namelabel.textColor = 0xfff8ea;

        this.levelabel = new eui.Label();
        this.levelabel.horizontalCenter = 0;
        this.levelabel.bottom = 0;
        this.levelabel.size = 13;
        this.levelabel.stroke = 2;
        this.levelabel.strokeColor = 0x533f35;
        this.levelabel.fontFamily = "黑体";
        this.levelabel.italic = true;
        this.levelabel.textColor = 0xfff8ea;

        this.addChild(this.namelabel);
        this.addChild(this.levelabel);
    }

    private refreshHero(e: DataEvent) {
        this.data = e.data;
        this.active = this.data.active;
        this.baseDamage = this.data.damage;
        this.baseDimagePercent = this.data.damagePercent;
        this.setHeroActive();
        this.namelabel.text = this.data.name;
        this.levelabel.text = "LV. " + this.data.level;
    }

    private setIndex(index: string) {
        if (index == null) {
            return;
        }
        this.index = index;
        this.setHeroPoint();
        this.loadMovieClipDataFactory("resource/mc/hero/hero_" + index, this.getHeroMovieClip);
    }

    private getHeroMovieClip(mcdf: egret.MovieClipDataFactory) {
        this.heroMC = new egret.MovieClip(mcdf.generateMovieClipData("hero"));
        this.attackEffectMC = new egret.MovieClip(mcdf.generateMovieClipData("skill"));
        this.baseAttackFrameRate = this.heroMC.frameRate;
        this.baseAttackEffectFrameRate = this.attackEffectMC.frameRate;
        this.addChildAt(this.heroMC, 0);
        this.setHeroActive();
    }


    private destroyAttackTimer() {
        if (this.attackTimer != null) {
            this.attackTimer.stop();
            this.attackTimer.removeEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
            this.attackTimer = null;
        }
    }

    private setAttackSpeed() {
        const delay = Math.round(1000 / this.attackSpeed);
        if (this.attackTimer != null && this.attackTimer.delay == delay) {
            return;
        }
        this.destroyAttackTimer();
        this.attackTimer = new egret.Timer(delay, 0);
        this.attackTimer.addEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
        this.attackTimer.start();
        if (this.heroMC != null) {
            this.heroMC.frameRate = this.baseAttackFrameRate * this.attackSpeed;
        }
        if (this.attackEffectMC != null) {
            this.attackEffectMC.frameRate = this.baseAttackEffectFrameRate * this.attackSpeed;
        }
        if (this.attackSpeed > 1 && this.spesMC != null) {
            this.spesMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
            this.addChild(this.spesMC);
            this.spesMC.gotoAndPlay("effect", 1);
        }
    }

    private setHeroActive() {
        if (this.active) {
            this.setAttackSpeed();
        } else {
            this.destroyAttackTimer();
        }
        if (this.heroMC == null) {
            return;
        }
        let frame = this.active ? "attack" : "gray";
        this.heroMC.gotoAndStop(frame);
    }

    private attackEvent() {
        this.attack();
    }


    private attack() {
        if (!this.active || FightLayer.inst.monsterLayer.isComplete()) {
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
        const v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, false, 0, this.getAttackEffectMC());
    }


    private attackPlay() {
        this.attactReady = true;
        if (this.heroMC != null) {
            this.heroMC.gotoAndPlay("attack", 1);
        }
    }


    public getAttackEffectMC(): egret.MovieClip {
        return this.attackEffectMC;
    }


    public startSkillSpes(mcdf: egret.MovieClipDataFactory, rate: number) {
        if (!this.active || rate <= 1) {
            return;
        }
        this.attackSpeed = rate;
        if (mcdf != null && this.spesMC == null) {
            this.spesMC = new egret.MovieClip(mcdf.generateMovieClipData("skill"));
        }
        this.setAttackSpeed();
    }

    public stopSkillSpes() {
        if (!this.active) {
            return;
        }
        this.attackSpeed = 1;
        this.setAttackSpeed();
    }

    private skillMCComplete(e: egret.Event) {
        const mc: egret.MovieClip = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }
        this.spesMC = null;
    }


    public getAttackValue(): number {
        return this.baseDamage * this.baseDimagePercent;
    }

    private setHeroPoint() {
        switch (this.index) {
            case "pandora":
                this.x = 40;
                this.y = 470;
                break;
            case "poseidon":
                this.x = 430;
                this.y = 470;
                break;
            case "athena":
                this.x = 40;
                this.y = 370;
                break;
            case "handes":
                this.x = 430;
                this.y = 370;
                break;
            case "hera":
                this.x = 40;
                this.y = 270;
                break;
            case "zeus":
                this.x = 430;
                this.y = 270;
                break;
        }
    }
}