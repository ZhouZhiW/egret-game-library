class LayerManager extends BaseLayer {
    private loginView: LoginUI;
    private fightLayer: FightLayer;
    private uiLayer: UILayer;
    private dialogLayer: DialogLayer;

    public constructor() {
        super();
        this.loginView = new LoginUI();
        this.fightLayer = FightLayer.inst;
        this.uiLayer = UILayer.inst;
        this.dialogLayer = DialogLayer.inst;

    }
    protected onCreate() {
        this.login();
        this.addChild(this.dialogLayer);
    }

    protected onDestroy() {
    }

    private login() {
        this.loginView.addClickListener(this.goGame, this);
        this.addChildAt(this.loginView, 0);
    }

    private goGame() {
        this.removeChild(this.loginView);
        this.loginView = null;
        this.addChildAt(FightLayer.inst, 0);
        this.addChildAt(UILayer.inst, 1);
    }



}