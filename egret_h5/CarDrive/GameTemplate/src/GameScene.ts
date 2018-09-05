module d5power
{
    export class GameScene extends egret.DisplayObjectContainer
    {
        /**
         * 地图层
         */
        private _mapLayer:egret.DisplayObjectContainer;
        /**
         * 赛车层
         */
        private _carLayer:egret.DisplayObjectContainer;
        /**
         * 特效层
         */
        private _effectLayer:egret.DisplayObjectContainer;
        /**
         * 地图
         */
        private _map:UnlimitMap;
        /**
         * 渲染列表
         */
        private _renderList:Array<SingleFrameCharacter>;

        private _mycar:Car;


        private _camera:UnlimitCamera;

        private _particle: d5power.D5ParticleCenter;

        public constructor()
        {
            super();

            this._mapLayer = new egret.DisplayObjectContainer();
            this._carLayer = new egret.DisplayObjectContainer();
            this._effectLayer = new egret.DisplayObjectContainer();

            this.addChild(this._mapLayer);
            this.addChild(this._effectLayer);
            this.addChild(this._carLayer);
            

            this.once(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        public get particle():D5ParticleCenter
        {
            return this._particle;
        }

        private init(e:Event=null):void
        {
            this._renderList = [];

            this._map = new UnlimitMap();
            this._map.setContainer(this._mapLayer);
            this._map.createLoop(1,'resource/map.png',this.onMapReady,this);

            this._mycar = new Car(this._map);
            this._carLayer.addChild(this._mycar.monitor);
            this._mycar.setPos(300,300);
            this._mycar.turnRoation = -90;
            this._mycar.engineOn(20);
            this._mycar.setSkin('resource/car0.png');
            this._renderList.push(this._mycar);

            var bg:egret.Shape = new egret.Shape();
            bg.graphics.beginFill(0x666666);
            bg.graphics.drawCircle(60,60,60);
            bg.graphics.endFill();

            var controll:egret.Shape = new egret.Shape();
            controll.graphics.beginFill(0xEEEEEE);
            controll.graphics.drawCircle(10,10,10);
            controll.graphics.endFill();

            this.addChild(bg);

            this._particle = new d5power.D5ParticleCenter(this._effectLayer,this._map);

            var controller:TouchController = new TouchController(this.stage,this.onController,this);
            controller.init(bg,controll);
            
        }
        
        private onController(angle:number=NaN,length:number=NaN,changeAngle:number=NaN):void
        {
            if(isNaN(angle) && isNaN(length))
            {
                this._mycar.engineOff();
                return;
            }
            this._mycar.turnRoation = Math.ceil(angle*180/Math.PI);
            this._mycar.engineOn(20);
        }

        private onMapReady():void
        {
            this._camera = new UnlimitCamera(this._map);
            this._camera.focus = this._mycar;

            this.addEventListener(egret.Event.ENTER_FRAME,this.render,this);

            //this.x = (this.stage.stageWidth-this._map.width)>>1;
        }

        private render(e:egret.Event):void
        {
            var t:number = egret.getTimer();

            this._map.render();
            
            for(var i:number=this._renderList.length-1;i>=0;i--)
            {
                this._renderList[i].run(t);
                this._renderList[i].render(t);
            }

            this._camera.update();

            this._particle.render(t);
        }



    }
}