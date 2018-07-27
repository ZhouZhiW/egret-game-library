/**
 *
 * @author 
 *
 */
class RankBean {
    public meili_rank_ranking: number;
    public meili_rank_player_id: number;
    public meili_rank_name: string;
    public meili_rank_avatar: string;
    public meili_rank_meilizhi: number;

    public constructor(ranking: number, player_id: number, name: string, avatar: string, meilizhi: number) {
        this.meili_rank_ranking = ranking;
        this.meili_rank_player_id = player_id;
        this.meili_rank_name = name;
        this.meili_rank_avatar = avatar;
        this.meili_rank_meilizhi = meilizhi;
    }
}
