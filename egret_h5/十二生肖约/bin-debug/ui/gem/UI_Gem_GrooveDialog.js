var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UI_Gem_GrooveDialog = (function () {
    function UI_Gem_GrooveDialog(groove) {
        this.groove = groove;
        this.dialog = new NTextDialog();
        this.dialog.setTitle(UI_Tre_GemConfig.getGemName(this.groove.getMaterialData().getGemType(), this.groove.getMaterialData().getGemLevel()));
        this.dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(this.groove.getMaterialData().getGemType(), this.groove.getMaterialData().gemAttributes));
        this.dialog.addButton("卸下", true, this.clickRemove, this);
    }
    UI_Gem_GrooveDialog.prototype.show = function () {
        this.dialog.show();
    };
    UI_Gem_GrooveDialog.prototype.clickRemove = function () {
        this.groove.setMaterialData(null);
        NetEventManager.inst.pushRemoveGem(this.groove.getGroupID());
        this.dialog.close();
    };
    return UI_Gem_GrooveDialog;
}());
__reflect(UI_Gem_GrooveDialog.prototype, "UI_Gem_GrooveDialog");
//# sourceMappingURL=UI_Gem_GrooveDialog.js.map