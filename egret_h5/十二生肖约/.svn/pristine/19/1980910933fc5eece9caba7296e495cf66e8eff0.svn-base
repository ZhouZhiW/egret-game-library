var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Invitation = (function (_super) {
    __extends(Data_Invitation, _super);
    function Data_Invitation() {
        return _super.call(this) || this;
    }
    Data_Invitation.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.invitations = [];
        for (var i = 0; i < data.invites.length; i++) {
            this.invitations.push(new Data_Invitation_Item(data.invites[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Invitation.prototype, "invitationsArr", {
        get: function () {
            return this.invitations;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Invitation;
}(BaseData));
__reflect(Data_Invitation.prototype, "Data_Invitation");
//# sourceMappingURL=Data_Invitation.js.map