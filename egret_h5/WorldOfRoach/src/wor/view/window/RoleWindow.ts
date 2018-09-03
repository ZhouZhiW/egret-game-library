/**
 * 左上角生命,经历等信息
 */
class RoleWindow extends GameWindow implements eui.UIComponent {

	private _timeLabel: eui.Label;
	private _day: eui.Image;
	private _dayBg: eui.Image;
	private _light: eui.Image;
	private _lightBg: eui.Image;

	private _hpBar: ProgressBar;//生命
	private _mpBar: ProgressBar;//魔法
	private _epBar: ProgressBar;//体力

	public constructor() {
		super();
		this.typeName = WorWindowType.ROLE_WINDOW;
		this.layerType = LayerType.LAYER_MENU;
		this.align(AlignType.TOP_LEFT, 0, 0);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this._timeLabel = this.getChildByName("timeTxt") as eui.Label;
		this._day = this.getChildByName("day") as eui.Image;
		this._dayBg = this.getChildByName("dayBg") as eui.Image;
		this._light = this.getChildByName("light") as eui.Image;
		this._lightBg = this.getChildByName("lightBg") as eui.Image;
		this._hpBar = new ProgressBar(this.getChildByName("hpBar"));
		this._mpBar = new ProgressBar(this.getChildByName("mpBar"));
		this._epBar = new ProgressBar(this.getChildByName("epBar"));
		this.flushTime();
		this.flushBars();
		DelayCall.call(1000, this.flushTime, this, null, 0);
	}

	private flushTime(): void {
		this._timeLabel.text = GameData.timeData.pd + " " + TimeUtil.getTimeStrByHM(GameData.timeData.hour, GameData.timeData.min);
		this._dayBg.visible = this._day.visible = !GameData.timeData.isLight;
		this._light.visible = this._lightBg.visible = GameData.timeData.isLight;
	}

	private flushBars(): void {
		// this._hpBar.setProgress(GameData.playerData.hp,GameData.playerData.hpMax);
		// this._mpBar.setProgress(GameData.playerData.mp,GameData.playerData.mpMax);
		// this._epBar.setProgress(GameData.playerData.ep,GameData.playerData.epMax);
	}
}