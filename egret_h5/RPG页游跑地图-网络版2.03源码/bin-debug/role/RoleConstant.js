/**
 * Created by Administrator on 2015/5/26.
 */
var RoleConstant = (function (_super) {
    __extends(RoleConstant, _super);
    function RoleConstant() {
        _super.call(this);
    }
    var d = __define,c=RoleConstant,p=c.prototype;
    RoleConstant.rolePool = new RolePool();
    RoleConstant.hP = 0;
    RoleConstant.player = new PlayType();
    RoleConstant.skin_zu = [];
    return RoleConstant;
})(egret.Sprite);
egret.registerClass(RoleConstant,'RoleConstant');
//# sourceMappingURL=RoleConstant.js.map