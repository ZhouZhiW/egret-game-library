class UILayer extends BaseLayer {
    private static ins: UILayer;
    private homeLayer: UI_Home_Main;
    private visitLayer: UI_Visit_Main;
    private treasuresManager: UI_TreasuresManager;
    public static get inst(): UILayer {
        if (UILayer.ins == null) {
            UILayer.ins = new UILayer();
        }
        return this.ins;
    }

    public constructor() {
        super();
    }

    protected onCreate() {
        super.onCreate();
        this.homeLayer = new UI_Home_Main();
        this.addChild(this.homeLayer);
        this.treasuresManager = new UI_TreasuresManager();
    }

    protected onDestroy() {
        super.onDestroy();
    }

    public get home(): UI_Home_Main {
        return this.homeLayer;
    }

    public showVisit(playerID: string) {
        this.addChild(new UI_Visit_Tab_Main(playerID));
        // this.visitLayer = new UI_Visit_Main(playerID);
        // this.addChild(this.visitLayer);
    }

    public closeVisit() {
        if (this.visitLayer != null) {
            this.removeChild(this.visitLayer);
            this.visitLayer = null;
        }
    }




}