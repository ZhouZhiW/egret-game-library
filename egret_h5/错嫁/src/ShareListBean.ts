/**
 *
 * @author 
 *
 */
class ShareListBean {
    public share_result: string;
    public share_count: number;
    public invite_count: number;
    public share_list: Array<ShareBean> = new Array();
    public share_limit: number;
    public share_reward: string;
    public share_time: number;
    public share_interval: number;
    public constructor(sharelistobj: any) {
        this.share_result = sharelistobj.result;
        this.share_count = sharelistobj.share_count;
        this.invite_count = sharelistobj.invite_count;

        var sharelist: Array<ShareBean> = new Array();
        if (sharelistobj.items) {
            for (var i: number = 0; i < sharelistobj.items.length; i++) {
                sharelist.push(new ShareBean(sharelistobj.items[i]));
            }
        }
        this.share_list = sharelist;
        this.share_limit = sharelistobj.share_limit;
        this.share_reward = sharelistobj.share_reward;
        this.share_time = sharelistobj.share_time ? sharelistobj.share_time : 0;
        this.share_interval = sharelistobj.share_interval;
    }
}
