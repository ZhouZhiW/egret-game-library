var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 玩家控制的角色
 * @author nodep
 * @version 1.0
 */
var PlayerRole = (function (_super) {
    __extends(PlayerRole, _super);
    function PlayerRole() {
        var _this = _super.call(this) || this;
        PlayerRole.self = _this;
        _this.type = RoleType.ROLE_PLAYER;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xFF0000, 1);
        shape.graphics.drawRect(-30, -120, 60, 120);
        shape.graphics.endFill();
        _this.addChild(shape);
        _this.speedX = 8;
        _this.speedY = 4;
        return _this;
    }
    //角色的移动处理,这里的移动优化应该还可以继续优化
    PlayerRole.prototype.renderUpdate = function (interval) {
        if (RockBarContorller.offset == 0)
            return;
        //在这里检查某个点是否可以到达
        var tox = this.x + RockBarContorller.multX * this.speedX;
        var toy = this.y + RockBarContorller.multY * this.speedY;
        var standType = FloorLayer.floorSelf.getStandType(tox, toy);
        var canMove = false;
        if (standType == StandType.LAND) {
            if (!StageLayer.self.hitTestRole(tox, toy)) {
                canMove = true;
            }
            else {
                tox = this.x;
                toy = this.y + RockBarContorller.multY * this.speedY;
                if (!StageLayer.self.hitTestRole(tox, toy)) {
                    canMove = true;
                }
                else {
                    tox = this.x + RockBarContorller.multX * this.speedX;
                    toy = this.y;
                    if (!StageLayer.self.hitTestRole(tox, toy)) {
                        canMove = true;
                    }
                }
            }
            if (canMove) {
                this.x = tox;
                this.y = toy;
                this.checkPosY();
                WinsManager.getIns().updateWin(UpdateType.MAP_SELF_MOVE, [WorWindowType.MINI_MAP]);
            }
        }
    };
    //错误位置修正
    PlayerRole.prototype.amendPosition = function () {
        while (StageLayer.self.hitTestRole(this.x, this.y))
            this.y += 20;
    };
    return PlayerRole;
}(FocusRole));
__reflect(PlayerRole.prototype, "PlayerRole");
//# sourceMappingURL=PlayerRole.js.map