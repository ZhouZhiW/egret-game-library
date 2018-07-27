class IconImageMaterial extends BaseComponent {
    private icon: eui.Image;
    private count: eui.Label;

    public constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/activity/IconImageMaterialSkin.exml";
    }

    public setMaterialData(data: Data_IconMaterials) {
        if (data == null) {
            return;
        }
        this.icon.source = data.getIconSource();
        this.count.text = "x" + EasyNumber.easyNum(data.getCounts());
    }
}