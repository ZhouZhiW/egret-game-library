module d5power {
	/**
	 *
	 * @author 
	 *
	 */
	export class D5ParticleCenter {
    	
        
        private _list: Array<ID5Particle> = [];
    	
        private _container: egret.DisplayObjectContainer;

        private _map:IMap;
        
		public constructor(container:egret.DisplayObjectContainer,map:IMap) {
            this._container = container;
            this._map = map;
		}
		
		public bitmapRadiation(startx:number,starty:number,res:string,num:number,alphaSpeed:number=0):void
		{
            var t: number = egret.getTimer();
            for(var i: number = 0;i < num;i++){
                var p: D5BitmapParticle = D5BitmapParticle.getInstance();
                p.texture = D5UIResourceData.getData(res).getResource(0);
                p.x = startx;
                p.y = starty;
                p.life = t + 800;
                                    
                var r: number = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random() * 16 * Math.cos(r);
                p.yspeed = Math.random() * 16 * Math.sin(r);
                p.rotationSpeed = Math.random() * 20;
                p.alphaSpeed=alphaSpeed;
                this._container.addChild(p);                             
                this._list.push(p);
            }
		}
		
        public bitmapScale(startx: number,starty: number,res: string,num: number,alphaSpeed: number = 0): void {
            var t: number = egret.getTimer();
            for(var i: number = 0;i < num;i++) {
                var p: D5BitmapParticle = D5BitmapParticle.getInstance();
                p.texture = D5UIResourceData.getData(res).getResource(0);
                p.x = startx;
                p.y = starty;
                p.life = t + 800;

                var r: number = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random() * 8 * Math.cos(r);
                p.yspeed = Math.random() * 8 * Math.sin(r);
                p.xscaleSpeed = p.yscaleSpeed = 0.03*Math.random()*(Math.random()>.5 ? 1 : -1);
                p.alphaSpeed = alphaSpeed;
                this._container.addChild(p);
                this._list.push(p);
            }
        }
        
        public graphicsScale(startx: number,starty: number,color: number,size: number,shape:number=0,alpha: number = 0,num:number=1): void {
            var t: number = egret.getTimer();
            for(var i: number = 0;i < num;i++) {
                var p: D5Particle = D5Particle.getInstance(this._map);

                p.graphics.beginFill(color,1);
                if(shape==0)
                {
                    p.graphics.drawCircle(0,0,size*Math.random()+.5);
                }else{
                    p.graphics.drawRect(0,0,size,size);
                    p.anchorOffsetX = size*.5;
                    p.anchorOffsetY = size*.5;
                }
                
                p.graphics.endFill();
                p.px = startx;
                p.py = starty;
                p.life = t + 800;

                var r: number = Math.random() * 2 * 3.1416;
                //p.xspeed = Math.random() * 16 * Math.cos(r);
                //p.yspeed = Math.random() * 16 * Math.sin(r);
                p.xscaleSpeed = p.yscaleSpeed = -0.03;//0.03 * Math.random() * (Math.random() > .5 ? 1 : -1);
                p.alphaSpeed = alpha;

                this._container.addChild(p);
                this._list.push(p);
            }

        }
        
		
		public graphicsRadiation(startx:number,starty:number,color:number,size:number,num:number):void
		{
            var t: number = egret.getTimer();
            for(var i: number = 0;i < num;i++){
                var p: D5Particle = D5Particle.getInstance(this._map);
                
                p.graphics.beginFill(color,1);
                p.graphics.drawRect(-size*.5,-size*.5,size,size);
                p.graphics.endFill();
                p.px = startx;
                p.py = starty;
                p.life = t + 800;
                
                var r: number = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random()*16 * Math.cos(r);
                p.yspeed = Math.random()*16 * Math.sin(r);;
                
                this._container.addChild(p);
                this._list.push(p);
            }
            
		}
		
        public render(t:number): void {
            var p:ID5Particle;
            for(var i: number = this._list.length - 1;i >= 0;i--){
                p = this._list[i];
                p.run(t);
                if(!p.isLife(t)){
                    p.dispose();
                    this._list.splice(i,1);
                }
            }
            
        }
        
        public clear():void
        {
            var p:ID5Particle;
            for(var i: number = this._list.length - 1;i >= 0;i--){
                p = this._list[i];
                p.dispose();
                this._list.pop();
            }
        }
	}
}
