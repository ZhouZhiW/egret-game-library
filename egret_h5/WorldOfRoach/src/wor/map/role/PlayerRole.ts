/**
 * 玩家控制的角色
 * @author nodep
 * @version 1.0
 */
class PlayerRole extends FocusRole {

	public static self: PlayerRole;

	public constructor() {
		super();
		PlayerRole.self = this;
		this.type = RoleType.ROLE_PLAYER;
		var shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xFF0000, 1);
		shape.graphics.drawRect(-30, -120, 60, 120);
		shape.graphics.endFill();
		this.addChild(shape)
		this.speedX = 8;
		this.speedY = 4;
	}

	//角色的移动处理,这里的移动优化应该还可以继续优化
	public renderUpdate(interval: number): void {
		if (RockBarContorller.offset == 0)
			return;
		//在这里检查某个点是否可以到达
		var tox: number = this.x + RockBarContorller.multX * this.speedX;
		var toy: number = this.y + RockBarContorller.multY * this.speedY;
		var standType: number = FloorLayer.floorSelf.getStandType(tox,toy);
		var canMove:boolean = false;
		if (standType == StandType.LAND) {
			if (!StageLayer.self.hitTestRole(tox, toy)) {
				canMove = true;
			}
			else {//优化移动
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
			if(canMove)
			{
				this.x = tox;
				this.y = toy;
				this.checkPosY();
				WinsManager.getIns().updateWin(UpdateType.MAP_SELF_MOVE,[WorWindowType.MINI_MAP]);
			}
		}
	}

	//错误位置修正
	public amendPosition(): void {
		while (StageLayer.self.hitTestRole(this.x, this.y))//如果位置不合法
			this.y += 20;
	}
}