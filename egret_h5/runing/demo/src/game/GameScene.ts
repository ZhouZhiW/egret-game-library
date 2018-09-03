
//////////////////////////////////////////////////////////////////////////////////////


class GameScene extends GameObject {


    public static key = "gamescene";

    constructor() {
        super();
    }

    public onCreate() {

    }


    public onDestroy(): void {

    }

    public onEnterFrame(advancedTime: number): void {

        GameUtils.gameDistance += advancedTime / 1000 * Const.GAME_SPEED;

        GameManager.getInstance().dispatchEventWith("UPDATE");
        if (GameUtils.gameDistance >= Const.MAP_WIDTH - Const.SW / 2) {
            ObjectPool.getInstance().paused = true;
        }

    }
}