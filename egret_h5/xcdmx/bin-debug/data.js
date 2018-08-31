var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data = (function () {
    function data() {
    }
    data.createBtn = function (url, fun, _x, _y, object_father) {
        var btn1 = new egret.Bitmap();
        var texture = RES.getRes(url);
        btn1.texture = texture;
        object_father.addChildAt(btn1, 10);
        btn1.x = _x;
        btn1.y = _y;
        btn1.anchorOffsetX = btn1.width / 2;
        btn1.anchorOffsetY = btn1.height / 2;
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            fun();
        }, this);
    };
    data.updateData = function () {
        data.Block_Array = [];
        for (var a = 0; a < data.click_post.length; a++) {
            data.click_post[a].click = true;
        }
        data.Score = 0;
        data.UPDATE_data = 1;
        if (data.saveDataArray._bestScore) {
            data.BestScore = data.saveDataArray._bestScore;
        }
        else {
            data.BestScore = 0;
        }
        data.ROTATION_data = 1;
        data.DOWN_NUMBER = 3;
        data.CLICKNUM = 3;
        data.rect_num_Array = [0, 1, 2];
        data._level = 0;
        var array = {
            gameArray: {
                up_game: [],
                down_game: [],
            },
            _value: 0,
            _Maxvalue: 600,
            _score: data.Score,
            _bestScore: data.BestScore,
            _update_num: data.UPDATE_data,
            _rotation_num: data.ROTATION_data,
            _level: data._level
        };
        egret.localStorage.setItem("saveDataArray", JSON.stringify(array));
    };
    data.CLICKABLE = "clickable";
    data.NONECLICKABLE = "noneclickable";
    data.map_row = 10; //创建地图每列的格子数
    data.map_col = 10; //创建地图每行的格子数
    data.rect_width = 60; //创建方块的宽度
    data.rect_x = 60; //创建方块起始x
    data.rect_y = 250; //创建方块起始y
    data.UPDATE_data = 1; //玩家可刷新的次数
    data.ROTATION_data = 1; //玩家可旋转的次数
    data.DOWN_NUMBER = 3; //记录游戏中下面方块数 默认为3 如果移动到棋盘时为减少 一 如果为零时会重新创建
    data.CLICKNUM = 3;
    data.Score = 0;
    data.BestScore = 0;
    data.Block_Array = [];
    data.Is_first = true;
    data.rect_num_Array = [0, 1, 2]; /*data.rect_num_Array 数组表示存储屏幕上剩余方块在数组中的下标*/
    data.Main_Layer = null;
    data.Start_Layer = null;
    data.Game_Layer = null;
    data.Timer_Layer = null;
    data.Map_Layer = null;
    data.saveDataArray = {
        gameArray: {
            up_game: [],
            down_game: [],
        },
        _value: null,
        _Maxvalue: null,
        _score: null,
        _bestScore: null,
        _update_num: null,
        _rotation_num: null,
        _level: null
    };
    data.readDateArray = null;
    data.addDaoju = [
        600, 1200, 2000, 3000, 4800, 6400, 9600, 12000, 15000, 30000, 50000, 100000, 100000000000
    ];
    data._level = 0;
    data.click_post = [
        {
            minx: 75,
            maxX: 220,
            miny: 1000,
            maxy: 1200,
            click: true
        },
        {
            minx: 275,
            maxX: 425,
            miny: 1000,
            maxy: 1200,
            click: true
        },
        {
            minx: 475,
            maxX: 625,
            miny: 1000,
            maxy: 1200,
            click: true
        },
    ];
    data.DOWN_POSTION = [
        [150, 1100],
        [350, 1100],
        [550, 1100]
    ]; //表示游戏下方出现三个方块的坐标；用于当点击处于无效状态时会回到这个坐标；
    // public static sp_n = 0;
    data.typeArray = [
        [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
        [[[-1, 0], [0, 0]], [[0.5, -0.5], [0.5, 0.5]], [[-1, 0], [0, 0]], [[0.5, -0.5], [0.5, 0.5]]],
        [[[0, -0.5], [0, 0.5]], [[0.5, 0], [0.5, 0]], [[0, -0.5], [0, 0.5]], [[0.5, 0], [0.5, 0]]],
        [[[-0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]], [[-0.5, -0.5], [-0.5, 0.5], [0.5, -0.5]], [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5]], [[-0.5, 0.5], [0.5, -0.5], [0.5, 0.5]]],
        [[[-0.5, 0.5], [0.5, -0.5], [0.5, 0.5]], [[-0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]], [[-0.5, -0.5], [-0.5, 0.5], [0.5, -0.5]], [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5]]],
        [[[0, 0], [0, -1], [0, 1]], [[0, 0], [-1, 0], [1, 0]], [[0, 0], [0, -1], [0, 1]], [[0, 0], [-1, 0], [1, 0]]],
        [[[0, 0], [-1, 0], [1, 0]], [[0, 0], [0, -1], [0, 1]], [[0, 0], [-1, 0], [1, 0]], [[0, 0], [0, -1], [0, 1]]],
        [[[-1, -0.5], [0, -0.5], [-1, 0.5], [0, 0.5]], [[-1, -0.5], [0, -0.5], [-1, 0.5], [0, 0.5]], [[-1, -0.5], [0, -0.5], [-1, 0.5], [0, 0.5]], [[-1, -0.5], [0, -0.5], [-1, 0.5], [0, 0.5]],],
        [[[0, -1.5], [0, -0.5], [0, 0.5], [0, 1.5]], [[-1.5, 0], [-0.5, 0], [0.5, 0], [1.5, 0]], [[0, -1.5], [0, -0.5], [0, 0.5], [0, 1.5]], [[-1.5, 0], [-0.5, 0], [0.5, 0], [1.5, 0]]],
        [[[-1.5, 0], [-0.5, 0], [0.5, 0], [1.5, 0]], [[0, -1.5], [0, -0.5], [0, 0.5], [0, 1.5]], [[-1.5, 0], [-0.5, 0], [0.5, 0], [1.5, 0]], [[0, -1.5], [0, -0.5], [0, 0.5], [0, 1.5]]],
        [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [[0, -2], [0, -1], [0, 0], [0, 1], [0, 2]], [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [[0, -2], [0, -1], [0, 0], [0, 1], [0, 2]]],
        [[[0, -2], [0, -1], [0, 0], [0, 1], [0, 2]], [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [[0, -2], [0, -1], [0, 0], [0, 1], [0, 2]], [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]]],
        [[[-1, 0], [-1, -1], [0, -1], [1, -1], [-1, 1]], [[1, 1], [1, 0], [0, -1], [1, -1], [-1, -1]], [[-1, 1], [0, 1], [1, -1], [1, 0], [1, 1]], [[-1, 1], [0, 1], [-1, -1], [-1, 0], [1, 1]]],
        [[[-1, 1], [0, 1], [1, -1], [1, 0], [1, 1]], [[-1, 1], [0, 1], [-1, -1], [-1, 0], [1, 1]], [[-1, 0], [-1, -1], [0, -1], [1, -1], [-1, 1]], [[1, 1], [1, 0], [0, -1], [1, -1], [-1, -1]]],
        [[[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, -1], [0, 0], [1, -1], [1, 0], [1, 1]], [[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, -1], [0, 0], [1, -1], [1, 0], [1, 1]], [[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, -1], [0, 0], [1, -1], [1, 0], [1, 1]], [[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, -1], [0, 0], [1, -1], [1, 0], [1, 1]],] //14
    ];
    return data;
}());
__reflect(data.prototype, "data");
