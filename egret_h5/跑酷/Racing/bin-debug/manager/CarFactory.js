var game;
(function (game) {
    /**
     * 车工厂
     */
    var CarFactory = (function (_super) {
        __extends(CarFactory, _super);
        function CarFactory() {
            _super.call(this);
            this.cache = {};
            this.liveCarArray = [];
        }
        var d = __define,c=CarFactory;p=c.prototype;
        CarFactory.getInstance = function () {
            if (CarFactory.instance == null) {
                CarFactory.instance = new CarFactory();
            }
            return CarFactory.instance;
        };
        //生产
        p.produce = function (textureName) {
            if (this.cache[textureName] == null) {
                this.cache[textureName] = [];
            }
            var car;
            var cars = this.cache[textureName];
            if (cars.length) {
                car = cars.shift();
            }
            else {
                car = new game.Car(textureName);
            }
            this.liveCarArray.push(car);
            return car;
        };
        //回收
        p.reclaim = function (car) {
            if (this.cache[car.name] == null) {
                this.cache[car.name] = [];
            }
            var cars = this.cache[car.name];
            if (cars.indexOf(car) == -1) {
                this.cache[car.name].push(car);
            }
            var index = this.liveCarArray.indexOf(car);
            if (index != -1) {
                this.liveCarArray.splice(index, 1);
            }
        };
        return CarFactory;
    })(egret.Sprite);
    game.CarFactory = CarFactory;
    egret.registerClass(CarFactory,"game.CarFactory");
})(game || (game = {}));
