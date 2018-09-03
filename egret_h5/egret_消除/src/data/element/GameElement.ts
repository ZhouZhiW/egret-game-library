class GameElement extends BaseElement {
	 //游戏元素，用于标记当前舞台种出现的元素数据

    public id:number = 0;  //唯一ID，代表当前舞台上得元素,这个ID要和view中得元素ID对应
    public location:number = 0;  //位置坐标，使用0-64来进行记录
}