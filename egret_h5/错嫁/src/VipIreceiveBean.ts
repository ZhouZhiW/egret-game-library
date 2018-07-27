class VipIreceiveBean {
	public vip: number = 0;
	public igift: Array<VipigiftBean> = new Array();
	public constructor(obj: any) {
		this.vip = obj.vip;
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