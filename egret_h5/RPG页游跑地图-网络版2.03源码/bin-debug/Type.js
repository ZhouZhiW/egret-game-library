/**
 *
 * @author
 *
 */
var Type = (function () {
    function Type() {
    }
    var d = __define,c=Type,p=c.prototype;
    return Type;
})();
egret.registerClass(Type,'Type');
/*class Point {
    public x: number;
    public y: number;
}*/
var imgName = (function () {
    function imgName() {
        this.x = 0;
        this.y = 0;
        this.isLoad = false;
    }
    var d = __define,c=imgName,p=c.prototype;
    return imgName;
})();
egret.registerClass(imgName,'imgName');
var GroupStringA = (function () {
    function GroupStringA() {
    }
    var d = __define,c=GroupStringA,p=c.prototype;
    return GroupStringA;
})();
egret.registerClass(GroupStringA,'GroupStringA');
var RoleType = (function () {
    function RoleType() {
        this.rolePool = new RolePool();
    }
    var d = __define,c=RoleType,p=c.prototype;
    return RoleType;
})();
egret.registerClass(RoleType,'RoleType');
var MonsterType = (function () {
    function MonsterType() {
    }
    var d = __define,c=MonsterType,p=c.prototype;
    return MonsterType;
})();
egret.registerClass(MonsterType,'MonsterType');
var PlayType = (function () {
    function PlayType() {
        this.acc = "";
        this.pas = "";
        this.id = "";
        this.name = "";
        this.x = 0;
        this.y = 0;
    }
    var d = __define,c=PlayType,p=c.prototype;
    return PlayType;
})();
egret.registerClass(PlayType,'PlayType');
//# sourceMappingURL=Type.js.map