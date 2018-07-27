class UI_Gem_TouchGem extends eui.Image {
    private _dataGem: UI_Gem_Gem | UI_Gem_Groove;
    constructor() {
        super();
        this._dataGem = null;
        this.visible = false;
    }

    public destroy() {
        this._dataGem = null;
    }

    public getDataGem(): UI_Gem_Gem | UI_Gem_Groove {
        return this._dataGem;
    }

    private setGemStatus(type: number, level: number = 0) {
        this.source = UI_Tre_GemConfig.getGemPath(type, level);
    }

    public setDataGem(data: UI_Gem_Gem | UI_Gem_Groove) {
        this._dataGem = data;
        if (this._dataGem == null) {
            this.setGemStatus(DataType_GemType.Null);
            this.visible = false;
        } else {
            this.setGemStatus(data.getMaterialData().getGemType(), data.getMaterialData().getGemLevel());
        }
    }

  
    public setPoint(targetPoint: egret.Point) {
        if (this._dataGem == null) {
            return;
        }
        if (!this.visible) {
            this.visible = true;
        }
        this.x = targetPoint.x - (this.width >> 1);
        this.y = targetPoint.y - (this.height >> 1);
    }
}