class Monster extends BaseMovieClip {

    private static MoveAreaLeft = 120;
    private static MoveAreaTop = 200;
    private static MoveAreaRight = 360;
    private static MoveAreaBottom = 500;

    private MoveSpeed;
    private moveAngle: number;
    private moveTimer: egret.Timer

    private index: string;

    private hPProgressBar: G_HPProgressBar;

    private monsterMC: egret.MovieClip;
    private monsterBornMC: egret.MovieClip;
    private monsterDeadMC: egret.MovieClip;
    private attackEffect: egret.MovieClip;



    // =====================================
    private monsterMaxHP: number;
    private monsterNowHP: number;
    private goldValue: number;
    private bossChestId: number;
    public constructor(mcdf: egret.MovieClipDataFactory, id: string, hp: number, gold: number, bossChestId: number) {
        super();
        this.MoveSpeed = 0;
        this.index = id;
        this.monsterMaxHP = hp;
        this.monsterNowHP = this.monsterMaxHP;
        this.goldValue = gold;
        this.bossChestId = bossChestId;
        this.moveTimer = new egret.Timer(100, 0);
        this.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.moveTimer.start();
        this.loadMovieClipDataFactory("resource/mc/monsters/monster_" + this.index, this.getMonsterMC);
        if (mcdf != null) {
            this.monsterBornMC = new egret.MovieClip(mcdf.generateMovieClipData("born"));
            this.monsterDeadMC = new egret.MovieClip(mcdf.generateMovieClipData("dead"));
        }
        const p = this.getRandomPoint();
        this.x = p.x;
        this.y = p.y;
    }

    protected onCreate() {
        super.onCreate();
    }

    protected onDestroy() {
        if (this.moveTimer != null) {
            this.moveTimer.stop();
            this.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
            this.moveTimer = null;
        }
        super.onDestroy();
    }

    private getMonsterMC(mcdf: egret.MovieClipDataFactory) {
        this.monsterMC = new egret.MovieClip(mcdf.generateMovieClipData("monster"));
        this.monsterMC.alpha = 0;
        this.born();
    }


    private born() {
        if (this.monsterBornMC) {
            this.addChild(this.monsterBornMC);
            this.monsterBornMC.once(egret.Event.COMPLETE, this.bornComplete, this);
            this.monsterBornMC.gotoAndPlay("born", 1);
        }
        egret.Tween.get(this.monsterMC).to({ y: - 40, alpha: 1 }, 200, egret.Ease.sineOut)
            .to({ y: 0 }, 200, egret.Ease.sineIn).call(this.start, this);
        this.addChild(this.monsterMC);

    }
    private bornComplete() {
        if (this.monsterBornMC.parent != null) {
            this.monsterBornMC.parent.removeChild(this.monsterBornMC);
        }
        this.monsterBornMC = null;
    }

    private start() {
        if (this.monsterMC == null) {
            return;
        }
        this.hPProgressBar = new G_HPProgressBar();
        this.hPProgressBar.x = -this.hPProgressBar.getW() >> 1;
        this.hPProgressBar.y = (this.monsterMC.height >> 1);
        this.addChild(this.hPProgressBar);
        this.moveAngle = this.getRandomAngle();
        this.monsterMC.gotoAndPlay("walk", -1);
        this.MoveSpeed = 1.6;
    }

    private move() {
        if (this.MoveSpeed == 0) {
            return;
        }
        this.x += this.MoveSpeed * Math.cos(this.moveAngle);
        this.y += this.MoveSpeed * Math.sin(this.moveAngle);
        if (this.x < Monster.MoveAreaLeft || this.x > Monster.MoveAreaRight || this.y < Monster.MoveAreaTop || this.y > Monster.MoveAreaBottom) {
            this.moveAngle = this.getRandomAngle();
        }
    }

