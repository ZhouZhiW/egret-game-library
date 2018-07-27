class UI_Up_Selection_Dialog extends CustomDialog {
    private selectGroup: eui.Group;
    private btnIndex: number;
    private titleTx: eui.Label;
    private middleTx: eui.Label;
    private horoscopeMC: egret.MovieClip;
    constructor() {
        super();
        this.addButton("确定", true, this.clickedSure, this);
    }

    public onCreate() {
        this.btnIndex = 0;
        this.setTxPic(1);
        for (let i = 0; i < this.selectGroup.numChildren; i++) {
            const btn = <eui.ToggleButton>this.selectGroup.getChildAt(i);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
        }
    }

    public onDestroy() {
    }

    private clickedSure(dialog: UI_Up_Selection_Dialog) {
        this.showActionDialog();
    }

    private showActionDialog() {
        const dialog = new NTextDialog();
        dialog.setTitle("重要提示").setContent("选择星座不可更改,建议根据自己的生日对应选择,这将对未来产生深远的影响……");
        dialog.addButton("确定", true, this.clickSelect, this);
        dialog.addButton("重选");
        dialog.show();
    }

    private clickSelect(dialog: NTextDialog) {
        dialog.close();
        this.close();
        NetEventManager.inst.pushSelection(this.btnIndex + 1);
    }

    private clickedBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        btn.selected = true;
        this.setBtn(this.selectGroup.getChildIndex(btn));
    }

    private setBtn(index: number) {
        if (this.btnIndex == index) {
            return;
        }
        this.btnIndex = index;
        for (let i = 0; i < this.selectGroup.numChildren; i++) {
            const btn = <eui.ToggleButton>this.selectGroup.getChildAt(i);
            btn.selected = i == this.btnIndex;
            if (index == i) {
                this.setTxPic(i + 1);
            }
        }
    }

    private setTxPic(index: number) {
        switch (index) {
            case DataType_PlayerIndex.Ari:
                this.titleTx.text = "我的剑就是你的剑!";
                this.middleTx.text = "白羊（3月21日-4月21日）";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("1_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Tau:
                this.titleTx.text = "听说我有个兄弟是只猴子，你认识他吗!";
                this.middleTx.text = "金牛（4月20日-5月20日）";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("2_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Gem:
                this.titleTx.text = "兄弟同心其利断金!";
                this.middleTx.text = "双子(5月21日-5月20日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("3_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Cnc:
                this.titleTx.text = "刚克服横着走路，怎么感觉有点不习惯!";
                this.middleTx.text = "巨蟹(6月22日-7月22日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("4_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Leo:
                this.titleTx.text = "勇气是我战胜一切的法宝!";
                this.middleTx.text = "狮子(7月23日-8月22日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("5_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Vir:
                this.titleTx.text = "我的玫瑰花中蕴含着巨大的能量!";
                this.middleTx.text = "处女(8月23日-9月22日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("6_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Lib:
                this.titleTx.text = "公平、公正是我做事的基本守则!";
                this.middleTx.text = "天秤(9月23日-10月23日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("7_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Sco:
                this.titleTx.text = "我的毒针可以见血封喉!";
                this.middleTx.text = "天蝎(10月24日-11月22日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("8_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Sgr:
                this.titleTx.text = "我超爱追杀的!";
                this.middleTx.text = "射手(11月23日-12月21日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("9_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Cap:
                this.titleTx.text = "我的长鞭早已饥渴难耐了!";
                this.middleTx.text = "摩羯(12月22日-1月19日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("10_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Agr:
                this.titleTx.text = "给你介绍一位新朋友，它的名字叫塞拉炯!";
                this.middleTx.text = "水瓶(1月20日-2月18日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("11_20"), this.getHoroscope, this);
                break;
            case DataType_PlayerIndex.Psc:
                this.titleTx.text = "双鱼为我指引着前进的道路!";
                this.middleTx.text = "双鱼(2月19日-2月20日)";
                this.loadMovieClipDataFactory("resource/mc/player/player_" + GameUtils.starsName("12_20"), this.getHoroscope, this);
                break;
        }
    }

    protected get style(): number {
        return 1;
    }
    protected get skinPath(): string {
        return "resource/skins/ui/upgrade/UI_Up_Selection_DialogSkin.exml";
    }

    private getHoroscope(mcf: egret.MovieClipDataFactory) {
        if (this.horoscopeMC != null) {
            this.removeChild(this.horoscopeMC);
        }
        this.horoscopeMC = new egret.MovieClip(mcf.generateMovieClipData("player"));
        this.horoscopeMC.x = 165;
        this.horoscopeMC.y = 195;
        this.addChild(this.horoscopeMC);
        this.horoscopeMC.frameRate = 6;
        this.horoscopeMC.gotoAndPlay("breath", -1);
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