var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.resInit = false;
        _this.dataInit = false;
        _this.login();
        return _this;
    }
    LoginUI.prototype.addClickListener = function (l, self) {
        this.listener = { callback: l, callbackThis: self };
    };
    LoginUI.prototype.onCreate = function () {
        this.loadRes();
    };
    LoginUI.prototype.loadRes = function () {
        this.resCount = 1;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.resComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.resLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.resLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.resOnload, this);
        RES.loadGroup("mc");
        RES.loadGroup("game");
    };
    LoginUI.prototype.resLoadError = function (event) {
        this.errorInfo.text = "资源加载错误！";
    };
    LoginUI.prototype.resComplete = function () {
        this.resCount++;
        if (this.resCount > 2) {
            this.resInit = true;
            this.initComplete();
        }
    };
    LoginUI.prototype.resOnload = function (event) {
        this.errorInfo.text = "Loading...\n"
            + this.resCount + "/2 ("
            + Math.floor(event.itemsLoaded * 100 / event.itemsTotal) + "%)";
    };
    LoginUI.prototype.login = function () {
        DataManager.inst.userInfo.addDataListener(this.loginGame, this, BaseData.DATA_CHANGED_ALL, false);
        var loginParam = null;
        if (HttpRequest.isPhone) {
            var params = location.search;
            if (params.indexOf("?") != -1) {
                loginParam = "platCode=1&" + params.substr(1);
            }
            else {
                this.errorInfo.text = "信息认证失败！";
            }
        }
        else {
            // this.log.text = "Url: " + HttpRequest.CurrentUrl + "\nTestName: " + HttpRequest.TestName;
            loginParam = "platCode=0&account=" + HttpRequest.TestName;
        }
        if (loginParam != null) {
            NetEventManager.inst.pushLogin(loginParam);
        }
    };
    LoginUI.prototype.loginGame = function () {
        var user = DataManager.inst.userInfo;
        if (user.userId == null) {
            this.errorInfo.text = "登录失败！";
            return;
        }
        if (HttpRequest.isPhone) {
            // this.log.text = "Url: " + HttpRequest.CurrentUrl + "\nuserId" + user.userId + "\ngid: " + user.gid + "\nappkey: " + user.appkey + "\nhlmy_gw: " + user.hlmy_gw;
            hlmyInit(user.gid, user.appkey, user.hlmy_gw);
        }
        DataManager.inst.userInfo.removeDataListener(this.loginGame, this, BaseData.DATA_CHANGED_ALL);
        DataManager.inst.addInitDataListener(this.initGame, this);
        NetEventManager.inst.pushInit();
    };
    LoginUI.prototype.initGame = function () {
        DataManager.inst.removeInitDataListener();
        this.dataInit = true;
        this.initComplete();
    };
    LoginUI.prototype.initComplete = function () {
        if (!this.dataInit || !this.resInit) {
            return;
        }
        this.errorInfo.text = "";
        this.listener.callback.call(this.listener.callbackThis);
    };
    LoginUI.prototype.delayLoad = function () {
    };
    LoginUI.prototype.onDestroy = function () {
        this.listener = null;
    };
    Object.defineProperty(LoginUI.prototype, "skinPath", {
        get: function () {
            return "resource/skins/main/LoginSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return LoginUI;
}(BaseComponent));
__reflect(LoginUI.prototype, "LoginUI");
//# sourceMappingURL=LoginUI.js.map