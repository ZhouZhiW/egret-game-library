var MUSIC_CLICK_BTN:string="click_mp3";
var MUSIC_HIT:string="hit_mp3";
var MUSIC_ADDNUM:string="addNum_mp3";
var MUSIC_FIRE:string="fire_mp3";
var MUSIC_FLOOR:string="floor_mp3";
var MUSIC_BG:string="background_mp3";

var EVENT_FIRE:string="event fire";
var EVENT_REMOVE:string="event remove";

var TYPE_HAND:string="type hand";

var ICON_ADD:string="addIcon_png"

var SHAPE={rect:"rect",circle:"circle"}//形状

var OVER_DIS:number=200;

class GameControl extends moon.BasicGamePanel{
    private world:P2World;//2D物理世界
    private material:p2.Material;//碰撞时的弹性变化
    private names:string[]=[];//数字刚体皮肤名字
    private gun:Gun;//炮
    private controlGun:control.ControlBasic;//控制炮的方向
    private vec:egret.Point;//发炮时的冲量值
    private removeSkins:any[]=[];//需要删除刚体的皮肤
    private container:Sprite;//数字刚体皮肤容器
    private moveNum:number=0;//数字刚体可移动次数
    private ballNum:number=0;//发球数量
    private minBodyCount:number=1;//数字刚体的最少数值
    protected render():void
    {
        super.render();
       // trace("v1.1");
        GameData.stageHeight=this.stageHeight;
        GameData.stageWidth=this.stageWidth;
        SoundControl.getIns().addItem(MUSIC_HIT);
        SoundControl.getIns().addItem(MUSIC_ADDNUM);
        SoundControl.getIns().addItem(MUSIC_FIRE);
        SoundControl.getIns().addItem(MUSIC_FLOOR);
        SoundControl.getIns().addItem(MUSIC_BG,true);
        SoundControl.getIns().play(MUSIC_BG,0,9999);

        this.createImageBg("bg_jpg");
        var world:P2World=new P2World(0,200);
        var walls:any[]=world.createWall(new egret.Rectangle(0,0,GameData.stageWidth,GameData.stageHeight));
       
        this.addChild(world);
        this.world=world;
        world.loopBackFun=this.loopP2World.bind(this);

        for(var i:number=0;i<walls.length;i++){
            var body:p2.Body=walls[i];
            body.userData["floor"]=true;
            this.setAndBallHit(body);
        }

        this.material = new p2.Material();

        for(var i:number=1;i<=3;i++){
            var name1:string="rect"+i+"_png";
            var name2:string="circle"+i+"_png";
            this.names.push(name1,name2,name1,name2);
        }
        this.names.push(ICON_ADD);
        //  for(var i:number=1;i<=30;i++){
        //      this.names.push("rect1_png");
        //  }
        //var ball=this.createBall();
        //ball.position=[300,100];

        
        //创建左右刚体
        var left=this.createBody("left_png");
        var right=this.createBody("right_png");
        left.userData["pipe"]=true;
        right.userData["pipe"]=true;
        var pipeHight:number=left.userData.skin.height/2;
        var pipeY:number=this.setBottom(pipeHight,100);
        left.position=[25,pipeY];
        right.position=[this.getRight(25),pipeY];
        //this.setMaterial(ball,left);
        //this.setMaterial(ball,right);

        //创建顶部刚体
        // var top1=this.createBody("top2_png");
        // var top2=this.createBody("top1_png");
        // var top3=this.createBody("top2_png");
        // top1.position[1]=top2.position[1]=top3.position[1]=-100;
        // top1.position[0]=88;
        // top2.position[0]=319;
        // top3.position[0]=549;
         var top=this.createBody("topLine_png");
         top.position=[GameData.stageWidth>>1,0];


        //创建炮
        var gun:Gun=new Gun;
        gun.addEvent(EVENT_FIRE,this.onFire,this)
        this.addChild(gun);
        this.gun=gun;
        gun.x=this.getCenterX(0);
        gun.y=100;
        
         
        this.createBottom();

        this.container=new Sprite;
        this.addChild(this.container);
        var conMask:Sprite=moon.MoonUI.getRect(GameData.stageWidth,GameData.stageHeight-200,0,0,160);
        this.container.mask=conMask;
        
        var controlGun:control.ControlBasic=new control.ControlBasic(this.stage);
        //controlGun.open();
        controlGun.startBackFun=this.startBackFun.bind(this);
        controlGun.moveBackFun=this.controlMove.bind(this);
        controlGun.endBackFun=this.endBackFun.bind(this);
        this.controlGun=controlGun;

        world.p2World.on("beginContact",this.onHitBegin.bind(this));
        //world.p2World.on("impact",this.onHitImpact.bind(this));
        //world.p2World.on("postStep",this.onHitImpact.bind(this));

        this.txtScore=this.createText(50,50);
        //this.txtScore.textColor=0;
        this.txtLevel=this.createText(200,-200);
        //this.initGame();

        //this.play();

       // this.updateNumBody();

       //this.testZero()

    }
    protected testZero():void
    {
        for(var i:number=0;i<6;i++){
            var body1=this.createBody("rect1_png");
            body1.userData["num"]=true;
            var skin:NumImage=body1.userData.skin;
            skin.initNum(100);
            body1.angle=45;
            body1.position=[100+i*100,500]
        }

        var ball=this.createBall();
        ball.mass=100;
        ball.position=[240,400];
    }
    protected initView():void
    {
        //需要复写
    }
    public initGame():void
    {
        this.score=0;
        this.level=0;
        this.ballNum=0;
        this.moveNum=0;
        this.gun.restart();
        this.updateScore();
        this.controlGun.open(); 
    }
    /**复活 */
    public revive():void
    {
        this.moveNum=0;
        this.ballNum=0;
        this.play();
        this.controlGun.open();
    }
    protected setBottom(height:number,distance:number):number
    {
        return GameData.stageHeight-height-distance;
    }
    protected moveNumBody():void
    {
        var bodys=this.world.p2World.bodies;
        var l: number = bodys.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            if(body.userData&&body.userData.skin){
                if(body.userData["num"]){
                    body.position[1]-=10;
                    if(body.position[1]<=OVER_DIS){
                        if(body.userData.skin.imageName!=ICON_ADD){
                            this.over();
                            return;
                        }
                    }
                }
            }
        }
        if(this.moveNum<7){
            this.moveNum++
            setTimeout(this.moveNumBody.bind(this),50);
        }else{
            this.moveNum=0;
            this.controlGun.open();
        }
    }
    protected over():void
    {
        super.over();
        this.controlGun.close();
        var bodys=this.world.p2World.bodies;
        for(var i:number=0;i<bodys.length;i++){
            var body:p2.Body=bodys[i];
            if(body.userData&&body.userData.skin){
                if(body.userData["num"]){
                    var skin:MImage=body.userData.skin;
                    this.world.removeBodys.push(body);
                    skin.removeFromParent(true);
                }
            }
        }
    }
    protected updateNumBody():void
    {
        var c:number=0;
        for(var i:number=0;i<5;i++){
            if(Math.random()<0.7){
                c++;
                var xNum:number=5;
                var dis:number=100;
                var body:p2.Body=this.createNumBody();
                //body.position=[80*i,300+10*i];
                var x=120+Math.floor(i%xNum)*dis
                var y=1000+Math.floor(i/xNum)*dis;
                body.position=[x,y];
                body.angle=(-Math.random()*Math.PI/4)+(Math.random()*Math.PI/4);
                body.userData["num"]=true;
                var skin:NumImage=body.userData.skin;
                var num:number=Math.ceil(Math.random()*(this.level+5));
                num=num+this.minBodyCount+this.level;
                skin.initNum(num);
                this.container.addChild(skin);
                //this.setMaterial(ball,body);
            }
        }
        console.log("numbody的随机个数="+c);
        if(c==0){
            this.updateNumBody();
        }else{
            this.moveNumBody();
        }
    }
    protected onHitImpact(evt):void{
        var ball:p2.Body;
        if(evt.bodyA.userData&&evt.bodyB.userData){
            if(evt.bodyA.userData["ball"]) ball=evt.bodyA;
            if(evt.bodyB.userData["ball"]) ball=evt.bodyB;
            //与数字刚体
            if(evt.bodyA.userData["ball"]&&evt.bodyB.userData["num"]||evt.bodyB.userData["ball"]&&evt.bodyA.userData["num"]){
                var vec=new Point(ball.velocity[0],ball.velocity[1]);
                var vecnum:number=Math.sqrt(vec.x*vec.x+vec.y*vec.y);
                console.log(vecnum);
                if(vecnum<50){
                    this.setBallImpulse(ball);
                }
            }
        }
    }
    protected onHitBegin(evt):void{
        var ball:p2.Body;
        if(evt.bodyA.userData["ball"]) ball=evt.bodyA;
        if(evt.bodyB.userData["ball"]) ball=evt.bodyB;
        if(ball&&ball.mass==0){
            ball.userData["setImpulse"]=true;//可以设置给小球冲量
            ball.mass=200;
        }
        //与两边水管碰撞
        if(evt.bodyA.userData["ball"]&&evt.bodyB.userData["pipe"]||evt.bodyB.userData["ball"]&&evt.bodyA.userData["pipe"]){
            if( ball.userData["setImpulse"]){
                ball.applyImpulse([this.vec.x*2,0],[0,0]);
                ball.userData["setImpulse"]=false;
            }
        }else{//与其它碰撞
            if(ball&&ball.userData["setImpulse"]){
                ball.applyImpulse([this.vec.x*2,this.vec.y],[0,0]);
                ball.userData["setImpulse"]=false;
            }
            var numBody:p2.Body;
            if(evt.bodyA.userData["num"]) numBody=evt.bodyA;
            if(evt.bodyB.userData["num"]) numBody=evt.bodyB;
            if(numBody){
                this.score++;
                this.updateScore();
                var skin:NumImage=numBody.userData.skin;
                Tween.get(skin).to({y:skin.y+2},100).to({y:skin.y-2},100)
                skin.update();
                if(skin.value==0){
                    if(skin.imageName==ICON_ADD){
                        this.gun.bulletMax++;
                        this.ballNum++;
                        this.createNewBall(ball);
                    }
                    this.world.removeBodys.push(numBody);
                    skin.removeFromParent(true);
                }else{
                    var vec=new Point(ball.velocity[0],ball.velocity[1]);
                    var vecnum:number=Math.sqrt(vec.x*vec.x+vec.y*vec.y);
                    console.log(vecnum);
                    if(vecnum<200){
                       this.setBallImpulse(ball);
                    }
                }
                
            }
        }
        //与地板碰撞
        if(evt.bodyA.userData["ball"]&&evt.bodyB.userData["floor"]||evt.bodyB.userData["ball"]&&evt.bodyA.userData["floor"]){
             //ball.userData["remove"]=true;
             this.removeSkins.push(ball.userData.skin);
             this.world.removeBodys.push(ball);
        }
    }
    protected setBallImpulse(ball:p2.Body):void
    {
         var x=Math.random()>0.5?-5000:5000;
         var y=-5000-(Math.random()*2000);
         ball.applyImpulse([x,y],[0,0]);
    }
    protected updateScore():void
    {
        this.txtScore.text="分数:"+this.score;
        if(this.score%50==0){
            this.level++;
        }
    }
    protected startBackFun(pos:egret.Point):void {
        this.gun.showLine();
        this.controlGun.close();
        this.controlMove(pos);
    }
    protected controlMove(posMove:egret.Point):void {
        var pos=new egret.Point(posMove.x-this.gun.x,posMove.y-this.gun.y);
        //traceSimple(pos.x,pos.y);
        this.gun.updatePos(pos);
    }
    protected endBackFun(posEnd:egret.Point):void {
       
        var pos=new egret.Point(posEnd.x-this.gun.x,posEnd.y-this.gun.y);
        var angle:number=Math.atan2(pos.x,pos.y)
        var dis:number=10000;
        var x:number=Math.ceil(Math.sin(angle)*dis);
        var y:number=Math.ceil(Math.cos(angle)*dis);
        this.vec=new egret.Point(x,y);
       // ball.velocity=[x,y]
        this.ballNum=this.gun.bulletMax;
        this.gun.hideLine();
        this.gun.fire();

        
    }
    /**开火 */
    private onFire(e:MoonEvent):void
    {
        var ball=this.createBall();
        ball.position=[this.gun.x,this.gun.y];
        this.doMaterial(ball);
        ball.applyImpulse([this.vec.x,this.vec.y],[0,0]);
        this.setChildIndex(this.gun,this.numChildren-1);
    }
    /**与加碰撞产生新球 */
    private createNewBall(ball:p2.Body):void
    {
        var newBall=this.createBall();
        newBall.position=[ball.position[0],ball.position[1]];
        newBall.mass=100;
        this.setBallImpulse(newBall);
    }
    /** 距离右边的距离*/
    private getRight(distance:number):number
    {
        return GameData.stageWidth-distance;
    }
    /** 距离右边的距离*/
    private getBottom(distance:number):number
    {
        return GameData.stageHeight-distance;
    }
    /** 传入宽后居中距离*/
    private getCenterX(skinWidth:number):number
    {
        return (GameData.stageWidth-skinWidth)>>1;
    }
    /**设置与球的碰撞弹性 */
    private doMaterial(ball:p2.Body):void
    {
        var world:P2World=this.world;
        var bodys=world.p2World.bodies;
        var l: number = bodys.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            if(body.userData["hit"]){
                this.setMaterial(ball,body);
            }
        }
    }
    /** 设置刚体碰撞的弹性*/
    private setMaterial(body1:p2.Body,body2:p2.Body):void
    {
        var material:p2.Material=this.material;
        body1.shapes[0].material=material;
        body2.shapes[0].material=material;
        var roleAndStoneMaterial = new p2.ContactMaterial(material, material, {restitution:0.7,friction:0});//弹性，摩擦力
        this.world.p2World.addContactMaterial(roleAndStoneMaterial);
    }
    /** 创建底座三角形刚体*/
    private createBottom():void
    {
        var world:P2World=this.world;
        var h:number=59,w:number=520;//三角形高与宽
        var bottom=world.createConvexBodyShape([[0,h], [w/2,0], [w,h]]);
        // var skin:MImage=this.createSkin("bottom_png");
        // bottom.userData.skin=skin;
        //world.drawSkin(bottom);
        bottom.position=[this.getCenterX(0),this.getBottom(h/2)+10];
        bottom.type=p2.Body.KINEMATIC;
        this.setAndBallHit(bottom);

        var skin:MImage=this.createSkin("bottom_png");
        skin.x=this.getCenterX(0)-5;
        skin.y=this.getBottom(h/2);
        
        this.addChild(skin);
    }
    /**设置属性后就可以与球碰撞 */
    private setAndBallHit(body:p2.Body):void
    {
        var shape=body.shapes[0];
        shape.collisionMask=6;//010与001为0，010与110为1
    }
    /** 创建球刚体*/
    private createBall():p2.Body
    {
        var world:P2World=this.world;
        var skin:MImage=this.createSkin("ball_png");
        var body:p2.Body=world.createCircleBodyShape(skin.width>>1);
        body.userData.skin=skin;
        body.userData["ball"]=true;
        body.mass=0;//质量设置为0，就可以按规定方向发射，等发生碰撞之后再给球质量
        //body.gravityScale=0;
        var shape=body.shapes[0];
        shape.collisionGroup=2;//010与001为0，010与110为1
       // shape.collisionMask=2;
       //trace(shape.collisionGroup,shape.collisionMask)
        return body;
    }
    /** 创建刚体*/
    private createBody(name:string,shapeType:string=SHAPE.rect,type:number=p2.Body.KINEMATIC):p2.Body
    {
        var world:P2World=this.world;
        var skin:MImage=this.createSkin(name);
        var body:p2.Body;
        if(shapeType==SHAPE.rect)           body=world.createBoxBodyShape(skin.width,skin.height,type);
        else if(shapeType==SHAPE.circle)    body=world.createCircleBodyShape(skin.width>>1,type);
        body.userData.skin=skin;
        body.userData["hit"]=true;
        this.setAndBallHit(body);
        return body;
    }
    /** 创建带数字刚体*/
    private createNumBody():p2.Body
    {
        var names:string[]=this.names;
        var name:string=names[Math.floor(Math.random()*names.length)];
         if(this.gun.bulletMax<5){//子弹小于5个时增加子弹的概率
            if(Math.random()<0.2) name=ICON_ADD;
         }else if(this.gun.bulletMax>20){//子弹大于20后减少增加子弹的概率
            if(name==ICON_ADD&&Math.random()<0.8) name="circle1_png";
        }
        var shape=name.split("rect").length==2?SHAPE.rect:SHAPE.circle;
        var body=this.createBody(name,shape);
        return body;
    }
    /** 创建皮肤*/
    private createSkin(name:string):MImage
    {
        var skin:NumImage=new NumImage(name);
        skin.x=-500;//避免在一出现的时候会在左上角闪现
        skin.setAnchorCenter();
        this.addChild(skin);
        return skin;
    }

    protected loopP2World():void
    {
        var bodys=this.world.p2World.bodies;
        //traceSimple("bodys",bodys.length);
         var l: number = bodys.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            if(body.userData&&body.userData.skin){
                if(body.userData["ball"]){
                    var vec=new Point(body.velocity[0],body.velocity[1]);
                    var vecnum:number=Math.sqrt(vec.x*vec.x+vec.y*vec.y);
                    if(vecnum<1){
                        console.log(vecnum);
                        this.setBallImpulse(body);
                    }
                }
            }
        }
    }
    protected loop(n:number):boolean
    {
        var skins:any[]=this.removeSkins;
       // traceSimple(skins.length)
        for (var i: number = 0; i < skins.length; i++) {
            var skin:NumImage = skins[i];
            skin.y-=20;
            if(skin.x>GameData.stageWidth/2){
                skin.x=GameData.stageWidth-skin.width;
            }else{
                skin.x=skin.width;
            }
            if(skin.parent&&skin.y<0){
                this.ballNum--;
                skin.removeFromParent(true);

            }
        }
        if(this.ballNum==0){
            this.nextLevel();
        }
        return true;
    }
    private nextLevel():void{
        this.ballNum=this.gun.bulletMax;
        this.removeSkins.length=0;
        this.updateNumBody();
        this.gun.initNum();
    }
}
/**分数图标*/
class NumImage extends MImage{
    private _value:number=-1;
    private txt:TextField;
    public constructor(skinName:string="")
    {
        super(skinName);
    }
    public initNum(v:number):void
    {
        this.txt=this.createText(0,0);
        if(this.skinName==ICON_ADD){
            this._value=1;
        }else{
            this.value=v;
        }
    }
    protected createText(x:number=0,y:number=0,s:string=""):TextField
    {
        var text:TextField=(new moon.Label).textField;
        text.x=x;text.y=y;text.text=s;
        this.addChild(text);
        return text;
    }
    set value(v:number){
        this._value=v;
        this.txt.text=String(v);
        this.txt.textColor=0;
        if(this.parent!=null){
            Layout.getIns().setCenterXByPanent(this.txt);
            Layout.getIns().setCenterYByPanent(this.txt);
        }
    }
    get value():number{
        return this._value;
    }
    public get imageName():string
    {
        return this.skinName;
    }
    public update():void
    {
        this._value--;
        this.value=this._value;
        if(this.imageName==ICON_ADD){
            SoundControl.getIns().play(MUSIC_ADDNUM);
        }else{
            SoundControl.getIns().play(MUSIC_HIT);
        }
    }
}
/**枪*/
class Gun extends moon.BasicView{
    private gun:MImage;
    private txtNum:TextField;
    private line:MImage;
    public bulletMax:number=1;
    private bullet:number;
    protected render():void
    {
        var gun=new MImage("gun_png");
        gun.anchorOffsetX=gun.width>>1;
        this.addChild(gun);
        this.gun=gun;
       
        var numBg:MImage=new MImage("numBg_png");
        numBg.setAnchorCenter();
        this.addChild(numBg);

        var line:MImage=new MImage("line_png");
        line.anchorOffsetX=line.width>>1;
        this.line=line;

        this.txtNum=this.createText(0,0,"");
        this.bullet=this.bulletMax;
        this.updateNum(this.bullet)
    }
    public restart():void
    {
        this.bulletMax=1;
        this.initNum();
    }
    public updatePos(pos:egret.Point):void
    {
        var r:number=-Math.atan2(pos.x,pos.y)*180/Math.PI;
        this.gun.rotation=r;
        this.line.rotation=r;
    }
    public initNum():void
    {
        this.bullet=this.bulletMax;
        this.updateNum(this.bullet)
    }
    public showLine():void
    {
        this.addChildAt(this.line,0);
    }
    public hideLine():void
    {
        this.line.removeFromParent();
    }
    public updateNum(value:number):void
    {
        this.txtNum.text=String(value);
        this.txtNum.anchorOffsetX=this.txtNum.width>>1;
        this.txtNum.anchorOffsetY=this.txtNum.height>>1;
    }
    public fire():void
    {
        if(this.bullet>0){
            this.updateNum(--this.bullet);
            Tween.get(this.gun).to({scaleY:0.6},100).to({scaleY:1},100);
            this.dispEvent(EVENT_FIRE);
            setTimeout(this.fire.bind(this),300);
            SoundControl.getIns().play(MUSIC_FIRE);
        }
    }
}