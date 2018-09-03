class Hero extends RoleBase {
	public constructor() {
		super();
	}
	protected beTouched(event:egret.Event){
		console.log("hero be Touched");
	}
	private _heroUtil:HeroUtil;

	public get heroUtil(){
		return this._heroUtil;
	}
	public set heroUtil(value:HeroUtil){
		this.roleModel.texture=Comman.getRes(value.roleModel);
		this.roleName.text=value.name;
		this.roleName.font=value.font;
		this._heroUtil=value;
	}
}