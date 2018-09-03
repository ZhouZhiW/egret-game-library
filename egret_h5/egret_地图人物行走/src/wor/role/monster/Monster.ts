class Monster extends RoleBase {
	public constructor() {
		super();
	}
	protected beTouched(event:egret.Event){
		console.log("monster be Touched");
	}
}