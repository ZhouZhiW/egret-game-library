/**
 *
 * @author 
 *
 */
class MoreGameBean {
    public more_id: number = 0;
    public more_icon: string;
    public more_name: string;
    public more_description: string;
    public more_url: string;
    public more_state: number = 0;
    public more_order: number = 0;
    public constructor(id: number, icon: string, name: string, description: string, url: string, state: number, order: number) {
        this.more_id = id;
        this.more_icon = icon;
        this.more_name = name;
        this.more_description = description;
        this.more_url = url;
        this.more_state = state;
        this.more_order = order;
    }
}
