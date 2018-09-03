var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StateMachine = (function () {
    function StateMachine() {
    }
    StateMachine.prototype.change = function (state) {
        if (this._state) {
            this._state.onExit();
        }
        this._state = state;
        this._state.onEnter();
    };
    return StateMachine;
}());
__reflect(StateMachine.prototype, "StateMachine");
//# sourceMappingURL=StateMachine.js.map