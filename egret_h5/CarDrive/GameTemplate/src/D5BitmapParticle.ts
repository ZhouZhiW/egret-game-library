module d5power {
	/**
	 *
	 * @author 
	 *
	 */
	export class D5BitmapParticle extends egret.Bitmap {
        private static _pool: Array<D5BitmapParticle> = [];
                
        public xspeed: number = 0;
        public yspeed: number = 0;
        public rotationSpeed: number = 0;
        public xscaleSpeed: number = 0;
        public yscaleSpeed: number = 0;
        public alphaSpeed:number = 0;
                
        public static getInstance():D5BitmapParticle
        {
            if(D5BitmapParticle._pool.length)
            {
                return D5BitmapParticle._pool.pop();
            }else{
                var p: D5BitmapParticle = new D5BitmapParticle();
                return p;
            }
        }
                
        public static back2Pool(p:D5BitmapParticle):void
        {
            if(D5BitmapParticle._pool.indexOf(p)==-1)
            {
                D5BitmapParticle._pool.push(p);
            }
        }
                
        public life: number;
            	
        public constructor() {
            super();
        }
        		
        public run():void
        {
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.rotation += this.rotationSpeed;
            this.scaleX += this.xscaleSpeed;
            this.scaleY += this.yscaleSpeed;
            this.alpha+=this.alphaSpeed;
            }
            		
            public isLife(t:number):boolean
            {
                if(this.alpha<=0 || this.life > 0 && this.life < t) return false;
                return true;
            }
            		
            public dispose():void
            {
                this.scaleX = this.scaleY = 1;
                this.rotation = 0;
                            
                this.xspeed = 0;
                this.yspeed = 0;
                this.xscaleSpeed = 0;
                this.yscaleSpeed = 0;
                this.rotationSpeed = 0;
                this.alphaSpeed = 1;
                this.alpha = 1;
                            
                if(this.parent) this.parent.removeChild(this);
                D5BitmapParticle.back2Pool(this);
            }
	}
}
