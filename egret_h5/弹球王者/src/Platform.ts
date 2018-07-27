/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<any>;
    /**加载进度 */
    progress(value:number): Promise<any>;
    /**提交分数 */
    submitScore(score:number,callback:Function,thisObject:any): Promise<any>;
    /**获取排行榜 */
    getRank(callback:Function,thisObject:any): Promise<any>;
    /**获取是否可播放广告 返回boolean */
    canPlayAd(): Promise<any>;
    /**播放广告 */
    playAd(callback:Function): Promise<any>;
    
}

class DebugPlatform implements Platform {
    async getUserInfo() {
       
    }
    async login() {

    }
    async progress(value:number){
        
    }
    async submitScore(score:number, callback:Function, thisObject:any){
       
    }
    async getRank(callback:Function, thisObject:any){
        
    }
    async canPlayAd() {
        
    }
    async playAd(callback:Function) {
        
    }
}

if (!window.platform) {
    window.platform = new DebugPlatform();
}

declare let platform: Platform;

declare interface Window {

    platform: Platform
}