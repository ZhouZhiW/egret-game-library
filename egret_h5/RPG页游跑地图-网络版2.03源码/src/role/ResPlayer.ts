/**
 * Created by Administrator on 2015/5/26.
 */

class ResPlayer extends egret.Sprite {
    private Group_Zu:string[] = [];//储存 已加载的 组名字
    private Zu:GroupStringA[] = [];//等待加载
    private isJZ:boolean = false;//是否正在加载
    private timer:egret.Timer = new egret.Timer(1000 / 1);
    public constructor() {
        super();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    }
    public onAddToStage(Group:string,j_name:string,p_name:string,z_name:string):void {
        //console.warn("加载:" + Group);
        if(this.isGroup(Group)){
            //如果已经加载过 组，就跳过

        }else{
            var Z:GroupStringA = new GroupStringA();
            Z.g_name = Group;
            Z.j_name = j_name;
            Z.p_name = p_name;
            Z.z_name = z_name;

            this.Zu.push(Z);
        }
    }

    private onTimer(e:egret.TimerEvent) {

        if(this.isJZ){
            return;
        }else{
            if(this.Zu.length > 0){
                this.isJZ = true;
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.loadGroup(this.Zu[0].g_name);
            }

        }

    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("加载失败Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {

        //console.warn("加载进度Group:" + event.groupName  + "  " +  event.itemsLoaded + "/" + event.itemsTotal);

    }
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        //这里不能删除 侦听器，要不然 同时多个资源加载不了。。
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.Group_Zu.push(event.groupName);//保存 组名字
        //Main.Group_name = event.groupName;

        //将 皮肤参数 保存到 数组
        RoleConstant.skin_zu.push(this.Zu[0]);

        console.warn("加载完成:" + event.groupName);
        this.dispatchEvent(new egret.Event(event.groupName));
        this.Zu.splice(0,1);
        this.isJZ = false;
    }

    //查询是否已加载过 组
    private isGroup(name:string):boolean{
        var index:number = 0;
        var isRo:boolean = false;
        for(index;index < this.Group_Zu.length;index ++){
            if(name == this.Group_Zu[index]){
                isRo = true;
                break;
            }
        }
        return isRo;
    }
}