/**
 *
 * 匿名函数 操作 外部变量
 *
 */
var Nmd = (function () {
    function Nmd() {
        /**背景音乐*/
        this.BgSound = new egret.Sound();
        this.isOk = false;
        this.isPlay = true;
    }
    var d = __define,c=Nmd,p=c.prototype;
    p.setTmd_a = function (a) {
        this.BgSound = a;
        this.BgMusic = this.BgSound.play();
        this.isOk = true;
    };
    p.getTmd_a = function () {
        return this.BgSound;
    };
    p.playSound = function () {
        if (!this.BgMusic) {
            this.BgMusic = this.BgSound.play();
        }
        //console.log(this.BgMusic.position)
    };
    return Nmd;
})();
egret.registerClass(Nmd,'Nmd');
//# sourceMappingURL=Nmd.js.map