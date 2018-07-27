class VipBean {
	public vip: number = 0;
	public ireceive: Array<VipIreceiveBean> = new Array();
	public items: Array<VipItemBean> = new Array();
	public isReceive: number = 0;//1没有购买过 0购买过
	public is_expire:boolean = false;//false有效，true失效
	public constructor(obj: any) {
		if (obj.vip) {
			this.vip = obj.vip;
		}
		if (obj.isReceive) {
			this.isReceive = obj.isReceive;
		}
		if (obj.is_expire) {
			this.is_expire = obj.is_expire;
		}
		if (obj.ireceive) {
			if (obj.ireceive.length > 0) {
				for (var i: number = 0; i < obj.ireceive.length; i++) {
					var ireceivebean = new VipIreceiveBean(obj.ireceive[i]);
					this.ireceive.push(ireceivebean);
				}
			}
		}
		if (obj.items) {
			if (obj.items.length > 0) {
				for (var i: number = 0; i < obj.items.length; i++) {
					var itembean = new VipItemBean(obj.items[i]);
					this.items.push(itembean);
				}
			}
		}
	}
}