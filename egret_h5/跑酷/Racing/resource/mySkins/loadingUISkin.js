var loadingUISkin=(function (_super) {
	__extends(loadingUISkin, _super);
	function loadingUISkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this.loadingBg_i(),this.loadingGroup_i()];
	}
	var _proto = loadingUISkin.prototype;

	_proto.loadingBg_i = function () {
		var t = new eui.Image();
		this.loadingBg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "loadingBg_png";
		t.top = 0;
		return t;
	};
	_proto.loadingGroup_i = function () {
		var t = new eui.Group();
		this.loadingGroup = t;
		t.height = 74;
		t.width = 85;
		t.x = 79;
		t.y = 333;
		t.elementsContent = [this._Image1_i(),this.loadingText_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "loadingCar_png";
		t.top = 0;
		return t;
	};
	_proto.loadingText_i = function () {
		var t = new eui.Label();
		this.loadingText = t;
		t.size = 29;
		t.text = "0%";
		t.top = 0;
		t.width = 64;
		t.x = 19;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["loadingBg","loadingText","loadingGroup"];
		},
		enumerable: true,
		configurable: true
	});
	return loadingUISkin;
})(eui.Skin);