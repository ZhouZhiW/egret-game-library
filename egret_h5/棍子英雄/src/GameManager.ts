/**
 */
class GameManager {


    private static _heroIndex:number = 1;
    private static _curScore:number = 0;

    public static setHeroIndex(val:number){

        this._heroIndex = val;
    }

    public static getHeroIndex():number{
        return this._heroIndex;
    }

    public static setCurScore(val:number){

        this._curScore = val;
    }

    public static getCurScore():number{
        return this._curScore;
    }

}