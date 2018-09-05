module d5power {
	/**
	 *
	 * @author 
	 *
	 */
	export class D5Particle extends egret.Shape implements ID5Particle {
        private static _pool: Array<D5Particle> = [];
        
        public xspeed: number = 0;
        public yspeed: number = 0;
        public rotationSpeed: number = 0;
        public xscaleSpeed: number = 0;
        public yscaleSpeed: number = 0;
        public alphaSpeed: number = 0;
        public px:number = 0;
        public py:number = 0;
        public protation:number = 0;
        public pscale:number;
        public palpha:number = 1;

        private _map:IMap;
        
        public static getInstance(map:IMap):D5Particle
        {
            if(D5Particle._pool.length)
            {
                return D5Particle._pool.pop();
            }else{
                var p: D5Particle = new D5Particle(map);
                return p;
            }
        }

        public static back2Pool(p:D5Particle):void
        {
            if(D5Particle._pool.indexOf(p)==-1)
            {
                D5Particle._pool.push(p);
            }
        }
        
        public life: number;
    	
		public constructor(map:IMap) {
            super();
            this._map = map;
		}
		
        private _lastRender:number = 0;
		public run(t:number):void
		{
            this.px += this.xspeed;
            this.py += this.yspeed;
            
            this.protation += this.rotationSpeed;
            this.pscale += this.xscaleSpeed;
            this.palpha += this.alphaSpeed;

            if(t-this._lastRender>40)
            {
                this._lastRender = t;
                this.scaleX = this.scaleY = this.pscale;
                this.alpha = this.palpha;
                this.rotation = this.protation;
            }
            
            var target:egret.Point = this._map.getScreenPostion(this.px,this.py);
            this.x = target.x;
            this.y = target.y;
		}
		
		public isLife(t:number):boolean
		{
            if(this.width*this.pscale<1 || this.height*this.pscale<1 || this.palpha <= 0 || this.life > 0 && this.life < t) return false;
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
            this.alpha = 1;

            this.px = 0;
            this.py = 0;
            this.protation = 0;
            this.pscale = 1;
            this.palpha = 1;
            
            if(this.parent) this.parent.removeChild(this);
            this.graphics.clear();
            D5Particle.back2Pool(this);
		}
	}
}
