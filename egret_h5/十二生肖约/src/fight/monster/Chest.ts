class Chest extends BaseMovieClip {
    private MoveAreaLeft = -40;
    private MoveAreaTop = 200;
    private MoveAreaRight = 500;
    private MoveAreaBottom = 500;

    private MoveSpeed = 1;
    private moveAngle: number;
    private direction: number;
    private moveTimer: egret.Timer

    private chestMC: egret.MovieClip;
    private chestID: number;
    public constructor(chestID: number) {
        super();
        this.chestID = chestID;
        this.getRandomPoint();
        this.moveAngle = this.getRandomAngle();
        this.loadMovieClipDataFactory("resource/mc/monsters/flybox", this.getChestMC);
    }
    protected onCreate() {
        super.onCreate();
        this.moveTimer = new egret.Timer(100, 0);
        this.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.moveTimer.start();
    }

    protected onDestroy() {
        if (this.moveTimer != null) {
            this.moveTimer.stop();
            this.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
            this.moveTimer = null;
        }
        super.onDestroy();
    }

    private getChestMC(mcdf: egret.MovieClipDataFactory) {
        this.chestMC = new egret.MovieClip(mcdf.generateMovieClipData("flybox"));
        this.addChild(this.chestMC);
        this.chestMC.gotoAndPlay("flybox", -1);
        this.scaleX = this.direction;
    }

    public checkClick(stageX: number, stageY: number): boolean {
        if (this.hitTestPoint(stageX, stageY, false)) {
            this.end(true);
            return true;
        } else {
            return false;
        }
    }

    private end(isOpen: boolean) {
        if (this.chestMC != null) {
            this.chestMC.stop();
        }
        if (this.moveTimer != null) {
            this.moveTimer.stop();
        }
        egret.Tween.get(this).to({ alpha: 0 }, 200).call(this.openComplete, this);
        NetEventManager.inst.pushOpenChest(this.chestID, isOpen);
    }

    private openComplete() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    private move() {
        this.x += this.MoveSpeed * Math.cos(this.moveAngle);
        this.y += this.MoveSpeed * Math.sin(this.moveAngle);
        if (this.x < this.MoveAreaLeft || this.x > this.MoveAreaRight || this.y < this.MoveAreaTop || this.y > this.MoveAreaBottom) {
            // this.moveAngle = this.getRandomAngle();
            this.end(false);
        }
    }




    private getRandomPoint() {
        const r = Math.random();
        const x = r < 0.5 ? this.MoveAreaLeft : this.MoveAreaRight;
        const y = Utils.random(this.MoveAreaTop, this.MoveAreaBottom);
        this.x = x;
        this.y = y;
        this.direction = x < 0 ? -1 : 1;
    }

    private getRandomAngle(): number {
        const x = this.x < 0 ? this.MoveAreaRight : this.MoveAreaLeft;
        const y = Utils.random(this.MoveAreaTop, this.MoveAreaBottom);
        const h = Math.atan2(y - this.y, x - this.x);
        return h;
    }


} 