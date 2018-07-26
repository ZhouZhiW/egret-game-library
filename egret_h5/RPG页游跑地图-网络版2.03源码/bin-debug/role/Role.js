/**
 * Created by Administrator on 2015/5/23.
 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
        this.key = 0; //对象的标识
        this.timer = new egret.Timer(1000 / 20);
        this.step = 0; //动作的标识
        this.step2 = 0;
        this.i = 0; //起始帧
        this.n = 0; //帧数
        this.kaiguan = true;
        //对应各个动作的 名字 补充
        this.m_josn = "";
        this.m_texture = "";
        this.m_name = "";
        this.is_attack = false;
        this.j = 0; //播放计数
        this.m = true; //是否循环播放
    }
    var d = __define,c=Role,p=c.prototype;
    //参数 stepA 是 方向标识，用于 新对象 跳帧
    p.startRole = function (playerPool, j_josn, t_texture, n_name, stepA) {
        this.playerPool = playerPool;
        this.action(stepA);
        this.Xuan(stepA);
        var data = RES.getRes(j_josn + this.m_josn);
        var tex = RES.getRes(t_texture + this.m_texture);
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData(n_name + this.m_name));
        //对象创建就会显示第一帧....所以要 跳帧，要不然 在 更换动作 新对象 的时候..就会显示第一帧..就呵呵了
        //console.log("调试：" + j_josn + this.m_josn);//调试
        //console.log("调试：A" + stepA  + " B" + this.i);//调试
        this.mc.gotoAndPlay(this.i);
        this.addChild(this.mc);
        //因为 原swf文件舞台宽高400*400 以右下角为中心点，所以 要纠正 坐标
        this.mc.x -= 395 + this.mc.width / 2;
        this.mc.y -= 400 - 12; //角色素材 各方向中心点 有 偏差，调整 +7
        this.mc.stop();
        //this.timer.addEventListener(egret.TimerEvent.TIMER, this.onRoleTimer, this);
        //this.timer.start();
        this.isTimer(true);
        return this.mc;
    };
    /**设置定时器的 时间间隔 毫秒*/
    p.setTimer = function (time) {
        this.timer.delay = time;
    };
    /**是否启动定时器*/
    p.isTimer = function (is) {
        if (is) {
            if (!this.timer.running) {
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onRoleTimer, this);
                this.timer.start();
            }
        }
        else {
            if (this.timer.running) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onRoleTimer, this);
                this.timer.stop();
            }
        }
    };
    p.action = function (st) {
        this.is_attack = false;
        var mms = 120;
        if (st >= 1 && st <= 5) {
            //攻击
            this.m_josn = "_attack_json";
            this.m_texture = "_attack_png";
            this.m_name = "_attack";
            this.is_attack = true;
        }
        else if (st >= 6 && st <= 10) {
            //站立
            this.m_josn = "_idle_json";
            this.m_texture = "_idle_png";
            this.m_name = "_idle";
            mms = 250;
        }
        else if (st >= 11 && st <= 15) {
            //走动
            this.m_josn = "_walk_json";
            this.m_texture = "_walk_png";
            this.m_name = "_walk";
        }
        else if (st >= 15 && st <= 18) {
            //死亡
            this.m_josn = "_death_json";
            this.m_texture = "_death_png";
            this.m_name = "_death";
        }
        this.setTimer(mms);
    };
    //选帧
    p.Xuan = function (st) {
        switch (st) {
            case 1:
                //攻击
                this.i = 1;
                this.n = 7;
                break;
            case 2:
                this.i = 8;
                this.n = 14;
                break;
            case 3:
                this.i = 15;
                this.n = 21;
                break;
            case 4:
                this.i = 22;
                this.n = 28;
                break;
            case 5:
                this.i = 29;
                this.n = 35;
                break;
            case 6:
                //站立
                this.i = 1;
                this.n = 7;
                break;
            case 7:
                this.i = 8;
                this.n = 14;
                break;
            case 8:
                this.i = 15;
                this.n = 21;
                break;
            case 9:
                this.i = 22;
                this.n = 28;
                break;
            case 10:
                this.i = 29;
                this.n = 35;
                break;
            case 11:
                //走动
                this.i = 1;
                this.n = 7;
                break;
            case 12:
                this.i = 8;
                this.n = 14;
                break;
            case 13:
                this.i = 15;
                this.n = 21;
                break;
            case 14:
                this.i = 22;
                this.n = 28;
                break;
            case 15:
                this.i = 29;
                this.n = 35;
                break;
            case 16:
                //死亡
                this.i = 1;
                this.n = 8;
                break;
            case 17:
                this.i = 9;
                this.n = 16;
                break;
            case 18:
                this.i = 17;
                this.n = 25;
                break;
            default:
                this.i = 1;
                this.n = 7;
        }
    };
    p.onRoleTimer = function (evt) {
        //console.log("调试:" + this.key);//调试
        //加个 变量对比 提高些效率..
        if (this.step2 != this.step) {
            //this.mc.stop();
            this.step2 = this.step;
            this.Xuan(this.step);
        }
        if (this.j >= this.n - this.i) {
            //console.log("B " + this.j + "  " + this.n);
            this.j = 0;
        }
        else {
            this.j += 1;
        }
        //console.log("调试:" + this.mc.currentFrame + "||" + this.n + "||" + (this.i + this.j) + "||" + this.j);//调试
        this.mc.gotoAndStop(this.i + this.j);
    };
    return Role;
})(egret.Sprite);
egret.registerClass(Role,'Role');
//# sourceMappingURL=Role.js.map