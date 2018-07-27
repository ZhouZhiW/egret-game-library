/**
 *
 * @author 
 *
 */
class FriendListTencentBean {
    public friendl_T_nick: string;
    public friendl_T_score: number;
    public friendl_T_avatar: string;
    public friendl_T_rank: number;
    public constructor(nick: string, score: number, avatar: string, rank: number) {
        this.friendl_T_nick = nick;
        this.friendl_T_score = score;
        this.friendl_T_avatar = avatar;
        this.friendl_T_rank = rank;
    }
}
