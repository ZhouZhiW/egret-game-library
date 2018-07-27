class UI_UserAvatar extends BaseComponent {
    private userAvatar: eui.Image;
    private userMask: eui.Image;
    
    public constructor() {
        super();
    }
    protected get skinPath(): String {
        return "resource/skins/ui/base/UI_UserAvatarSkin.exml";
    }

    protected onCreate() {
        this.userAvatar.mask = this.userMask;
    }

    protected onDestroy() {

    }

    public setAvatar(path: string) {
        // console.log("setAvatar: " + path);
        this.userAvatar.source = path;
    }

}