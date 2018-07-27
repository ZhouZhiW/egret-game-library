class Data_Assistor extends BaseData {

    constructor() {
        super();
    }
    public setServiceData(data: any) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
        // console.log("this.data.userId:     :" + this.data.userId);
        // console.log("this.data.index:   " + this.data.index);


    }


    public get userId() {//约会的人的Id
        return this.data.userId;
    }

    public get userAvatar() {//约的人的头像
        return this.data.userAvatar;
    }

    public get username() {//约的人的名字
        return this.data.username;
    }


    public get userLevel() {//约的人的等级
        return this.data.userLevel;
    }

    public get index() {//英雄编号
        // return GameUtils.starsName("7_20"); 
        return GameUtils.starsName(this.data.index);
    }

    public get level() {//主角等级
        return this.data.level;
    }
    public get damage() {//主角伤害值
        return this.data.damage;
    }
    public get damagePercent() {//主角伤害百分比
        return this.data.damagePercent;
    }
    public get criticalPercent() {//	主角暴击伤害百分比
        return this.data.criticalPercent;
    }
    public get criticalRatePercent() {//主角暴击几率百分比 (底数为0)
        // return 0.3;
        return this.data.criticalRatePercent;
    }


    public get restTime() {//累计时间
        return this.data.restTime;
        // return 8;
    }

    public get assistorType() {//约的人的类型（0是排行榜的人 1是好友）
        return this.data.assistorType;
    }

    public get saveTime() {//剩余时间
        return this.data.saveTime;
    }


    public get altarLevel() { //底座等级
        return this.data.baseLevel;
    }

    public get altarValue(): number { //底座加成
        let v = this.data.baseValue;
        v = v == null ? 1 : v;
        return v;
    }


}