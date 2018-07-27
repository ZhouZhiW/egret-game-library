class LoginUI extends BaseComponent {
    private errorInfo: eui.Label;
    private resInit: boolean;
    private dataInit: boolean;
    private listener: any;

    public constructor() {
        super();
        this.resInit = false;
        this.dataInit = false;
        this.login();
    }

    public addClickListener(l: Function, self: any) {
        this.listener = { callback: l, callbackThis: self };
    }

    protected onCreate() {
        this.loadRes();
    }

    private loadRes() {
        this.resCount = 1;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.resComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.resLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.resLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.resOnload, this);
        RES.loadGroup("mc");
        RES.loadGroup("game");
    }

    private resLoadError(event: RES.ResourceEvent) {
        this.errorInfo.text = "资源加载错误！"
    }

    private resCount;
    private resComplete() {
        this.resCount++;
        if (this.resCount > 2) {
            this.resInit = true;
            this.initComplete();
        }
    }


    private resOnload(event: RES.ResourceEvent) {
        this.errorInfo.text = "Loading...\n" 
        +  this.resCount +"/2 ("
        + Math.floor(event.itemsLoaded * 100 / event.itemsTotal) + "%)";
    }


    private login() {
        DataManager.inst.userInfo.addDataListener(this.loginGame, this, BaseData.DATA_CHANGED_ALL, false);
        let loginParam = null;
        if (HttpRequest.isPhone) {
            const params = location.search;
            if (params.indexOf("?") != -1) {
                loginParam = "platCode=1&" + params.substr(1);
            } else {
                this.errorInfo.text = "信息认证失败！"
            }
        } else {
            // this.log.text = "Url: " + HttpRequest.CurrentUrl + "\nTestName: " + HttpRequest.TestName;
            loginParam = "platCode=0&account=" + HttpRequest.TestName;
        }
        if (loginParam != null) {
            NetEventManager.inst.pushLogin(loginParam);
        }
    }

    private loginGame() {
        const user = DataManager.inst.userInfo;
        if (user.userId == null) {
            this.errorInfo.text = "登录失败！"
            return;
        }
        if (HttpRequest.isPhone) {
            // this.log.text = "Url: " + HttpRequest.CurrentUrl + "\nuserId" + user.userId + "\ngid: " + user.gid + "\nappkey: " + user.appkey + "\nhlmy_gw: " + user.hlmy_gw;
            hlmyInit(user.gid, user.appkey, user.hlmy_gw);
        }
        DataManager.inst.userInfo.removeDataListener(this.loginGame, this, BaseData.DATA_CHANGED_ALL);
        DataManager.inst.addInitDataListener(this.initGame, this);
        NetEventManager.inst.pushInit();
    }


    private initGame() {
        DataManager.inst.removeInitDataListener();
        this.dataInit = true;
        this.initComplete();
    }

    private initComplete() {
        if (!this.dataInit || !this.resInit) {
            return;
        }
        this.errorInfo.text = ""
        this.listener.callback.call(this.listener.callbackThis)
    }

    private delayLoad() {

    }

    protected onDestroy() {
        this.listener = null;
    }

    protected get skinPath(): String {
        return "resource/skins/main/LoginSkin.exml";
    }


}