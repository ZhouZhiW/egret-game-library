var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**创建地图块
 *
 */
var CreateMapBlock = (function () {
    function CreateMapBlock() {
    }
    /**根据人物坐标获取不超过4个mapBlock
     *
     * @param roleX 人物x坐标
     * @param roleY 人物y坐标
     * @param cameraWidth 摄像机宽度
     * @param cameraHeight 摄像机高度
     * @param mapInfo 地图信息
     */
    CreateMapBlock.prototype.calculateNeedMbArray = function (mapName, roleX, roleY, cameraWidth, cameraHeight, mapInfo, existsMbArray) {
        //根据role的x坐标获得所在的mapBlock的列数，向下取整
        var mbHNumber = Math.floor(roleX / ((mapInfo.mbList[0][0].columnCount) * mapInfo.tileWidth));
        //根据role的y坐标获得所在的mapBlock的行数，向下取整
        var mbVNumber = Math.floor(roleY / ((mapInfo.mbList[0][0].rowCount) * mapInfo.tileHeight));
        //获取集合中的mapBlockUtil
        var mbUtil = mapInfo.mbList[mbVNumber][mbHNumber];
        //地图快分为4个区域，上左，上右，下左，下右。下面获取到上下的判断分割线
        var middleY = mbUtil.y + (mbUtil.rowCount * mapInfo.tileHeight) / 2;
        //获取到左右的判断分割线
        var middleX = mbUtil.x + (mbUtil.columnCount * mapInfo.tileWidth) / 2;
        //获取到地图快下边的判断分割线
        var rightY = mbUtil.y + mbUtil.rowCount * mapInfo.tileHeight;
        //获取到地图右边的判断分割线
        var rightX = mbUtil.x + mbUtil.columnCount * mapInfo.tileWidth;
        //返回的值，计算出来所需要的地图快集合
        var operate = new OperateLayterUtil();
        //获取到单行竖直方向有多少个mapBlock
        var mbVCount = mapInfo.mbList.length;
        //获取到单行水平方向有多少个mapBlock
        var mbHCount = mapInfo.mbList[0].length;
        //左边的mapBlock的位置
        var leftHNumber = mbHNumber - 1;
        //右边的mapBlock的位置
        var rightHNumber = mbHNumber + 1;
        //上边的mapBlock位置
        var topVNumber = mbVNumber - 1;
        //下边的mapBlock的位置
        var bottomVNumber = mbVNumber + 1;
        var createArray = new Array();
        //判断是否在上边
        if (roleY >= mbUtil.y && roleY < middleY) {
            //判断是否在上左
            if (roleX >= mbUtil.x && roleX < middleX) {
                createArray = this.createNeedMbUtilArray(mbHNumber, mbVNumber, leftHNumber, mbVNumber, leftHNumber, topVNumber, mbHNumber, topVNumber, mbHCount, mbVCount);
                //相对于当前地图块，产生另外三个的地图快顺序为：(左,不变) (左,上) (不变,上)
                operate = this.createMbArray(mapName, createArray, mapInfo, existsMbArray);
            }
            else if (roleX >= middleX && roleX < rightX) {
                //相对于当前地图块，产生另外三个的地图快顺序为：(右,不变) (右,上) (不变,上)
                createArray = this.createNeedMbUtilArray(mbHNumber, mbVNumber, rightHNumber, mbVNumber, rightHNumber, topVNumber, mbHNumber, topVNumber, mbHCount, mbVCount);
                operate = this.createMbArray(mapName, createArray, mapInfo, existsMbArray);
            }
        }
        else if (roleY >= middleY && roleY < rightY) {
            //判断是否在下左
            if (roleX >= mbUtil.x && roleX < middleX) {
                //相对于当前地图块，产生另外三个的地图快顺序为：(左，不变)  (左，下) (不变,下)
                createArray = this.createNeedMbUtilArray(mbHNumber, mbVNumber, leftHNumber, mbVNumber, leftHNumber, bottomVNumber, mbHNumber, bottomVNumber, mbHCount, mbVCount);
                operate = this.createMbArray(mapName, createArray, mapInfo, existsMbArray);
            }
            else if (roleX >= middleX && roleX < rightX) {
                //相对于当前地图块，产生另外三个的地图快顺序为：(右，不变)  (右，下) (不变,下)
                createArray = this.createNeedMbUtilArray(mbHNumber, mbVNumber, rightHNumber, mbVNumber, rightHNumber, bottomVNumber, mbHNumber, bottomVNumber, mbHCount, mbVCount);
                operate = this.createMbArray(mapName, createArray, mapInfo, existsMbArray);
            }
        }
        return operate;
    };
    /**获取所需要的4个方向的mapBlock集合
     *
     * @param oneH 第一个mapBlock列数
     * @param oneV 第一个mapBlock行数
     * @param twoH 第二个mapBlock列数
     * @param twoV 第二个mapBlock行数
     * @param threeH 第三个mapBlock列数
     * @param threeV 第三个mapBlock行数
     * @param fourH 第四个mapBlock列数
     * @param fourV 第四个mapBlock行数
     * @param HCount 总的列数
     * @param VCount 总的行数
     */
    CreateMapBlock.prototype.createNeedMbUtilArray = function (oneH, oneV, twoH, twoV, threeH, threeV, fourH, fourV, HCount, VCount) {
        var createArray = new Array();
        //判断第一个是否超过边界
        if (this.calculateIsMixed(oneH, oneV, HCount, VCount)) {
            var createUtil = new CreateMbUtil();
            createUtil.HNumber = oneH;
            createUtil.VNumber = oneV;
            createArray.push(createUtil);
        }
        //判断第二个是否超过边界
        if (this.calculateIsMixed(twoH, twoV, HCount, VCount)) {
            var createUtil = new CreateMbUtil();
            createUtil.HNumber = twoH;
            createUtil.VNumber = twoV;
            createArray.push(createUtil);
        }
        //判断第三个是否超过边界
        if (this.calculateIsMixed(threeH, threeV, HCount, VCount)) {
            var createUtil = new CreateMbUtil();
            createUtil.HNumber = threeH;
            createUtil.VNumber = threeV;
            createArray.push(createUtil);
        }
        //判断第四个是否超过边界
        if (this.calculateIsMixed(fourH, fourV, HCount, VCount)) {
            var createUtil = new CreateMbUtil();
            createUtil.HNumber = fourH;
            createUtil.VNumber = fourV;
            createArray.push(createUtil);
        }
        return createArray;
    };
    /*返回操作的数据，供界面删除或者添加
     *
     * @param createMbArray 需要创建的mapBlock集合
     * @param mapInfo 地图信息
     * @param existsMbArray 已经存在的mapBlock集合
     */
    CreateMapBlock.prototype.createMbArray = function (mapName, createMbArray, mapInfo, existsMbArray) {
        var operate = new OperateLayterUtil();
        for (var existsNumber = 0; existsNumber < existsMbArray.length;) {
            //判断是否有相同的存在
            var b = true;
            for (var createMbNumber = 0; createMbNumber < createMbArray.length;) {
                var name_1 = GameConfig.MAP_BLOCK_NAME + Comman.isMaxTen(createMbArray[createMbNumber].VNumber) + Comman.isMaxTen(createMbArray[createMbNumber].HNumber);
                //判断名字是否存在，假如有，则删除两个数组里相同的元素
                if (existsMbArray[existsNumber] == name_1) {
                    existsMbArray.splice(existsNumber, 1);
                    createMbArray.splice(createMbNumber, 1);
                    b = false;
                }
                else {
                    createMbNumber++;
                }
            }
            //假如没有相同的存在，则继续执行			
            if (b) {
                existsNumber++;
            }
        }
        //集合里添加删除的名字
        for (var deleteNumber = 0; deleteNumber < existsMbArray.length; deleteNumber++) {
            operate.deleteMbArray.push(existsMbArray[deleteNumber]);
        }
        //集合里添加需要添加的mapBlock
        for (var needNumber = 0; needNumber < createMbArray.length; needNumber++) {
            var need = createMbArray[needNumber];
            operate.needMbArray.push(this.createByTile(mapName, mapInfo.mbList[need.VNumber][need.HNumber], mapInfo.tileWidth, mapInfo.tileHeight));
        }
        return operate;
    };
    /**根据传入的参数判断是否超出边界，必须大于等于0
     *
     * @param HNumber
     * @param VNumber
     * @param HCount
     * @param VCount
     */
    CreateMapBlock.prototype.calculateIsMixed = function (HNumber, VNumber, HCount, VCount) {
        var check = false;
        if (HNumber >= 0 && HNumber < HCount && VNumber >= 0 && VNumber < VCount) {
            check = true;
        }
        return check;
    };
    /**根据单元块创建地图块,可优化，比如直接做一个地图块图像，减少循环创建时间
     *
     * @param mbUtil 地图块信息
     * @param tileWidth 地图单元格宽度
     * @param tileHeight 地图单元格高度
     */
    CreateMapBlock.prototype.createByTile = function (mapName, mbUtil, tileWidth, tileHeight) {
        //地图层
        var mapBlockGroup = new eui.Group();
        //npc层
        var npcGroup = new eui.Group();
        //迷雾层
        var fogGroup = new FogLayer();
        fogGroup.fogUtil = JSON.parse(Local.load(mapName + GameConfig.SPLIT_CHAR + GameConfig.MAP_BLOCK_NAME + Comman.isMaxTen(mbUtil.VNumber) + Comman.isMaxTen(mbUtil.HNumber)));
        if (fogGroup.fogUtil == null) {
            fogGroup.fogUtil = new FogUtil(mbUtil.columnCount, mbUtil.rowCount);
        }
        else {
            console.log(fogGroup.fogUtil.fogCount);
        }
        //获取mapBlock的单元格图片资源
        var mapTexture = Comman.getRes(mbUtil.backGroundTileImageName);
        //获取迷雾图片资源
        var fogTexture = Comman.getRes(mbUtil.fogTileImageName);
        //根据MapBlockUtil的行列加载图片组成地图块
        for (var rowNumber = 0; rowNumber < mbUtil.rowCount; rowNumber++) {
            for (var columnNumber = 0; columnNumber < mbUtil.columnCount; columnNumber++) {
                var mapTile = this.createTile(mapTexture, tileWidth, tileHeight, columnNumber * tileWidth, rowNumber * tileHeight);
                mapBlockGroup.addChild(mapTile);
                if (fogGroup.fogUtil != null && fogGroup.fogUtil.isExploreArray[rowNumber][columnNumber]) {
                    var fogTile = this.createTile(fogTexture, tileWidth, tileHeight, columnNumber * tileWidth, rowNumber * tileHeight);
                    //设置fog的名字，方便后面擦除
                    fogTile.name = GameConfig.FOG_TILE_NAME + Comman.isMaxTen(rowNumber) + Comman.isMaxTen(columnNumber);
                    fogGroup.addChild(fogTile);
                }
            }
        }
        //设置mapBlockGroup的属性，方便后边舞台管理
        fogGroup.x = mapBlockGroup.x = mbUtil.x;
        fogGroup.y = mapBlockGroup.y = mbUtil.y;
        mapBlockGroup.name = mbUtil.name;
        fogGroup.name = mbUtil.name;
        //创建layerUtil并返回，方便舞台添加各个层
        var layerUtil = new LayerUtil(mapBlockGroup, npcGroup, fogGroup);
        return layerUtil;
    };
    /**创建单元格
     *
     * @param texture 图片资源
     * @param width  宽度
     * @param height 高度
     * @param x   坐标x
     * @param y  坐标y
     */
    CreateMapBlock.prototype.createTile = function (texture, width, height, x, y) {
        var mapTile = new egret.Bitmap(texture);
        mapTile.x = x;
        mapTile.y = y;
        mapTile.width = width;
        mapTile.height = height;
        return mapTile;
    };
    return CreateMapBlock;
}());
__reflect(CreateMapBlock.prototype, "CreateMapBlock");
//# sourceMappingURL=CreateMapBlock.js.map