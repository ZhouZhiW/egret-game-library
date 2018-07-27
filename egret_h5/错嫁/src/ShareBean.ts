/**
 *
 * @author 
 *
 */
class ShareBean {
    public sharename: string;
    public count: number;
    public award: number;
    public description: string;
    public type: number;
    public state: number;
    public constructor(shareobj: any) {
        this.sharename = shareobj.name;
        this.count = shareobj.count;
        this.award = shareobj.award;
        this.description = shareobj.description;
        this.type = shareobj.type;
        this.state = shareobj.state;
    }
}
