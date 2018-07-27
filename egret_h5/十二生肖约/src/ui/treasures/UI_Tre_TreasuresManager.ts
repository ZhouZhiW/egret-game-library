class UI_Tre_TreasuresManager {
    private showTreasures: Array<Data_BaseTreasure>;
    constructor() {
        this.showTreasures = [];
        DataManager.inst.treasures.addDataListener(this.refreshTreasures, this);
    }

    private refreshTreasures(e: DataEvent) {
        let data: Data_Treasures = e.data;
        if (data.treasures.length < 1) {
            return;
        }
        const isStart = (this.showTreasures.length < 1);
        for (let i = 0; i < data.treasures.length; i++) {
            // this.showTreasures.push(data.treasures[i]);
        }
        if (isStart) {
            this.popTreasure();
        }
    }

    private popTreasure() {
        if (this.showTreasures.length < 1) {
            return;
        }
        const data = this.showTreasures.shift();
        const t = new UI_Tie_Treasures(data);
        t.setDestroyListener(this.popTreasure, this);
        DialogLayer.inst.addChild(t);
    }




}