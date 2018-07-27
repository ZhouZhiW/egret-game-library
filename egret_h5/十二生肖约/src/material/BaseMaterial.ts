class BaseMaterial extends BaseComponent {
    private imageMaterial: eui.Image;
    private data: Data_BaseMaterial;
    private count: eui.Label;

    public constructor(data: Data_BaseMaterial = null) {
        super();
        this.setMaterialData(data);
    }


    public setMaterialData(data: Data_BaseMaterial) {
        this.data = data;
        if (data == null) {
            this.imageMaterial.source = "resource/res/itemicon/item_icon_null.png";
            return;
        }
        this.imageMaterial.source = this.data.getSource();
        this.count.text = "x" + EasyNumber.easyNum(data.getCounts());
        this.count.visible = data.getCounts() > 1;
    }

    public getMaterialData() {
        return this.data;
    }


    protected get skinPath(): String {
        return "resource/skins/ui/material/SubscriptMaterialSkin.exml";
    }
}