// TypeScript file
/**
 * 道具逻辑
 */
class PropLogic
{
     //道具逻辑，仅操作数组
    //道具编号以及说明
    // 1  炸弹   周围上下左右4个元素，加上被点击元素删除爆炸
    // 2  整行   一行都删掉
    // 3  整列   一列都删除
    // 0  同色   相同颜色的都删除
    // 4  铲子   挖出一个点击元素
    public static useProp(propType:number,eleLocation:number){
        switch(propType)
        {
            case 0:
                PropLogic.tongse(eleLocation);
                break;
            case 1:
                PropLogic.zhadan(eleLocation);
                break;
            case 2:
                PropLogic.zhenghang(eleLocation);
                break;
            case 3:
                PropLogic.zhenglie(eleLocation);
                break;
            case 4:
                PropLogic.chanzi(eleLocation);
                break;
        }
    }
    /**
     * 铲子
     */
    private static chanzi(loc:number){
        LinkLogic.lines = new Array();
        LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(loc/GameData.MaxColumn)][loc%GameData.MaxRow]].id]);
    }
    /**
     * 炸弹  周围上下左右4个，共5个
    */
    private static zhadan(loc:number){
        LinkLogic.lines = new Array(); 
        let i:number =  Math.floor(loc/GameData.MaxColumn);
        let t:number = loc%GameData.MaxRow;
        let arr:number[] =new Array();
        arr.push(GameData.elements[GameData.mapData[i][t]].id);
        if(i>0&&GameData.mapData[i-1][t]!=-1)//上
        {
           arr.push(GameData.elements[GameData.mapData[i-1][t]].id); 
        }
        if(i<(GameData.MaxRow-1)&&GameData.mapData[i+1][t]!=-1)//下
        {
           arr.push(GameData.elements[GameData.mapData[i+1][t]].id); 
        }
        if(t>0&&GameData.mapData[i][t-1]!=-1)//左
        {
           arr.push(GameData.elements[GameData.mapData[i][t-1]].id); 
        }
        if(t<(GameData.MaxColumn-1)&&GameData.mapData[i][t+1]!=-1)//右
        {
           arr.push(GameData.elements[GameData.mapData[i][t+1]].id); 
        }
        LinkLogic.lines.push(arr);
    }
    /**
     * 整行
     */
    private static zhenghang(loc:number){
        LinkLogic.lines = new Array();  
        let arr:number[] =new Array();
        let i:number = Math.floor(loc/GameData.MaxColumn);
        for (let t = 0; t < GameData.MaxColumn; t++) {
            if(GameData.mapData[i][t]!=-1){
                arr.push(GameData.mapData[i][t]);
            }            
        }
        LinkLogic.lines.push(arr);
    }
    /**
     * 整列
     */
    private static zhenglie(loc:number){
        LinkLogic.lines = new Array();  
        let arr:number[] =new Array();
        let t:number = loc%GameData.MaxRow;
        for (let i = 0; i < GameData.MaxRow; i++) {
            if(GameData.mapData[i][t]!=-1){
                arr.push(GameData.mapData[i][t]);
            }            
        }
        LinkLogic.lines.push(arr);
    }

    /**
     * 同色
     */
    private static tongse(loc:number){
        LinkLogic.lines = new Array(); 
        let arr:number[] =new Array();
        let type:string =  GameData.elements[GameData.mapData[Math.floor(loc/GameData.MaxColumn)][loc%GameData.MaxRow]].type;
        for(let i=0;i<GameData.MaxRow;i++){
            for(let t=0;t<GameData.MaxColumn;t++)
            {
                if(GameData.mapData[i][t]!=-1&&GameData.elements[GameData.mapData[i][t]].type==type){
                    arr.push(GameData.elements[GameData.mapData[i][t]].id );
                }
            }
        }
        LinkLogic.lines.push(arr);
    }


}