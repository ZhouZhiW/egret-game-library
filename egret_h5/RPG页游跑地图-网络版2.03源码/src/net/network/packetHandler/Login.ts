/**
 *
 * @author 
 *
 */
class Login extends egret.Shape{
	public constructor() {
        super();
	}
    public login(Obj: any): void {
        
        var acc: string = Obj["login"]["account"];
        var pas: string = Obj["login"]["password"];
        var id: string = Obj["login"]["id"];
        var name: string = Obj["login"]["name"];
        var xx: string = Obj["login"]["x"];
        var yy: string = Obj["login"]["y"];
        
        console.warn("帐号：" + acc + " 密码：" + pas + " id：" + id + " name：" + name);
        RoleConstant.player.acc = acc;
        RoleConstant.player.pas = pas;
        RoleConstant.player.id = id;
        RoleConstant.player.name = name;
        RoleConstant.player.x = parseInt(xx);
        RoleConstant.player.y = parseInt(yy);
        this.dispatchEvent(new egret.Event("loginOk"));
    }
}
