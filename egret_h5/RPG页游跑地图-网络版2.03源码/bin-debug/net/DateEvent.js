/**
 *
 * @author
 *自定义事件类
 * 用于各类之间的 事件流消息传递
 */
var DateEvent = (function (_super) {
    __extends(DateEvent, _super);
    function DateEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this.testTxt = "";
    }
    var d = __define,c=DateEvent,p=c.prototype;
    /**标识*/
    DateEvent.DATE = "内容";
    return DateEvent;
})(egret.Event);
egret.registerClass(DateEvent,'DateEvent');
//# sourceMappingURL=DateEvent.js.map