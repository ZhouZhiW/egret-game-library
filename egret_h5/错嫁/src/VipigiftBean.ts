class VipigiftBean {
	public giftId: number;
	public type: number;
	public value: number;
	public description: string;
	public constructor(obj: any) {
		this.giftId = obj.giftId;
		this.type = obj.type;
		this.value = obj.value;
		this.description = obj.description;
	}
}