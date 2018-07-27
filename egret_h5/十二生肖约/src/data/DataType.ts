//默认 Def;白羊座 Ari;金牛座 Tau;双子座 Gem;巨蟹座 Cnc;狮子座 Leo;处女座 Vir;天秤座 Lib;天蝎座 Sco;射手座 Sgr;摩羯座 Cap;水瓶座 Agr;双鱼座 Psc;
enum DataType_PlayerIndex { Def, Ari, Tau, Gem, Cnc, Leo, Vir, Lib, Sco, Sgr, Cap, Agr, Psc };

enum DataType_HeroIndex { Def, Pandora, Poseidon, Athena, Handes, Hera, Zeus };

// 升级 Up, 学习技能 Skill, 召唤 Call, 转生 Again,觉醒 awoke
enum DataType_UpgradedType { Up, Skill, Call, Again, Awoke }; //当前升级类型

//参见策划表
enum DataType_SkillType {
    Auts, Cris, Spes, Cdms, Aoes, Smzms, SDPSP, ADPSP, SmzmP, CriP, CdmP, AutP, Bles, Pray, Potg, Asble, Asmys, RenP
};

enum DataType_PlayerSkillType { Auts, Aoes, Cris, Cdms, Spes, Smzms }

enum DataType_HeroSkillType { SDPSP, ADPSP, SmzmP, CriP, CdmP, AutP, TradP, RenP }

//锁定 Lock, 可以使用 CanUse, 正在使用 InUse, 冷却 Cool 
enum DataType_SkillStatus { Lock, CanUse, InUse, Cool };

enum DataType_GemType { Null, Money, Csd, Cri, Att, HeroAtt, UnLock, Lock };//att 攻击 cri 暴击率 csd 暴击伤害

// enum DataType_Material_Gem { Yellow, Red, Purple, Blue, Green };//Yellow：金币  Red：暴击伤害  Purple：暴击率  Blue：攻击  Green：英雄攻击

enum DataType_GemLevel { Zero, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth };

enum DataType_GemCompose { Synthetise, SynthetiseAll, Resolve, ResolveAll };//Synthetise 合成一个 / Resolve 分解一个

enum DataType_Gold { Monster, PlayerSkill };// 金币类型

enum DataType_GemLock { Nomal, Diamond };// 解锁条件