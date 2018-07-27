/**
 *
 * @author 
 *
 */
class TriggerOpenModelBean {
    public triggeropen_id: number;
    public triggeropen_type: number;
    public constructor(endmodelobj: any) {
        this.triggeropen_id = endmodelobj.id;
        this.triggeropen_type = endmodelobj.type;
    }
}
