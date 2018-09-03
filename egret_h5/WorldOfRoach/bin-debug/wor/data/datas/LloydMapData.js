var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏地图数据
 */
var LloydMapData = (function () {
    //将预备的地形从小到大进行排序
    function LloydMapData() {
        this._altitude = 0; //海拔系数
        this._areaDic = new Map();
        this._polDic = new Map();
        this._points = new Map();
        //---------下面才是有用的数据,多边形数据---------
        this._areas = new Array(); //所有的区域
        this._lakes = new Array(); //地图所拥有的湖泊
        this._rivers = new Array(); //湖泊
        this._gridDicW = 30;
        LloydMapData._fixLen = LloydMapData._fixFloorTypes.length;
        LloydMapData._fixFloorTypes.sort(function (a, b) {
            if (a > b)
                return 1;
            return -1;
        });
    }
    /**初始化区域组 */
    LloydMapData.prototype.buildGridDic = function (w, h) {
        this._gridDic = new Map();
        var wCount = Math.floor(w / this._gridDicW) + 1;
        var hCount = Math.floor(h / this._gridDicW) + 1;
        for (var i = 0; i < wCount; i++) {
            for (var j = 0; j < hCount; j++) {
                this._gridDic.set(i + "_" + j, new Array());
            }
        }
    };
    /**初始化树 */
    LloydMapData.prototype.initGridDic = function () {
        var key;
        var area;
        for (key in this._areas) {
            area = this._areas[key];
            var pox = Math.floor(area.centerPoint.x / this._gridDicW);
            var poy = Math.floor(area.centerPoint.y / this._gridDicW);
            this._gridDic.get(pox + "_" + poy).push(area);
        }
    };
    /**根据最近的多边形获取类型 */
    LloydMapData.prototype.getFloorTypeByArea = function (px, py) {
        var pox = Math.floor(px / this._gridDicW);
        var poy = Math.floor(py / this._gridDicW);
        var arr;
        var key;
        var area;
        var minDst = 1000000;
        var targetType = 0;
        for (var i = pox - 1; i <= pox + 1; i++) {
            for (var j = poy - 1; j <= poy + 1; j++) {
                arr = this._gridDic.get(i + "_" + j);
                if (arr == null)
                    continue;
                for (key in arr) {
                    area = arr[key];
                    var dis = TriangleUtil.distance(px - area.centerPoint.x, py - area.centerPoint.y);
                    if (dis < minDst) {
                        minDst = dis;
                        targetType = area.type;
                    }
                }
            }
        }
        return targetType;
    };
    /**
     * 获取地形类型对应的位图
     * 如果在地形里没有找到对应的，则返回相近的
     */
    LloydMapData.prototype.getFloorType = function (px, py) {
        var color;
        if (GameConfig.showRiver) {
            color = this.riverMap.getPixel32(px, py);
            if (color[3] >= 10)
                return LloydMapData.LAKE;
        }
        color = this.baseMap.getPixel32(px, py);
        var cType = color[0] << 16 | color[1] << 8 | color[2];
        if (LloydMapData._fixFloorTypes.indexOf(cType) < 0)
            return -cType;
        return cType;
    };
    /**
     * 根据大地图的xy获取地图类型
     */
    LloydMapData.prototype.getFloorTypeByPx = function (px, py) {
        px = Math.floor(px / GameConfig.map_cfx);
        py = this.baseMap._bitmapHeight - Math.floor(py / GameConfig.map_cfy);
        return this.getFloorType(px, py);
    };
    /**
     * 重建
     */
    LloydMapData.prototype.build = function (obj) {
        this.sizeX = obj["w"];
        this.sizeY = obj["h"];
        this.buildGridDic(this.sizeX, this.sizeY);
        var pDic = new Map();
        var p2dObj;
        var p2d;
        while (obj["p2d"].length > 0) {
            p2dObj = obj["p2d"].pop();
            p2d = new AreaPoint();
            p2d.id = p2dObj["id"];
            p2d.x = p2dObj["x"];
            p2d.y = p2dObj["y"];
            p2d.river = p2dObj["r"];
            pDic.set(p2d.id, p2d);
        }
        var area;
        var areaObj;
        var arr = new Array();
        while (obj["areas"].length > 0) {
            area = new Area2D();
            areaObj = obj["areas"].pop();
            arr.push(areaObj);
            area.id = areaObj["id"];
            area.centerPoint = new egret.Point(areaObj["cp"].x, areaObj["cp"].y);
            area.type = areaObj["ty"];
            this._areaDic.set(area.id, area);
            this._areas.push(area);
            while (areaObj["vers"].length > 0)
                area.vertex.push(pDic.get(areaObj["vers"].pop()));
        }
        while (arr.length > 0) {
            areaObj = arr.pop();
            area = this._areaDic.get(areaObj["id"]);
            while (areaObj["nears"].length > 0)
                area.neighbor.push(this._areaDic.get(areaObj["nears"].pop()));
        }
        var riverObj;
        var river;
        while (obj["river"].length > 0) {
            riverObj = obj["river"].pop();
            river = new River();
            this._rivers.push(river);
            river.startArea = this._areaDic.get(riverObj["id"]);
            while (riverObj["ps"].length > 0)
                river.downsteams.push(pDic.get(riverObj["ps"].shift()));
        }
        this.initGridDic();
    };
    /**
     * 获取存储用的DB信息
     */
    LloydMapData.prototype.getDb = function () {
        var obj = new Object();
        obj["w"] = this.sizeX;
        obj["h"] = this.sizeY;
        obj["areas"] = new Array();
        obj["p2d"] = new Array();
        obj["river"] = new Array();
        var key;
        var p2d;
        var area;
        var setsP = [];
        for (key in this._areas) {
            area = this._areas[key];
            var areaObj = new Object();
            obj["areas"].push(areaObj);
            areaObj["id"] = area.id;
            areaObj["cp"] = area.centerPoint;
            areaObj["ty"] = area.type;
            areaObj["nears"] = new Array();
            for (key in area.neighbor)
                areaObj["nears"].push(area.neighbor[key].id);
            areaObj["vers"] = new Array();
            for (key in area.vertex)
                areaObj["vers"].push(area.vertex[key].id);
            for (key in area.vertex) {
                p2d = area.vertex[key];
                if (setsP.indexOf(p2d.id) >= 0)
                    continue;
                setsP.push(p2d.id);
                var p2dObj = new Object();
                p2dObj["id"] = p2d.id;
                p2dObj["x"] = p2d.x;
                p2dObj["y"] = p2d.y;
                p2dObj["r"] = p2d.river;
                obj["p2d"].push(p2dObj);
            }
        }
        //保存河流
        var river;
        for (key in this._rivers) {
            river = this._rivers[key];
            var r = new Object();
            r["id"] = river.startArea.id;
            r["ps"] = new Array();
            for (key in river.downsteams) {
                p2d = river.downsteams[key];
                r["ps"].push(p2d.id);
            }
            obj["river"].push(r);
        }
        return obj;
    };
    /**
     * 赋值一份原始的多边形数据
     * @param list
     */
    LloydMapData.prototype.initData = function (list, w, h) {
        this.buildGridDic(w, h);
        this.sizeX = w;
        this.sizeY = h;
        this._altitude = 0;
        var key;
        var pol;
        for (key in list) {
            pol = list[key];
            var area2D = new Area2D();
            //设置ID
            area2D.id = pol.centerPoint.id;
            this._areaDic.set(area2D.id, area2D);
            this._polDic.set(area2D.id, pol);
            //设置中心点
            area2D.centerPoint = new egret.Point(pol.centerPoint.x, pol.centerPoint.y);
            //设置是否为最外圈的多边形
            area2D.isOutside = pol.isos;
            //设置顶点
            var p2d;
            for (key in pol.vertex) {
                p2d = pol.vertex[key];
                if (this._points.get(p2d.id) == null)
                    this._points.set(p2d.id, new AreaPoint(p2d.x, p2d.y));
                var areaPoint = this._points.get(p2d.id);
                areaPoint.id = p2d.id;
                area2D.vertex.push(areaPoint);
                if (areaPoint.areas.indexOf(area2D.id) < 0)
                    areaPoint.areas.push(area2D.id);
            }
            //初始化顶点的相邻顶点(顶点就是三角形的外接圆心，所以每个三角形的共边三角形的圆心就是这个顶点的相邻顶点)
            this._areas.push(area2D);
        }
    };
    /**
     * 调整陆地占比
     * @param landDivWater 陆地占比
     * @return
     */
    LloydMapData.prototype.adjustCoast = function (land, btd) {
        var areaTotal = 0;
        var landCount = 0;
        var xbl = btd.length / this.sizeX;
        var ybl = btd[0].length / this.sizeY;
        var area;
        var key;
        for (key in this._areas) {
            area = this._areas[key];
            var xp = Math.floor(area.centerPoint.x * xbl);
            var yp = Math.floor(area.centerPoint.y * ybl);
            var color = btd[xp][yp];
            color += this._altitude;
            areaTotal++;
            if (color < 0x0000ff / 2 && !area.isOutside) {
                area.type = LloydMapData.LAND; //陆
                area.isWater = false;
                landCount++;
            }
            else {
                area.type = LloydMapData.SEA; //水
                area.isWater = true;
            }
        }
        if (landCount / areaTotal < land) {
            this._altitude -= 0x0000ff / 50;
            this.adjustCoast(land, btd);
        }
    };
    /**
     * 初始化区域信息
     * 1.多边形的相邻多变形
     * 2.为每个顶点定义相邻的顶点
     */
    LloydMapData.prototype.initArea = function () {
        var points = [];
        var key;
        var area;
        var tri;
        var p2d;
        var areaPoint;
        for (key in this._areas) {
            area = this._areas[key];
            var pol = this._polDic.get(area.id);
            var ids = [];
            //构建相邻的多边形
            for (key in pol.centerPoint.tris) {
                tri = pol.centerPoint.tris[key];
                for (key in tri.vertex) {
                    p2d = tri.vertex[key];
                    if (p2d.id != area.id && ids.indexOf(p2d.id) < 0 && this._areaDic.get(p2d.id) != null) {
                        ids.push(p2d.id);
                        area.neighbor.push(this._areaDic.get(p2d.id));
                    }
                }
            }
            //构建相邻的顶点
            for (key in area.vertex) {
                areaPoint = area.vertex[key];
                if (points.indexOf(areaPoint.id) >= 0)
                    continue;
                points.push(areaPoint.id);
                var tagetPoint = pol.getPointByID(areaPoint.id);
                if (areaPoint.nears.indexOf(this._points.get(pol.getNextPoint(tagetPoint).id)) < 0)
                    areaPoint.nears.push(this._points.get(pol.getNextPoint(tagetPoint).id));
                if (areaPoint.nears.indexOf(this._points.get(pol.getPrePoint(tagetPoint).id)) < 0)
                    areaPoint.nears.push(this._points.get(pol.getPrePoint(tagetPoint).id));
                //再寻找他们的相邻多边形,并找到多边形中
                var nerArea;
                for (key in area.neighbor) {
                    nerArea = area.neighbor[key];
                    var nerPol = this._polDic.get(nerArea.id);
                    var insertPoint = nerPol.getNextPoint(tagetPoint);
                    if (insertPoint != null && areaPoint.nears.indexOf(this._points.get(insertPoint.id)) < 0)
                        areaPoint.nears.push(this._points.get(insertPoint.id));
                    insertPoint = nerPol.getPrePoint(tagetPoint);
                    if (insertPoint != null && areaPoint.nears.indexOf(this._points.get(insertPoint.id)) < 0)
                        areaPoint.nears.push(this._points.get(insertPoint.id));
                }
            }
        }
    };
    /**
     * 检测地形包括下面几个操作
     * 1.区分湖泊和海洋。
     * 			排除海洋：和isoutSide链接的就是海洋
     * 			剩下的就是湖泊
     */
    LloydMapData.prototype.checkTerrain = function () {
        var startOutSide;
        var waters = new Array();
        var key;
        var area;
        for (key in this._areas) {
            area = this._areas[key];
            if (area.isWater) {
                if (startOutSide == null && area.isOutside)
                    startOutSide = area;
                else
                    waters.push(area);
            }
        }
        var checkArea;
        var nerAreas = startOutSide.neighbor;
        var seaCount = nerAreas.length;
        while (seaCount > 0) {
            checkArea = new Array();
            seaCount = 0;
            for (key in nerAreas) {
                area = nerAreas[key];
                var index = waters.indexOf(area);
                if (index >= 0) {
                    waters.splice(index, 1);
                    seaCount++;
                    var key1;
                    for (key1 in area.neighbor) {
                        var area1 = area.neighbor[key1];
                        if (waters.indexOf(area1) >= 0)
                            checkArea.push(area1);
                    }
                }
            }
            nerAreas = checkArea;
        }
        //设置湖泊
        for (key in waters) {
            area = waters[key];
            area.type = LloydMapData.LAKE;
        }
        while (waters.length > 0) {
            var lake = this.findLake(waters);
            lake.checkSefl();
            this._lakes.push(lake);
        }
    };
    /**修正湖泊的数量 */
    LloydMapData.prototype.amendLake = function (minCount, maxCount) {
        if (this._lakes.length >= minCount && this._lakes.length <= maxCount)
            return;
        var lake;
        var areaIds;
        var i = 0;
        var area;
        while (this._lakes.length > maxCount) {
            lake = this._lakes[0];
            this._lakes.splice(0, 1);
            areaIds = lake.getAreas();
            for (i; i < areaIds.length; i++) {
                area = this._areaDic.get(areaIds[i]);
                area.type = LloydMapData.LAND;
                area.isWater = false;
            }
        }
        var targetCount = minCount + Math.round(Math.random() * (maxCount - minCount));
        while (this._lakes.length < targetCount)
            this.createRandomLake();
    };
    //构建一个随机湖泊
    LloydMapData.prototype.createRandomLake = function () {
        var key;
        var startLakeArea;
        var area;
        for (key in this._areas) {
            startLakeArea = this._areas[key];
            if (this.isInLand(startLakeArea))
                break;
        }
        var preCount = 1;
        var preLakes = new Array();
        preLakes.push(startLakeArea);
        var ners = startLakeArea.neighbor;
        var targetCount = Math.floor(2 + Math.random() * 3);
        var check;
        while (preLakes.length < targetCount) {
            check = new Array();
            for (key in ners) {
                area = ners[key];
                if (preLakes.indexOf(area) < 0 && preLakes.length < targetCount && this.isInLand(area)) {
                    preLakes.push(area);
                    for (var i = 0; i < area.neighbor.length; i++)
                        check.push(area.neighbor[i]);
                }
            }
            ners = check;
            if (preLakes.length == preCount)
                break;
            preCount = preLakes.length;
        }
        var lake = new Lake();
        for (key in preLakes) {
            area = preLakes[key];
            area.type = LloydMapData.LAKE;
            area.isWater = true;
            lake.addArea(area.id);
        }
        this._lakes.push(lake);
    };
    /**
     * 检查是否属于内陆
     */
    LloydMapData.prototype.isInLand = function (area) {
        if (area.isWater)
            return false;
        var ners;
        ners = area.neighbor;
        var isInLand = true;
        var key;
        for (key in ners) {
            area = ners[key];
            if (area.isWater) {
                isInLand = false;
                break;
            }
        }
        return isInLand;
    };
    /**
     * 检查是否属于内水
     */
    LloydMapData.prototype.isInWater = function (area) {
        if (!area.isWater)
            return false;
        var ners;
        ners = area.neighbor;
        var isInWater = true;
        var key;
        for (key in ners) {
            area = ners[key];
            if (!area.isWater) {
                isInWater = false;
                break;
            }
        }
        return isInWater;
    };
    /**在一个数组中发现一个湖泊 */
    LloydMapData.prototype.findLake = function (areas) {
        var lake = new Lake();
        var startArea = areas[0];
        lake.addArea(startArea.id);
        areas.splice(0, 1);
        var key;
        var area;
        var checkArea;
        var nerAreas = startArea.neighbor;
        var lakeCount = nerAreas.length;
        while (lakeCount > 0) {
            checkArea = new Array();
            lakeCount = 0;
            for (key in nerAreas) {
                area = nerAreas[key];
                var index = areas.indexOf(area);
                if (index >= 0) {
                    lake.addArea(area.id);
                    areas.splice(index, 1);
                    lakeCount++;
                    var key1;
                    for (key1 in area.neighbor) {
                        var area1 = area.neighbor[key1];
                        if (areas.indexOf(area1) >= 0)
                            checkArea.push(area1);
                    }
                }
            }
            nerAreas = checkArea;
        }
        return lake;
    };
    /**获取所有的内陆 */
    LloydMapData.prototype.getAllInLand = function (initEle, minEle, maxEle) {
        if (initEle === void 0) { initEle = false; }
        if (minEle === void 0) { minEle = 0; }
        if (maxEle === void 0) { maxEle = 0; }
        var all = new Array();
        var key;
        var area;
        if (initEle) {
            for (key in this._areas) {
                area = this._areas[key];
                for (key in area.vertex) {
                    area.vertex[key].elevation = -99999;
                    if (area.isWater)
                        area.vertex[key].river = 1;
                }
            }
        }
        for (key in this._areas) {
            area = this._areas[key];
            if (initEle) {
                var toEle = -100000;
                if (area.isWater && area.type != LloydMapData.LAKE)
                    for (key in area.vertex)
                        area.vertex[key].elevation = toEle;
            }
            if (this.isInLand(area) && (maxEle == 0 || (area.getElevation() >= minEle && area.getElevation() <= maxEle)))
                all.push(area);
        }
        return all;
    };
    /**
     * 创建海拔,由高的海拔来覆盖低的海拔,海拔的变化必须衍生到海里
     * 从小到大为大陆块增加山峰,非最大的大陆块只能有一个山峰，其余的都集中在最大的大陆板块?
     * @param topMin 最高海拔最小数量
     * @param topMax 最高海拔最大数量
     * @param span 海拔的过渡数量
     */
    LloydMapData.prototype.initAltitude = function (topMin, topMax, span) {
        //计算需要多少个顶点海拔点
        var topCount = topMin + Math.floor(Math.random() * (topMax - topMin + 1));
        //将所有的内陆查询出来
        var inlands = this.getAllInLand(true);
        while (topCount > 0) {
            var checked = [];
            var randomIndex = Math.floor(Math.random() * inlands.length);
            var targetArea = inlands[randomIndex];
            inlands.splice(randomIndex, 1);
            var ners = targetArea.neighbor;
            var key;
            var area;
            for (key in ners) {
                area = ners[key];
                var index = inlands.indexOf(area);
                if (index >= 0)
                    inlands.splice(index, 1);
            }
            var p2d = targetArea.vertex[0];
            checked.push(p2d.id);
            var toEle = 40;
            p2d.elevation = toEle;
            var nearPs = p2d.nears;
            var checkPs;
            while (nearPs.length > 0) {
                checkPs = new Array();
                toEle -= span;
                for (key in nearPs) {
                    p2d = nearPs[key];
                    if (checked.indexOf(p2d.id) >= 0)
                        continue;
                    checked.push(p2d.id);
                    if (p2d.elevation < toEle)
                        p2d.elevation = toEle;
                    for (key in p2d.nears) {
                        if (checked.indexOf(p2d.nears[key].id) < 0 && p2d.nears[key].elevation != -100000)
                            checkPs.push(p2d.nears[key]);
                    }
                }
                nearPs = checkPs;
            }
            topCount--;
        }
    };
    /**
     * 创建河流
     * @param lakeMin 每个湖泊最少河流
     * @param lakeMax 每个湖泊最大河流
     * @param randomMin 随机河流条数
     * @param randomMax 最大河流随机条数
     * @param eleMin 随机河流的最小海拔限制
     */
    LloydMapData.prototype.initRiver = function (lakeMin, lakeMax, randomMin, randomMax, eleMin) {
        var lakeStarts = new Array();
        var key;
        var lake;
        var riverCount;
        var i;
        var area;
        var p2d;
        var river;
        for (key in this._lakes) {
            lake = this._lakes[key];
            riverCount = Math.floor(lakeMin + Math.random() * (lakeMax - lakeMin + 1));
            while (riverCount > 0) {
                for (i = 0; i < lake.getAreas().length; i++) {
                    area = this._areaDic.get(lake.getAreas()[i]);
                    if (!this.isInWater(area))
                        break;
                }
                p2d = area.vertex[Math.floor(area.vertex.length * Math.random())];
                river = new River();
                river.startArea = area;
                lakeStarts.push(area);
                p2d.river++;
                river.downsteams.push(p2d);
                this._rivers.push(river);
                while (p2d.elevation != -100000) {
                    p2d = AreaPoint.findDownstream(p2d, river);
                    if (p2d == null)
                        break;
                    p2d.river++;
                    river.downsteams.push(p2d);
                }
                riverCount--;
            }
        }
        //创建其他的河流
        riverCount = Math.floor(randomMin + Math.random() * (randomMax - randomMin + 1));
        if (riverCount <= 0)
            return;
        var allInLands = this.getAllInLand(false, eleMin, 10000);
        while (riverCount > 0) {
            do {
                area = allInLands[Math.floor(Math.random() * allInLands.length)];
            } while (lakeStarts.indexOf(area) >= 0);
            p2d = area.vertex[Math.floor(area.vertex.length * Math.random())];
            river = new River();
            river.startArea = area;
            lakeStarts.push(area);
            p2d.river++;
            river.downsteams.push(p2d);
            this._rivers.push(river);
            while (p2d.elevation != -100000) {
                p2d = AreaPoint.findDownstream(p2d, river);
                if (p2d == null)
                    break;
                p2d.river++;
                river.downsteams.push(p2d);
            }
            riverCount--;
        }
    };
    /**
     * 湿度
     * 分为1,2,3,4,5,6
     */
    LloydMapData.prototype.initHumidity = function () {
        //先将湖泊的所有顶点设置为指定为最大湿度
        var key;
        var lake;
        var i = 0;
        var area;
        var nearArea;
        for (key in this._lakes) {
            lake = this._lakes[key];
            for (i = 0; i < lake.getAreas().length; i++) {
                area = this._areaDic.get(lake.getAreas()[i]);
                for (key in area.neighbor) {
                    nearArea = area.neighbor[key];
                    nearArea.humidity += Math.round(Math.random()) + 2; //湖泊相邻单元格湿度加
                }
            }
        }
        var river;
        var p2d;
        for (key in this._rivers) {
            river = this._rivers[key];
            river.startArea.humidity += 4; //河流的源头
            for (key in river.startArea.neighbor) {
                nearArea = river.startArea.neighbor[key];
                nearArea.humidity += 1; //河流源头相邻
            }
            var c = 0;
            for (key in river.downsteams) {
                c++;
                p2d = river.downsteams[key];
                for (key in p2d.areas) {
                    area = this._areaDic.get(p2d.areas[key]);
                    var add = 2 / c - 0.1;
                    if (add > 1)
                        add = 1;
                    if (add < 0.5)
                        area.humidity += 0.5; //河流节点周围
                    else
                        area.humidity += add; //河流节点周围
                    for (key in area.neighbor) {
                        area.neighbor[key].humidity += add; //河流节点周围的周围
                    }
                }
            }
        }
    };
    /**
     * 获取在某个地形包围中的某个地形
     */
    LloydMapData.prototype.findInTerrain = function (type) {
        var all = new Array();
        var key;
        var area;
        for (key in this._areas) {
            area = this._areas[key];
            if (area.type != type)
                continue;
            var isInType = true;
            for (key in area.neighbor) {
                if (area.neighbor[key].type != type) {
                    isInType = false;
                    break;
                }
            }
            if (isInType)
                all.push(area);
        }
        return all;
    };
    /**
     * 为地图增加绿洲
     * 绿洲里必然有水源（这个根据业务开发）
     * 绿洲就是1个区域的湿度为2~1的区域,绿洲里有一定的补给
     */
    LloydMapData.prototype.amendOasis = function (addCount) {
        var areas = this.findInTerrain(LloydMapData.O_1);
        var randomIndex;
        var area;
        var key;
        var needCount = addCount;
        while (needCount > 0 && areas.length > 0) {
            needCount--;
            randomIndex = Math.floor(Math.random() * areas.length);
            area = areas[randomIndex];
            areas.splice(randomIndex, 1);
            for (key in area.neighbor) {
                if (areas.indexOf(area.neighbor[key]) >= 0)
                    areas.splice(areas.indexOf(area.neighbor[key]), 1);
            }
            area.type = Math.random() >= 0.5 ? LloydMapData.O_2 : LloydMapData.O_3;
        }
        needCount = addCount;
        areas = this.findInTerrain(LloydMapData.W_1);
        while (needCount > 0 && areas.length > 0) {
            needCount--;
            randomIndex = Math.floor(Math.random() * areas.length);
            area = areas[randomIndex];
            areas.splice(randomIndex, 1);
            for (key in area.neighbor) {
                if (areas.indexOf(area.neighbor[key]) >= 0)
                    areas.splice(areas.indexOf(area.neighbor[key]), 1);
            }
            area.type = Math.random() >= 0.5 ? LloydMapData.W_2 : LloydMapData.W_3;
        }
    };
    /**设定地形 */
    LloydMapData.prototype.buildLand = function () {
        var key;
        var area;
        for (key in this._areas) {
            area = this._areas[key];
            if (area.isWater)
                continue;
            area.humidity = Math.round(area.humidity);
            var hbCount = 0;
            for (var i = 0; i < area.vertex.length; i++)
                hbCount += area.vertex[i].elevation;
            var ave = hbCount / area.vertex.length;
            if (ave > 30) {
                switch (area.humidity) {
                    case 1:
                        area.type = LloydMapData.F_1;
                        break;
                    case 2:
                        area.type = LloydMapData.F_2;
                        break;
                    case 3:
                        area.type = LloydMapData.F_3;
                        break;
                    default:
                        area.type = LloydMapData.F_4;
                        break;
                }
            }
            else if (ave > 20) {
                switch (area.humidity) {
                    case 1:
                        area.type = LloydMapData.T_1;
                        break;
                    case 2:
                        area.type = LloydMapData.T_2;
                        break;
                    default:
                        area.type = LloydMapData.T_3;
                        break;
                }
            }
            else if (ave > 10) {
                switch (area.humidity) {
                    case 1:
                        area.type = LloydMapData.W_1;
                        break;
                    case 2:
                        area.type = LloydMapData.W_2;
                        break;
                    case 3:
                        area.type = LloydMapData.W_3;
                        break;
                    default:
                        area.type = LloydMapData.W_4;
                        break;
                }
            }
            else {
                switch (area.humidity) {
                    case 1:
                        area.type = LloydMapData.O_1;
                        break;
                    case 2:
                        area.type = LloydMapData.O_2;
                        break;
                    case 3:
                        area.type = LloydMapData.O_3;
                        break;
                    default:
                        area.type = LloydMapData.O_4;
                        break;
                }
            }
        }
    };
    /**
     * 获取地图基础纹理
     * @return
     */
    LloydMapData.prototype.getMapBaseTextture = function (tsx, tsy) {
        if (tsx === void 0) { tsx = 800; }
        if (tsy === void 0) { tsy = 800; }
        var sx = tsx / this.sizeX;
        var sy = tsy / this.sizeY;
        var areaTotal = 0;
        var landCount = 0;
        var sp = new egret.Shape();
        var area;
        var key;
        var i;
        for (key in this._areas) {
            area = this._areas[key];
            sp.graphics.lineStyle(2, area.type, 1, true);
            sp.graphics.beginFill(area.type, 1);
            sp.graphics.moveTo(Math.floor(area.vertex[0].x * sx), Math.floor(area.vertex[0].y * sy));
            for (i = 1; i < area.vertex.length; i++)
                sp.graphics.lineTo(Math.floor(area.vertex[i].x * sx), Math.floor(area.vertex[i].y * sy));
            sp.graphics.lineTo(Math.floor(area.vertex[0].x * sx), Math.floor(area.vertex[0].y * sy));
            sp.graphics.endFill();
        }
        return sp;
    };
    /**获取河流贴图 */
    LloydMapData.prototype.getRiverTextture = function (tsx, tsy) {
        if (tsx === void 0) { tsx = 800; }
        if (tsy === void 0) { tsy = 800; }
        var sx = tsx / this.sizeX;
        var sy = tsy / this.sizeY;
        var areaTotal = 0;
        var landCount = 0;
        var sp = new egret.Shape();
        sp.graphics.beginFill(0, 0.01);
        sp.graphics.drawRect(0, 0, tsx, tsy);
        sp.graphics.endFill();
        var area;
        var key;
        var i;
        var rvP2d;
        var river;
        for (key in this._rivers) {
            river = this._rivers[key];
            rvP2d = river.downsteams[0];
            sp.graphics.lineStyle(1, LloydMapData.LAKE, 1, true);
            sp.graphics.moveTo(river.startArea.centerPoint.x * sx, river.startArea.centerPoint.y * sy);
            for (i = 0; i < river.downsteams.length; i++) {
                sp.graphics.lineTo(river.downsteams[i].x * sx, river.downsteams[i].y * sy);
                if (river.downsteams[i].river > 1)
                    sp.graphics.lineStyle(river.downsteams[i].river, LloydMapData.LAKE, 1, true);
                else
                    sp.graphics.lineStyle(1, LloydMapData.LAKE, 1, true);
            }
        }
        return sp;
    };
    /**
     * 获得出生点
     * 在第一个湖泊的旁边一个随机位置
     */
    LloydMapData.prototype.getBorn = function () {
        this.initGridDic();
        var lake = this._lakes[0];
        var key;
        var area;
        for (key in lake.getAreas()) {
            area = this._areaDic.get(lake.getAreas()[key]);
            for (key in area.neighbor) {
                if (!area.neighbor[key].isWater)
                    return new egret.Point(area.neighbor[key].centerPoint.x, area.neighbor[key].centerPoint.y);
            }
        }
        return null;
    };
    return LloydMapData;
}());
//海拔：1-4,湖泊和海洋不受海拔影响
LloydMapData.SEA = 0x104E8B;
LloydMapData.LAKE = 0x1C86EE;
LloydMapData.F_4 = 0xf8f8f8; //雪-----海拔4
LloydMapData.F_3 = 0xdddcbd; //苔原
LloydMapData.F_2 = 0xbbbbbb; //荒原
LloydMapData.F_1 = 0x999999; //焦土
LloydMapData.T_3 = 0xccd4bc; //针叶林-----海拔3
LloydMapData.T_2 = 0xc4ccbc; //灌木丛
LloydMapData.T_1 = 0xe4e7cb; //高寒荒漠
LloydMapData.W_4 = 0xa5c3a9; //温带雨林-----海拔2
LloydMapData.W_3 = 0xb4c8aa; //温带落叶林
LloydMapData.W_2 = 0xc4d3ac; //草原
LloydMapData.W_1 = 0xe4e7cb; //高寒荒漠
LloydMapData.O_4 = 0x9dbba9; //热带雨林-----海拔1
LloydMapData.O_3 = 0xaacba5; //热带季雨林
LloydMapData.O_2 = 0xc4d3ac; //草地
LloydMapData.O_1 = 0xe9ddc8; //亚热带荒漠
LloydMapData._fixFloorTypes = [
    LloydMapData.SEA,
    LloydMapData.LAKE,
    LloydMapData.F_4,
    LloydMapData.F_3,
    LloydMapData.F_2,
    LloydMapData.F_1,
    LloydMapData.T_3,
    LloydMapData.T_2,
    LloydMapData.T_1,
    LloydMapData.W_4,
    LloydMapData.W_3,
    LloydMapData.W_2,
    LloydMapData.W_1,
    LloydMapData.O_4,
    LloydMapData.O_3,
    LloydMapData.O_2,
    LloydMapData.O_1,
];
//---------过度参数--------
LloydMapData.LAND = 0x398d32;
__reflect(LloydMapData.prototype, "LloydMapData");
//# sourceMappingURL=LloydMapData.js.map