/**
 *
 * @author 
 *
 */
class PlayerBean {
    public player_wuli: number = 0;
    public player_id: number = 0;
    public player_koucai: number = 0;
    public player_sign_in: number = 0;
    public player_jinpai: number = 0;
    public player_zhihui: number = 0;
    public player_name: string = "";
    public player_yuanbao: number = 0;
    public player_tili: number = 0;
    public player_meilizhi: number = 0;
    public player_current_in: number = 0;
    public player_tili_frequency: number = 0;
    public player_die: number = 0;
    public player_die_in: number = 0;
    public player_avatar: string = "";
    public player_follow_reward: number = 0;
    public player_first_pay: number = 0;
    public player_miansi: number = 0;
    public player_isnew: number = 0;
    public player_sent_desk: number = 0;
    public player_regtime: number = 0;
    public player_haogandu: Array<PlayerHaoGanBean> = new Array();
    public constructor(obj: any) {
        this.player_wuli = obj.player.wuli;
        this.player_id = obj.player.id;
        this.player_koucai = obj.player.koucai;
        this.player_sign_in = obj.player.sign_in;
        this.player_jinpai = obj.player.jinpai;
        this.player_zhihui = obj.player.zhihui;
        this.player_name = obj.player.name;
        this.player_yuanbao = obj.player.yuanbao;
        this.player_tili = obj.player.tili;
        this.player_meilizhi = obj.player.meilizhi;
        if (obj.player.current_in == 0) {
            this.player_current_in = GameUtils.firstChapterId;
        } else {
            this.player_current_in = obj.player.current_in;
        }

        this.player_tili_frequency = obj.player.tili_frequency;
        this.player_die = obj.player.die;
        this.player_die_in = obj.player.die_in;
        this.player_avatar = obj.player.avatar;
        this.player_follow_reward = obj.player.follow_reward;
        this.player_first_pay = obj.player.first_pay;
        this.player_miansi = obj.player.miansi;
        this.player_isnew = obj.player.new_player;
        this.player_sent_desk = obj.player.sent_desk;
        this.player_regtime = obj.player.regtime;
        var haoganduarr: Array<PlayerHaoGanBean> = new Array();
        if (obj.haogandus) {
            for (var i: number = 0; i < obj.haogandus.length; i++) {
                haoganduarr.push(new PlayerHaoGanBean(obj.haogandus[i]));
            }
        }
        this.player_haogandu = haoganduarr;
    }
}
