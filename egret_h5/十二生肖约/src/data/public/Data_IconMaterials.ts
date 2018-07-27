enum DataType_IconMaterials { Gold, Diamond, Gem, Ess, Fragment, monthCard, lifeCard }

class Data_IconMaterials {
    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    public getType(): number {
        return this.data.type;
    }

    public getCounts(): number {
        return this.data.counts;
    }

    public getIconSource(): string {
        let source;
        switch (this.getType()) {
            case DataType_IconMaterials.Gold:
                source = "resource/res/assicon/assicon_gold.png";
                break;
            case DataType_IconMaterials.Diamond:
                source = "resource/res/assicon/assicon_diamond.png";
                break;
            case DataType_IconMaterials.Ess:
                source = "resource/res/assicon/assicon_ess.png";
                break;
            case DataType_IconMaterials.Fragment:
                source = "resource/res/assicon/assicon_frg.png";
                break;
            case DataType_IconMaterials.Gem:
                source = "resource/res/assicon/assicon_gem.png";
                break;
            case DataType_IconMaterials.monthCard:
                source = "resource/res/assicon/assicon_monthCard.png";
                break;
            case DataType_IconMaterials.lifeCard:
                source = "resource/res/assicon/assicon_lifeCard.png";
                break;
        }
        return source;
    }

}