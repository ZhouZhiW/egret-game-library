class Data_Skill extends BaseData {
    public static Refresh_SkillStatus = 200;
    private _index: number;
     
    private _gameStatus: number;
    private _gameTime: number;

    constructor(index: number) {
        super();
        this._index = index;
        this._gameStatus = DataType_SkillStatus.Lock;
    }

    public setData(data: any) {
        if (data == null) {
            console.error("Data_Skill is null !")
            return;
        }

        // if (this.data != null && this.data.status == data.status) {
        //     return;
        // }

        this.data = data;
        this._gameStatus = this.status;
        this._gameTime = this.gameMaxTime;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public setGameStatus(status: number) {
        this._gameStatus = status;
        this.callListener(Data_Skill.Refresh_SkillStatus);
    }

    public setGameTime(time: number) {
        this._gameTime = time;
        this.callListener(Data_Skill.Refresh_SkillStatus);
    }

    public get index() {
        return this._index;
    }
    
    /*index	主角技能编号
    status	主角技能状态：
    0：未解锁
    1：准备就绪
    2：使用中
    3：冷却中
    restTime	主角技能剩余时间
    diomand	主角刷新技能所需钻石
    */


    public get gameStatus() {
        return this._gameStatus;
    }
    public get gameTime() {
        return this._gameTime;
    }
    public get gameMaxTime() {
        return this.restTime * 10;
    }
    
    public get gameSumTime() {
        return this.sumTime * 10;
    }


    public get status() {
        return this.data.status;
    }
    public get restTime() {
        return this.data.restTime;
    }
    public get sumTime() {
        return this.data.sumTime;
    }
    public get value() {
        // switch (this.index) {
        //     case DataType_PlayerSkillType.Auts:
        //         return 10;
        //     case DataType_PlayerSkillType.Cris:
        //         return 0.3;
        //     case DataType_PlayerSkillType.Spes:
        //         return 3;
        //     case DataType_PlayerSkillType.Cdms:
        //         return 3;
        //     case DataType_PlayerSkillType.Aoes:
        //         return 5000;
        //     case DataType_PlayerSkillType.Smzms:
        //         return 0.1;
        // }
        return this.data.value;
    }
    public get diomand() {
        return this.data.diomand;
    }

}