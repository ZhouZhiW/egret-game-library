module control
{
    export class ControlBasic{
        protected stage:egret.Stage;
        protected posStart:egret.Point;
        protected posMove:egret.Point;
        protected posEnd:egret.Point;
        public startBackFun:any;
        public moveBackFun:any;
        public endBackFun:any;
        constructor(stage:egret.Stage) {
            this.stage=stage;
        }
        /** 打开事件*/
        public open():void{
            this.close();
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        /** 关闭事件*/
        public close():void{
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        protected onTouch(e: egret.TouchEvent){
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.posStart=new egret.Point(e.stageX,e.stageY);
                    this.controlStart();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.posMove=new egret.Point(e.stageX,e.stageY);
                    this.controlMove();
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.posEnd=new egret.Point(e.stageX,e.stageY);
                    this.controlEnd();
                    break;
            }
        }
        /** 手指按下*/
        protected controlStart(): void {
            if(this.startBackFun!=null){
                this.startBackFun(this.posStart);
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        }
        /** 手指移动*/
        protected controlMove(): void {
             if(this.moveBackFun!=null){
                this.moveBackFun(this.posMove);
             }
        }
        /** 手指离开*/
        protected controlEnd(): void {
            if(this.endBackFun!=null){
                this.endBackFun(this.posEnd);
             }
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        }
    }
	/**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 控制杆自由控制移动
	 */
    export class ControlBarMove extends ControlBasic{
        private controlBg:egret.DisplayObject;
        private controlBar:egret.DisplayObject;
        private isDrag:boolean;
        constructor(stage:egret.Stage,controlBar:egret.DisplayObject,controlBg:egret.DisplayObject) {
            super(stage);
            this.controlBar=controlBar;
            this.controlBg=controlBg;
        }
        /** 手指按下*/
        protected controlStart(): void {
           if(this.controlBar.hitTestPoint(this.posStart.x,this.posStart.y)){
                super.controlStart();
                this.isDrag=true;
            }
        }
        protected controlMove(): void {
            if(this.isDrag==false) return;
            var x:number=this.posMove.x,y:number=this.posMove.y;
            var bg=this.controlBg;
            var bar=this.controlBar;
            var cx=bg.x;
            var cy=bg.y;
            var dx=x-cx;
            var dy=y-cy;
            var ds=Math.sqrt(dx*dx+dy*dy);
            var r=bg.width>>1;
            var conA=dx/ds;
            var sinA=dy/ds;
            if(ds<r){//在边内时的处理
                bar.x=x;
                bar.y=y;
            }else{//超出边界时的处理
                bar.x=cx+conA*r;
                bar.y=cy+sinA*r;
            }
            if(this.moveBackFun!=null){
                var value:egret.Point=new egret.Point(bar.x-bg.x,bar.y-bg.y);
                this.moveBackFun(value);
            }
        }
        
        protected controlEnd(): void {
            this.isDrag=false;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

            var bg=this.controlBg;
            var bar=this.controlBar;
            bar.x=bg.x;
            bar.y=bg.y;

            if(this.endBackFun!=null){
                this.endBackFun(this.posEnd);
             }
        }
        
    }
    /**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 手指滑动，向上向下向左向右滑动
	 */
    export class ControlFingerMove extends ControlBasic{
        public moveEndBackFun:any;
        constructor(stage:egret.Stage) {
            super(stage);
        }
        protected controlEnd(): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            
            var disx:number=this.posEnd.x-this.posStart.x;
            var disy:number=this.posEnd.y-this.posStart.y;
            var value:egret.Point=new egret.Point(0,0);
            if(Math.abs(disx)>Math.abs(disy)){//左右
               value.x=disx>0?1:-1;
            }else{//上下
               value.y=disy>0?1:-1;
            }
            if(this.endBackFun!=null){
                this.endBackFun(this.posEnd);
            }
            if(this.moveEndBackFun!=null){
                this.moveEndBackFun(value);
            }
        }
    }
    /**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 可示对象自由拖动
	 */
    export class ControlDrag extends ControlBasic{
        display:egret.DisplayObject;
        distance:egret.Point;
        isDrag:boolean;
        constructor(stage:egret.Stage,display:egret.DisplayObject) {
            super(stage);
            this.display=display;
            this.distance=new egret.Point;
        }
        public set target(value:egret.DisplayObject){
            this.display=value;
        }
        protected controlStart(): void {
            if(this.display.hitTestPoint(this.posStart.x,this.posStart.y)){
                super.controlStart();
                this.isDrag=true;
                this.distance.x = this.posStart.x - this.display.x;
                this.distance.y = this.posStart.y - this.display.y;
            }
        }
        protected controlMove(): void {
            if(this.isDrag){
                super.controlMove();
                this.display.x = this.posMove.x - this.distance.x;
                this.display.y = this.posMove.y - this.distance.y;
            }
        }
        protected controlEnd(): void {
            this.isDrag=false;
            super.controlEnd();
            if(this.endBackFun!=null){
                this.endBackFun();
             }
        }
    }
    /**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 多点按下与松开的触控管理
	 */
    export class ControlMoreTab extends ControlBasic{
        private id:number;
        private nodes:any[]=[];
        /**datas:[{display:display:backCall:backCall}]*/
        constructor(stage:egret.Stage,datas:any[]) {
            super(stage);
            for(var i:number=0;i<datas.length;i++){
                var obj=datas[i];
                var node:MorePointNode=new MorePointNode(obj.display,obj.backCall);
                this.nodes.push(node);
            }
        }
        protected onTouch(e: egret.TouchEvent){
            this.id=e.touchPointID;
            super.onTouch(e);
        }
        private check(x:number,y:number,type:number):void
        {
            var nodes:any[]=this.nodes;
            for(var i:number=0;i<nodes.length;i++){
                var node:MorePointNode=nodes[i];
                if(type==1){//按下
                    if(node.display.hitTestPoint(x,y)){
                        node.id=this.id;
                        node.backCall(type);
                    }
                }else{//松开
                    if(node.id==this.id){
                        node.id=-1;
                        node.backCall(type);
                    }
                }
            }
        }
        protected controlStart(): void {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            this.check(this.posStart.x,this.posStart.y,1);
        }
        protected controlEnd():void{
            super.controlEnd();
           this.check(this.posEnd.x,this.posEnd.y,0);
        }
    }
    export class MorePointNode
    {
        public id:number;
        public display:egret.DisplayObject;
        public backCall:Function;
        constructor(display:egret.DisplayObject,backCall:Function) {
            this.display=display;
            this.backCall=backCall;
        }
    }
}
