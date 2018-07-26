/**
 * Created by Administrator on 2015/5/26.
 */

class RoleConstant extends egret.Sprite {
    
    public static rolePool:RolePool = new RolePool();
    public static role:Role;
    public static hP:number = 0;
    public static player:PlayType = new PlayType();

    public static skin_zu:GroupStringA[] = [];

    public constructor() {
        super();
    }
}