class Data_Hero extends BaseData {
     
    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }



    public get index() {//英雄编号
        return GameUtils.herosName(this.data.index);
    }
    public get id(){
        return this.data.index;

    }
    public get name(){//英雄名称
        switch(this.data.index){
            case 1:
                return "潘多拉";
            case 2:
                return "波塞冬";
            case 3:
                return "雅典娜";
            case 4:
                return "哈迪斯";
            case 5:
                return "赫拉";
            case 6:
                return "宙斯";

        }
    }
    public get level() {//英雄等级
        return this.data.level;
    }
    public get damage() {//英雄伤害值
        return this.data.damage;
    }
    public get damagePercent() {//英雄伤害百分比(底数为1) 
        return this.data.damagePercent;
    }
    public get active() {//是否招募
        return this.data.active;
    }


}