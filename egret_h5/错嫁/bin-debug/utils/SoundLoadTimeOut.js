var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoundLoadTimeOut = (function () {
    function SoundLoadTimeOut(timecom, sceneObj) {
        this.timecom = timecom;
        this.thisobj = sceneObj;
        this.soundloadtimer = new egret.Timer(GameUtils.SOUND_LOAD_TIMEOUT, 1);
        this.soundloadtimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timecom, this.thisobj);
        this.soundloadtimer.start();
    }
    SoundLoadTimeOut.prototype.clearSoundTimer = function () {
        if (this.soundloadtimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.soundloadtimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timecom, this.thisobj);
        }
        this.soundloadtimer.stop();
        this.soundloadtimer.reset();
    };
    return SoundLoadTimeOut;
}());
__reflect(SoundLoadTimeOut.prototype, "SoundLoadTimeOut");
//# sourceMappingURL=SoundLoadTimeOut.js.map