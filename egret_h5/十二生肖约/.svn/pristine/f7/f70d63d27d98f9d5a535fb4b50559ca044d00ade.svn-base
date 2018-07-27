class UI_Up_ItemUpgradedButton extends BaseComponent {

    private upItemButtonA_G: eui.Group;
    private upItemButtonB_G: eui.Group;

    private upItemButtonA_1: eui.Button;
    private upItemButtonA_10: eui.Button;
    private upItemButtonA_100: eui.Button;
    private upItemButtonA_1_name: eui.Label;
    private upItemButtonA_1_value: eui.Label;

    private upItemButtonB: eui.Button;
    private upItemButtonB_name: eui.Label;
    private upItemButtonB_value: eui.Label;

    private roleId: number;
    private upgradeType: number;
    private upgradeMoney: number;
    private upgradeDiamond: number;
    private gameMoney: number;
    private gameDiamond: number;

    private btnIcon_A: eui.Image;
    private btnIcon_B: eui.Image;

    private type: number;
    public constructor() {
        super();
        this.visible = false;
    }
    public onCreate() {
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
        this.upItemButtonA_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
    }


    public onDestroy() {
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        this.upItemButtonA_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);

        super.onDestroy();
    }


    private clickButton(e: egret.TouchEvent) {
        let type = 0;
        switch (e.currentTarget) {
            case this.upItemButtonA_1:
                type = 1;
                break;
            case this.upItemButtonA_10:
                type = 10;
                break;
            case this.upItemButtonA_100:
                type = 100;
                break;
            case this.upItemButtonB:
                type = 1;
                break;
        }

        this.type = type;

        if (this.upgradeMoney > this.gameMoney) {
            // switch (this.upgradeType) {
            //     case DataType_UpgradedType.Skill:
            //     case DataType_UpgradedType.Again:
            //     case DataType_UpgradedType.Call:
            //         if (this.upgradeDiamond > this.gameDiamond) {
            //             new PayDialog().setTipDiamond(this.upgradeDiamond).show();
            //         } else {
            //             new DiamondDialog().setDiamond(this.upgradeDiamond)
            //                 .setClickListener(this.gotoDiamond, this).show();
            //         }
            //         break;
            //     default:

            //         break;
            // }
            new MallsDialog().show();
        } else {
            if (this.upgradeType == DataType_UpgradedType.Awoke) {
                const d: UI_Up_Selection_Dialog = new UI_Up_Selection_Dialog();
                d.show();
                return;
            }
            if (this.roleId > 0 && !DataManager.inst.roles.player.isAwoke) {
                this.showAwokeTipDialog();
                return;
            }
            if (this.upgradeType == DataType_UpgradedType.Again) {
                const d = new UI_Rank_Dialog().setText("转生后所有技能将被重置，是否继续转生").setClickListener(this.pushMessege, this);
                d.show();
                return;
            }
            this.pushMessege();
        }
    }

    private showAwokeTipDialog() {
        const d = new NTextDialog();
        d.setTitle("提示").setContent("星愿50级将会觉醒,将开启换装和约会功能等全新功能,建议优先升级！");
        d.addButton("继续", true, this.clickSelect, this);
        d.addButton("放弃");
        d.show();
    }

    private clickSelect(dialog: NTextDialog) {
        dialog.close();
        this.pushMessege();
    }


    private pushMessege() {
        NetEventManager.inst.pushUpgrade(this.roleId, this.type);
    }

    private gotoDiamond() {// 钻石升级 0表示用钻石升级
        NetEventManager.inst.pushUpgrade(this.roleId, 0);
    }

    private refreshAsset(e: DataEvent) {
        let data: Data_Asset = e.data;
        this.gameMoney = data.clientGold;
        this.gameDiamond = data.diamond;
        this.setBtnColor();
    }

    private setBtnColor() {
        let color = this.gameMoney >= this.upgradeMoney ? 0xFFFFFF : 0xFE5353;
        this.upItemButtonA_1_value.textColor = color;
        this.upItemButtonB_value.textColor = color;
    }


    public setData(roleId: number, type: number, money: number, diamond: number) {
        this.visible = true;
        this.roleId = roleId;
        this.upgradeType = type;
        this.upgradeMoney = money;
        this.upgradeDiamond = diamond;
        this.setBtnColor();
        if (type == DataType_UpgradedType.Up) {
            this.upItemButtonA_G.visible = true;
            this.upItemButtonB_G.visible = false;
            this.upItemButtonA_1_value.text = EasyNumber.easyNum(money);
        } else {
            this.upItemButtonA_G.visible = false;
            this.upItemButtonB_G.visible = true;
            let tx: string;
            switch (type) {
                case DataType_UpgradedType.Call:
                    tx = "召唤";
                    break;
                case DataType_UpgradedType.Again:
                    tx = "转生";
                    break;
                case DataType_UpgradedType.Awoke:
                    tx = "觉醒";
                    break;
                case DataType_UpgradedType.Skill:
                default:
                    tx = "学习技能";
                    break;
            }
            this.upItemButtonB_name.text = tx;
            this.upItemButtonB_value.text = EasyNumber.easyNum(money);
        }


    }

}