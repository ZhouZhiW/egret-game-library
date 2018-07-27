class UI_Mission_Tab extends BaseComponent {
    private dataMission: Data_Mission;
    private title: eui.Label;
    private contentPic: eui.Image;
    private contentTx: eui.Label;
    private goldNum: eui.Label;
    private diamondsNum: eui.Label;
    private gemGroup: eui.Group;
    private target: eui.Label;
    private status: eui.Label;
    private gemHelp: eui.Button;
    private missionBtn: UI_BaseCostomButton;
    private horoscopeMC: egret.MovieClip;

    private flag: string;

    constructor() {
        super();
        NetEventManager.inst.pushMission();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/mission/UI_Mission_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        // this.missionBtn.enabled = false;
        // this.setData(new Data_Mission());
        // egret.Tween.get(this.missionBtn).wait(5000,false).call(this.setData);
        // this.scroller.verticalScrollBar = null;
        DataManager.inst.mission.addDataListener(this.refreshMission, this);
        this.missionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.missionBtn.setText("领取");
        this.missionBtn.setTextSize(18);
    }


    private refreshMission(e: DataEvent) {
        const data: Data_Mission = e.data;
        this.dataMission = data;
        // this.contentPic.source = this.dataMission.missionContentPic;
        this.goldNum.text = EasyNumber.easyNum(data.missionGoldNum);
        this.diamondsNum.text = EasyNumber.easyNum(data.missionDiamondsNum);
        this.missionBtn.enabled = data.missionBtnFlag;
        this.title.text = data.missionTitle;

        this.contentPic.fillMode = egret.BitmapFillMode.CLIP;
        this.contentTx.text = data.missionContentTx;
        this.target.text = data.missionTarget;
        this.status.text = data.missionStatus;

        this.gemGroup.removeChildren();

        for (let i = 0; i < data.missionGems.length; i++) {
            const missionGem = new UI_Tre_Gem();
            missionGem.setData(data.missionGems[i]);
            missionGem.setListener(this.clickedGem, this)
            this.gemGroup.addChild(missionGem);
        }
        this.flag = data.missionContentPic;

        this.loadMovieClipDataFactory("resource/mc/" + this.flag, this.getHoroscope, this);
        // this.loadMovieClipDataFactory("resource/mc/hero/hero_athena", this.getHoroscope, this);
    }

    private getData(): Data_Mission {
        return this.dataMission;
    }

    private onClicked(e: egret.TouchEvent) {
        NetEventManager.inst.pushNextMission();
    }

    private clickedGem(gem: UI_Tre_Gem) {
        const dialog = new NTextDialog();
        dialog.setTitle(UI_Tre_GemConfig.getGemName(gem.getData().gemType, gem.getData().gemLevel) + "  x" + gem.getData().gemCounts);
        dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(gem.getData().gemType, gem.getData().gemAttributes));
        dialog.show();

    }

    public onDestroy() {
        DataManager.inst.mission.removeDataListener(this.refreshMission, this);
        this.missionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        super.onDestroy();
    }

    private getHoroscope(mcf: egret.MovieClipDataFactory) {
        if (this.horoscopeMC != null) {
            this.removeChild(this.horoscopeMC);
        }

        let flagStop: string = this.flag.split('/')[0];
        let flagScale: string = this.flag.split('_')[1];

        this.horoscopeMC = new egret.MovieClip(mcf.generateMovieClipData(flagStop));
        this.horoscopeMC.scaleX
        if (flagScale == "handes" || flagScale == "poseidon" || flagScale == "zeus") {
            this.horoscopeMC.scaleX = -1;
        } else {
            this.horoscopeMC.scaleX = 1;
        }
        this.horoscopeMC.x = 100;
        this.horoscopeMC.y = 190;
        this.addChild(this.horoscopeMC);
        this.horoscopeMC.frameRate = 6;
        if (flagStop == "hero") {
            this.horoscopeMC.stop();
        } else {
            this.horoscopeMC.gotoAndPlay("breath", -1);
        }

    }


    protected loadMovieClipDataFactory(path: string, callback: Function, self: any = this) {
        let mcTexture = null;
        let mcData = null;
        const check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            const mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory, path);
        }

        const textureLoader = new egret.URLLoader();
        textureLoader.addEventListener(egret.Event.COMPLETE, function textureLoadOver(e) {
            mcTexture = e.currentTarget.data;
            check();
        }, this);
        textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        const textureRequest = new egret.URLRequest(path + ".png");
        textureLoader.load(textureRequest);


        let dataLoader = new egret.URLLoader();
        dataLoader.addEventListener(egret.Event.COMPLETE, function dataLoadOver(e) {
            mcData = JSON.parse(e.currentTarget.data);
            check();
        }, this);
        dataLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var dataRequest = new egret.URLRequest(path + ".json");
        dataLoader.load(dataRequest);
    }
}
