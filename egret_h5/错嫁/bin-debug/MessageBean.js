var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var MessageBean = (function () {
    function MessageBean(messageobj) {
        this.message_id = messageobj.id;
        this.message_type = messageobj.type;
        this.message_target_id = messageobj.target_id;
        this.message_title = messageobj.title;
        this.message_info = messageobj.info;
        this.message_state = messageobj.state;
        this.message_create_time = parseInt(messageobj.create_time.toString());
    }
    return MessageBean;
}());
__reflect(MessageBean.prototype, "MessageBean");
//# sourceMappingURL=MessageBean.js.map