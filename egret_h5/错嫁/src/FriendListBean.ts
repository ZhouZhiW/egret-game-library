/**
 *
 * @author 
 *
 */
class FriendListBean {
    public friendl_friend_id: number;
    public friendl_name: string;
    public friendl_meilizhi: number;
    public friendl_avatar: string;
    public friendl_gid: string;
    public friendl_interaction: number = 0;
    public constructor(friendobj: any) {
        this.friendl_friend_id = friendobj.friend_id;
        this.friendl_name = friendobj.name;
        if (friendobj.meilizhi) {
            this.friendl_meilizhi = friendobj.meilizhi;
        } else {
            this.friendl_meilizhi = 0;
        }
        this.friendl_avatar = friendobj.avatar;
        this.friendl_gid = friendobj.gid;
        if (friendobj.interaction) {
            this.friendl_interaction = friendobj.interaction;
        }
    }
}
