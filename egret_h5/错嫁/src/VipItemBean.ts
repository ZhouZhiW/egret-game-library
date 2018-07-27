class VipItemBean {
	public vip: number = 0;
	public igift: Array<VipigiftBean> = new Array();
	public gift_type: number;
	public name: string;
	public originalPrice: number;
	public money_type: number;
	public price: number;
	public description: string;
	public isBuy:number = 0;//1没有购买过 0购买过
	public constructor(obj: any) {
		this.vip = obj.vip;
		this.gift_type = obj.gift_type;
		this.name = obj.name;
		this.originalPrice = obj.originalPrice;
		this.money_type = obj.money_type;
		this.price = obj.price;
		this.isBuy = obj.isBuy;
		this.description = obj.description;
		if (obj.igift) {
			if (obj.igift.length > 0) {
				for (var i: number = 0; i < obj.igift.length; i++) {
					var igiftbean = new VipigiftBean(obj.igift[i]);
					this.igift.push(igiftbean);
				}
			}
		}
	}
}