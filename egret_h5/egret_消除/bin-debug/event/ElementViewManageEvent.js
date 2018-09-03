var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ElementViewManageEvent = (function (_super) {
    __extends(ElementViewManageEvent, _super);
    function ElementViewManageEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.propToElementLocation = 0; //携带道具点击的元素位置
        _this.ele1 = 0; //第一个点击的元素
        _this.ele2 = 0; //第二个点击的元素
        return _this;
    }
    return ElementViewManageEvent;
}(egret.Event));
ElementViewManageEvent.TAP_TWO_ELEMENT = "tap_two_element";
ElementViewManageEvent.REMOVE_ANIMATION_OVER = "remove_animation_over";
ElementViewManageEvent.UPDATE_MAP = "update_map";
ElementViewManageEvent.UPDATE_VIEW_OVER = "update_view_over";
ElementViewManageEvent.USE_PROP_CLICK = "use_prop_click";
__reflect(ElementViewManageEvent.prototype, "ElementViewManageEvent");
//# sourceMappingURL=ElementViewManageEvent.js.map