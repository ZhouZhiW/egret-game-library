/**
 * Created by Administrator on 2015/5/26.
 */
var ResPlayer = (function (_super) {
    __extends(ResPlayer, _super);
    function ResPlayer() {
        _super.call(this);
        this.Group_Zu = []; //储存 已加载的 组名字
        this.Zu = []; //等待加载
        this.isJZ = false; //是否正在加载
        this.timer = new egret.Timer(1000 / 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    }
    var d = __define,c=ResPlayer,p=c.prototype;
    p.onAddToStage = function (Group, j_name, p_name, z_name) {
        //console.warn("加载:" + Group);
        if (this.isGroup(Group)) {
        }
        else {
            var Z = new GroupStringA();
            Z.g_name = Group;
            Z.j_name = j_name;
            Z.p_name = p_name;
            Z.z_name = z_name;
            this.Zu.push(Z);
        }
    };
    p.onTimer = function (e) {
        if (this.isJZ) {
            return;
        }
        else {
            if (this.Zu.length > 0) {
                this.isJZ = true;
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.loadGroup(this.Zu[0].g_name);
            }
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("加载失败Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        //console.warn("加载进度Group:" + event.groupName  + "  " +  event.itemsLoaded + "/" + event.itemsTotal);
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        //这里不能删除 侦听器，要不然 同时多个资源加载不了。。
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.Group_Zu.push(event.groupName); //保存 组名字
        //Main.Group_name = event.groupName;
        //将 皮肤参数 保存到 数组
        RoleConstant.skin_zu.push(this.Zu[0]);
        console.warn("加载完成:" + event.groupName);
        this.dispatchEvent(new egret.Event(event.groupName));
        this.Zu.splice(0, 1);
        this.isJZ = false;
    };
    //查询是否已加载过 组
    p.isGroup = function (name) {
        var index = 0;
        var isRo = false;
        for (index; index < this.Group_Zu.length; index++) {
            if (name == this.Group_Zu[index]) {
                isRo = true;
                break;
            }
        }
        return isRo;
    };
    return ResPlayer;
})(egret.Sprite);
egret.registerClass(ResPlayer,'ResPlayer');
//# sourceMappingURL=ResPlayer.js.map