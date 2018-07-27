/**
 *
 * @author 
 *
 */
class TriggerModelBean {
    public endm_id: number;
    public endm_name: string;
    public endm_description: string;
    public endm_img: string;
    public endm_score: number;
    public endm_type: number;
    public constructor(endmodelobj: any) {
        this.endm_id = endmodelobj.id;
        this.endm_name = endmodelobj.name;
        this.endm_description = endmodelobj.description;
        this.endm_img = endmodelobj.img;
        this.endm_score = endmodelobj.score;
        this.endm_type = endmodelobj.type;
    }
}
