class GameView extends eui.Component {
	public constructor() {
		super();
		this.skinName = GameViewSkin;
	}
	public bgGroup: eui.Group;
	public blockGroup: eui.Group;
	public heroGroup: eui.Group;

	protected createChildren() {
		super.createChildren();
		this.width = Const.SW;
		this.height = Const.SH;
		this.startGame();
		GameUtils.gameDistance = 0;
		GameManager.getInstance().addEventListener("UPDATE", this.onUpdate, this);
	}
	private startGame() {
		GameUtils.gameDistance = 0;
		GameUtils.parseMapData(1);
		var object: any = ObjectPool.getInstance().createObject(GameScene);
		let data = GameUtils.getLocalLookAtByDistance(Const.SW);
		this.updateMap(data);
	}

	private onUpdate() {
		// console.log(GameUtils.gameDistance);
		this.lookAt(GameUtils.gameDistance);

	}
	private lookAt(value) {
		if (value > 0 && value <= Const.SW / 2) {//熊跑动

		} else if (value > Const.MAP_WIDTH - Const.SW / 2) {//障碍物跑动

		} else {//熊跑动
			let data = GameUtils.getLocalLookAtByDistance(value + Const.SW / 2);
			this.updateMap(data);
		}

	}
	/**
	 * 更新数据
	 */
	private updateMap(data) {
		var groundLayer = data["groundLayer"];
		var groundBigLayer = data["groundBigLayer"];
		var groundLayes = data["groundLayes"];
		var spineLayer = data["spineLayer"];
		var spineBigLayer = data["spineBigLayer"];
		var goldLayer = data["goldLayer"];
		var stoneLayer = data["stone"];
		var boxLayer = data["box"];
		let curId = GameManager.getInstance().curMapId;
		this.updateLayer(groundLayer, GroundObject, "map_" + curId + "_ground_png");
		this.updateLayer(groundBigLayer, FloorObject, "map_" + curId + "_grass_png");
		this.updateLayer(groundLayes, GroundObject, "map_" + curId + "_ground_png");
		this.updateLayer(spineLayer, BulletObject, "map_spine_png");
		this.updateLayer(spineBigLayer, BulletObject, "map_spine_big_png");
		this.updateLayer(goldLayer, GoldObject, "gold_png");
		this.updateLayer(stoneLayer, BulletObject, "map_stone_png");
		this.updateLayer(boxLayer, BulletObject, "map_box_png");
	}
	/**
	 * 更新layer
	 */
	private updateLayer(layer: Array<any>, classFactory: any, res) {
		let len = layer.length;
		for (let i = 0; i < len; i++) {
			this.createMapBody(layer[i], classFactory, res)
		}
	}
	private createMapBody(obj, classFactory: any, res, isReapt = false) {
		var object: any = ObjectPool.getInstance().createObject(classFactory);
		let blockGroup = this.blockGroup;
		console.log(res);
		if (RES.getRes(res) != null) {
			object.id = obj.id;
			object.setInfo(res, obj);

			blockGroup.addChild(object.bodyView);
			// console.log(classFactory, obj, res);

		}


	}
}