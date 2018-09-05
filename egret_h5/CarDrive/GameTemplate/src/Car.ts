module d5power {
    export class Car extends SingleFrameCharacter {

        /**
         * 转向角度
         */
        private _turnRoation:number = 0;
        /**
         * 汽车前进或后退的距离
         */
        private _onward:number;
        /**
         * 速度
         */
        private _speed:number = 0;

        /**
         * 推进
         */
        private _powerOn:boolean = false;

        /**
         * 摩擦力
         */
        private _friction:number = 1;

        private _rotationSpeed:number = 2;

        private _targetTurnRotaion:number = 0;

        private _targetTurnDir:number = 1;

        /**
         * 最大转向角
         */
        private static maxLunRota:number = 45;

        private static PI_180:number = Math.PI/180;

        private static l80_PI:number = 180/Math.PI;


        private _particlePoints:Array<egret.Point>;
        

        public constructor(map:IMap) {
            super(map);
            
        }

        public engineOn(speed:number):void
        {
            this._speed = speed;
            this._powerOn = true;
        }

        public engineOff():void
        {
            this._powerOn = false;
        }

        public get turnRoation():number 
        {
            return this._turnRoation;
        }
        
        public set turnRoation(value:number)
        {
            if(Math.abs(this._turnRoation-value)>180)
            {
                this._turnRoation += value>0 ? 360 : -360;
            }
            this._targetTurnRotaion = value;
            this._targetTurnDir = value>this._turnRoation ? 1 : -1;
        }

        private _lastParticle:number = 0;
        public run(t:number):void
        {
            if(this._targetTurnRotaion!=this._turnRoation)
            {
                this._turnRoation = Math.abs(this._turnRoation-this._targetTurnRotaion)>this._rotationSpeed ? this._turnRoation+this._targetTurnDir*this._rotationSpeed : this._targetTurnRotaion;
            }
            
            this._monitor.rotation = this._turnRoation;//汽车转向
            
            //汽车位移
            var vx:number = this._speed * Math.cos(this._turnRoation*Car.PI_180);
            var vy:number = this._speed * Math.sin(this._turnRoation*Car.PI_180);
            this._pos.x += vx;
            this._pos.y += vy;
            if (!this._powerOn)
            {
                this._speed = this._speed*this._friction;//摩擦力
            }

            // if(Math.abs(this._turnRoation-0)>.1)
            // {
            //     this._turnRoation+=(0-this._turnRoation)/2;
            // }else{
            //     this._turnRoation = 0;
            // }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            super.run(t);

            if(t-this._lastParticle>40)
            {
                this._lastParticle = t;
                for(var i:number=0,j:number=this._particlePoints.length;i<j;i++)
                {
                    var p:egret.Point = this._monitor.localToGlobal(this._particlePoints[i].x,this._particlePoints[i].y)
                    p = this._map.getWorldPostion(p.x,p.y);
                    Main.me.game.particle.graphicsScale(p.x,p.y,0xffffff,20,1,-.05);
                }
            }
        }

        protected onResReady(data:egret.Texture):void
        {
            super.onResReady(data);

            

            var p1:egret.Point = new egret.Point(data.textureWidth*.2,data.textureHeight*.1);
            var p2:egret.Point = new egret.Point(data.textureWidth*.2,data.textureHeight*.9);

            this._particlePoints = [p1,p2];
        }
    }
}