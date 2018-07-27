var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Backpack_Mail = (function () {
    function Data_Backpack_Mail(data) {
        this.data = data;
        // this._reward = [];
        // this.gems = [];
        // for (let i = 0; i < data.rewards.length; i++) {
        //     if (data.rewards[i].type != 5) {
        //         this._reward.push(new Data_Backpack_Mail_Reward(data.rewards[i].value, data.rewards[i].type));
        //     } else {
        //         for (let j: number = 0; j < data.rewards[i].value.length; j++) {
        //             this.gems.push(new Data_BaseGem(data.rewards[i].value[j]));
        //         }
        //     }
        // }
        if (data.rewards != null) {
            this.materials = [];
            for (var i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }
    }
    Object.defineProperty(Data_Backpack_Mail.prototype, "rewards", {
        get: function () {
            return this.materials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "mailGems", {
        get: function () {
            return this.gems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "emailTitle", {
        get: function () {
            return this.data.emailTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "emailContent", {
        get: function () {
            return this.data.emailContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "btnStatus", {
        get: function () {
            return this.data.btnStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "emailId", {
        get: function () {
            return this.data.emailId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "mailRewards", {
        get: function () {
            return this._reward;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "date", {
        get: function () {
            return this.data.date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "expireTime", {
        get: function () {
            return this.data.expireTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail.prototype, "state", {
        get: function () {
            return this.data.state;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Backpack_Mail;
}());
__reflect(Data_Backpack_Mail.prototype, "Data_Backpack_Mail");
//# sourceMappingURL=Data_Backpack_Mail.js.map