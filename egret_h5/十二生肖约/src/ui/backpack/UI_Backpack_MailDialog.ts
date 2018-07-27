class UI_Backpack_MailDialog extends CustomDialog {
    private bpID: number;

    private titleTx: eui.Label;
    private timeTx: eui.Label;
    private contentTx: eui.Label;
    private getBtn: eui.Button;
    private delBtn: eui.Button;
    private tipsDialog: NTextDialog;
    private rewardGroup: eui.Group;
    private gemGroup: eui.Group;
    private endTime: eui.Label;
    private line: eui.Image;

    constructor(id: number) {
        super();
        this.bpID = id;
        this.delBtn = this.addButton("删除", true, this.clickDelBtn, this);
        this.getBtn = this.addButton("领取", true, this.clickGetBtn, this);
        NetEventManager.inst.pushEMail(id, 0);

    }

    public onCreate() {
    }

    public onDestroy() {
    }

    public setData(data: Data_BaseMaterial) {
        this.titleTx.text = data.getMailTitle();
        this.contentTx.text = data.getMailContent();
        this.timeTx.text = data.getDate();
        this.endTime.text = data.getExpireTime();
        this.rewardGroup.removeChildren();
        this.gemGroup.removeChildren();

        data.analysisIconRewards();
        if (data.getIconRewards() != null) {
            for (let i = 0; i < data.getIconRewards().length; i++) {
                const reward: IconImageMaterial = new IconImageMaterial();
                reward.setMaterialData(data.getIconRewards[i]);
                this.rewardGroup.addChild(reward);
            }
        }

        data.analysisGemRewards();
        if (data.getGemRewards() != null) {
            for (let i = 0; i < data.getGemRewards().length; i++) {
                const gem: UI_Gem_Gem = new UI_Gem_Gem();
                gem.setMaterialData(data.getGemRewards[i]);
                gem.setListener(this.clickedGem, this);
                this.rewardGroup.addChild(gem);
            }
        }

        if (data.getReceiveState() == 0) {
            this.getBtn.enabled = true;
        }
        if (data.getReceiveState() == 1 || data.getReceiveState() == 2) {//有疑问 1和2是啥
            this.getBtn.enabled = false;
        }
    }

    private clickedGem(gem: UI_Gem_Gem) {
        const dialog = new NTextDialog();
        dialog.setTitle(UI_Tre_GemConfig.getGemName(gem.getMaterialData().getGemType(), gem.getMaterialData().getGemLevel()) + "  x" + gem.getMaterialData().getCounts());
        dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(gem.getMaterialData().getGemType(), gem.getMaterialData().gemAttributes));
        dialog.show();
    }

    private clickGetBtn(d: CustomDialog) {
        d.close();
        NetEventManager.inst.pushEMail(this.bpID, 1);
    }

    private clickDelBtn(d: CustomDialog) {
        this.tipsDialog = new NTextDialog();
        this.tipsDialog.setContent("确定删除此封邮件吗");
        this.tipsDialog.addButton("确定", true, this.clickedBtn, this);
        this.tipsDialog.show();
    }

    private clickedBtn(d: NTextDialog) {
        NetEventManager.inst.pushEMail(this.bpID, 2);
        this.close();
        this.tipsDialog.close();
    }

    protected get skinPath(): string {
        return "resource/skins/ui/backpack/UI_Backpack_MailDialogSkin.exml";
    }

    protected get style(): number {
        return 1;
    }
}