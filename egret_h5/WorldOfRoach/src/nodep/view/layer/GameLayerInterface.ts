/**
 * 游戏层级容器接口,因为存在扩展layer的可能,所以这里实现接口
 * @author nodep
 * @version 1.0
 */
interface GameLayerInterface{
    /**
     * 添加並顯示一個window
     */
    addWindow(win:GameWindow): void;
    /**
     * 舞台大小变化导致
     */
    resize():void;
}