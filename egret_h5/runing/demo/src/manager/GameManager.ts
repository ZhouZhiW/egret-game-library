class GameManager extends eui.Component {
	private constructor() {
		super();
	}
	private static ins: GameManager;

	public static getInstance(): GameManager {
		if (this.ins == null) {
			this.ins = new GameManager();
		}
		return this.ins;
	}

	public curMapId = 1;
	public maxMapId = 6;
	public muMaxMapId = 1;
}