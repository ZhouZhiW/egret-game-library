enum DataType_Gem_Material { Yellow, Red, Purple, Blue, Green };//Yellow：金币  Red：暴击伤害  Purple：暴击率  Blue：攻击  Green：英雄攻击
enum DataType_Material { Null, Lock, Gold, Diamond, Gem, Ess, Fragment, Mail, Equip };

class Data_BaseMaterial {
    protected data: any = null;
    public constructor(data: any) {
        this.data = data;
    }

    public getBaseData(): any {
        return this.data;
    }

    public getType(): number {
        return this.data.type;
    }

    public getCounts(): number {
        return this.data.counts;
    }

    public getMaterialID() {
        return this.data.materialID;
    }

    public getSource(): string {
        let source: string;
        switch (this.getType()) {
            case DataType_Material.Null:
                source = "resource/res/itemicon/item_icon_null.png"
                break;
            case DataType_Material.Lock:
                source = "resource/res/itemicon/item_icon_lock.png"
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
    }

    public getName(): string {
        let name: string;
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
    }




    /**
     * 宝石
     */
    public getGemType(): number {//获得宝石类型
        return this.data.gemType;
    }

    public getGemLevel(): number {//获取宝石等级
        return this.data.gemLevel;
    }

    public get gemResolveEss(): number {// 分解宝石获得的守护石精华数量
        return this.data.decomposeNum;
    }

    public get gemLockDisc(): string {//解锁条件
        return this.data.condition.disc;
    }
    public get gemLockCurrentProgress(): number {//当前进度
        return this.data.condition.curr;
    }
    public get gemLockMaxProgress(): number {//总进度
        return this.data.condition.tot;
    }
    public get gemLockCost(): number {//立即解锁所需钻石
        return this.data.condition.cost;
    }

    public get gemAttributes(): number {//宝石的属性值
        return this.data.attributes;
    }

    private getGemName(): string {//获得宝石名字
        let name = this.getGemLevel + "级";
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
    }

    private getGemSrouce(): string {
        let source = "resource/res/itemicon/gem/item_icon_gem_";
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
            source = "resource/res/itemicon/item_icon_null.png"
        } else {
            source += this.getGemLevel() + ".png";
        }
        return source;
    }

    /**
     * 背包
     */

    public getExpireTime(): string {//获得剩余时间
        return this.data.expireTime;
    }

    /*********邮件*********/

    private gemRewards: Array<Data_BaseMaterial>;
    private iconRewards: Array<Data_IconMaterials>;

    public analysisGemRewards() {//解析宝石奖励
        if (this.data.gemRewards == null || this.data.gemRewards.length < 1) {
            return;
        }
        this.gemRewards = [];
        for (let i = 0; i < this.data.rewards.length; i++) {
            this.gemRewards.push(new Data_BaseMaterial(this.data.rewards[i]));
        }
    }

    public analysisIconRewards() {//解析小图标奖励
        if (this.data.iconRewards == null || this.data.iconRewards.length < 1) {
            return;
        }
        for (let i = 0; i < this.data.iconRewards.length; i++) {
            this.iconRewards.push(new Data_IconMaterials(this.data.iconRewards[i]));
        }
    }

    private getMailSource(): string {//获得邮件图标
        let path: string;
        switch (this.getMailState()) {
            case 0:
                path = "resource/res/itemicon/item_icon_mail_unread.png";
                break;
            case 1:
                path = "resource/res/itemicon/item_icon_mail_read.png";
                break;
        }
        return path;
    }

    public getIconRewards(): Array<Data_IconMaterials> {//获得小图标奖励数组
        return this.iconRewards;
    }

    public getGemRewards(): Array<Data_BaseMaterial> {//获得宝石奖励数组
        return this.gemRewards;
    }

    public getMailTitle(): string {//获得邮件标题
        return this.data.emailTitle;
    }

    public getMailContent(): string {//获得邮件内容
        return this.data.emailContent;
    }

    public getMailId(): number {//获得邮件ID
        return this.data.emailId;
    }

    public getDate(): string {//获得邮件日期
        return this.data.date;
    }

    public getMailState(): number {//获得邮件读取状态:  0 未读 ；1 已读
        return this.data.mailState;
    }

    public getReceiveState(): number {//获得领取状态： 0 可领取 ； 1 不可领取
        return this.data.receiveState;
    }

    /*********物品*********/

    private equipRewards: Array<Data_Backpack_Equip_Reward>;

    public analysisEquipRewards() {//解析装备奖励数组
        if (this.data.rewards == null || this.data.rewards.length < 1) {
            return;
        }
        this.equipRewards = [];
        for (let i = 0; i < this.data.rewards.length; i++) {
            this.equipRewards.push(new Data_Backpack_Equip_Reward(this.data.rewards[i]));
        }
    }

    private getEquipName(): string {//获得装备名称
        let name: string;
        switch (this.getLevel()) {
            case 10:
                name = "";
                break;
            case 20:
                name = "";
                break;
        }
        return name;
    }

    private getEquipSource(): string {//获得装备图标
        let path: string;
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
    }

    public getEquipRewards(): Array<Data_Backpack_Equip_Reward> {//获得装备奖励数组
        return this.equipRewards;
    }

    public getClotheId(): number {//获取装备ID
        return this.data.clotheId;
    }

    public getLevel(): number {//获得装备样式
        return this.data.level;
    }

    public getEquipState(): number {//获得装备状态：  0 未装备 ； 1 已装备
        return this.data.equipState;
    }
}