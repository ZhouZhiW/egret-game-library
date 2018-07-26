var ttttSkin=(function (_super) {
	__extends(ttttSkin, _super);
	function ttttSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Image1_i(),this._BitmapLabel1_i()];
	}
	var _proto = ttttSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "timenumBg_png";
		t.x = 2;
		t.y = 56;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		t.font = timenum_fnt;
		t.height = 56;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.text = "601";
		t.width = 156;
		t.x = 92;
		t.y = 98;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return ttttSkin;
})(eui.Skin);