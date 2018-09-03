var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var result = (function (_super) {
    __extends(result, _super);
    function result() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    result.prototype.onAddToStage = function () {
        this.getResult(configData.name_Str);
        document.getElementById("saveContainer").style.display = "block";
        var Information;
        if (configData.game_sex == 1) {
            Information = this.InformationMan;
        }
        else {
            Information = this.InformationWoman;
        }
        var _num = Math.floor(Math.random() * (Information.length));
        console.log("周志伟", _num);
        // var _num = Information.length - 1;
        var _str = Information[_num].img;
        var _fun = CanvasToimages(Information[_num]);
        // var resultBg = this.createBitmapByName(_str);
        // this.getResult(configData.name_Str);
        // this.addChild(resultBg);
        // for (var a = 0; a < Information[_num].title.length; a++) {
        //     var _titleStr1 = Information[_num].title[a]._str;
        //     var _titlesize1 = Information[_num].title[a]._size;
        //     var _titlecolor1 = Information[_num].title[a]._color;
        //     var _posX = Information[_num].title[a].pos_x;
        //     var _posY = Information[_num].title[a].pos_y;
        //     var _title1 = this.Createtext(_titleStr1, _titlesize1, _titlecolor1, _posX, _posY);
        // }
        // var tw = egret.Tween.get(this);
        // var that = this;
        // tw.wait(2000).call(function () {
        // });
    };
    result.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    result.prototype.Createtext = function (str, _num, _color, pos_x, pos_y) {
        var _text = new egret.TextField();
        this.addChild(_text);
        _text.text = str;
        _text.size = _num;
        _text.textColor = _color;
        _text.x = pos_x;
        _text.y = pos_y;
        _text.bold = true;
        _text.textFlow = new egret.HtmlTextParser().parser(str);
        return _text;
    };
    result.prototype.getResult = function (str) {
        var name_Str = str;
        var _url = "./resource/res/result/";
        var _urlWoman = "./resource/res/result/woman/";
        this.InformationMan = [
            {
                img: _url + "fbb1.jpg",
                title: [
                    {
                        _str: "移情" + name_Str + "?范冰冰默认恋情",
                        _size: "60px Microsoft Yahei ",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 750,
                    }, {
                        _str: "范冰冰默认恋情",
                        _size: "60px Microsoft Yahei ",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 850
                    }, {
                        _str: "他很优秀 爱情不分对错",
                        _size: "65px Microsoft Yahei ",
                        _color: "#ff7a59",
                        pos_x: 20,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "zyq.jpg",
                title: [
                    {
                        _str: "张雨绮穿比基尼与" + name_Str,
                        _size: "60px Microsoft Yahei ",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "海边度假 男方为其",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "按摩全身!!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "ty1.jpg",
                title: [
                    {
                        _str: "唐嫣自曝",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "初吻",
                        _size: "100px Microsoft Yahei",
                        _color: "#ff8a65",
                        pos_x: 300,
                        pos_y: 750
                    }, {
                        _str: "献给",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 520,
                        pos_y: 750
                    },
                    {
                        _str: name_Str + " 对他迷恋到",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "欲罢不能的地步",
                        _size: "90px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "gyy1.jpg",
                title: [
                    {
                        _str: "高圆圆回忆初恋:" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "给了我一次完美爱情",
                        _size: "70px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "wjk1.jpg",
                title: [
                    {
                        _str: "王俊凯也叫他大哥!",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "揭秘" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "的豪华朋友圈!!",
                        _size: "90px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "ym1.jpg",
                title: [
                    {
                        _str: "不怕有绯闻?",
                        _size: "65px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "杨幂高调示爱" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "他才是我的男神",
                        _size: "90px Microsoft Yahei",
                        _color: "#f06a6a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "lxr.jpg",
                title: [
                    {
                        _str: name_Str + "霸屏综艺节目",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "成最火小鲜肉  林心如",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "力邀其参演新片",
                        _size: "90px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "ly.jpg",
                title: [
                    {
                        _str: "柳岩的真爱是" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "两人当街拥吻好甜蜜",
                        _size: "75px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "lzl1.jpg",
                title: [
                    {
                        _str: "林志玲细数感情经历:",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "只有" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "让我忘不掉!!",
                        _size: "90px Microsoft Yahei",
                        _color: "#ff6f4a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "lzl1.jpg",
                title: [
                    {
                        _str: name_Str + "当年为何狠甩",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "林志玲?",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "惊人内情",
                        _size: "90px Microsoft Yahei",
                        _color: "#f6525a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "pyy1.jpg",
                title: [
                    {
                        _str: "娱乐圈男星露肉好撩人",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str + ",彭于晏,李晨",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "都有八块腹肌",
                        _size: "90px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "zs1.jpg",
                title: [
                    {
                        _str: "郑爽新恋情",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str + "为其庆生后",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "同返酒店过夜",
                        _size: "90px Microsoft Yahei",
                        _color: "#ffc649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "liuyf1.jpg",
                title: [
                    {
                        _str: "与宋承宪再传分手?",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "刘亦菲吐露心声:",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "情定" + name_Str,
                        _size: "90px Microsoft Yahei",
                        _color: "#d4d735",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "zly1.jpg",
                title: [
                    {
                        _str: "赵丽颖恋情曝光",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str + "身家10亿",
                        _size: "80px Microsoft Yahei",
                        _color: " #fecf00",
                        pos_x: 50,
                        pos_y: 870
                    }, {
                        _str: "拥北京二环数套房",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _url + "leo1.jpg",
                title: [
                    {
                        _str: "恭喜!" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "击败莱昂纳多成新一届",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "奥斯卡影帝",
                        _size: "100px Microsoft Yahei",
                        _color: "#63d0f6",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
        ];
        this.InformationWoman = [
            {
                img: _urlWoman + "zs2.jpg",
                title: [
                    {
                        _str: "争夺榜首",
                        _size: "100px Microsoft Yahei",
                        _color: "#fff003",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "亚洲十美评选ing",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: name_Str + "郑爽赵丽颖激烈",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "liyf1.jpg",
                title: [
                    {
                        _str: "李易峰与圈外女友",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str + "恋爱长跑8年",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "宣布下月结婚",
                        _size: "100px Microsoft Yahei",
                        _color: "#ff6f4a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "wyf.jpg",
                title: [
                    {
                        _str: "吴亦凡谈理想型女友:",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "一直想找" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "这一款",
                        _size: "100px Microsoft Yahei",
                        _color: "#fecf00",
                        pos_x: 50,
                        pos_y: 980
                    },
                    {
                        _str: "!!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 350,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "liyf2.jpg",
                title: [
                    {
                        _str: name_Str + "新恋情曝光",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "男友李易峰年轻帅气",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "甩前任几条街",
                        _size: "100px Microsoft Yahei",
                        _color: "#ff6f4a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "wyf.jpg",
                title: [
                    {
                        _str: "吴亦凡称" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "是今生挚爱:她满足了",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "我对女人的全部幻想",
                        _size: "75px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "hjh.jpg",
                title: [
                    {
                        _str: "霍建华说" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "是理想型女伴 若没遇见心如",
                        _size: "50px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "就会考虑她!",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "zjk.jpg",
                title: [
                    {
                        _str: "张继科被封铁血藏獒",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "自称愿为" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "收起锋芒!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "ym2.jpg",
                title: [
                    {
                        _str: "深度开扒",
                        _size: "100px Microsoft Yahei",
                        _color: "#f06a6a",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "刘诗诗,杨幂和" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "那些年的真假闺蜜情",
                        _size: "70px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "zjk.jpg",
                title: [
                    {
                        _str: "夺冠后为何爱撕衣服?",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "张继科:因为" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "喜欢!!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#fecf00",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "yy.jpg",
                title: [
                    {
                        _str: "杨洋女友" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 780
                    }, {
                        _str: "曝光!",
                        _size: "90px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 900
                    }, {
                        _str: "颜值秒杀李沁",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 290,
                        pos_y: 900
                    }, {
                        _str: "宋茜郑爽",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 990
                    }
                ]
            },
            {
                img: _urlWoman + "cwt.jpg",
                title: [
                    {
                        _str: "陈伟霆:",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "难忘初恋情人" + name_Str,
                        _size: "50px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "称赞对方美貌又性感",
                        _size: "75px Microsoft Yahei",
                        _color: "#fecf00",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "fbb2.jpg",
                title: [
                    {
                        _str: "韩国人最爱的中国女人",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "竟然是" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "范冰冰只能排第三",
                        _size: "75px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "gyy2.jpg",
                title: [
                    {
                        _str: "颜值超过高圆圆",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "元气美少女" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "成新一代国民女神",
                        _size: "80px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "yy.jpg",
                title: [
                    {
                        _str: "杨洋自曝已带圈外女友",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str + "见过家长:",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "父母很满意",
                        _size: "100px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "hzt2.jpg",
                title: [
                    {
                        _str: "wuli韬韬恋爱了!",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "黄子韬喊话" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "宠你爱你一生!",
                        _size: "100px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "zhl.jpg",
                title: [
                    {
                        _str: "钟汉良感情世界大",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "曝光!美艳老婆竟是",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "圈外人" + name_Str,
                        _size: "80px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "liuyf2.jpg",
                title: [
                    {
                        _str: "天仙攻上线!",
                        _size: "100px Microsoft Yahei",
                        _color: "#d4d735",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "刘亦菲与" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "逛街全程买单拎包",
                        _size: "70px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "zly2.jpg",
                title: [
                    {
                        _str: "赵丽颖:",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "粉丝中我最爱" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "想陪她度过每一天",
                        _size: "85px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "wy.jpg",
                title: [
                    {
                        _str: "王源粉丝见面会",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "告白" + name_Str + ":感谢你",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "为我做的一切",
                        _size: "85px Microsoft Yahei",
                        _color: "#fec649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "pyy2.jpg",
                title: [
                    {
                        _str: "彭于晏绯闻新欢" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "私照",
                        _size: "80px Microsoft Yahei",
                        _color: "#ff7a59",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "颜值逆天身材惊人",
                        _size: "80px Microsoft Yahei",
                        _color: "#ff7a59",
                        pos_x: 50,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "lh2.jpg",
                title: [
                    {
                        _str: "卓伟又拍到",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "鹿晗这样对" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "简直甜齁吃瓜群众",
                        _size: "85px Microsoft Yahei",
                        _color: "#ff6f4a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "zyx.jpg",
                title: [
                    {
                        _str: "小绵羊变老司机!",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "张艺兴和" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "亲吻拥抱花式虐狗",
                        _size: "85px Microsoft Yahei",
                        _color: "#fecf00",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "ty2.jpg",
                title: [
                    {
                        _str: "唐嫣主动与" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "自拍 同框合影成",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "最美姐妹花",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffc649",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "hg.jpg",
                title: [
                    {
                        _str: "男神恋爱了!",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "胡歌晒与" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "亲密照高调公布恋情",
                        _size: "70px Microsoft Yahei",
                        _color: "#ff6f4a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "hjh.jpg",
                title: [
                    {
                        _str: "霍建华与" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "独处至凌晨 女方回应",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "我俩在看剧本",
                        _size: "100px Microsoft Yahei",
                        _color: "#fecf00",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "yyp.jpg",
                title: [
                    {
                        _str: "和柳岩组CP是假象!",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: "岳云鹏:" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "才是我爱的女人",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "yyqx.jpg",
                title: [
                    {
                        _str: "易烊千玺上演劲爆舞蹈秀",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 750
                    }, {
                        _str: name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 50,
                        pos_y: 850
                    }, {
                        _str: "成唯一舞伴!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#ffc53a",
                        pos_x: 50,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "zjl.jpg",
                title: [
                    {
                        _str: "周杰伦当年恋情",
                        _size: "100px Microsoft Yahei",
                        _color: "#b461a5",
                        pos_x: 20,
                        pos_y: 750
                    }, {
                        _str: "被起底 除了侯佩岑、",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 850
                    }, {
                        _str: "昆凌还有" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 950
                    }
                ]
            },
            {
                img: _urlWoman + "wjk2.jpg",
                title: [
                    {
                        _str: "王俊凯拍戏钦点" + name_Str,
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 750
                    }, {
                        _str: "当女主角:想和她",
                        _size: "60px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 850
                    }, {
                        _str: "演情侣!!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#f36a48",
                        pos_x: 20,
                        pos_y: 980
                    }
                ]
            },
            {
                img: _urlWoman + "wk.jpg",
                title: [
                    {
                        _str: "王凯自曝择偶标准:",
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 750
                    }, {
                        _str: "喜欢像" + name_Str,
                        _size: "65px Microsoft Yahei",
                        _color: "#ffffff",
                        pos_x: 20,
                        pos_y: 850
                    }, {
                        _str: "这样的女孩!!",
                        _size: "100px Microsoft Yahei",
                        _color: "#f36a48",
                        pos_x: 20,
                        pos_y: 980
                    }
                ]
            },
        ];
    };
    return result;
}(egret.DisplayObjectContainer));
__reflect(result.prototype, "result");
//# sourceMappingURL=result.js.map