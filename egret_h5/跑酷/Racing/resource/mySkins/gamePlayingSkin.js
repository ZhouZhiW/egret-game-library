var gamePlayingSkin=(function (_super) {
	__extends(gamePlayingSkin, _super);
	function gamePlayingSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this.bg_i(),this.bg1_i(),this.roadblock_i(),this.carlight_i(),this.hero_i(),this.carLayer_i(),this.distanceBg_i(),this.timeBg_i(),this.distanceNum_i(),this.timeNum_i()];
	}
	var _proto = gamePlayingSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bg1_i = function () {
		var t = new eui.Image();
		this.bg1 = t;
		t.source = "bg_png";
		t.x = 0;
		t.y = -800;
		return t;
	};
	_proto.roadblock_i = function () {
		var t = new eui.Image();
		this.roadblock = t;
		t.source = "startLine_png";
		t.x = 80;
		t.y = 416;
		return t;
	};
	_proto.carlight_i = function () {
		var t = new eui.Image();
		this.carlight = t;
		t.source = "carLight_png";
		t.x = 281;
		t.y = 450;
		return t;
	};
	_proto.hero_i = function () {
		var t = new eui.Image();
		this.hero = t;
		t.source = "hero_png";
		t.x = 288;
		t.y = 486;
		return t;
	};
	_proto.carLayer_i = function () {
		var t = new eui.Group();
		this.carLayer = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.distanceBg_i = function () {
		var t = new eui.Image();
		this.distanceBg = t;
		t.right = 0;
		t.source = "roadnumBg_png";
		t.y = 52;
		return t;
	};
	_proto.timeBg_i = function () {
		var t = new eui.Image();
		this.timeBg = t;
		t.left = 0;
		t.source = "timenumBg_png";
		t.y = 52;
		return t;
	};
	_proto.distanceNum_i = function () {
		var t = new eui.BitmapLabel();
		this.distanceNum = t;
		t.font = roadnum_fnt;
		t.height = 44;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.text = "0";
		t.width = 167;
		t.x = 353;
		t.y = 88;
		return t;
	};
	_proto.timeNum_i = function () {
		var t = new eui.BitmapLabel();
		this.timeNum = t;
		t.font = timenum_fnt;
		t.height = 41;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.width = 226;
		t.x = 77;
		t.y = 90;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["bg","bg1","roadblock","carlight","hero","carLayer","distanceBg","timeBg","distanceNum","timeNum"];
		},
		enumerable: true,
		configurable: true
	});
	return gamePlayingSkin;
})(eui.Skin);