/**
 *
 * @author 
 *
 */
class MessageBean {
    public message_id: number;
    public message_type: number;
    public message_target_id: number;
    public message_title: string;
    public message_info: string;
    public message_state: number;
    public message_create_time: number;
    public constructor(messageobj: any) {
        this.message_id = messageobj.id;
        this.message_type = messageobj.type;
        this.message_target_id = messageobj.target_id;
        this.message_title = messageobj.title;
        this.message_info = messageobj.info;
        this.message_state = messageobj.state;
        this.message_create_time = parseInt(messageobj.create_time.toString());
    }
}
