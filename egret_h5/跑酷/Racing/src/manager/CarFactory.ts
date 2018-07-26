module game {
	/**
	 * 车工厂
	 */
	export class CarFactory extends egret.Sprite {
		public constructor() {
			super();
		}

		private cache: any = {};
		public liveCarArray: Array<Car> = [];
		private static instance: CarFactory;
		public static getInstance(): CarFactory {
			if (CarFactory.instance == null) {
				CarFactory.instance = new CarFactory();
			}

			return CarFactory.instance;
		}
		//生产
		public produce(textureName: string): Car {
			if (this.cache[textureName] == null) {
				this.cache[textureName] = [];
			}
			var car: Car;
			var cars: Array<Car> = this.cache[textureName];
			if (cars.length) {
				car = cars.shift();
			}
			else {
				car = new Car(textureName);
			}
			this.liveCarArray.push(car);
			return car;
		}
		
		//回收
		public reclaim(car: Car) {

			if (this.cache[car.name] == null) {
				this.cache[car.name] = [];
			}

			var cars: Array<Car> = this.cache[car.name];

			if (cars.indexOf(car) == -1) {
				this.cache[car.name].push(car);
			}

			var index = this.liveCarArray.indexOf(car)
			if (index != -1) {
				this.liveCarArray.splice(index, 1);
			}
		}
	}
}