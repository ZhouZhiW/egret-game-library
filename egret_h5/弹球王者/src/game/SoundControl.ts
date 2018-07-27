/**
 * 声音控制单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
class SoundControl extends egret.HashObject {
    private static instance:SoundControl;
    private sounds:Object={};
    private channels:Object={};
    private volumeBg:number=1;
    private volumeEffect:number=1;
    private isNoVolume:number=1;
    public static getIns():SoundControl{
            if(this.instance == null){
                    this.instance = new SoundControl();
            }
            return this.instance;
    }
     /**
     * 判断是否为背景声音
     * @param data 声音容器
     * @param name 声音名字
     */
    private checkSoundIsBg(data:Object,name:string):boolean
    {
        return data[name+"-bg"];
    }
     /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     * @param isBgSound 是不是背景声音
     */
    public addItem(name:string,isBgSound:boolean=false):void
    {
        var soundName:string=name
        if(isBgSound){//如果是背景声音会在名字后面加-bg
            soundName=name+"-bg";
        }
        if(!this.sounds[soundName]){
            var sound:egret.Sound=RES.getRes(name); 
            this.sounds[soundName]=sound;
        }
    }
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     * @param start 开始播放的地方，默认从头开始播放
     * @param loop 循环播放次数，默认是1次
     */
    public play(name:string,start:number=0,loop:number=1):void
    {
        var volume:number=this.volumeEffect
        if(this.checkSoundIsBg(this.sounds,name)){
            name=name+"-bg";
            volume=this.volumeBg;
        }
        if(this.sounds[name]){
            var sound:egret.Sound=this.sounds[name];
            this.channels[name]=sound.play(start,loop);
           
            if(this.isNoVolume==0){
                this.channels[name].volume=0;
            }else{
                this.channels[name].volume=volume;
            }
        }
    }
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     */
    public stop(name):void
    {
        if(this.checkSoundIsBg(this.channels,name)){
            name=name+"-bg";
        }
        if(this.channels[name]){
            var channel:egret.SoundChannel=this.channels[name]
            channel.stop();
        }
    }
    /**
     * 设置某个声音的音量
     *  @param name 声音名字
     *  @param volume 音量0－1
     */
    public setVolume(name:string,volume:number):void
    {
        if(this.checkSoundIsBg(this.channels,name)){
            name=name+"-bg";
        }
        if(this.channels[name]){
            var channel:egret.SoundChannel=this.channels[name]
           channel.volume=volume;
        }
    }
    /**
     * 设置所有背景声音音量
     * @param volume 音量0－1
     */
    public setBgVolume(volume:number):void
    {
        for(var name in this.channels){
            if(name.split("-bg").length==2){
                 var channel:egret.SoundChannel=this.channels[name];
                 this.volumeBg=volume;
                 if(channel.position!=0){
                    channel.volume=volume;
                 }
            }  
        }
    }
    /**
     * 设置所有特效声音音量
     * @param volume 音量0－1
     */
    public setEffectVolume(volume:number):void
    {
        for(var name in this.channels){
            if(name.split("-bg").length==1){
                 var channel:egret.SoundChannel=this.channels[name];
                 this.volumeEffect=volume;
                 if(channel.position!=0){
                    channel.volume=volume;
                 }
            }  
        }
    }
     /**设置是否静音
     * @param volume 是否静音0为无音1为有音
     */
    public setIsNoVolume(volume:number):void
    {
        this.isNoVolume=volume;
        for(var name in this.channels){
            var channel:egret.SoundChannel=this.channels[name];
            if(channel.position!=0){
                if(volume==0){
                    channel.volume=0;
                }else {
                    if(this.checkSoundIsBg(this.sounds,name)){
                        channel.volume=this.volumeBg;
                    }else{
                        channel.volume=this.volumeEffect;
                    }
                }
            }
        }
    }
}