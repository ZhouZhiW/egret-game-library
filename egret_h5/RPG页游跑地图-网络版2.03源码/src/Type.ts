/**
 *
 * @author 
 *
 */
class Type {
	public constructor() {
	}
}
/*class Point {
    public x: number;
    public y: number;
}*/
class imgName {
    public name:string;
    public mapsElement: egret.Bitmap;
    public x: number = 0;
    public y: number = 0;
    public isLoad:boolean = false;
}

class GroupStringA {
    // g_name:组名，j_name：p_name：序列图名，序列图配置josn名，z_name：序列图配置josn里面的节点名
    public g_name: string;
    public j_name: string;
    public p_name: string;
    public z_name: string;
}

class RoleType {
    public rolePool: RolePool = new RolePool();
    public role: Role;
}

class MonsterType {
    public monster: Monster;
    public key: number;
}
class PlayType{
    public acc:string = "";
    public pas:string = "";
    public id:string = "";
    public name:string = "";
    public x: number = 0;
    public y: number = 0;
}