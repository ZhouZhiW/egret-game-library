/**
 *
 * @author 
 * A * 寻路算法 
 */
class AStar extends egret.HashObject {
    //是否需要障碍物判断
    public isBalk: boolean = false;
    
    //====================================
	//	Constants
	//====================================
    private COST_STRAIGHT: number = 10;     //竖向或斜向移动一格的路径评分
    private COST_DIAGONAL: number = 20;     //横向移动一格的路径评分
    private COST_SWERVE: number = 5;        //转弯一次评分
    private NOTE_ID: number = 0;            //(单个)节点数组 节点ID 索引
    private NOTE_OPEN: number = 1;          //(单个)节点数组 是否在开启列表中 索引
    private NOTE_CLOSED: number = 2;        //(单个)节点数组 是否在关闭列表中 索引
    //====================================
	//	Member Variables
	//====================================
    // 开放列表 m_openList 是个二叉堆（一维数组），F值最小的节点始终排在最前。为加快排序，
	// 开放列表中只存放节点ID ，其它数据放在各自的一维数组中。
    private m_mapTileModel: ITile;    //地图模型
    private m_openList: Array<any>;         //开放列表，存放节点ID
    private m_openCount: number = 0;        //开放列表长度
    private m_openId: number = 0;           //节点加入开放列表时分配的唯一ID(从0开始) 根据此ID(从下面的列表中)存取节点数据
    
    // 这些数据列表都以节点ID为索引顺序存储。
    private m_xList: Array<any>;            //节点x坐标列表
    private m_yList: Array<any>;            //节点y坐标列表
    private m_pathScoreList: Array<any>;    //节点路径评分列表
    private m_movementCostList: Array<any>; //(从起点移动到)节点的移动耗费列表
    private m_fatherList: Array<any>;       //节点的父节点(ID)列表
    
    // 使用 m_noteMap 可以方便的存取任何位置节点的开启关闭状态，并可取其ID进而存取其它数据。m_noteMap 是个三维数组，
	// 第一维y坐标（第几行），第二维x坐标（第几列），第三维节点状态和ID。判断点(p_x, p_y)是否在开启列表中
    private m_noteMap: Array<any>;          //节点(数组)地图,根据节点坐标记录节点开启关闭状态和ID
    
    private m_maxTry: number = 0;           //最大寻延时,限制超时返回
    private m_Start: number = 0;            
    private m_End: number = 0;              
	
	//====================================
	//	Constructor
	//====================================
    /**
	* Constructor
	*
	*  p_mapTileModel	地图模型，实现 IMapTileModel 接口
	*  p_maxTry			最大寻路步数，限制超时返回
	*/
    public constructor(p_mapTileModel: ITile,p_maxTry: number = 10000) {
        super();
        this.m_mapTileModel = p_mapTileModel;
        this.m_maxTry = p_maxTry;
    }
	
