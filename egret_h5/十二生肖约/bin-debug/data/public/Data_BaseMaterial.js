var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataType_Gem_Material;
(function (DataType_Gem_Material) {
    DataType_Gem_Material[DataType_Gem_Material["Yellow"] = 0] = "Yellow";
    DataType_Gem_Material[DataType_Gem_Material["Red"] = 1] = "Red";
    DataType_Gem_Material[DataType_Gem_Material["Purple"] = 2] = "Purple";
    DataType_Gem_Material[DataType_Gem_Material["Blue"] = 3] = "Blue";
    DataType_Gem_Material[DataType_Gem_Material["Green"] = 4] = "Green";
})(DataType_Gem_Material || (DataType_Gem_Material = {}));
; //Yellow：金币  Red：暴击伤害  Purple：暴击率  Blue：攻击  Green：英雄攻击
var DataType_Material;
(function (DataType_Material) {
    DataType_Material[DataType_Material["Null"] = 0] = "Null";
    DataType_Material[DataType_Material["Lock"] = 1] = "Lock";
    DataType_Material[DataType_Material["Gold"] = 2] = "Gold";
    DataType_Material[DataType_Material["Diamond"] = 3] = "Diamond";
    DataType_Material[DataType_Material["Gem"] = 4] = "Gem";
    DataType_Material[DataType_Material["Ess"] = 5] = "Ess";
    DataType_Material[DataType_Material["Fragment"] = 6] = "Fragment";
    DataType_Material[DataType_Material["Mail"] = 7] = "Mail";
    DataType_Material[DataType_Material["Equip"] = 8] = "Equip";
})(DataType_Material || (DataType_Material = {}));
;
var Data_BaseMaterial = (function () {
    function Data_BaseMaterial(data) {
        this.data = null;
        this.data = data;
    }
    Data_BaseMaterial.prototype.getBaseData = function () {
        return this.data;
    };
    Data_BaseMaterial.prototype.getType = function () {
        return this.data.type;
    };
    Data_BaseMaterial.prototype.getCounts = function () {
        return this.data.counts;
    };
    Data_BaseMaterial.prototype.getMaterialID = function () {
        return this.data.materialID;
    };
    Data_BaseMaterial.prototype.getSource = function () {
        var source;
        switch (this.getType()) {
            case DataType_Material.Null:
                source = "resource/res/itemicon/item_icon_null.png";
                break;
            case DataType_Material.Lock:
                source = "resource/res/itemicon/item_icon_lock.png";
                break;
            case DataType_Material.Gem:
                source = this.getGemSrouce();
                break;
            case DataType_Material.Mail:
                this.getMailSource();
                break;
            case DataType_Material.Equip:
                this.getEquipSource();
                break;
        }
        return source;
    };
    Data_BaseMaterial.prototype.getName = function () {
        var name;
        switch (this.getType()) {
            case DataType_Material.Null:
                name = "";
                break;
            case DataType_Material.Lock:
                name = "";
                break;
            case DataType_Material.Gold:
                name = "金币";
                break;
            case DataType_Material.Diamond:
                name = "钻石";
                break;
            case DataType_Material.Gem:
                name = this.getGemName();
                break;
            case DataType_Material.Ess:
                name = "精华";
                break;
            case DataType_Material.Fragment:
                name = "碎片";
                break;
            case DataType_Material.Equip:
                this.getEquipName();
                break;
            default:
                name = "??";
                break;
        }
        return name;
    };
    /**
     * 宝石
     */
    Data_BaseMaterial.prototype.getGemType = function () {
        return this.data.gemType;
    };
    Data_BaseMaterial.prototype.getGemLevel = function () {
        return this.data.gemLevel;
    };
    Object.defineProperty(Data_BaseMaterial.prototype, "gemResolveEss", {
        get: function () {
            return this.data.decomposeNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseMaterial.prototype, "gemLockDisc", {
        get: function () {
            return this.data.condition.disc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseMaterial.prototype, "gemLockCurrentProgress", {
        get: function () {
            return this.data.condition.curr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseMaterial.prototype, "gemLockMaxProgress", {
        get: function () {
            return this.data.condition.tot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseMaterial.prototype, "gemLockCost", {
        get: function () {
            return this.data.condition.cost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseMaterial.prototype, "gemAttributes", {
        get: function () {
            return this.data.attributes;
        },
        enumerable: true,
        configurable: true
    });
    Data_BaseMaterial.prototype.getGemName = function () {
        var name = this.getGemLevel + "级";
        switch (this.getGemType()) {
            case DataType_Gem_Material.Yellow:
                name += "黄宝石";
                break;
            case DataType_Gem_Material.Red:
                name += "红宝石";
                break;
            case DataType_Gem_Material.Purple:
                name += "紫宝石";
                break;
            case DataType_Gem_Material.Blue:
                name += "蓝宝石";
                break;
            case DataType_Gem_Material.Green:
                name += "绿宝石";
                break;
            default:
                name += "?宝石";
                break;
        }
        return name;
    };
    Data_BaseMaterial.prototype.getGemSrouce = function () {
        var source = "resource/res/itemicon/gem/item_icon_gem_";
        switch (this.getGemType()) {
            case DataType_Gem_Material.Yellow:
                source += "yellow_";
                break;
            case DataType_Gem_Material.Red:
                source += "red_";
                break;
            case DataType_Gem_Material.Purple:
                source += "purple_";
                break;
            case DataType_Gem_Material.Blue:
                source += "blue_";
                break;
            case DataType_Gem_Material.Green:
                source += "green_";
                break;
            default:
                return "resource/res/itemicon/item_icon_null.png";
        }
        if (this.getGemLevel() < 1 || this.getGemLevel() > 6) {
            source = "resource/res/itemicon/item_icon_null.png";
        }
        else {
            source += this.getGemLevel() + ".png";
        }
        return source;
    };
    /**
     * 背包
     */
    Data_BaseMaterial.prototype.getExpireTime = function () {
        return this.data.expireTime;
    };
    Data_BaseMaterial.prototype.analysisGemRewards = function () {
        if (this.data.gemRewards == null || this.data.gemRewards.length < 1) {
            return;
        }
        this.gemRewards = [];
        for (var i = 0; i < this.data.rewards.length; i++) {
            this.gemRewards.push(new Data_BaseMaterial(this.data.rewards[i]));
        }
    };
    Data_BaseMaterial.prototype.analysisIconRewards = function () {
        if (this.data.iconRewards == null || this.data.iconRewards.length < 1) {
            return;
        }
        for (var i = 0; i < this.data.iconRewards.length; i++) {
            this.iconRewards.push(new Data_IconMaterials(this.data.iconRewards[i]));
        }
    };
    Data_BaseMaterial.prototype.getMailSource = function () {
        var path;
        switch (this.getMailState()) {
            case 0:
                path = "resource/res/itemicon/item_icon_mail_unread.png";
                break;
            case 1:
                path = "resource/res/itemicon/item_icon_mail_read.png";
                break;
        }
        return path;
    };
    Data_BaseMaterial.prototype.getIconRewards = function () {
        return this.iconRewards;
    };
    Data_BaseMaterial.prototype.getGemRewards = function () {
        return this.gemRewards;
    };
    Data_BaseMaterial.prototype.getMailTitle = function () {
        return this.data.emailTitle;
    };
    Data_BaseMaterial.prototype.getMailContent = function () {
        return this.data.emailContent;
    };
    Data_BaseMaterial.prototype.getMailId = function () {
        return this.data.emailId;
    };
    Data_BaseMaterial.prototype.getDate = function () {
        return this.data.date;
    };
    Data_BaseMaterial.prototype.getMailState = function () {
        return this.data.mailState;
    };
    Data_BaseMaterial.prototype.getReceiveState = function () {
        return this.data.receiveState;
    };
    Data_BaseMaterial.prototype.analysisEquipRewards = function () {
        if (this.data.rewards == null || this.data.rewards.length < 1) {
            return;
        }
        this.equipRewards = [];
        for (var i = 0; i < this.data.rewards.length; i++) {
            this.equipRewards.push(new Data_Backpack_Equip_Reward(this.data.rewards[i]));
        }
    };
    Data_BaseMaterial.prototype.getEquipName = function () {
        var name;
        switch (this.getLevel()) {
            case 10:
                name = "";
                break;
            case 20:
                name = "";
                break;
        }
        return name;
    };
    Data_BaseMaterial.prototype.getEquipSource = function () {
        var path;
        if (this.getEquipState() == 0) {
            switch (this.getLevel()) {
                case 10:
                    path = "resource/res/itemicon/item_icon_equip_nomal_down.png";
                    break;
                case 20:
                    path = "resource/res/itemicon/item_icon_equip_luxury_down.png";
                    break;
            }
        }
        if (this.getEquipState() == 1) {
            switch (this.getLevel()) {
                case 10:
                    path = "resource/res/itemicon/item_icon_equip_nomal_up.png";
                    break;
                case 20:
                    path = "resource/res/itemicon/item_icon_equip_luxury_up.png";
                    break;
            }
        }
        return path;
    };
    Data_BaseMaterial.prototype.getEquipRewards = function () {
        return this.equipRewards;
    };
    Data_BaseMaterial.prototype.getClotheId = function () {
        return this.data.clotheId;
    };
    Data_BaseMaterial.prototype.getLevel = function () {
        return this.data.level;
    };
    Data_BaseMaterial.prototype.getEquipState = function () {
        return this.data.equipState;
    };
    return Data_BaseMaterial;
}());
__reflect(Data_BaseMaterial.prototype, "Data_BaseMaterial");
//# sourceMappingURL=Data_BaseMaterial.js.map