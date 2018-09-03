var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 框架错误类型
 */
var NodepErrorType = (function () {
    function NodepErrorType() {
    }
    return NodepErrorType;
}());
NodepErrorType.LAYER_NO_EXISTENT = "LAYER_NO_EXISTENT";
NodepErrorType.PARAM_TYPE_ERROR = "PARAM_TYPE_ERROR";
NodepErrorType.ERROR_CODE = "ERROR_CODE";
__reflect(NodepErrorType.prototype, "NodepErrorType");
//# sourceMappingURL=NodepErrorType.js.map