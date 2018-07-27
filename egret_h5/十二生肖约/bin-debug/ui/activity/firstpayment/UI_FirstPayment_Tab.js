var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_FirstPayment_Tab = (function (_super) {
    __extends(UI_FirstPayment_Tab, _super);
    function UI_FirstPayment_Tab(type) {
        var _this = _super.call(this) || this;
        _this.activityType = type;
        NetEventManager.inst.pushFirstPay(type, 0);
        return _this;
    }
    UI_FirstPayment_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.btn.setTextSize(18);
        this.setBg(this.activityType);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.addDataListener(this.activityType);
    };
    UI_FirstPayment_Tab.prototype.onDestroy = function () {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.removeDataListener(this.activityType);
        _super.prototype.onDestroy.call(this);
    };
    UI_FirstPayment_Tab.prototype.refreshActivity = function (e) {
        var data = e.data;
        this.setBtn(data.status);
        this.btntype = data.status;
        if (data.status == 2) {
            this.btn.enabled = false;
        }
    };
    UI_FirstPayment_Tab.prototype.onClicked = function (e) {
        if (this.btntype == 0) {
            switch (this.activityType) {
                case 10:
                    UILayer.inst.home.showActivity(13);
                    return;
                case 11:
                    NetEventManager.inst.pushPay(7);
                    break;
                case 12:
                    NetEventManager.inst.pushPay(8);
                    break;
            }
        }
        if (this.btntype == 1) {
            NetEventManager.inst.pushFirstPay(this.activityType, 1);
        }
        UILayer.inst.home.closeActivity();
    };
    UI_FirstPayment_Tab.prototype.setBg = function (type) {
        var pathBg;
        var titleBg;
        switch (type) {
            case 10:
                pathBg = "resource/res/ui/activity/aboutPay/firstpay_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/firstPay_title_bg.png";
                break;
            case 11:
                pathBg = "resource/res/ui/activity/aboutPay/monthCard_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/monthCard_title_bg.png";
                break;
            case 12:
                pathBg = "resource/res/ui/activity/aboutPay/lifeCard_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/lifeCard_title_bg.png";
                break;
        }
        this.contentBg.source = pathBg;
        this.titleTx.source = titleBg;
    };
    UI_FirstPayment_Tab.prototype.setBtn = function (type) {
        switch (type) {
            case 0:
                if (this.activityType == 10) {
                    this.btn.setText("马上充值");
                }
                else {
                    this.btn.setText("立即购买");
                }
                break;
            default:
                this.btn.setText("领取奖励");
                break;
        }
    };
    UI_FirstPayment_Tab.prototype.addDataListener = function (type) {
        switch (type) {
            case 10:
                DataManager.inst.firstPay.addDataListener(this.refreshActivity, this);
                break;
            case 11:
                DataManager.inst.monthCard.addDataListener(this.refreshActivity, this);
                break;
            case 12:
                DataManager.inst.lifeCard.addDataListener(this.refreshActivity, this);
                break;
        }
    };
    UI_FirstPayment_Tab.prototype.removeDataListener = function (type) {
        switch (type) {
            case 10:
                DataManager.inst.firstPay.removeDataListener(this.refreshActivity, this);
                break;
            case 11:
                DataManager.inst.monthCard.removeDataListener(this.refreshActivity, this);
                break;
            case 12:
                DataManager.inst.lifeCard.removeDataListener(this.refreshActivity, this);
                break;
        }
    };
    Object.defineProperty(UI_FirstPayment_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/firstpayment/UI_FirstPayment_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_FirstPayment_Tab;
}(UI_Base_Activity));
__reflect(UI_FirstPayment_Tab.prototype, "UI_FirstPayment_Tab");
//# sourceMappingURL=UI_FirstPayment_Tab.js.map