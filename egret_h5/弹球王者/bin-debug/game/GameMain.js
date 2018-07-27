var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MUSIC_CLICK_BTN = "click_mp3";
var MUSIC_HIT = "hit_mp3";
var MUSIC_ADDNUM = "addNum_mp3";
var MUSIC_FIRE = "fire_mp3";
var MUSIC_FLOOR = "floor_mp3";
var MUSIC_BG = "background_mp3";
var EVENT_FIRE = "event fire";
var EVENT_REMOVE = "event remove";
var TYPE_HAND = "type hand";
var ICON_ADD = "addIcon_png";
var SHAPE = { rect: "rect", circle: "circle" }; //形状
var OVER_DIS = 200;
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.names = []; //数字刚体皮肤名字
        _this.removeSkins = []; //需要删除刚体的皮肤
        _this.moveNum = 0; //数字刚体可移动次数
        _this.ballNum = 0; //发球数量
        _this.minBodyCount = 1; //数字刚体的最少数值
        return _this;
    }
    GameControl.prototype.render = function () {
        _super.prototype.render.call(this);
        // trace("v1.1");
        GameData.stageHeight = this.stageHeight;
        GameData.stageWidth = this.stageWidth;
        SoundControl.getIns().addItem(MUSIC_HIT);
        SoundControl.getIns().addItem(MUSIC_ADDNUM);
        SoundControl.getIns().addItem(MUSIC_FIRE);
        SoundControl.getIns().addItem(MUSIC_FLOOR);
        SoundControl.getIns().addItem(MUSIC_BG, true);
        SoundControl.getIns().play(MUSIC_BG, 0, 9999);
        this.createImageBg("bg_jpg");
        var world = new P2World(0, 200);
        var walls = world.createWall(new egret.Rectangle(0, 0, GameData.stageWidth, GameData.stageHeight));
        this.addChild(world);
        this.world = world;
        world.loopBackFun = this.loopP2World.bind(this);
        for (var i = 0; i < walls.length; i++) {
            var body = walls[i];
            body.userData["floor"] = true;
            this.setAndBallHit(body);
        }
        this.material = new p2.Material();
        for (var i = 1; i <= 3; i++) {
            var name1 = "rect" + i + "_png";
            var name2 = "circle" + i + "_png";
            this.names.push(name1, name2, name1, name2);
        }
        this.names.push(ICON_ADD);
        //  for(var i:number=1;i<=30;i++){
        //      this.names.push("rect1_png");
        //  }
        //var ball=this.createBall();
        //ball.position=[300,100];
        //创建左右刚体
        var left = this.createBody("left_png");
        var right = this.createBody("right_png");
        left.userData["pipe"] = true;
        right.userData["pipe"] = true;
        var pipeHight = left.userData.skin.height / 2;
        var pipeY = this.setBottom(pipeHight, 100);
        left.position = [25, pipeY];
        right.position = [this.getRight(25), pipeY];
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
        var top = this.createBody("topLine_png");
        top.position = [GameData.stageWidth >> 1, 0];
        //创建炮
        var gun = new Gun;
        gun.addEvent(EVENT_FIRE, this.onFire, this);
        this.addChild(gun);
        this.gun = gun;
        gun.x = this.getCenterX(0);
        gun.y = 100;
        this.createBottom();
        this.container = new Sprite;
        this.addChild(this.container);
        var conMask = moon.MoonUI.getRect(GameData.stageWidth, GameData.stageHeight - 200, 0, 0, 160);
        this.container.mask = conMask;
        var controlGun = new control.ControlBasic(this.stage);
        //controlGun.open();
        controlGun.startBackFun = this.startBackFun.bind(this);
        controlGun.moveBackFun = this.controlMove.bind(this);
        controlGun.endBackFun = this.endBackFun.bind(this);
        this.controlGun = controlGun;
        world.p2World.on("beginContact", this.onHitBegin.bind(this));
        //world.p2World.on("impact",this.onHitImpact.bind(this));
        //world.p2World.on("postStep",this.onHitImpact.bind(this));
        this.txtScore = this.createText(50, 50);
        //this.txtScore.textColor=0;
        this.txtLevel = this.createText(200, -200);
        //this.initGame();
        //this.play();
        // this.updateNumBody();
        //this.testZero()
    };
    GameControl.prototype.testZero = function () {
        for (var i = 0; i < 6; i++) {
            var body1 = this.createBody("rect1_png");
            body1.userData["num"] = true;
            var skin = body1.userData.skin;
            skin.initNum(100);
            body1.angle = 45;
            body1.position = [100 + i * 100, 500];
        }
        var ball = this.createBall();
        ball.mass = 100;
        ball.position = [240, 400];
    };
    GameControl.prototype.initView = function () {
        //需要复写
    };
    GameControl.prototype.initGame = function () {
        this.score = 0;
        this.level = 0;
        this.ballNum = 0;
        this.moveNum = 0;
        this.gun.restart();
        this.updateScore();
        this.controlGun.open();
    };
    /**复活 */
    GameControl.prototype.revive = function () {
        this.moveNum = 0;
        this.ballNum = 0;
        this.play();
        this.controlGun.open();
    };
    GameControl.prototype.setBottom = function (height, distance) {
        return GameData.stageHeight - height - distance;
    };
    GameControl.prototype.moveNumBody = function () {
        var bodys = this.world.p2World.bodies;
        var l = bodys.length;
        for (var i = 0; i < l; i++) {
            var body = bodys[i];
            if (body.userData && body.userData.skin) {
                if (body.userData["num"]) {
                    body.position[1] -= 10;
                    if (body.position[1] <= OVER_DIS) {
                        if (body.userData.skin.imageName != ICON_ADD) {
                            this.over();
                            return;
                        }
                    }
                }
            }
        }
        if (this.moveNum < 7) {
            this.moveNum++;
            setTimeout(this.moveNumBody.bind(this), 50);
        }
        else {
            this.moveNum = 0;
            this.controlGun.open();
        }
    };
    GameControl.prototype.over = function () {
        _super.prototype.over.call(this);
        this.controlGun.close();
        var bodys = this.world.p2World.bodies;
        for (var i = 0; i < bodys.length; i++) {
            var body = bodys[i];
            if (body.userData && body.userData.skin) {
                if (body.userData["num"]) {
                    var skin = body.userData.skin;
                    this.world.removeBodys.push(body);
                    skin.removeFromParent(true);
                }
            }
        }
    };
    GameControl.prototype.updateNumBody = function () {
        var c = 0;
        for (var i = 0; i < 5; i++) {
            if (Math.random() < 0.7) {
                c++;
                var xNum = 5;
                var dis = 100;
                var body = this.createNumBody();
                //body.position=[80*i,300+10*i];
                var x = 120 + Math.floor(i % xNum) * dis;
                var y = 1000 + Math.floor(i / xNum) * dis;
                body.position = [x, y];
                body.angle = (-Math.random() * Math.PI / 4) + (Math.random() * Math.PI / 4);
                body.userData["num"] = true;
                var skin = body.userData.skin;
                var num = Math.ceil(Math.random() * (this.level + 5));
                num = num + this.minBodyCount + this.level;
                skin.initNum(num);
                this.container.addChild(skin);
                //this.setMaterial(ball,body);
            }
        }
        console.log("numbody的随机个数=" + c);
        if (c == 0) {
            this.updateNumBody();
        }
        else {
            this.moveNumBody();
        }
    };
    GameControl.prototype.onHitImpact = function (evt) {
        var ball;
        if (evt.bodyA.userData && evt.bodyB.userData) {
            if (evt.bodyA.userData["ball"])
                ball = evt.bodyA;
            if (evt.bodyB.userData["ball"])
                ball = evt.bodyB;
            //与数字刚体
            if (evt.bodyA.userData["ball"] && evt.bodyB.userData["num"] || evt.bodyB.userData["ball"] && evt.bodyA.userData["num"]) {
                var vec = new Point(ball.velocity[0], ball.velocity[1]);
                var vecnum = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
                console.log(vecnum);
                if (vecnum < 50) {
                    this.setBallImpulse(ball);
                }
            }
        }
    };
    GameControl.prototype.onHitBegin = function (evt) {
        var ball;
        if (evt.bodyA.userData["ball"])
            ball = evt.bodyA;
        if (evt.bodyB.userData["ball"])
            ball = evt.bodyB;
        if (ball && ball.mass == 0) {
            ball.userData["setImpulse"] = true; //可以设置给小球冲量
            ball.mass = 200;
        }
        //与两边水管碰撞
        if (evt.bodyA.userData["ball"] && evt.bodyB.userData["pipe"] || evt.bodyB.userData["ball"] && evt.bodyA.userData["pipe"]) {
            if (ball.userData["setImpulse"]) {
                ball.applyImpulse([this.vec.x * 2, 0], [0, 0]);
                ball.userData["setImpulse"] = false;
            }
        }
        else {
            if (ball && ball.userData["setImpulse"]) {
                ball.applyImpulse([this.vec.x * 2, this.vec.y], [0, 0]);
                ball.userData["setImpulse"] = false;
            }
            var numBody;
            if (evt.bodyA.userData["num"])
                numBody = evt.bodyA;
            if (evt.bodyB.userData["num"])
                numBody = evt.bodyB;
            if (numBody) {
                this.score++;
                this.updateScore();
                var skin = numBody.userData.skin;
                Tween.get(skin).to({ y: skin.y + 2 }, 100).to({ y: skin.y - 2 }, 100);
                skin.update();
                if (skin.value == 0) {
                    if (skin.imageName == ICON_ADD) {
                        this.gun.bulletMax++;
                        this.ballNum++;
                        this.createNewBall(ball);
                    }
                    this.world.removeBodys.push(numBody);
                    skin.removeFromParent(true);
                }
                else {
                    var vec = new Point(ball.velocity[0], ball.velocity[1]);
                    var vecnum = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
                    console.log(vecnum);
                    if (vecnum < 200) {
                        this.setBallImpulse(ball);
                    }
                }
            }
        }
        //与地板碰撞
        if (evt.bodyA.userData["ball"] && evt.bodyB.userData["floor"] || evt.bodyB.userData["ball"] && evt.bodyA.userData["floor"]) {
            //ball.userData["remove"]=true;
            this.removeSkins.push(ball.userData.skin);
            this.world.removeBodys.push(ball);
        }
    };
    GameControl.prototype.setBallImpulse = function (ball) {
        var x = Math.random() > 0.5 ? -5000 : 5000;
        var y = -5000 - (Math.random() * 2000);
        ball.applyImpulse([x, y], [0, 0]);
    };
    GameControl.prototype.updateScore = function () {
        this.txtScore.text = "分数:" + this.score;
        if (this.score % 50 == 0) {
            this.level++;
        }
    };
    GameControl.prototype.startBackFun = function (pos) {
        this.gun.showLine();
        this.controlGun.close();
        this.controlMove(pos);
    };
    GameControl.prototype.controlMove = function (posMove) {
        var pos = new egret.Point(posMove.x - this.gun.x, posMove.y - this.gun.y);
        //traceSimple(pos.x,pos.y);
        this.gun.updatePos(pos);
    };
    GameControl.prototype.endBackFun = function (posEnd) {
        var pos = new egret.Point(posEnd.x - this.gun.x, posEnd.y - this.gun.y);
        var angle = Math.atan2(pos.x, pos.y);
        var dis = 10000;
        var x = Math.ceil(Math.sin(angle) * dis);
        var y = Math.ceil(Math.cos(angle) * dis);
        this.vec = new egret.Point(x, y);
        // ball.velocity=[x,y]
        this.ballNum = this.gun.bulletMax;
        this.gun.hideLine();
        this.gun.fire();
    };
    /**开火 */
    GameControl.prototype.onFire = function (e) {
        var ball = this.createBall();
        ball.position = [this.gun.x, this.gun.y];
        this.doMaterial(ball);
        ball.applyImpulse([this.vec.x, this.vec.y], [0, 0]);
        this.setChildIndex(this.gun, this.numChildren - 1);
    };
    /**与加碰撞产生新球 */
    GameControl.prototype.createNewBall = function (ball) {
        var newBall = this.createBall();
        newBall.position = [ball.position[0], ball.position[1]];
        newBall.mass = 100;
        this.setBallImpulse(newBall);
    };
    /** 距离右边的距离*/
    GameControl.prototype.getRight = function (distance) {
        return GameData.stageWidth - distance;
    };
    /** 距离右边的距离*/
    GameControl.prototype.getBottom = function (distance) {
        return GameData.stageHeight - distance;
    };
    /** 传入宽后居中距离*/
    GameControl.prototype.getCenterX = function (skinWidth) {
        return (GameData.stageWidth - skinWidth) >> 1;
    };
    /**设置与球的碰撞弹性 */
    GameControl.prototype.doMaterial = function (ball) {
        var world = this.world;
        var bodys = world.p2World.bodies;
        var l = bodys.length;
        for (var i = 0; i < l; i++) {
            var body = bodys[i];
            if (body.userData["hit"]) {
                this.setMaterial(ball, body);
            }
        }
    };
    /** 设置刚体碰撞的弹性*/
    GameControl.prototype.setMaterial = function (body1, body2) {
        var material = this.material;
        body1.shapes[0].material = material;
        body2.shapes[0].material = material;
        var roleAndStoneMaterial = new p2.ContactMaterial(material, material, { restitution: 0.7, friction: 0 }); //弹性，摩擦力
        this.world.p2World.addContactMaterial(roleAndStoneMaterial);
    };
    /** 创建底座三角形刚体*/
    GameControl.prototype.createBottom = function () {
        var world = this.world;
        var h = 59, w = 520; //三角形高与宽
        var bottom = world.createConvexBodyShape([[0, h], [w / 2, 0], [w, h]]);
        // var skin:MImage=this.createSkin("bottom_png");
        // bottom.userData.skin=skin;
        //world.drawSkin(bottom);
        bottom.position = [this.getCenterX(0), this.getBottom(h / 2) + 10];
        bottom.type = p2.Body.KINEMATIC;
        this.setAndBallHit(bottom);
        var skin = this.createSkin("bottom_png");
        skin.x = this.getCenterX(0) - 5;
        skin.y = this.getBottom(h / 2);
        this.addChild(skin);
    };
    /**设置属性后就可以与球碰撞 */
    GameControl.prototype.setAndBallHit = function (body) {
        var shape = body.shapes[0];
        shape.collisionMask = 6; //010与001为0，010与110为1
    };
    /** 创建球刚体*/
    GameControl.prototype.createBall = function () {
        var world = this.world;
        var skin = this.createSkin("ball_png");
        var body = world.createCircleBodyShape(skin.width >> 1);
        body.userData.skin = skin;
        body.userData["ball"] = true;
        body.mass = 0; //质量设置为0，就可以按规定方向发射，等发生碰撞之后再给球质量
        //body.gravityScale=0;
        var shape = body.shapes[0];
        shape.collisionGroup = 2; //010与001为0，010与110为1
        // shape.collisionMask=2;
        //trace(shape.collisionGroup,shape.collisionMask)
        return body;
    };
    /** 创建刚体*/
    GameControl.prototype.createBody = function (name, shapeType, type) {
        if (shapeType === void 0) { shapeType = SHAPE.rect; }
        if (type === void 0) { type = p2.Body.KINEMATIC; }
        var world = this.world;
        var skin = this.createSkin(name);
        var body;
        if (shapeType == SHAPE.rect)
            body = world.createBoxBodyShape(skin.width, skin.height, type);
        else if (shapeType == SHAPE.circle)
            body = world.createCircleBodyShape(skin.width >> 1, type);
        body.userData.skin = skin;
        body.userData["hit"] = true;
        this.setAndBallHit(body);
        return body;
    };
    /** 创建带数字刚体*/
    GameControl.prototype.createNumBody = function () {
        var names = this.names;
        var name = names[Math.floor(Math.random() * names.length)];
        if (this.gun.bulletMax < 5) {
            if (Math.random() < 0.2)
                name = ICON_ADD;
        }
        else if (this.gun.bulletMax > 20) {
            if (name == ICON_ADD && Math.random() < 0.8)
                name = "circle1_png";
        }
        var shape = name.split("rect").length == 2 ? SHAPE.rect : SHAPE.circle;
        var body = this.createBody(name, shape);
        return body;
    };
    /** 创建皮肤*/
    GameControl.prototype.createSkin = function (name) {
        var skin = new NumImage(name);
        skin.x = -500; //避免在一出现的时候会在左上角闪现
        skin.setAnchorCenter();
        this.addChild(skin);
        return skin;
    };
    GameControl.prototype.loopP2World = function () {
        var bodys = this.world.p2World.bodies;
        //traceSimple("bodys",bodys.length);
        var l = bodys.length;
        for (var i = 0; i < l; i++) {
            var body = bodys[i];
            if (body.userData && body.userData.skin) {
                if (body.userData["ball"]) {
                    var vec = new Point(body.velocity[0], body.velocity[1]);
                    var vecnum = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
                    if (vecnum < 1) {
                        console.log(vecnum);
                        this.setBallImpulse(body);
                    }
                }
            }
        }
    };
    GameControl.prototype.loop = function (n) {
        var skins = this.removeSkins;
        // traceSimple(skins.length)
        for (var i = 0; i < skins.length; i++) {
            var skin = skins[i];
            skin.y -= 20;
            if (skin.x > GameData.stageWidth / 2) {
                skin.x = GameData.stageWidth - skin.width;
            }
            else {
                skin.x = skin.width;
            }
            if (skin.parent && skin.y < 0) {
                this.ballNum--;
                skin.removeFromParent(true);
            }
        }
        if (this.ballNum == 0) {
            this.nextLevel();
        }
        return true;
    };
    GameControl.prototype.nextLevel = function () {
        this.ballNum = this.gun.bulletMax;
        this.removeSkins.length = 0;
        this.updateNumBody();
        this.gun.initNum();
    };
    return GameControl;
}(moon.BasicGamePanel));
__reflect(GameControl.prototype, "GameControl");
/**分数图标*/
var NumImage = (function (_super) {
    __extends(NumImage, _super);
    function NumImage(skinName) {
        if (skinName === void 0) { skinName = ""; }
        var _this = _super.call(this, skinName) || this;
        _this._value = -1;
        return _this;
    }
    NumImage.prototype.initNum = function (v) {
        this.txt = this.createText(0, 0);
        if (this.skinName == ICON_ADD) {
            this._value = 1;
        }
        else {
            this.value = v;
        }
    };
    NumImage.prototype.createText = function (x, y, s) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (s === void 0) { s = ""; }
        var text = (new moon.Label).textField;
        text.x = x;
        text.y = y;
        text.text = s;
        this.addChild(text);
        return text;
    };
    Object.defineProperty(NumImage.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
            this.txt.text = String(v);
            this.txt.textColor = 0;
            if (this.parent != null) {
                Layout.getIns().setCenterXByPanent(this.txt);
                Layout.getIns().setCenterYByPanent(this.txt);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumImage.prototype, "imageName", {
        get: function () {
            return this.skinName;
        },
        enumerable: true,
        configurable: true
    });
    NumImage.prototype.update = function () {
        this._value--;
        this.value = this._value;
        if (this.imageName == ICON_ADD) {
            SoundControl.getIns().play(MUSIC_ADDNUM);
        }
        else {
            SoundControl.getIns().play(MUSIC_HIT);
        }
    };
    return NumImage;
}(MImage));
__reflect(NumImage.prototype, "NumImage");
/**枪*/
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletMax = 1;
        return _this;
    }
    Gun.prototype.render = function () {
        var gun = new MImage("gun_png");
        gun.anchorOffsetX = gun.width >> 1;
        this.addChild(gun);
        this.gun = gun;
        var numBg = new MImage("numBg_png");
        numBg.setAnchorCenter();
        this.addChild(numBg);
        var line = new MImage("line_png");
        line.anchorOffsetX = line.width >> 1;
        this.line = line;
        this.txtNum = this.createText(0, 0, "");
        this.bullet = this.bulletMax;
        this.updateNum(this.bullet);
    };
    Gun.prototype.restart = function () {
        this.bulletMax = 1;
        this.initNum();
    };
    Gun.prototype.updatePos = function (pos) {
        var r = -Math.atan2(pos.x, pos.y) * 180 / Math.PI;
        this.gun.rotation = r;
        this.line.rotation = r;
    };
    Gun.prototype.initNum = function () {
        this.bullet = this.bulletMax;
        this.updateNum(this.bullet);
    };
    Gun.prototype.showLine = function () {
        this.addChildAt(this.line, 0);
    };
    Gun.prototype.hideLine = function () {
        this.line.removeFromParent();
    };
    Gun.prototype.updateNum = function (value) {
        this.txtNum.text = String(value);
        this.txtNum.anchorOffsetX = this.txtNum.width >> 1;
        this.txtNum.anchorOffsetY = this.txtNum.height >> 1;
    };
    Gun.prototype.fire = function () {
        if (this.bullet > 0) {
            this.updateNum(--this.bullet);
            Tween.get(this.gun).to({ scaleY: 0.6 }, 100).to({ scaleY: 1 }, 100);
            this.dispEvent(EVENT_FIRE);
            setTimeout(this.fire.bind(this), 300);
            SoundControl.getIns().play(MUSIC_FIRE);
        }
    };
    return Gun;
}(moon.BasicView));
__reflect(Gun.prototype, "Gun");
//# sourceMappingURL=GameMain.js.map