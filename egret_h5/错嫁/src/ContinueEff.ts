/**
 *
 * @author 
 *
 */
class ContinueEff extends egret.DisplayObjectContainer {
    public dianEff: egret.Bitmap;
    public constructor(thisObj: any, ex: number, ey: number) {
        super();
        this.createDianEff(thisObj, ex, ey);
    }
    public createDianEff(thisObj: any, ex: number, ey: number) {
        this.dianEff = new egret.Bitmap();
        var imgsheet: egret.SpriteSheet = RES.getRes("coverimg_json");
        this.dianEff.texture = imgsheet.getTexture("dianeff");
        thisObj.addChild(this.dianEff);
        this.dianEff.x = ex;
        this.dianEff.y = ey;
        this.dianEff.scaleX = 0.1;
        this.dianEff.scaleY = 0.1;
        this.dianEff.anchorOffsetX = 32;
        this.dianEff.anchorOffsetY = 32;
        var tw = egret.Tween.get(this.dianEff);
        tw.to({ scaleX: 0.5, scaleY: 0.5 }, 100).
            to({ alpha: 0.1, scaleX: 1.0, scaleY: 1.0 }, 300).call(function () {
                if (this.dianEff.parent) {
                    this.dianEff.parent.removeChild(this.dianEff);
                }
            }, this);
    }
}
