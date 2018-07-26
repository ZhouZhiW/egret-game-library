/**
 * Created by Administrator on 2015/5/23.
 * 对象池？？？哈哈
 */

class RolePool extends egret.Sprite {
    public key:number;//池标识
    Ro_Zu:Role[];
    public playerPool:string;//用于 换装
    //josn:string,texture:string, name:string
    public j_josn:string;
    public t_texture:string;
    public n_name:string;

    public constructor() {
        super();
        this.key = 0;
        this.Ro_Zu = [];
        this.playerPool = "";
        this.j_josn = "";
        this.t_texture = "";
        this.n_name = "";
    }
    public destroyObject(key:number):void{
        var index:number = 0;
        var isYu:boolean = false;
        for(index;index < this.Ro_Zu.length;index ++){
            if(key == this.Ro_Zu[index].key){
                isYu = true;
                break;
            }
        }
        if(isYu){
            this.Ro_Zu.splice(index,1);
        }
    }
    public getRole(key:number,step:number):Role{

        var index:number = 0;
        var isRo:boolean = false;

        for(index;index < this.Ro_Zu.length;index ++){
            if(key == this.Ro_Zu[index].key && this.playerPool == this.Ro_Zu[index].playerPool){
                isRo = true;
                break;
            }
        }
        //console.log("调试输出：组：" + this.playerPool,this.j_josn,this.t_texture,this.n_name,step);//调试
        if(isRo){
            //console.log("调试输出：池对象：" + this.Ro_Zu[index].key);//调试
            this.Ro_Zu[index].isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            return this.Ro_Zu[index];
        }else{
            var newRo = new Role();
            newRo.isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            newRo.startRole(this.playerPool, this.j_josn,this.t_texture,this.n_name,step);
            newRo.key = key;
            newRo.step = step;
            this.Ro_Zu.push(newRo);
            //console.log("调试输出：新对象：" + newRo.key);//调试
            return newRo;
        }

    }

}