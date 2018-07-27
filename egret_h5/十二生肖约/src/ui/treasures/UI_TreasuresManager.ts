class UI_TreasuresManager {
    private treasures: Array<Data_Material>;
    private currentPop: UI_Treasures;
    constructor() {
        this.treasures = [];
        DataManager.inst.treasures.addDataListener(this.refreshTreasures, this);
    }
    private refreshTreasures(e: DataEvent) {
        let data: Data_Treasures = e.data;
        if (data.treasures.length < 1) {
            return;
        }

        for (let i = 0; i < data.treasures.length; i++) {
            this.treasures.push(data.treasures[i]);
        }
        this.popTreasure();
    }

    private popTreasure() {
        if (this.currentPop != null || this.treasures.length < 1) {
            return;
        }
        const data = this.treasures.shift();
        this.currentPop = new UI_Treasures(this, data);
        UILayer.inst.addChild(this.currentPop);
    }

    public popEnd() {
        if (this.currentPop != null) {
            UILayer.inst.removeChild(this.currentPop);
        }
        this.currentPop = null;
        this.popTreasure();
    }

}
