/**
 * Created by Administrator on 2015/5/23.
 * 对象池？？？哈哈
 */
var RolePool = (function (_super) {
    __extends(RolePool, _super);
    function RolePool() {
        _super.call(this);
        this.key = 0;
        this.Ro_Zu = [];
        this.playerPool = "";
        this.j_josn = "";
        this.t_texture = "";
        this.n_name = "";
    }
    var d = __define,c=RolePool,p=c.prototype;
    p.destroyObject = function (key) {
        var index = 0;
        var isYu = false;
        for (index; index < this.Ro_Zu.length; index++) {
            if (key == this.Ro_Zu[index].key) {
                isYu = true;
                break;
            }
        }
        if (isYu) {
            this.Ro_Zu.splice(index, 1);
        }
    };
    p.getRole = function (key, step) {
        var index = 0;
        var isRo = false;
        for (index; index < this.Ro_Zu.length; index++) {
            if (key == this.Ro_Zu[index].key && this.playerPool == this.Ro_Zu[index].playerPool) {
                isRo = true;
                break;
            }
        }
        //console.log("调试输出：组：" + this.playerPool,this.j_josn,this.t_texture,this.n_name,step);//调试
        if (isRo) {
            //console.log("调试输出：池对象：" + this.Ro_Zu[index].key);//调试
            this.Ro_Zu[index].isTimer(true); //使用 对象 前，先 启动 对象里的 定时器
            return this.Ro_Zu[index];
        }
        else {
            var newRo = new Role();
            newRo.isTimer(true); //使用 对象 前，先 启动 对象里的 定时器
            newRo.startRole(this.playerPool, this.j_josn, this.t_texture, this.n_name, step);
            newRo.key = key;
            newRo.step = step;
            this.Ro_Zu.push(newRo);
            //console.log("调试输出：新对象：" + newRo.key);//调试
            return newRo;
        }
    };
    return RolePool;
})(egret.Sprite);
egret.registerClass(RolePool,'RolePool');
//# sourceMappingURL=RolePool.js.map