class GameUtils {
	/**
	 * 游戏更新的距离
	 */
	public static gameDistance = 0;
	/**
	 * 获取当前的地图数据信息
	 */
	public static parseMapData(curLevel) {
		Configs.mapDatas = RES.getRes("map" + curLevel + "_json");


	}
	/**
	 * 通过奔跑的距离获取当前应该生成的地图资源数据
	 */
	public static getLocalLookAtByDistance(distance): any {
		// let mapDatasStr = JSON.stringify(Configs.mapDatas);
		// let curMapDatas = JSON.parse(mapDatasStr);
		let mapDatas = Configs.mapDatas;
		let layers = mapDatas.layers as Array<any>;
		let len = layers.length;
		// var groundLayer = mapDatas.layers[1].objects;
		// var groundBigLayer = mapDatas.layers[2].objects;
		// var groundLayes = mapDatas.layers[3].objects;
		// var spineLayer = mapDatas.layers[4].objects;
		// var spineBigLayer = mapDatas.layers[5].objects;
		// var goldLayer = mapDatas.layers[6].objects;
		// var stoneLayer = mapDatas.layers[7].objects;
		// var boxLayer = mapDatas.layers[8].objects;
		// this.parseLayers(groundLayer, distance);
		let createDatas = {};
		for (let i = 0; i < len; i++) {
			let flag = layers[i];
			createDatas[flag.name] = this.parseLayers(flag.objects, distance);
		}
		return createDatas;
	}
	private static parseLayers(layers: Array<any>, distance): Array<any> {
		let arr = [];
		let len = layers.length;
		let clone = JSON.parse(JSON.stringify(layers));

		for (let i = 0; i < len; i++) {
			let obj = clone[i];
			if (obj.x > (distance - Const.SW) && obj.x < (distance + 100)) {
				obj.x = obj.x - distance + Const.SW;
				arr.push(obj);
				layers.splice(i, 1);
			} else {
				continue;
			}
		}
		return arr;
	}

}