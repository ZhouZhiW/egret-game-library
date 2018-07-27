var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PlayerBean = (function () {
    function PlayerBean(obj) {
        this.player_wuli = 0;
        this.player_id = 0;
        this.player_koucai = 0;
        this.player_sign_in = 0;
        this.player_jinpai = 0;
        this.player_zhihui = 0;
        this.player_name = "";
        this.player_yuanbao = 0;
        this.player_tili = 0;
        this.player_meilizhi = 0;
        this.player_current_in = 0;
        this.player_tili_frequency = 0;
        this.player_die = 0;
        this.player_die_in = 0;
        this.player_avatar = "";
        this.player_follow_reward = 0;
        this.player_first_pay = 0;
        this.player_miansi = 0;
        this.player_isnew = 0;
        this.player_sent_desk = 0;
        this.player_regtime = 0;
        this.player_haogandu = new Array();
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
        }
        else {
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
        var haoganduarr = new Array();
        if (obj.haogandus) {
            for (var i = 0; i < obj.haogandus.length; i++) {
                haoganduarr.push(new PlayerHaoGanBean(obj.haogandus[i]));
            }
        }
        this.player_haogandu = haoganduarr;
    }
    return PlayerBean;
}());
__reflect(PlayerBean.prototype, "PlayerBean");
//# sourceMappingURL=PlayerBean.js.map