    public attact(attactValue: number, isShowValue: boolean, attactGold: number = 0, attactEffec: egret.MovieClip = null): number {
        if (this.monsterNowHP == 0) {
            return 0;
        }
        const value = Math.abs(attactValue);
        const isCris = attactValue < 0;
        let lostHp: number;
        if (this.monsterNowHP <= value) {
            lostHp = this.monsterNowHP;
            this.monsterNowHP = 0;
            this.dead();
        } else {
            lostHp = value;
            this.monsterNowHP -= lostHp;
        }

        if (attactGold > 0) {
            const goldData = Data_Gold.makeGoldData(DataType_Gold.PlayerSkill, this.goldValue * attactGold);
            FightLayer.inst.sceneLayer.pushGold(goldData, this.getPoint());
        }
        if (this.monsterMC != null && attactEffec != null) {
            attactEffec.once(egret.Event.COMPLETE, this.attackEffectComplete, this);
            attactEffec.gotoAndPlay("skill", 1);
            this.addChild(attactEffec);

        }
        FightLayer.inst.sceneLayer.loseHP(lostHp);
        if (this.hPProgressBar) {
            this.hPProgressBar.setHP(this.monsterNowHP, this.monsterMaxHP);
        }
        if (isShowValue) {
            FightLayer.inst.roleLayer.showFloatingAttactValue(attactValue, this.getPoint());
        }
        return isCris ? -lostHp : lostHp;
    }

    private attackEffectComplete(e: egret.Event) {
        const attackEffect: egret.MovieClip = e.currentTarget;
        if (attackEffect.parent != null) {
            attackEffect.parent.removeChild(attackEffect);
        }
    }

    private dead() {
        if (this.monsterDeadMC) {
            this.addChild(this.monsterDeadMC);
            this.monsterDeadMC.once(egret.Event.COMPLETE, this.deadComplete, this);
            this.monsterDeadMC.gotoAndPlay("dead", 1);
        }
        if (this.bossChestId > 0) {
            FightLayer.inst.monsterLayer.showBossChest(this.getPoint());
        } else {
            const goldData = Data_Gold.makeGoldData(DataType_Gold.Monster, this.goldValue);
            FightLayer.inst.sceneLayer.pushGold(goldData, this.getPoint());
        }
        egret.Tween.get(this).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.end, this);
    }

    private deadComplete() {
        if (this.monsterDeadMC.parent != null) {
            this.monsterDeadMC.parent.removeChild(this.monsterDeadMC);
        }
        this.monsterDeadMC = null;
    }

    public cancle() {
        if (this.monsterNowHP == 0) {
            return;
        }
        this.monsterNowHP = 0;
        egret.Tween.get(this).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.end, this);
    }

    private end() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    public getDistance(p: egret.Point): number {
        return this.monsterNowHP == 0 ? -1 : egret.Point.distance(p, this.getPoint());
    }


    // =======================================================================

    private movePoint: egret.Point;
    private getRandomPoint(): egret.Point {
        if (this.movePoint == null) {
            this.movePoint = new egret.Point();
        }
        const x = Utils.random(Monster.MoveAreaLeft, Monster.MoveAreaRight);
        const y = Utils.random(Monster.MoveAreaTop, Monster.MoveAreaBottom);
        this.movePoint.x = x;
        this.movePoint.y = y;
        return this.movePoint;
    }

    //已经斜边和角度  角度的对边=斜边*sin角度 角度邻边=斜边*cos角度
    //1弧度=180/π度 1度=π/180弧度  两点之间角度：atan2(y2-y1,x2-x1);
    // 90度π/2 180度2π/3 270度 -π/2
    private getRandomAngle(type: number = 0): number {
        const p = this.getRandomPoint();
        const h = Math.atan2(p.y - this.y, p.x - this.x);
        if (Math.abs(h) < Math.PI / 2) {
            this.monsterMC.scaleX = -1
        } else {
            this.monsterMC.scaleX = 1
        }
        return h;
    }

}