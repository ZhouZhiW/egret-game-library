class HeroObject {
	public view: egret.MovieClip;
	public constructor() {
		this.mcFactory = new egret.MovieClipDataFactory(RES.getRes("cola_json"), RES.getRes("cola_png"));

		this.view = new egret.MovieClip();
	}
	private mcFactory: egret.MovieClipDataFactory;

	public setInfo(res) {
		this.mcFactory = new egret.MovieClipDataFactory(RES.getRes(res + "_json"), RES.getRes(res + "_png"));
	}
	private mAlive: boolean = false;
	private mPaused: boolean = true;
	private updateDisplay() {
		let self = this;
		if (!self.mAlive) {
			self.view.movieClipData = self.mcFactory.generateMovieClipData("dead");
			self.view.play();
		} else if (this.mPaused) {
			self.view.movieClipData = self.mcFactory.generateMovieClipData("stand");
			self.view.play();
		} else {
			self.view.movieClipData = self.mcFactory.generateMovieClipData("walk");
			self.view.play(-1);
		}
		// AnchorUtil.setAnchorY(self.view, 0.8);
	}
}