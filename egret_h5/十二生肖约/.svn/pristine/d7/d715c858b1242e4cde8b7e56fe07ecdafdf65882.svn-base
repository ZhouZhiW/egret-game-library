class RoleLayer extends BaseLayer {

    private roleTimer: egret.Timer

    private skillAutsMC: egret.MovieClip;
    private skillCrisMC: egret.MovieClip;
    private skillCdmsMC: egret.MovieClip;
    private skillAoesMC: egret.MovieClip;
    private skillSmzmsMC: egret.MovieClip;
    private skillSpesMCF: egret.MovieClipDataFactory;
    public constructor() {
        super();
    }


    protected onCreate() {
        super.onCreate();
        var mcpath: Array<string> = [];
        mcpath.push("resource/mc/skill/player_skill_aoto");
        mcpath.push("resource/mc/skill/player_skill_cris");
        mcpath.push("resource/mc/skill/player_skill_cdms");
        mcpath.push("resource/mc/skill/player_skill_aoes");
        mcpath.push("resource/mc/skill/player_skill_gold");
        mcpath.push("resource/mc/skill/player_skill_spes");
        this.loadMovieClipDataFactorys(mcpath);
        this.initPlayer();
        this.initHeros();
        this.initAssistor();
        this.initSkills();
        this.addEventListener(egret.Event.ADDED, this.addedChild, this);
        this.roleTimer = new egret.Timer(100, 0);
        this.roleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.roleTimer.start();
    }

    protected onDestroy() {
        this.destroyPlayer();
        this.destroyHeros();
        this.destroyAssistor();
        this.removeEventListener(egret.Event.ADDED, this.addedChild, this);
        this.removeChildren();
        if (this.roleTimer != null) {
            this.roleTimer.stop();
            this.roleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.roleTimer = null;
        }
        super.onDestroy();
    }

    protected getMovieClipDataFactorys(mcdfs: Array<egret.MovieClipDataFactory>) {
        this.skillAutsMC = new egret.MovieClip(mcdfs[0].generateMovieClipData("skill"));
        this.skillCrisMC = new egret.MovieClip(mcdfs[1].generateMovieClipData("skill"));
        this.skillCdmsMC = new egret.MovieClip(mcdfs[2].generateMovieClipData("skill"));
        this.skillAoesMC = new egret.MovieClip(mcdfs[3].generateMovieClipData("skill"));
        this.skillSmzmsMC = new egret.MovieClip(mcdfs[4].generateMovieClipData("skill"));
        this.skillSpesMCF = mcdfs[5];
    }


    private addedChild() {
        if (this.playerAttackMC != null) {
            this.setChildIndex(this.playerAttackMC, -1);
        }
    }

    private timerEvent() {
        this.skillsEvent();
    }

    private startSkillAoes(aoeValue: number) {
        const d = this.player.getAttackValue() * aoeValue;
        FightLayer.inst.monsterLayer.aoeMonsters(d);
        if (this.skillAoesMC == null) {
            return;
        }
        this.skillAoesMC.gotoAndPlay("effect", 1);
        this.skillAoesMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.skillAoesMC.x = this.width >> 1;
        this.skillAoesMC.y = this.height >> 1;
        this.addChild(this.skillAoesMC);
    }

    private startSkillSmzms(goldPercent: number) {
        this.player.startSkillSmzms(goldPercent);
        if (this.skillSmzmsMC == null) {
            return;
        }
        this.skillSmzmsMC.gotoAndPlay("effect", 1);
        this.skillSmzmsMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.skillSmzmsMC.x = this.width >> 1;
        this.skillSmzmsMC.y = this.height >> 1;
        this.addChild(this.skillSmzmsMC);
    }

    private startSkillSpes(rate: number) {
        for (let i = 0; i < this.numChildren; i++) {
            const c = this.getChildAt(i);
            if (c instanceof Hero) {
                c.startSkillSpes(this.skillSpesMCF, rate);
            }
        }
    }

    private stopSkillSpes() {
        for (let i = 0; i < this.numChildren; i++) {
            const c = this.getChildAt(i);
            if (c instanceof Hero) {
                c.stopSkillSpes();
            }
        }
    }

    // ======player=========================================

    private player: Player;
    private playerAttackMC: egret.MovieClip
    private initPlayer() {
        this.player = new Player();
        this.addChild(this.player);
    }

    private destroyPlayer() {
        this.player = null;
        this.playerAttackMC = null;
    }

    public showPlayerEffect(playEffectMC: egret.MovieClip) {
        if (playEffectMC == null) {
            return;
        }
        if (this.playerAttackMC == playEffectMC) {
            return;
        }
        if (this.playerAttackMC != null) {//替换
            this.playerAttackMC.stop();
            this.removeChild(this.playerAttackMC);
        }
        this.playerAttackMC = playEffectMC;
        this.addChild(this.playerAttackMC);
    }

    public showFloatingAttactValue(atttactValue: number, point: egret.Point) {
        this.addChild(new FloatingAttactValue(atttactValue, point));
    }




    // ======hero=========================================
    private initHeros() {
        const datas: Array<Data_Hero> = DataManager.inst.roles.heros;
        for (let i = datas.length - 1; i >= 0; i--) {
            const hero = new Hero(datas[i]);
            this.addChild(hero);
        }
    }
    private destroyHeros() {

    }



    // ======assistor=======================================
    private assistor: Assistor;
    private initAssistor() {
        const data: Data_Assistor = DataManager.inst.assistor;
        this.assistor = new Assistor(data);
        this.addChild(this.assistor);
    }
    private destroyAssistor() {
        this.assistor = null;
    }



    // ======skills=========================================
    private skills: Array<PlayerSkill>;
    private initSkills() {
        this.skills = [];
        const datas: Data_SkillPancel = DataManager.inst.playerSkills;
        for (let i = 0; i < datas.skills.length; i++) {
            const skill = new PlayerSkill(datas.skills[i]);
            this.skills.push(skill);
        }
    }
    private skillsEvent() {
        if (this.skills == null) {
            return;
        }
        for (let i = 0; i < this.skills.length; i++) {
            this.skills[i].timeChange();
        }
    }


    public onSkill(isRelease: boolean, data: Data_Skill) {
        switch (data.index) {
            case DataType_PlayerSkillType.Auts:
                if (isRelease) {
                    this.player.startSkillAuts(this.skillAutsMC, data.value);
                } else {
                    this.player.stopSkillAuts();
                }
                break;
            case DataType_PlayerSkillType.Cris:
                if (isRelease) {
                    this.player.startSkillCris(this.skillCrisMC, data.value);
                } else {
                    this.player.stopSkillCris();
                }
                break;
            case DataType_PlayerSkillType.Spes:
                if (isRelease) {
                    this.startSkillSpes(data.value);
                } else {
                    this.stopSkillSpes();
                }
                break;
            case DataType_PlayerSkillType.Cdms:
                if (isRelease) {
                    this.player.startSkillCdms(this.skillCdmsMC, data.value);
                } else {
                    this.player.stopSkillCdms();
                }
                break;
            case DataType_PlayerSkillType.Aoes:
                if (isRelease) {
                    this.startSkillAoes(data.value);
                }
                break;
            case DataType_PlayerSkillType.Smzms:
                if (isRelease) {
                    this.startSkillSmzms(data.value);
                } else {
                    this.player.stopskillSmzms();
                }
                break;
        }
    }

    private skillMCComplete(e: egret.Event) {
        const mc: egret.MovieClip = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }

    }


    public attackCris() {
        FightLayer.inst.shake();
    }


    public checkClick(stageX: number, stageY: number): boolean {
        if (this.assistor.checkClick(stageX, stageY)) {
            return true;
        }
        if (this.player.checkClick(stageX, stageY)) {
            return true;
        }
        return false;
    }
}