/**
 * 历史数据简装类
 */
class HistoryData {

    public hasData:boolean = false;
    public has:number = 0;

    /**
     * 初始化玩家历史数据
     */
	public initHistoryData(obj:Object):void
    {
        this.hasData = obj["has"] == 1;
    }
}