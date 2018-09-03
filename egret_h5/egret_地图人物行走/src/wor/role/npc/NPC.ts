class NPC extends RoleBase {
	public constructor() {
		super();
	}
	protected beTouched(event:egret.Event){
		console.log("npc be Touched");
	}
}