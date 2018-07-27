class UI_Activity_BaseCostomButton extends eui.Button {
    private btnText: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/ui/activity/UI_Activity_BaseCostomButtonSkin.exml";
    }

    protected onCreate() {
    }

    protected onDestroy() {

    }

    public setTextSize(size: number) {
        this.btnText.size = size;
    }

    public setText(text: string) {
        this.btnText.text = text;
    }


}