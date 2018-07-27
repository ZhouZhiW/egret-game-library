class GameStatistics {
    private clickCount: number;
    private criticalCount: number;
    public constructor() {
        this.reset();
    }

    public addPlayerAttackCount(count: number = 1) {
        if (count > 0) {
            this.clickCount += count;
        }
    }

    public addPlayerCriCount(count: number = 1) {
        if (count > 0) {
            this.criticalCount += count;
        }
    }

    public reset() {
        this.clickCount = 0;
        this.criticalCount = 0;
    }

}