var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 世界与场景相关的逻辑类
 * @author nodep
 * @version 1.0
 */
var WorldManager = (function () {
    function WorldManager() {
        this.focusOptionRole = null; //当前与主角互动的
    }
    WorldManager.getIns = function () {
        if (WorldManager._ins == null)
            WorldManager._ins = new WorldManager();
        return WorldManager._ins;
    };
    /**设置当前操作对象 */
    WorldManager.prototype.setOptionRole = function (role) {
        if (role != this.focusOptionRole) {
            this.focusOptionRole = role;
            //通知界面更新
            WinsManager.getIns().updateWin(UpdateType.MAP_OPT_CHANGE, [WorWindowType.CURB_BAR]);
        }
    };
    /**尝试与场景进行互动 */
    WorldManager.prototype.actOptionRole = function () {
        if (this.focusOptionRole == null)
            return;
        switch (this.focusOptionRole.getOptType()) {
            case RoleType.PLANT_TREE:
                break;
            case RoleType.PLANT_COLL:
                break;
            case RoleType.GROUND_ITEM:
                break;
            case RoleType.ROLE_NPC:
                break;
            case RoleType.ROLE_ANIMAL:
                break;
            case RoleType.ROLE_WILD:
                break;
            case RoleType.ORE:
                break;
            case RoleType.TRAP:
                break;
        }
    };
    return WorldManager;
}());
__reflect(WorldManager.prototype, "WorldManager");
//# sourceMappingURL=WorldManager.js.map