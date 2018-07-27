class UI_Invitation_Tab extends UI_Base_Activity {
    private invitationList: UI_Invitation_List;
    private invitationBtn: UI_BaseCostomButton;

    constructor() {
        super();
        NetEventManager.inst.pushInvitation(14, -1);
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.invitation.addDataListener(this.refreshInvitation, this);
        this.invitationBtn.setTextSize(23);
        this.invitationBtn.setText("马上邀请");
        this.invitationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }

    public onDestroy() {
        DataManager.inst.invitation.removeDataListener(this.refreshInvitation, this);
        this.invitationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
        super.onDestroy();
    }

    private refreshInvitation(e: DataEvent) {
        const data: Data_Invitation = e.data;
        this.invitationList.setData(data.invitationsArr);
    }

    private clickedBtn(e: egret.TouchEvent) {
        setShareInfo("lianggehaoshuai", true, ["必胜，啦啦啦啦","呦呦，嘿嘿嘿"]);
    }

    protected get skinPath(): string {
        return "resource/skins/ui/activity/invitation/UI_Invitation_TabSkin.exml";
    }
}