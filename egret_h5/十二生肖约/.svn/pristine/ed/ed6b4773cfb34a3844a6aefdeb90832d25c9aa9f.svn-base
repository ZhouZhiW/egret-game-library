class UI_Gem_GrooveDialog {
    private dialog: NTextDialog;
    private groove: UI_Gem_Groove;
    constructor(groove: UI_Gem_Groove) {
        this.groove = groove;
        this.dialog = new NTextDialog();
        this.dialog.setTitle(UI_Tre_GemConfig.getGemName(this.groove.getMaterialData().getGemType(), this.groove.getMaterialData().getGemLevel()));
        this.dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(this.groove.getMaterialData().getGemType(), this.groove.getMaterialData().gemAttributes));
        this.dialog.addButton("卸下", true, this.clickRemove, this);
    }

    public show() {
        this.dialog.show();
    }

    private clickRemove() {//卸下
        this.groove.setMaterialData(null);
        NetEventManager.inst.pushRemoveGem(this.groove.getGroupID());
        this.dialog.close();
    }

}