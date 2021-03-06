class GoldObject extends GameObject {
	public static key: string = "GoldObject";
	public constructor() {
		super();
	}
	public onCreate(): void {
		this.bodyView = new eui.Image();
	}
	public bodyView: eui.Image;
	public setInfo(res, object) {
		let view = this.bodyView;
		if (view == null) {
			view = new eui.Image(res);
		}
		view.source = res;
		view.x = object.x;
		view.y = object.y;
		view.width = object.width;
		view.height = object.height;

	}
	public onEnterFrame(advancedTime: number): void {
		this.runView(advancedTime);
	}
	private runView(advancedTime) {
		let view = this.bodyView;
		if (view != null) {
			view.x -= advancedTime / 1000 * this.speed* Const.speedOffset;
		}
		this.destorySelfOut();
	}
	public onDestroy(): void {
		let view = this.bodyView;
		if (view != null && view.parent != null) {
			view.parent.removeChild(view);
		}
	}
    /**
     * 向左边出边界销毁自己
     */
	protected destorySelfOut() {
		let view = this.bodyView;
		if (view != null) {
			if (view.x + view.width < 0) {
				// view.parent && view.parent.removeChild(view);
				ObjectPool.getInstance().destroyObject(this);
			}
		}
	}
}