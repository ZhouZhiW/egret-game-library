class Background extends eui.Component {

	private bmp1: eui.Image;

	private bmp2: eui.Image;

	private bgWidth: number;

	constructor() {
		super();
		this.skinName = BackGroundSkin;
	}

	protected createChildren() {
		super.createChildren();
		this.width = Const.SW;
		this.height = Const.SH;
	}
    /**
     * 初始化数据
     * @param name
     */
	public setData(name: string): void {
		var texture = RES.getRes(name);
		this.bmp1.texture = texture;
		this.bmp2.texture = texture;
		this.bmp1.width = Const.SW;
		this.bmp2.width = Const.SW;
		this.bgWidth = Const.SW;
		this.bmp1.x = 0;
		this.bmp2.x = Const.SW;
		this.behindGroup1.x = 0;
		this.behindGroup2.x = Const.SW;
		this.frontGroup1.x = 0;
		this.frontGroup2.x = Const.SW;
		this.middleGroup1.x = 0;
		this.middleGroup2.x = Const.SW;
	}
	// private init()

    /**
     * 每帧执行
     */
	public run(second): void {
		this.runShandow(second);
		this.runBehind(second);
		this.runMiddle(second);
		this.runFront(second);
	}

	private runShandow(second) {
		let _moveNum = second * 100;
		let self = this;
		// console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
		if (Math.abs(self.bmp1.x) > self.bgWidth) {
			self.bmp1.x = (self.bmp2.x + self.bgWidth);
		}
		if (Math.abs(self.bmp2.x) > self.bgWidth) {
			self.bmp2.x = (self.bmp1.x + self.bgWidth);
		}

		self.bmp1.x -= _moveNum;

		self.bmp2.x -= _moveNum;
	}

	private runBehind(second) {
		let _moveNum = second * 20;
		let self = this;
		// console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
		if (Math.abs(self.behindGroup1.x) > self.bgWidth) {
			self.behindGroup1.x = (self.behindGroup2.x + self.bgWidth);
		}
		if (Math.abs(self.behindGroup2.x) > self.bgWidth) {
			self.behindGroup2.x = (self.behindGroup1.x + self.bgWidth);
		}

		self.behindGroup1.x -= _moveNum;

		self.behindGroup2.x -= _moveNum;
	}

	private runMiddle(second) {
		let _moveNum = second * 50;
		let self = this;
		// console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
		if (Math.abs(self.middleGroup1.x) > self.bgWidth) {
			self.middleGroup1.x = (self.middleGroup2.x + self.bgWidth);
		}
		if (Math.abs(self.middleGroup2.x) > self.bgWidth) {
			self.middleGroup2.x = (self.middleGroup1.x + self.bgWidth);
		}

		self.middleGroup1.x -= _moveNum;

		self.middleGroup2.x -= _moveNum;
	}
	private runFront(second) {
		let _moveNum = second * 120;
		let self = this;
		// console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
		if (Math.abs(self.frontGroup1.x) > self.bgWidth) {
			self.frontGroup1.x = (self.frontGroup2.x + self.bgWidth);
		}
		if (Math.abs(self.frontGroup2.x) > self.bgWidth) {
			self.frontGroup2.x = (self.frontGroup1.x + self.bgWidth);
		}

		self.frontGroup1.x -= _moveNum;

		self.frontGroup2.x -= _moveNum;
	}
	public behindGroup1: eui.Group;
	public behindGroup2: eui.Group;
	public middleGroup1: eui.Group;
	public middleGroup2: eui.Group;
	public frontGroup1: eui.Group;
	public frontGroup2: eui.Group;


	public destory() {
		this.behindGroup1.removeChildren();
		this.behindGroup2.removeChildren();
		this.middleGroup1.removeChildren();
		this.middleGroup2.removeChildren();
		this.frontGroup2.removeChildren();
		this.frontGroup1.removeChildren();
	}

}