/**
 * 本地基础数据,主要针对json文件
 * 将以数组形式存在的JSON文件进行统一管理
 * 如下格式user.json=[{},{},{}]
 * 通过file=user来查询这个表格,可通过扩展来完善仿sql
 * 另外需要注意：这样做的主要目的是为了将JSON的配置放置到Excel中，并利用工具自动创建.json,.ts文件
 * @see LocalDataTable
 * @author nodep
 * @version 1.1
 */
class LocalData {
	private static _callback: Function;
	private static _thisObj: any;
	private static _files: Array<string>;
	private static _targetFile: string;
	private static _dataMap: Map<string, LocalDataTable> = new Map();
	/**
	 * 异步初始化表格
	 * @param files json文件名数组 比如RES下的user_json.json->user
	 */
	public static loadLocalDataAsync(files: Array<string>, callBack: Function, thisObj: any): void {
		LocalData._callback = callBack;
		LocalData._thisObj = thisObj;
		LocalData._files = files;
		LocalData.loadNextAsync();
	}
	private static loadNextAsync(): void {
		if (LocalData._files.length <= 0) {
			LocalData._callback.apply(LocalData._thisObj);
			LocalData._callback = null;
			LocalData._thisObj = null;
			LocalData._files = null;
		}
		else {
			LocalData._targetFile = LocalData._files.pop();
			RES.getResAsync(LocalData._targetFile.substr(0, LocalData._targetFile.length - 2) + "_json", LocalData.loadDbCompleteAsync, LocalData)
		}
	}
	private static loadDbCompleteAsync(result: Array<Object>): void {
		LocalData.createTable(LocalData._targetFile, result);
		LocalData.loadNextAsync();
	}
	private static loadLocalData(file: string): void {
		var jsonName: string = file.substr(0, file.length - 2);
		var values: Array<Object> = RES.getRes(jsonName + "_json");
		LocalData.createTable(file, values);
	}
	private static createTable(file: string, result: Array<Object>): LocalDataTable {
		var table: LocalDataTable = new LocalDataTable();
		table.initTable(file, result);
		LocalData._dataMap.set(file, table);
		return table;
	}

	/**
	 * 根据key-value获取一个对象，如果有多个对象将返回第一个.如果没有符合条件的对象，返回null
	 * @param file 要获取的JSON名称
	 * @param args 参数对
	 */
	public static getObjectByKv(file: string, args: any): any {
		if (null == LocalData._dataMap.get(file))
			LocalData.loadLocalData(file);
		return LocalData._dataMap.get(file).getObject(args);
	}

	/**
	 * 根据key-value获取符合条件的所有对象,如果没有符合条件的将返回长度为0的数组
	 * @param key
	 * @param value
	 */
	public static getObjectsByKv(file: string, args: any): Array<Object> {
		if (null == LocalData._dataMap.get(file))
			LocalData.loadLocalData(file);
		return LocalData._dataMap.get(file).getObjects(args);
	}
}