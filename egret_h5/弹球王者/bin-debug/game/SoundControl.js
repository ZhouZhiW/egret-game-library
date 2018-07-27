var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 声音控制单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
var SoundControl = (function (_super) {
    __extends(SoundControl, _super);
    function SoundControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sounds = {};
        _this.channels = {};
        _this.volumeBg = 1;
        _this.volumeEffect = 1;
        _this.isNoVolume = 1;
        return _this;
    }
    SoundControl.getIns = function () {
        if (this.instance == null) {
            this.instance = new SoundControl();
        }
        return this.instance;
    };
    /**
    * 判断是否为背景声音
    * @param data 声音容器
    * @param name 声音名字
    */
    SoundControl.prototype.checkSoundIsBg = function (data, name) {
        return data[name + "-bg"];
    };
    /**
    * 声音必须是预先已经加载好的
    * @param name 声音名字
    * @param isBgSound 是不是背景声音
    */
    SoundControl.prototype.addItem = function (name, isBgSound) {
        if (isBgSound === void 0) { isBgSound = false; }
        var soundName = name;
        if (isBgSound) {
            soundName = name + "-bg";
        }
        if (!this.sounds[soundName]) {
            var sound = RES.getRes(name);
            this.sounds[soundName] = sound;
        }
    };
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     * @param start 开始播放的地方，默认从头开始播放
     * @param loop 循环播放次数，默认是1次
     */
    SoundControl.prototype.play = function (name, start, loop) {
        if (start === void 0) { start = 0; }
        if (loop === void 0) { loop = 1; }
        var volume = this.volumeEffect;
        if (this.checkSoundIsBg(this.sounds, name)) {
            name = name + "-bg";
            volume = this.volumeBg;
        }
        if (this.sounds[name]) {
            var sound = this.sounds[name];
            this.channels[name] = sound.play(start, loop);
            if (this.isNoVolume == 0) {
                this.channels[name].volume = 0;
            }
            else {
                this.channels[name].volume = volume;
            }
        }
    };
    /**
     * 声音必须是预先已经加载好的
     * @param name 声音名字
     */
    SoundControl.prototype.stop = function (name) {
        if (this.checkSoundIsBg(this.channels, name)) {
            name = name + "-bg";
        }
        if (this.channels[name]) {
            var channel = this.channels[name];
            channel.stop();
        }
    };
    /**
     * 设置某个声音的音量
     *  @param name 声音名字
     *  @param volume 音量0－1
     */
    SoundControl.prototype.setVolume = function (name, volume) {
        if (this.checkSoundIsBg(this.channels, name)) {
            name = name + "-bg";
        }
        if (this.channels[name]) {
            var channel = this.channels[name];
            channel.volume = volume;
        }
    };
    /**
     * 设置所有背景声音音量
     * @param volume 音量0－1
     */
    SoundControl.prototype.setBgVolume = function (volume) {
        for (var name in this.channels) {
            if (name.split("-bg").length == 2) {
                var channel = this.channels[name];
                this.volumeBg = volume;
                if (channel.position != 0) {
                    channel.volume = volume;
                }
            }
        }
    };
    /**
     * 设置所有特效声音音量
     * @param volume 音量0－1
     */
    SoundControl.prototype.setEffectVolume = function (volume) {
        for (var name in this.channels) {
            if (name.split("-bg").length == 1) {
                var channel = this.channels[name];
                this.volumeEffect = volume;
                if (channel.position != 0) {
                    channel.volume = volume;
                }
            }
        }
    };
    /**设置是否静音
    * @param volume 是否静音0为无音1为有音
    */
    SoundControl.prototype.setIsNoVolume = function (volume) {
        this.isNoVolume = volume;
        for (var name in this.channels) {
            var channel = this.channels[name];
            if (channel.position != 0) {
                if (volume == 0) {
                    channel.volume = 0;
                }
                else {
                    if (this.checkSoundIsBg(this.sounds, name)) {
                        channel.volume = this.volumeBg;
                    }
                    else {
                        channel.volume = this.volumeEffect;
                    }
                }
            }
        }
    };
    return SoundControl;
}(egret.HashObject));
__reflect(SoundControl.prototype, "SoundControl");
//# sourceMappingURL=SoundControl.js.map