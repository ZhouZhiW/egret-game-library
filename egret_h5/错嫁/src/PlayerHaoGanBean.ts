/**
 *
 * @author 
 *
 */
class PlayerHaoGanBean {
    public hao_haogandu: number = 0;
    public hao_npc_id: number = 0;
    public hao_player_id: number = 0;
    public constructor(haoganobj: any) {
        this.hao_npc_id = haoganobj.npc_id;
        this.hao_haogandu = haoganobj.haogandu;
        this.hao_player_id = haoganobj.player_id;
    }
}
