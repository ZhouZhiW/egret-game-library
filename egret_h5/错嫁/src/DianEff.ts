/**
 *
 * @author 
 *
 */
class DianEff extends egret.DisplayObjectContainer {
    public dianeff: egret.Bitmap;
    public constructor(thisObj: any, ex: number, ey: number) {
        super();
        this.createDianEff(thisObj, ex, ey);
    }
    public createDianEff(thisObj: any, ex: number, ey: number) {
        this.dianeff = new egret.Bitmap();
        var imgsheet: egret.SpriteSheet = RES.getRes("coverimg_json");
        this.dianeff.texture = imgsheet.getTexture("dianeff");
        thisObj.addChild(this.dianeff);
        this.dianeff.x = ex;
        this.dianeff.y = ey;
        this.dianeff.scaleX = 0.1;
        this.dianeff.scaleY = 0.1;
        this.dianeff.anchorOffsetX = 32;
        this.dianeff.anchorOffsetY = 32;
        var tw = egret.Tween.get(this.dianeff);
        tw.to({ scaleX: 0.8, scaleY: 0.8 }, 100).
            to({ alpha: 0.1, scaleX: 1.5, scaleY: 1.5 }, 300).call(function () {
                if (this.dianeff.parent) {
                    this.dianeff.parent.removeChild(this.dianeff);
                }
            }, this);
    }
}
