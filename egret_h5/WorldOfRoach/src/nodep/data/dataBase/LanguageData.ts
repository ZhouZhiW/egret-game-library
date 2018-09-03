/**
 * 测试用语言包
 * 这里不牵涉配置文件,只是写死在业务中引用到,在替换版本后可实现配置文件多语言加载
 * @author nodep
 * @version 1.0
 */
class LanguageData {
	private static _ins: LanguageData;

	public static getIns(): LanguageData {
		if (LanguageData._ins == null)
			LanguageData._ins = new LanguageData();
		return LanguageData._ins;
	}

	private langMap:Map<number,string>;

	public constructor() {
		this.langMap = new Map<number,string>();
		this.langMap.set(10001,"正在创建世界..");
	}

	public getLang(key:number):string
	{
		return this.langMap.get(key);
	}
}