/**
 * 角色信息
 */
class PlayerData {
	public id:number;
	public name:string;
	public posX:number;
	public posY:number;
	public hp:number = 0;//生命
	public full:number = 0;//饥饿
	public lk:number = 0;//运气
	public hpMax:number = 0;//最大生命值
	public fullMax:number = 0;//最大饥饿
	public lkMax:number = 0;//最大幸运
	public time:number = 0;//时间
}