/**
 *
 * @author 
 *
 */
class Monster extends egret.DisplayObjectContainer {
    private resPlayer: ResPlayer = new ResPlayer();
    private stageW: number = 0;
    private stageH: number = 0;
    private out_x: number = 0;
    private out_y: number = 0;
    private tw: egret.Tween;
    /**英雄*/
    private center: egret.Shape = new egret.Shape();
    private context: egret.Sprite = new egret.Sprite();
    public fx: number = 6;//方向
    public fx_a: number = 0;
    public fo: string = "0";
    private isAlpha: boolean = false;
    private GameFrame: egret.Timer = new egret.Timer(1000 / 5);
    private hero_r_png: egret.Bitmap = new egret.Bitmap();
    private Hero_mo: RoleType = new RoleType();
    /**用于 匿名函数 操作外部变量*/
    private tmd:Tmd;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
	}
    private init(): void {
        //  获取屏幕大小
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        
        if(!this.Hero_mo.role){
            this.startG();
        }
        
    }
    private startG(): void {
        //画中心点
        var bitmap: egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("hero_y_png");
        bitmap.anchorOffsetX = bitmap.width / 2 - 3;
        bitmap.anchorOffsetY = bitmap.height / 2 + 3;
        this.context.addChild(bitmap);

        this.hero_r_png.texture = RES.getRes("hero_r_png");
        this.hero_r_png.anchorOffsetX = this.hero_r_png.width / 2 - 3;
        this.hero_r_png.anchorOffsetY = this.hero_r_png.height - 8;
        this.context.addChild(this.hero_r_png);
        //console.log("lll");
        //this.onPlayer("Player103","1003","1003","0_3");
        this.resMonster("Player103","1003","1003","0_3");
        this.addChild(this.context);

        this.GameFrame.addEventListener(egret.TimerEvent.TIMER,this.onGameFrame,this);//主角走动，添加定时事件侦听器
    }

    
    //private resPlayer: ResPlayer = new ResPlayer();
    private resMonster(Group,j_name: string,p_name: string,z_name: string): void {
        // j_name：p_name：序列图名，序列图配置josn名，z_name：序列图配置josn里面的节点名

        this.resPlayer.onAddToStage(Group,j_name,p_name,z_name);
        this.resPlayer.addEventListener(Group,this.onMonster,this);
    }
    private onMonster(e: egret.Event) {
        //console.log("tt" + e.type);
        if(e.type == "Player103") {
            this.Hero_mo.rolePool.playerPool = "Player103";
            this.Hero_mo.rolePool.j_josn = "1003";
            this.Hero_mo.rolePool.t_texture = "1003";
            this.Hero_mo.rolePool.n_name = "0_3";
            this.createMonster();
        }
    }
    private createMonster(): void {
        this.Hero_mo.role = this.Hero_mo.rolePool.getRole(6,6);//角色
        this.Hero_mo.rolePool.key = 2;
        this.context.addChild(this.Hero_mo.role);
        
        if(this.hero_r_png.parent) this.hero_r_png.parent.removeChild(this.hero_r_png);
    }

    /**移动英雄*/
    public moveHero(nx: number,ny: number,n_z: egret.Point[]): void {
        
        //this.tiaozheng(11);
        this.out_x = nx;
        this.out_y = ny;
        //大于2步，删起始步
        if(n_z.length > 2) n_z.shift();//删除第一个元素，数组元素位置自动前移，返回被删除的元素(寻路数组第一个是 本身格子，删了)
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;


        this.tw = egret.Tween.get(this.context);
        //var mpp: egret.Point;
        var np: egret.Point = new egret.Point();
        np.x = 0;
        np.y = 0;

        var c: number = 0;
        var mp: egret.Point;
        var vb: number = MapLoad.tileHeight;
        var speed: number = 200;
        var va: number = 0;
        var t: string = "";
        //console.log("----------");
        for(var i: number = 0,j = n_z.length;i < j;i++) {
            //console.log("A:" + n_z[i].x + " " + n_z[i].y);
            mp = Tile.getTilePointToStage(n_z[i].x,n_z[i].y);
            mp.y = mp.y / 2;
            //根据格子距离 改变速度
            
            c = this.distance(np.x,np.y,mp.x,mp.y);
            if(c > vb) {
                va = speed * 2;
            } else {
                va = speed;
            }

            var ii: number = 0;
            var F: number = 0;//方向
            var N: number = 0;//角度
            
            if(i == 0) {
                if(n_z.length > 1) {
                    np = Tile.getTilePointToStage(n_z[1].x,n_z[1].y);
                } else {
                    np = Tile.getTilePointToStage(n_z[0].x,n_z[0].y);
                }

                np.y = np.y / 2;
                //计算角度、方向
                var angleSpeed: number = Math.atan2(np.y - this.context.y,np.x - this.context.x);
                //console.log("AA:" + this.context.x + " " + np.x + " " + this.context.y + " " + np.y);
                
                N = angleSpeed * 180 / Math.PI;
                if(this.y == mp.y && this.x == mp.x) {

                } else {
                    if(N <= 20 && N >= -20) {
                        F = 1;
                    } else if(N <= 110 && N >= 70) {
                        F = 2;
                    } else if(N <= -170 || N >= 170) {
                        F = 3;
                    } else if(N <= -70 && N >= -110) {
                        F = 4;
                    } else if(N < 70 && N > 20) {
                        F = 5;
                    } else if(N < 170 && N > 110) {
                        F = 6;
                    } else if(N < -110 && N > -170) {
                        F = 7;
                    } else if(N < -20 && N > -70) {
                        F = 8;
                    }
                    //Hero.fx = F;
                    this.fx = F;
                }
                //console.log("AA:" + F);
                this.tiaozheng(11);
                this.GameFrame.start();
            }
            var tm:Tmd = new Tmd();
            this.tmd = tm;
            
            this.tw.to({ x: mp.x,y: mp.y },va).call(function() {

                if(ii < j - 1) ii += 1;

                t = MapLoad.sceneArray[n_z[ii].x][n_z[ii].y];
                //console.log(t);
                //Hero.fo = t;
                //this.fo = t;
                tm.setTmd_b(t);//用 类方法 匿名函数 操作外部 非静态变量
                
                np = Tile.getTilePointToStage(n_z[ii].x,n_z[ii].y);
                np.y = np.y / 2;
                //计算角度、方向
                //var angleSpeed: number = Math.atan2(this.y - np.y,this.x - np.x);
                var angleSpeed: number = Math.atan2(np.y - this.y,np.x - this.x);
                N = angleSpeed * 180 / Math.PI;
                
                //console.log("B:" + N + " " + this.x + " " + this.y + " " + np.x + " " + np.y);
                if(this.y == np.y && this.x == np.x) {

                } else {
                    if(N <= 20 && N >= -20) {
                        F = 1;
                    } else if(N <= 110 && N >= 70) {
                        F = 2;
                    } else if(N <= -170 || N >= 170) {
                        F = 3;
                    } else if(N <= -70 && N >= -110) {
                        F = 4;
                    } else if(N < 70 && N > 20) {
                        F = 5;
                    } else if(N < 170 && N > 110) {
                        F = 6;
                    } else if(N < -110 && N > -170) {
                        F = 7;
                    } else if(N < -20 && N > -70) {
                        F = 8;
                    }
                    //Hero.fx = F;
                    tm.setTmd_a(F);
                    
                    
                    //console.log("A:" + F);
                }

            });
            //this.tw.addEventListener(AaEvent.DATE,this.getDate,this);
            np.x = mp.x;
            np.y = mp.y;
        }

    }


    /**删除缓动*/
    public reMoveTw(): egret.Point {
        //console.warn("AAAA");
        if(this.tw) {
            this.tw.pause;
            this.tw = new egret.Tween.removeTweens(this.context);
        }
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        var hh: egret.Point = new egret.Point();
        if(this.out_x < 0) {
            hh.x = -Math.abs(this.context.x);
            hh.x = -hh.x - sW;
        } else {
            hh.x = Math.abs(this.context.x);
            hh.x = hh.x - sW;
        }
        if(this.out_y < 0) {
            hh.y = -Math.abs(this.context.y);
            hh.y = -hh.y - sH;
        } else {
            hh.y = Math.abs(this.context.y);
            hh.y = hh.y - sH;
        }
        
        //this.out_x = hh.x;
        //this.out_y = hh.y;
        //console.log("AAAAA");
        this.GameFrame.stop();
        //..............................
        this.tiaozheng(6);//根据 鼠标点击的方向 调整 角色动作，参数 n 为 这组动作的 起始动作
        this.fx_a = 0;
        return hh;

    }
    /** 获取A*格两点的格子数距离  */
    private distance(startX: number,startY: number,endX: number,endY: number): number {
        var dx: number = Math.abs(startX - endX);
        var dy: number = Math.abs(startY - endY);
        return Math.max(dx,dy);

    }
    /**设置英雄坐标*/
    public setHeroPoint(nx: number,ny: number): void {
        
        
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;

        nx = nx + sW;
        ny = ny + sH;
        this.context.x = nx;
        this.context.y = ny;
        //console.log(nx + " + " + ny);
    }
    //获取坐标
    public getHeroPoint(): egret.Point {
        var po: egret.Point = new egret.Point();
        po.x = this.context.x - 240;
        po.y = this.context.y - 400;
        return po;
    }
    
    /**是否启动定时器*/
    public isTimer(is: boolean) {
        if(this.Hero_mo.role) this.Hero_mo.role.isTimer(is);
    }
    //调整 角色 动作
    //n 起始 动作
    private tiaozheng(n: number): void {

        if(this.Hero_mo.role) {
            if(this.Hero_mo.role.parent) {
                this.Hero_mo.role.isTimer(false);//从 舞台 删除前，先停止 对象里的 定时器
                this.Hero_mo.role.parent.removeChild(this.Hero_mo.role);//清除显示
            }
        }
        
        switch(this.fx) {
            case 1:
                //右边
                n = n + 2;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = -1;
                break;
            case 2:
                //下边
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = 1;
                break;
            case 3:
                //左边
                n = n + 2;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = 1;
                break;
            case 4:
                //上边
                n = n + 4;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = 1;
                break;
            case 5:
                //右下
                n = n + 1;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = -1;
                break;
            case 6:
                //左下
                n = n + 1;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = 1;
                break;
            case 7:
                //左上
                n = n + 3;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = 1;
                break;
            case 8:
                //右上
                n = n + 3;
                this.Hero_mo.role = this.Hero_mo.rolePool.getRole(n,n);
                this.Hero_mo.role.scaleX = -1;
                break;
        }
        this.context.addChild(this.Hero_mo.role);
    }
    private onGameFrame(e: egret.TimerEvent) {
        
        this.fx = this.tmd.getTmd_a();
        this.fo = this.tmd.getTmd_b();
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        //console.log(this.tmd.getTmd());
        
        //更换 动作模型
        var Ax: number = Math.floor(this.context.x - sW);
        var Ay: number = Math.floor(this.context.y - sH);
        //console.log("A:" + Ax + " " + this.out_x);
        //console.log("B:" + Ay + " " + this.out_y);
        if(Ax == this.out_x && Ay == this.out_y) {
            this.GameFrame.stop();
            //..............................
            this.tiaozheng(6);//根据 鼠标点击的方向 调整 角色动作，参数 n 为 这组动作的 起始动作
            this.fx_a = 0;
        } else if(this.fx != this.fx_a) {
            this.tiaozheng(11);
            this.fx_a = this.fx;
        }
        //设置 遮罩透明
        if(this.fo == "2") {
            //console.log("2");
            this.isAlpha = true;
            this.context.alpha = 0.5;
        } else if(this.isAlpha == true) {
            //console.log("1");
            this.isAlpha = false;
            this.context.alpha = 1;
        }
        
    }
    
}