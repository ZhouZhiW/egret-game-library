/**
 *
 * 匿名函数 操作 外部变量
 *
 */
class Nmd {
    /**背景音乐*/
    private BgSound: egret.Sound = new egret.Sound();
    private BgMusic: egret.SoundChannel;
    public isOk:boolean = false;
    private isPlay:boolean = true;
    public constructor() {
    }
    public setTmd_a(a: egret.Sound): void {
        this.BgSound = a;
        this.BgMusic = this.BgSound.play();
        this.isOk = true;
    }
    public getTmd_a(): egret.Sound {
        return this.BgSound;
    }

    public playSound():void{
        if(!this.BgMusic){
            this.BgMusic = this.BgSound.play();
        }
        //console.log(this.BgMusic.position)
    }
}