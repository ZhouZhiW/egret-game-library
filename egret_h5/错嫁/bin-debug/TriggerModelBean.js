var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var TriggerModelBean = (function () {
    function TriggerModelBean(endmodelobj) {
        this.endm_id = endmodelobj.id;
        this.endm_name = endmodelobj.name;
        this.endm_description = endmodelobj.description;
        this.endm_img = endmodelobj.img;
        this.endm_score = endmodelobj.score;
        this.endm_type = endmodelobj.type;
    }
    return TriggerModelBean;
}());
__reflect(TriggerModelBean.prototype, "TriggerModelBean");
//# sourceMappingURL=TriggerModelBean.js.map