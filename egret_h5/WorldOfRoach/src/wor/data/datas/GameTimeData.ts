/**
 * 游戏时间类
 */
class GameTimeData implements IRender {

	public static PM: string = "PM";
	public static AM: string = "AM";

	private _costT: number = 0;
	public day: number = 0;
	public hour: number = 0;
	public min: number = 0;
	public pd: string = "";
	public isLight:boolean = false;//是否是晚上

	public constructor() {

	}

	public play(): void {
		this.synGameTime();
		RenderManager.getIns().registRender(this);
	}

	/**
	 * 同步游戏时间
	 */
	private synGameTime(): void {
		this.min = GameData.playerData.time % 60;
		this.hour = Math.trunc(GameData.playerData.time / 60) % 24;
		this.day = Math.trunc(GameData.playerData.time/(60*24));
		this.day += 1;
		this.pd = this.hour < 12 ? GameTimeData.AM : GameTimeData.PM;
		this.isLight = this.hour>=20 || this.hour < 6;
	}

	/**
	 * 刷新游戏时间
	 */
	public renderUpdate(interval: number): void {
		this._costT += interval;
		if (this._costT >= GameConfig.game_time_t_my) {
			this._costT = this._costT - GameConfig.game_time_t_my;
			GameData.playerData.time += 1;
			this.synGameTime();
		}
	}
}