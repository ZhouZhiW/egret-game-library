/**
 * 基础数据表
 * @author nodep
 * @version 1.0
 */
class LocalDataTable {
	public name: string;
	public datas: Array<any>;

	public constructor() {
		this.datas = new Array<any>();
	}

	/**
	 * 初始化一个表格数据
	 * 需要扩展索引等
	 */
	public initTable(file: string, values: Array<Object>): void {
		this.name = file;
		var obj: Object;
		var cls = egret.getDefinitionByName(file);
		var value: any;
		while (values.length > 0) {
			obj = values.pop();
			value = new cls();
			ObjectUtil.copyTo(obj, value);
			this.datas.push(value);
		}
	}

	/**获取一条数据,他的属性于传入的相当 */
	public getObject(args: any): any {
		var value: any;
		var key: any;
		var flag: boolean = false;
		for (value of this.datas) {
			flag = true;
			for (key in args) {
				if (args[key] != value[key]) {
					flag = false;
					break;
				}
			}
			if (flag)
				return value;
		}
		return null;
	}

	/**获取一组符合条件的数据 */
	public getObjects(args: any): any[] {
		var values:any[] = [];
		var value: any;
		var key: any;
		var flag: boolean = false;
		for (value of this.datas) {
			flag = true;
			for (key in args) {
				if (args[key] != value[key]) {
					flag = false;
					break;
				}
			}
			if (flag)
				values.push(value);
		}
		return values;
	}
}