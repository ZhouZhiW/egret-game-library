class SceneManager {
    private static _manager: SceneManager;
    public static get Instance() {
        if (SceneManager._manager == null) {
            SceneManager._manager = new SceneManager();
        }
        return SceneManager._manager;
    }
    public constructor() {

    }
    public rootScene;
    public _currentScene;
    public changeScene(s) {
        if (this._currentScene) {
            this.rootScene.removeChild(this._currentScene);
            this._currentScene = null;
        }
        this.rootScene.addChild(s);
        this._currentScene = s;
    }

}