	//====================================
	//	Properties
	//====================================
    /**
	* 最大寻路步数，限制超时返回
	*/
    public get maxTry(): number {
        return this.m_maxTry;
    }
    /**
	* @private
	*/
    public set maxTry(p_value: number) {
        p_value = p_value;
        this.m_maxTry = p_value;
    }
	
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
    public find(p_startX: number,p_startY: number,p_endX: number,p_endY: number): Array<any> {
        
        this.m_Start = egret.getTimer();
        this.initLists();	// 初始化所有列表数组
        this.m_openCount = 0;
        this.m_openId = -1;
        
        this.openNote(p_startX,p_startY,0,0,0);// 起点放到开启列表中
        
        var currTry: number = 0;    // 寻路次数
        var currId: number = 0;
        var currNoteX: number = 0;
        var currNoteY: number = 0;
        var preId: number = 0;
        var preNoteX: number = 0;
        var preNoteY: number = 0;
        var aroundNotes: Array<any>;
        var checkingId: number = 0;
        var cost: number = 0;       // (从起点移动到)节点的移动耗费G值
        var score: number = 0;      // 节点路径评分F值
        while(this.m_openCount > 0) {
            //超时返回
            this.m_End = egret.getTimer();
            if(this.m_End - this.m_Start > this.m_maxTry) {
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
            if(currNoteX == p_endX && currNoteY == p_endY) {
                return this.getPath(p_startX,p_startY,currId);
            }
            //获取周围节点，排除不可通过和已在关闭列表中的
            aroundNotes = this.getArounds(currNoteX,currNoteY);
            // 前面一个点
            preId = this.m_fatherList[currId];
            preNoteX = this.m_xList[preId];
            preNoteY = this.m_yList[preId];
            //对于周围的每一个节点
            for(var note_key_a in aroundNotes) {
                //计算F和G值
                var note: Array<any> = aroundNotes[note_key_a];
                if(currNoteX - note[0] == currNoteY - note[1]) {
                    cost = this.m_movementCostList[currId] + this.COST_DIAGONAL;
                }
                else {
                    cost = this.m_movementCostList[currId] + this.COST_STRAIGHT;
                }
                //拐弯		当前点不在 前一个点与将要走的点组成线段 的中点上
                if(<any>!(currNoteX << 1 == preNoteX + note[0] && currNoteY << 1 == preNoteY + note[1])) {
                    cost += this.COST_SWERVE;   //拐弯加权
                }
                // 90度地图估计开销F计算
                score = cost + (Math.abs(p_endX - note[0]) + Math.abs(p_endY - note[1])) * this.COST_STRAIGHT;
                //如果节点已在播放列表中
                if(this.isOpen(note[0],note[1])) {
                    checkingId = this.m_noteMap[note[1]][note[0]][this.NOTE_ID];
                    //如果新的G值比节点原来的G值小,修改F,G值，换父节点
                    if(cost < this.m_movementCostList[checkingId]) {
                        this.m_movementCostList[checkingId] = cost;
                        this.m_pathScoreList[checkingId] = score;
                        this.m_fatherList[checkingId] = currId;
                        this.aheadNote(this.getIndex(checkingId));
                    }
                }
                else {
                    //如果节点不在开放列表中
                    //将节点放入开放列表
                    this.openNote(note[0],note[1],score,cost,currId);
                }
            }
        }
        //开放列表已空，找不到路径
        this.destroyLists();
        return null;
    }
	
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
    private openNote(p_x: number,p_y: number,p_score: number,p_cost: number,p_fatherId: number) {
        this.m_openCount++;
        this.m_openId++;
        if(this.m_noteMap[p_y] == null) {
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
    }
    /**
	 * @private
	 * 将(新加入开放别表或修改了路径评分的)节点向前移动
	*/
    private aheadNote(p_index: number) {
        var father: number = 0;
        var change: number = 0;
        while(p_index > 1) {
            //父节点的位置
            father = Math.floor(p_index >> 1);
            //如果该节点的F值小于父节点的F值则和父节点交换
            if(this.getScore(p_index) < this.getScore(father)) {
                change = this.m_openList[p_index - 1];
                this.m_openList[p_index - 1] = this.m_openList[father - 1];
                this.m_openList[father - 1] = change;
                p_index = father;
            }
            else {
                break;
            }
        }
    }
    /**
	 * @private
	 * 获取某节点的路径评分
	 * 
	 * @param p_index	节点在开启列表中的索引(从1开始)
	 */
    private getScore(p_index: number): number {
        return this.m_pathScoreList[this.m_openList[p_index - 1]];
    }
    /**
     * @private
     * 初始化数组
     */
    private initLists() {
        this.m_openList = [];
        this.m_xList = [];
        this.m_yList = [];
        this.m_pathScoreList = [];
        this.m_movementCostList = [];
        this.m_fatherList = [];
        this.m_noteMap = [];
    }
    /**
	* @private
	* 销毁数组
	*/	
    private destroyLists() {
        this.m_openList = null;
        this.m_xList = null;
        this.m_yList = null;
        this.m_pathScoreList = null;
        this.m_movementCostList = null;
        this.m_fatherList = null;
        this.m_noteMap = null;
    }
    /**
	* @private
	* 将节点加入关闭列表
	*/
    private closeNote(p_id: number) {
        this.m_openCount--;
        var noteX: number = this.m_xList[p_id];
        var noteY: number = this.m_yList[p_id];
        this.m_noteMap[noteY][noteX][this.NOTE_OPEN] = false;
        this.m_noteMap[noteY][noteX][this.NOTE_CLOSED] = true;
        if(this.m_openCount <= 0) {
            this.m_openCount = 0;
            this.m_openList = [];
            return;
        }
        this.m_openList[0] = this.m_openList.pop();
        this.backNote();
    }
    /**
	* @private
	* 将(取出开启列表中路径评分最低的节点后从队尾移到最前的)节点向后移动
	*/
    private backNote() {
        //尾部的节点被移到最前面
        var checkIndex: number = 1;
        var tmp: number = 0;
        var tmpX2: number = 0;
        var change: number = 0;
        while(true) {
            tmp = checkIndex;
            tmpX2 = tmp << 1;
            // 如果有子节点
            if(tmpX2 <= this.m_openCount) {
                // 如果子节点的F值更小
                if(this.getScore(checkIndex) > this.getScore(tmpX2)) {
                    // 记节点的新位置为子节点位置
                    checkIndex = tmpX2;
                }
                //如果有两个子节点
                if(tmpX2 + 1 <= this.m_openCount) {
                    // 如果第二个子节点F值更小
                    if(this.getScore(checkIndex) > this.getScore(tmpX2 + 1)) {
                        // 更新节点新位置为第二个子节点位置
                        checkIndex = tmpX2 + 1;
                    }
                }
            }
            // 如果节点位置没有更新结束排序
            if(tmp == checkIndex) {
                break;
            }
            else {
                // 反之和新位置交换，继续和新位置的子节点比较F值
                change = this.m_openList[tmp - 1];
                this.m_openList[tmp - 1] = this.m_openList[checkIndex - 1];
                this.m_openList[checkIndex - 1] = change;
            }
        }
    }
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
    private getPath(p_startX: number,p_startY: number,p_id: number): Array<any> {
        var arr: Array<any> = [];
        var noteX: number = this.m_xList[p_id];
        var noteY: number = this.m_yList[p_id];
        while(noteX != p_startX || noteY != p_startY) {
            arr.unshift([noteX,noteY]);
            p_id = this.m_fatherList[p_id];
            noteX = this.m_xList[p_id];
            noteY = this.m_yList[p_id];
        }
        arr.unshift([p_startX,p_startY]);
        this.destroyLists();
        return arr;
    }
    /**
	* @private
	* 获取某节点的周围节点，排除不能通过和已在关闭列表中的
	*/
    private getArounds(p_x: number,p_y: number): Array<any> {
        var arr: Array<any> = [];
        var checkX: number = 0;
        var checkY: number = 0;
        //y&1 y是偶数是0，不属于红色方块某个，x左边-1.奇数是1 意思是，这个节点属于红色方块，说明x坐标不变
			
		//右下
        checkX = p_x + 1;
        checkY = p_y;
        var canRightBottom: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canRightBottom && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //左下
        checkX = p_x;
        checkY = p_y - 1;
        var canLeftBottom: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canLeftBottom && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //左上
        checkX = p_x - 1;
        checkY = p_y;
        var canLeftTop: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canLeftTop && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //右上
        checkX = p_x;
        checkY = p_y + 1;
        var canRightTop: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canRightTop && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //右
        checkX = p_x + 1;
        checkY = p_y + 1;
        var canRight: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canRight && canRightTop && canRightBottom && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //下
        checkX = p_x + 1;
        checkY = p_y - 1;
        var canDown: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canDown && canLeftBottom && canRightBottom && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //左
        checkX = p_x - 1;
        checkY = p_y - 1;
        var canLeft: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canLeft && canLeftTop && canLeftBottom && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        //上
        checkX = p_x - 1;
        checkY = p_y + 1;
        var canUp: boolean = this.isBalk || this.m_mapTileModel.isBlock(p_x,p_y,checkX,checkY) != Tile.PATH_BARRIER;
        if(canUp && canLeftTop && canRightTop && <any>!this.isClosed(checkX,checkY)) {
            arr.push([checkX,checkY]);
        }
        return arr;
    }
    /**
	* @private
	* 判断某节点是否在关闭列表中
	*/
    private isClosed(p_x: number,p_y: number): boolean {
        if(this.m_noteMap[p_y] == null)
            return false;
        if(this.m_noteMap[p_y][p_x] == null)
            return false;
        return this.m_noteMap[p_y][p_x][this.NOTE_CLOSED];
    }
    /**
	* @private
	* 判断某节点是否在开放列表
	*/	
    private isOpen(p_x: number,p_y: number): boolean {
        if(this.m_noteMap[p_y] == null)
            return false;
        if(this.m_noteMap[p_y][p_x] == null)
            return false;
        return this.m_noteMap[p_y][p_x][this.NOTE_OPEN];
    }
    /**
	* @private
	* 获取某ID节点在开放列表中的索引(从1开始)
	*/
    private getIndex(p_id: number): number {
        var i: number = 1;
        for(var id_key_a in this.m_openList) {
            var id: number = this.m_openList[id_key_a];
            if(id == p_id) {
                return i;
            }
            i++;
        }
        return -1;
    }
    
}
