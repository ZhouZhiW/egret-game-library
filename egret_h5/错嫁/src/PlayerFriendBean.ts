/**
 *
 * @author 
 *
 */
class PlayerFriendBean {
    public other_wuli: number;
    public other_id: number;
    public other_koucai: number;
    public other_current_in: number;
    public other_zhihui: number;
    public other_name: string;
    public other_meilizhi: number;
    public other_avatar: string;
    public other_haogandu: Array<PlayerHaoGanBean> = new Array();
    public constructor(wuli: number, id: number, koucai: number, current_in: number, zhihui: number, name: string, meilizhi: number, avatar: string, haogandu: Array<PlayerHaoGanBean>) {
        this.other_wuli = wuli;
        this.other_id = id;
        this.other_koucai = koucai;
        this.other_current_in = current_in;
        this.other_zhihui = zhihui;
        this.other_name = name;
        this.other_meilizhi = meilizhi;
        this.other_avatar = avatar;
        this.other_haogandu = haogandu;

    }
}
