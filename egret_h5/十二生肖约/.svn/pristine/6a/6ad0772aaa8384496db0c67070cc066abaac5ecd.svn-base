class FightLayer extends BaseLayer {
    private static ins: FightLayer;
    public gameStatistics: GameStatistics;
    private isShake: boolean;

    public sceneLayer: SceneLayer;
    public monsterLayer: MonstersLayer;
    public roleLayer: RoleLayer;
    public infoLayer: InfoLayer;

    public static get inst(): FightLayer {
        if (FightLayer.ins == null) {
            FightLayer.ins = new FightLayer();
        }
        return this.ins;
    }

    public constructor() {
        super();
        this.isShake = false;
        this.gameStatistics = new GameStatistics();
    }

    protected onCreate() {
        super.onCreate();

        this.sceneLayer = new SceneLayer();
        this.monsterLayer = new MonstersLayer();
        this.roleLayer = new RoleLayer();
        this.infoLayer = new InfoLayer();

        this.addChild(this.sceneLayer);
        this.addChild(this.monsterLayer)
        this.addChild(this.roleLayer);
        this.addChild(this.infoLayer);


    }

    protected onDestroy() {
        FightLayer.ins = null;
        super.onDestroy();
    }


    public shake() {
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        egret.Tween.get(this)
            .to({ x: 8, y: 8 }, 80, egret.Ease.sineOut)
            .to({ x: - 5, y: - 5 }, 140, egret.Ease.sineOut)
            .to({ x: 2, y: 2 }, 100, egret.Ease.sineOut)
            // .to({ x: -3, y: -3 }, 50, egret.Ease.sineOut)
            .to({ x: 0, y: 0 }, 40, egret.Ease.sineOut)
            .wait(200)
            .call(this.shakeEnd, this);
    }
    private shakeEnd() {
        egret.Tween.removeTweens(this);
        this.x = 0;
        this.y = 0;
        this.isShake = false;
    }
}

