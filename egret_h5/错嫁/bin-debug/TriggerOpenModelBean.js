var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var TriggerOpenModelBean = (function () {
    function TriggerOpenModelBean(endmodelobj) {
        this.triggeropen_id = endmodelobj.id;
        this.triggeropen_type = endmodelobj.type;
    }
    return TriggerOpenModelBean;
}());
__reflect(TriggerOpenModelBean.prototype, "TriggerOpenModelBean");
//# sourceMappingURL=TriggerOpenModelBean.js.map