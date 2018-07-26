/**
 *
 * @author
 *
 */
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        _super.call(this);
    }
    var d = __define,c=Login,p=c.prototype;
    p.login = function (Obj) {
        var acc = Obj["login"]["account"];
        var pas = Obj["login"]["password"];
        var id = Obj["login"]["id"];
        var name = Obj["login"]["name"];
        var xx = Obj["login"]["x"];
        var yy = Obj["login"]["y"];
        console.warn("帐号：" + acc + " 密码：" + pas + " id：" + id + " name：" + name);
        RoleConstant.player.acc = acc;
        RoleConstant.player.pas = pas;
        RoleConstant.player.id = id;
        RoleConstant.player.name = name;
        RoleConstant.player.x = parseInt(xx);
        RoleConstant.player.y = parseInt(yy);
        this.dispatchEvent(new egret.Event("loginOk"));
    };
    return Login;
})(egret.Shape);
egret.registerClass(Login,'Login');
//# sourceMappingURL=Login.js.map