/**
 *
 * @author 
 *
 */
class RewardsBean {
    public rewards_name: string;
    public rewards_type: number;
    public rewards_url: string;
    public rewards_bitdata: egret.BitmapData;
    public constructor(obj: any) {
        this.rewards_name = obj.name;
        this.rewards_type = obj.type;
        this.rewards_url = obj.url;
    }
}
