/**
 *
 * @author 
 *
 */
class SoundLoadTimeOut {
    private soundloadtimer: egret.Timer;
    public timecom: Function;
    private thisobj: any;
    public constructor(timecom: Function, sceneObj: any) {
        this.timecom = timecom;
        this.thisobj = sceneObj;
        this.soundloadtimer = new egret.Timer(GameUtils.SOUND_LOAD_TIMEOUT, 1);
        this.soundloadtimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timecom, this.thisobj);
        this.soundloadtimer.start();
    }
    public clearSoundTimer() {
        if (this.soundloadtimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.soundloadtimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timecom, this.thisobj);
        }
        this.soundloadtimer.stop();
        this.soundloadtimer.reset();
    }
}
