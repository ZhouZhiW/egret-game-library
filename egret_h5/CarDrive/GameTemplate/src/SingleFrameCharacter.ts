module d5power
{
    export class SingleFrameCharacter extends GameObject implements IGD
    {
        
        public constructor(map:IMap)
        {
            super(map);
            this._monitor = new egret.Bitmap;
            
        }

        

        public run(t:number):void
        {
            this.updatePos();
        }

        protected updatePos(offX:number=0,offY:number=0):void
        {
            var tx:number = this._pos.x;
            var ty:number = this._pos.y;

            

            if(this._map)
            {
                var wout:boolean = this._map.width>D5Game.screenWidth;
                var hout:boolean = this._map.height>D5Game.screenHeight;

                if(this.beFocus && wout && hout){
                    // 地图比屏幕大，需要卷动
                        tx = D5Game.screenWidth>>1;
                        ty = D5Game.screenHeight>>1;
        
                    }else{
                        var target:egret.Point = this._map.getScreenPostion(tx,ty);
                        tx = target.x;
                        ty = target.y;
                    }
            }
            
            if(this._monitor==null) return;

            this._monitor.x = tx+offX;
            this._monitor.y = ty+offY;
        }
        
        public setSkin(name:string):void
        {
            var data:D5UIResourceData = D5UIResourceData.getData(name);
            if(data==null)
            {
                trace("[D5Bitmap]No Resource"+name);
                var texture:egret.Texture = RES.getRes(name);
                if(texture)
                {
                    this.onResReady(texture);
                }else
                {
                    RES.getResByUrl(name,this.onResReady,this,RES.ResourceItem.TYPE_IMAGE);
                }
                return;
            }
            this.onResReady(data.getResource(0));
        }

        protected onResReady(data:egret.Texture):void
        {
            (<egret.Bitmap>this._monitor).texture = data;
            this._monitor.anchorOffsetX = Math.ceil(data.textureWidth>>1);
            this._monitor.anchorOffsetY = Math.ceil(data.textureHeight>>1);
        }
    }

    
}