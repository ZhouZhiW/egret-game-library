class GameScene extends egret.DisplayObjectContainer{

	private stageW:number;
	private stageH:number;
	private factor:number = 30;     	//转换单位，一个物理单位为30个像素
	private debugDraw:p2DebugDraw;
	private debugSprite:egret.Sprite;
	private ballOnPaddle:boolean;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	private onAddToStage(e:egret.Event):void{
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		this.createBg();
		this.createWorld();
		this.createPaddle();
		this.createBall();
		this.createBrick();
		this.createMaterial();
		this.createDebugDraw();

		this.hitListener();

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.beginMovePaddle,this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.movePaddle,this);
		this.addEventListener(egret.Event.ENTER_FRAME,this.viewUpdate,this);
	}
	//生成背景
	private createBg():void{
		var bgShape:egret.Shape = new egret.Shape();
		bgShape.graphics.beginFill(0x457342);
		bgShape.graphics.drawRect(0,0,this.stageW,this.stageH);
		bgShape.graphics.endFill();
		this.addChild(bgShape);
	}
	//生成物理世界和上、左、右三面墙体
	private world:p2.World;
	private wallTopShape:p2.Box;
	private wallLeftShape:p2.Box;
	private wallRightShape:p2.Box;
	private createWorld():void{
		var wd:p2.World = new p2.World({gravity:[0,0]});
		this.world = wd;

		var wallTopShape:p2.Box = new p2.Box({width:this.stageW/this.factor,height:10/this.factor});
		var wallTopBody:p2.Body = new p2.Body({position:[this.stageW/2/this.factor,0],mass:1});
		wallTopBody.type = p2.Body.STATIC;
		wallTopBody.addShape(wallTopShape);
		this.world.addBody(wallTopBody);
		this.wallTopShape = wallTopShape;

		var wallLeftShape:p2.Box = new p2.Box({width:10/this.factor,height:this.stageH/this.factor});
		var wallLeftBody:p2.Body = new p2.Body({position:[0,this.stageH/2/this.factor],mass:1});
		wallLeftBody.type = p2.Body.STATIC;
		wallLeftBody.addShape(wallLeftShape);
		this.world.addBody(wallLeftBody);
		this.wallLeftShape = wallLeftShape;

		var wallRightShape:p2.Box = new p2.Box({width:10/this.factor,height:this.stageH/this.factor});
		var wallRightBody:p2.Body = new p2.Body({position:[this.stageW/this.factor,this.stageH/2/this.factor],mass:1});
		wallRightBody.type = p2.Body.STATIC;
		wallRightBody.addShape(wallRightShape);
		this.world.addBody(wallRightBody);
		this.wallRightShape = wallRightShape;

	}
	//生成接球板
	private paddle:egret.Bitmap;
	private paddleShape:p2.Box;
	private paddleBody:p2.Body;
	private createPaddle():void{
		var paddleImp:egret.Bitmap = new egret.Bitmap(RES.getRes("paddle_png"));
		var paddleW:number = paddleImp.width;
		var paddleH:number = paddleImp.height;
		this.addChild(paddleImp);

		var paddleShape:p2.Box = new p2.Box({width:paddleW/this.factor,height:paddleH/this.factor});
		var paddleBody:p2.Body = new p2.Body({position:[this.stageW/2/this.factor,(this.stageH-30)/this.factor],mass:1});
		//paddleBody.damping = 10;         //运动阻尼为0
		paddleBody.type = p2.Body.STATIC;
		paddleBody.addShape(paddleShape);
		this.world.addBody(paddleBody);

		this.paddle = paddleImp;
		this.paddleShape = paddleShape;
		this.paddleBody = paddleBody;
	}
	//生成小球
	private ball:egret.Bitmap;
	private ballShape:p2.Circle;
	private ballBody:p2.Body;
	private createBall():void{
		var ballImp:egret.Bitmap = new egret.Bitmap(RES.getRes("ball_png"));
		var ballW:number = ballImp.width;
		var ballH:number = ballImp.height;
		var ballR:number = ballImp.width/2;
		this.addChild(ballImp);

		var ballShape:p2.Circle = new p2.Circle({radius:ballR/this.factor});
		var ballBody:p2.Body = new p2.Body({position:[this.stageW/2/this.factor,this.paddleBody.position[1]-14/this.factor],mass:1});
		ballBody.damping = 0;
		ballBody.type = p2.Body.DYNAMIC;

		ballBody.addShape(ballShape);
		this.world.addBody(ballBody);
		//小球初始状态（在接球板上）
		this.ballOnPaddle = true;

		this.ball = ballImp;
		this.ballShape = ballShape;
		this.ballBody = ballBody;
	}
	//生成砖块
	private bricks:egret.Bitmap[] = [];
	private bricksShape:p2.Box[] = [];
	private bricksBody:p2.Body[] = [];
	private createBrick():void{
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 15; x++) {
				var brick:egret.Bitmap = new egret.Bitmap(RES.getRes("brick"+y+"_png"));
				var brickW:number = brick.width;
				var brickH:number = brick.height;

				var brickShape:p2.Box = new p2.Box({width:brickW/this.factor,height:brickH/this.factor});
				var brickBody:p2.Body = new p2.Body({position:[(180+42*x)/this.factor,(100+80*y)/this.factor]});
				brickBody.type = p2.Body.STATIC;

				brickBody.addShape(brickShape);
				this.world.addBody(brickBody);

				this.addChild(brick);
				brick.x = brickBody.position[0]*this.factor - brickW/2;
				brick.y = brickBody.position[1]*this.factor - brickH/2;

				this.bricks.push(brick);
				this.bricksShape.push(brickShape);
				this.bricksBody.push(brickBody);
			}
		}
	}
	//改变小球、接球板、砖块的物理材质
	private createMaterial():void{
		var PaddleMaterial:p2.Material = new p2.Material();
     	var BallMaterial:p2.Material = new p2.Material();
    	var BallCollidePaddle:p2.ContactMaterial = new p2.ContactMaterial(PaddleMaterial,BallMaterial);
		BallCollidePaddle.restitution = 1;    //弹性系数
		BallCollidePaddle.friction = 0;        //摩擦系数

		this.paddleShape.material = PaddleMaterial;
		this.wallTopShape.material = PaddleMaterial;
		this.wallLeftShape.material = PaddleMaterial;
		this.wallRightShape.material = PaddleMaterial;
		this.ballShape.material = BallMaterial;

		for (var i = 0; i < this.bricksShape.length; i++) {
			var brickShape:p2.Box = this.bricksShape[i];
			brickShape.material = PaddleMaterial;
		}

		this.world.addContactMaterial(BallCollidePaddle);
	}
	//P2调试
	private createDebugDraw():void{
		this.debugSprite = new egret.Sprite();
		this.addChild(this.debugSprite);
		this.debugDraw = new p2DebugDraw(this.world,this.debugSprite);
	}

	private lastX:number;
	private beginMovePaddle(e:egret.TouchEvent):void{
		this.lastX = e.stageX;
	}

	private movePaddle(e:egret.TouchEvent):void{
		var moveX:number = e.stageX - this.lastX;
		this.paddleBody.position[0] += moveX/this.factor;
		this.lastX = e.stageX;
	}

	private startGame(e:egret.TouchEvent):void{
		//this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
		if (this.ballOnPaddle) {
			var randomX:number = Math.floor(Math.random()*5 +5);
	    	this.ballBody.velocity = [randomX,-15];
		
	    	this.ballOnPaddle = false;
		}
	}
	//碰撞检测
	private hitListener():void{
		var _this = this;
		this.world.on("endContact",function(e:any){
			for (var i = 0; i < _this.bricksBody.length; i++) {
				var brickBody:p2.Body = _this.bricksBody[i];
				if (e.bodyA===brickBody || e.bodyB===brickBody) {
					_this.world.removeBody(brickBody);
					_this.removeChild(_this.bricks[i]);
				}else if (e.bodyA===_this.paddleBody || e.bodyB===_this.paddleBody) {
					if (_this.ballBody.position[0]>_this.paddleBody.position[0]) {
						_this.ballBody.velocity = [Math.floor(Math.random()*5+5),-15];
					}else{
						_this.ballBody.velocity = [-Math.floor(Math.random()*5+5),-15];
					}
				}
			}
		});
	}

	private viewUpdate(e:egret.Event):void{

		this.world.step(1/60);

		//this.debugDraw.drawDebug();
		
		//保证小球Y轴速度
		if (this.ballBody.velocity[2]>-13) {
			this.ballBody.velocity[2] = -15;
		}

		if (this.ballOnPaddle) {
			this.ballBody.position[0] = this.paddleBody.position[0];
		}

		/*---小球出界后将其复位
		if (this.ballBody.position[1] > this.stageH/this.factor) {
			this.ballBody.position[1] = this.paddleBody.position[1]-14/this.factor;
			this.ballBody.velocity = [0,0];
			this.ballOnPaddle = true;
		}
		---*/

		this.paddle.x = this.paddleBody.position[0]*this.factor - this.paddle.width/2;
		this.paddle.y = this.paddleBody.position[1]*this.factor - this.paddle.height/2;

		this.ball.x = this.ballBody.position[0]*this.factor - this.ball.width/2;
		this.ball.y = this.ballBody.position[1]*this.factor - this.ball.width/2;

	}
}