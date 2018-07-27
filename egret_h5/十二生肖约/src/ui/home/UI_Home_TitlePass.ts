enum UI_Home_TitlePassType { LOCK, COMPLETED, CURRENTATT };

class UI_Home_TitlePass extends BaseComponent {
    private homeTitlePassLevel: eui.Label;
    private homeTitlePassBg: eui.Image;
    constructor() {
        super();
    }


    public onCreate() {

    }

    public onDestroy() {

    }


    public setInfo(type: number, level: number) {
        let path: string;
        let txColor: number = 0;
        let tx: string;
        switch (type) {
            case UI_Home_TitlePassType.COMPLETED:
                path = "resource/res/ui/home/home_title_pass_completed.png";
                // txColor = 0x138a9f;
                tx = "" + level;
                break;
            case UI_Home_TitlePassType.CURRENTATT:
                path = "resource/res/ui/home/home_title_pass_current.png";
                // txColor = 0x59770a;
                tx = "" + level;
                break;
            case UI_Home_TitlePassType.LOCK:
            default:
                path = "resource/res/ui/home/home_title_pass_lock.png";
                tx = "";
                break;
        }
        this.homeTitlePassBg.source = path;
        // this.homeTitlePassLevel.strokeColor = txColor;
        this.homeTitlePassLevel.text = tx;
    }
}