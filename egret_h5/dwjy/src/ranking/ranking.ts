class ranking  extends eui.Component implements  eui.UIComponent{

constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/skins/start.exml";
    }
    private onComplete(){

    }
}