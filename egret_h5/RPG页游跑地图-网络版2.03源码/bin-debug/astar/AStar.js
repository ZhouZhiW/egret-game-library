/**
 *
 * @author
 * A * 寻路算法
 */
var AStar = (function (_super) {
    __extends(AStar, _super);
    //====================================
    //	Constructor
    //====================================
    /**
    * Constructor
    *
    *  p_mapTileModel	地图模型，实现 IMapTileModel 接口
    *  p_maxTry			最大寻路步数，限制超时返回
    */
    function AStar(p_mapTileModel, p_maxTry) {
        if (p_maxTry === void 0) { p_maxTry = 10000; }
        _super.call(this);
        //是否需要障碍物判断
        this.isBalk = false;
        //====================================
        //	Constants
        //====================================
        this.COST_STRAIGHT = 10; //竖向或斜向移动一格的路径评分
        this.COST_DIAGONAL = 20; //横向移动一格的路径评分
        this.COST_SWERVE = 5; //转弯一次评分
        this.NOTE_ID = 0; //(单个)节点数组 节点ID 索引
        this.NOTE_OPEN = 1; //(单个)节点数组 是否在开启列表中 索引
        this.NOTE_CLOSED = 2; //(单个)节点数组 是否在关闭列表中 索引
        this.m_openCount = 0; //开放列表长度
        this.m_openId = 0; //节点加入开放列表时分配的唯一ID(从0开始) 根据此ID(从下面的列表中)存取节点数据
        this.m_maxTry = 0; //最大寻延时,限制超时返回
        this.m_Start = 0;
        this.m_End = 0;
        this.m_mapTileModel = p_mapTileModel;
        this.m_maxTry = p_maxTry;
    }
    var d = __define,c=AStar,p=c.prototype;
    d(p, "maxTry"
        //====================================
        //	Properties
        //====================================
        /**
        * 最大寻路步数，限制超时返回
        */
        ,function () {
            return this.m_maxTry;
        }
        /**
        * @private
        */
        ,function (p_value) {
            p_value = p_value;
            this.m_maxTry = p_value;
        }
    );
    /**
     * 开始寻路
     *
     *  p_startX-起点X坐标
     *  p_startY-起点Y坐标
     *  p_endX-终点X坐标
     *  p_endY-终点Y坐标
     *
     *  找到的路径(二维数组 : [p_startX, p_startY], ... , [p_endX, p_endY])
     */
    p.find = function (p_startX, p_startY, p_endX, p_endY) {
        this.m_Start = egret.getTimer();
        this.initLists(); // 初始化所有列表数组
        this.m_openCount = 0;
        this.m_openId = -1;
        this.openNote(p_startX, p_startY, 0, 0, 0); // 起点放到开启列表中
        var currTry = 0; // 寻路次数
        var currId = 0;
        var currNoteX = 0;
        var currNoteY = 0;
        var preId = 0;
        var preNoteX = 0;
        var preNoteY = 0;
        var aroundNotes;
        var checkingId = 0;
        var cost = 0; // (从起点移动到)节点的移动耗费G值
        var score = 0; // 节点路径评分F值
        while (this.m_openCount > 0) {
            //超时返回
            this.m_End = egret.getTimer();
            if (this.m_End - this.m_Start > this.m_maxTry) {
                this.destroyLists();
                return null;
            }
            //每次取出开放列表最前面的ID
            currId = this.m_openList[0];
            //将编码为此ID的元素列入关闭列表
            this.closeNote(currId);
            currNoteX = this.m_xList[currId];
            currNoteY = this.m_yList[currId];
            //如果终点被放入关闭列表寻路结束，返回路径
            if (currNoteX == p_endX && currNoteY == p_endY) {
                return this.getPath(p_startX, p_startY, currId);
            }
            //获取周围节点，排除不可通过和已在关闭列表中的
            aroundNotes = this.getArounds(currNoteX, currNoteY);
            // 前面一个点
            preId = this.m_fatherList[currId];
            preNoteX = this.m_xList[preId];
            preNoteY = this.m_yList[preId];
            //对于周围的每一个节点
            for (var note_key_a in aroundNotes) {
                //计算F和G值
                var note = aroundNotes[note_key_a];
                if (currNoteX - note[0] == currNoteY - note[1]) {
                    cost = this.m_movementCostList[currId] + this.COST_DIAGONAL;
                }
                else {
                    cost = this.m_movementCostList[currId] + this.COST_STRAIGHT;
                }
                //拐弯		当前点不在 前一个点与将要走的点组成线段 的中点上
                if (!(currNoteX << 1 == preNoteX + note[0] && currNoteY << 1 == preNoteY + note[1])) {
                    cost += this.COST_SWERVE; //拐弯加权
                }
                // 90度地图估计开销F计算
                score = cost + (Math.abs(p_endX - note[0]) + Math.abs(p_endY - note[1])) * this.COST_STRAIGHT;
                //如果节点已在播放列表中
                if (this.isOpen(note[0], note[1])) {
                    checkingId = this.m_noteMap[note[1]][note[0]][this.NOTE_ID];
                    //如果新的G值比节点原来的G值小,修改F,G值，换父节点
                    if (cost < this.m_movementCostList[checkingId]) {
                        this.m_movementCostList[checkingId] = cost;
                        this.m_pathScoreList[checkingId] = score;
                        this.m_fatherList[checkingId] = currId;
                        this.aheadNote(this.getIndex(checkingId));
                    }
                }
                else {
                    //如果节点不在开放列表中
                    //将节点放入开放列表
                    this.openNote(note[0], note[1], score, cost, currId);
                }
            }
        }
        //开放列表已空，找不到路径
        this.destroyLists();
        return null;
    };
    /**
     * @private
     * 将节点加入开放列表
     *
     * @param p_x		节点在地图中的x坐标
     * @param p_y		节点在地图中的y坐标
     * @param P_score	节点的路径评分
     * @param p_cost	起始点到节点的移动成本
     * @param p_fatherId	父节点
    */
    p.openNote = function (p_x, p_y, p_score, p_cost, p_fatherId) {
        this.m_openCount++;
        this.m_openId++;
        if (this.m_noteMap[p_y] == null) {
            this.m_noteMap[p_y] = [];
        }
        this.m_noteMap[p_y][p_x] = [];
        this.m_noteMap[p_y][p_x][this.NOTE_OPEN] = true;
        this.m_noteMap[p_y][p_x][this.NOTE_ID] = this.m_openId;
        this.m_xList.push(p_x);
        this.m_yList.push(p_y);
        this.m_pathScoreList.push(p_score);
        this.m_movementCostList.push(p_cost);
        this.m_fatherList.push(p_fatherId);
        this.m_openList.push(this.m_openId);
        this.aheadNote(this.m_openCount);
    };
    /**
     * @private
     * 将(新加入开放别表或修改了路径评分的)节点向前移动
    */
    p.aheadNote = function (p_index) {
        var father = 0;
        var change = 0;
        while (p_index > 1) {
            //父节点的位置
            father = Math.floor(p_index >> 1);
            //如果该节点的F值小于父节点的F值则和父节点交换
            if (this.getScore(p_index) < this.getScore(father)) {
                change = this.m_openList[p_index - 1];
                this.m_openList[p_index - 1] = this.m_openList[father - 1];
                this.m_openList[father - 1] = change;
                p_index = father;
            }
            else {
                break;
            }
        }
    };
    /**
     * @private
     * 获取某节点的路径评分
     *
     * @param p_index	节点在开启列表中的索引(从1开始)
     */
    p.getScore = function (p_index) {
        return this.m_pathScoreList[this.m_openList[p_index - 1]];
    };
    /**
     * @private
     * 初始化数组
     */
    p.initLists = function () {
        this.m_openList = [];
        this.m_xList = [];
        this.m_yList = [];
        this.m_pathScoreList = [];
        this.m_movementCostList = [];
        this.m_fatherList = [];
        this.m_noteMap = [];
    };
    /**
    * @private
    * 销毁数组
    */
    p.destroyLists = function () {
        this.m_openList = null;
        this.m_xList = null;
        this.m_yList = null;
        this.m_pathScoreList = null;
        this.m_movementCostList = null;
        this.m_fatherList = null;
        this.m_noteMap = null;
    };
    /**
    * @private
    * 将节点加入关闭列表
    */
    p.closeNote = function (p_id) {
        this.m_openCount--;
        var noteX = this.m_xList[p_id];
        var noteY = this.m_yList[p_id];
        this.m_noteMap[noteY][noteX][this.NOTE_OPEN] = false;
        this.m_noteMap[noteY][noteX][this.NOTE_CLOSED] = true;
        if (this.m_openCount <= 0) {
            this.m_openCount = 0;
            this.m_openList = [];
            return;
        }
        this.m_openList[0] = this.m_openList.pop();
        this.backNote();
    };
    /**
    * @private
    * 将(取出开启列表中路径评分最低的节点后从队尾移到最前的)节点向后移动
    */
    p.backNote = function () {
        //尾部的节点被移到最前面
        var checkIndex = 1;
        var tmp = 0;
        var tmpX2 = 0;
        var change = 0;
        while (true) {
            tmp = checkIndex;
            tmpX2 = tmp << 1;
            // 如果有子节点
            if (tmpX2 <= this.m_openCount) {
                // 如果子节点的F值更小
                if (this.getScore(checkIndex) > this.getScore(tmpX2)) {
                    // 记节点的新位置为子节点位置
                    checkIndex = tmpX2;
                }
                //如果有两个子节点
                if (tmpX2 + 1 <= this.m_openCount) {
                    // 如果第二个子节点F值更小
                    if (this.getScore(checkIndex) > this.getScore(tmpX2 + 1)) {
                        // 更新节点新位置为第二个子节点位置
                        checkIndex = tmpX2 + 1;
                    }
                }
            }
            // 如果节点位置没有更新结束排序
            if (tmp == checkIndex) {
                break;
            }
            else {
                // 反之和新位置交换，继续和新位置的子节点比较F值
                change = this.m_openList[tmp - 1];
                this.m_openList[tmp - 1] = this.m_openList[checkIndex - 1];
                this.m_openList[checkIndex - 1] = change;
            }
        }
    };
    /**
    * @private
    * 获取路径
    *
    * @param p_startX	起始点X坐标
    * @param p_startY	起始点Y坐标
    * @param p_id		终点的ID
    *
    * @return 			路径坐标(Point)数组
    */
    p.getPath = function (p_startX, p_startY, p_id) {
        var arr = [];
        var noteX = this.m_xList[p_id];
        var noteY = this.m_yList[p_id];
        while (noteX != p_startX || noteY != p_startY) {
            arr.unshift([noteX, noteY]);
            p_id = this.m_fatherList[p_id];
            noteX = this.m_xList[p_id];
            noteY = this.m_yList[p_id];
        }
        arr.unshift([p_startX, p_startY]);
        this.destroyLists();
        return arr;
    };
    /**
    * @private
    * 获取某节点的周围节点，排除不能通过和已在关闭列表中的
    */
    p.getArounds = function (p_x, p_y) {
        var arr = [];
        var checkX = 0;
        var checkY = 0;
        //y&1 y是偶数是0，不属于红色方块某个，x左边-1.奇数是1 意思是，这个节点属于红色方块，说明x坐标不变
        //右下
        checkX = p_x + 1;
        checkY = p_y;
        var canRightBottom = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canRightBottom && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //左下
        checkX = p_x;
        checkY = p_y - 1;
        var canLeftBottom = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canLeftBottom && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //左上
        checkX = p_x - 1;
        checkY = p_y;
        var canLeftTop = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canLeftTop && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //右上
        checkX = p_x;
        checkY = p_y + 1;
        var canRightTop = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canRightTop && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //右
        checkX = p_x + 1;
        checkY = p_y + 1;
        var canRight = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canRight && canRightTop && canRightBottom && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //下
        checkX = p_x + 1;
        checkY = p_y - 1;
        var canDown = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canDown && canLeftBottom && canRightBottom && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //左
        checkX = p_x - 1;
        checkY = p_y - 1;
        var canLeft = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canLeft && canLeftTop && canLeftBottom && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        //上
        checkX = p_x - 1;
        checkY = p_y + 1;
        var canUp = this.isBalk || this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY) != Tile.PATH_BARRIER;
        if (canUp && canLeftTop && canRightTop && !this.isClosed(checkX, checkY)) {
            arr.push([checkX, checkY]);
        }
        return arr;
    };
    /**
    * @private
    * 判断某节点是否在关闭列表中
    */
    p.isClosed = function (p_x, p_y) {
        if (this.m_noteMap[p_y] == null)
            return false;
        if (this.m_noteMap[p_y][p_x] == null)
            return false;
        return this.m_noteMap[p_y][p_x][this.NOTE_CLOSED];
    };
    /**
    * @private
    * 判断某节点是否在开放列表
    */
    p.isOpen = function (p_x, p_y) {
        if (this.m_noteMap[p_y] == null)
            return false;
        if (this.m_noteMap[p_y][p_x] == null)
            return false;
        return this.m_noteMap[p_y][p_x][this.NOTE_OPEN];
    };
    /**
    * @private
    * 获取某ID节点在开放列表中的索引(从1开始)
    */
    p.getIndex = function (p_id) {
        var i = 1;
        for (var id_key_a in this.m_openList) {
            var id = this.m_openList[id_key_a];
            if (id == p_id) {
                return i;
            }
            i++;
        }
        return -1;
    };
    return AStar;
})(egret.HashObject);
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=AStar.js.map