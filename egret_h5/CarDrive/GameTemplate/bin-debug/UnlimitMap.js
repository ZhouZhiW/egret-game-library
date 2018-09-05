var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var d5power;
(function (d5power) {
    var UnlimitMap = (function () {
        /**
         *
         * @param goManager 用来维护和管理地图场景中的各种游戏对象的管理器
         */
        function UnlimitMap(goManager) {
            if (goManager === void 0) { goManager = null; }
            /**
             * 区块文件格式
             */
            this._tileFormat = '.jpg';
            /**
             * 路点宽度
             */
            this._roadW = 60;
            /**
             * 路点高度
             */
            this._roadH = 30;
            /**
             * 当前渲染的起始区块x
             */
            this._nowStartX = -1;
            /**
             * 当前渲染的起始区块y
             */
            this._nowStartY = -1;
            this._tempPoint = new egret.Point();
            this._gameObjectManager = goManager;
        }
        UnlimitMap.rebuildPool = function (num) {
            if (UnlimitMap._tilePool.length > num) {
                while (UnlimitMap._tilePool.length > num)
                    UnlimitMap._tilePool.pop();
            }
            else {
                while (UnlimitMap._tilePool.length < num)
                    UnlimitMap._tilePool.push(new egret.Bitmap());
            }
            //console.log("[UnlimitMap] there are ",num,"tiles in pool.");
        };
        /**
         * 将地砖回收至地砖池
         * @param data 需要回收的地砖
         */
        UnlimitMap.back2pool = function (data) {
            if (UnlimitMap._tilePool.indexOf(data) == -1)
                UnlimitMap._tilePool.push(data);
            //console.log("[UnlimitMap] 1 tiles get home.there are ",UnlimitMap._tilePool.length,"tiles in pool.");
        };
        /**
         * 获取一个地砖
         */
        UnlimitMap.getTile = function () {
            var data;
            data = UnlimitMap._tilePool.length ? UnlimitMap._tilePool.pop() : new egret.Bitmap();
            //console.log("[UnlimitMap] pop 1 tiles.there are ",UnlimitMap._tilePool.length,"tiles in pool.");
            data.texture = null;
            return data;
        };
        /**
         * 临时创建一个循环地砖的地图
         * @param id 地图编号
         * @param bg 循环地砖素材
         * @param callback 准备完成后的触发函数
         * @param thisobj 触发函数的对象引用
         * @param blockw 区块宽度
         * @param blockh 区块高度
         */
        UnlimitMap.prototype.createLoop = function (id, bg, callback, thisobj, blockw, blockh) {
            if (blockw === void 0) { blockw = 10; }
            if (blockh === void 0) { blockh = 10; }
            var that = this;
            RES.getResByUrl(bg, function (data) {
                that._mapid = id;
                that._tileW = data.textureWidth;
                that._tileH = data.textureHeight;
                that._mapHeight = this._tileH * blockh;
                that._mapWidth = this._tileW * blockw;
                that._onReady = callback;
                that._onReadyThis = thisobj;
                that._nowStartX = -1;
                that._nowStartY = -1;
                that._loopBg = data;
                that.setupRoad(null);
                if (that._dbuffer) {
                    that._dbuffer.texture = data;
                    that._dbuffer.width = that._mapWidth;
                    that._dbuffer.height = that._mapHeight;
                    that._dbuffer.anchorOffsetX = that._tileW;
                    that._dbuffer.anchorOffsetY = that._tileH;
                }
            }, this);
        };
        /**
         * 进入一个地图
         * @param id 地图编号
         * @param callback 地图准备完成后的触发函数
         * @param thisobj 地图准备完成后的触发函数的处理对象
         */
        UnlimitMap.prototype.enter = function (id, callback, thisobj) {
            var that = this;
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + "/tiles/" + id + "/mapconf.json", function (data) {
                that._data = data;
                that.setup(parseInt(data.id), parseInt(data.mapW), parseInt(data.mapH), parseInt(data.tileX), parseInt(data.tileY), callback, thisobj);
            }, this);
        };
        Object.defineProperty(UnlimitMap.prototype, "id", {
            /**
             * 地图编号
             */
            get: function () {
                return this._mapid;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置主容器
         * @param container 主容器
         */
        UnlimitMap.prototype.setContainer = function (container) {
            if (container.contains(this._dbuffer))
                return;
            if (this._dbuffer != null) {
                if (this._dbuffer.parent)
                    this._dbuffer.parent.removeChild(this._dbuffer);
            }
            else {
                this._dbuffer = new egret.Bitmap();
                this._dbuffer.fillMode = egret.BitmapFillMode.REPEAT;
                if (this._loopBg)
                    this._dbuffer.texture = this._loopBg;
                this._dbuffer.width = this._mapWidth;
                this._dbuffer.height = this._mapHeight;
            }
            container.addChild(this._dbuffer);
            if (this._dbuffer.stage == null) {
                var that = this;
                this._dbuffer.once(egret.Event.ADDED_TO_STAGE, function () {
                    d5power.D5Game.screenWidth = that._dbuffer.stage.stageWidth;
                    d5power.D5Game.screenHeight = that._dbuffer.stage.stageHeight;
                }, this);
            }
            else {
                d5power.D5Game.screenWidth = this._dbuffer.stage.stageWidth;
                d5power.D5Game.screenHeight = this._dbuffer.stage.stageHeight;
            }
        };
        /**
         * 设置区块格式
         * @param s 区块格式
         */
        UnlimitMap.prototype.setTileFormat = function (s) {
            if (s.substr(0, 1) != '.')
                s = "." + s;
            this._tileFormat = s;
        };
        /**
         * 构建一个新的地图
         * @param id 地图编号
         * @param w 地图尺寸宽
         * @param h 地图尺寸高
         * @param tw 区块尺寸高
         * @param th 区块尺寸宽
         * @param onReady 地图准备完成后的回叫函数
         * @param onReadyThis this
         */
        UnlimitMap.prototype.setup = function (id, w, h, tw, th, onReady, onReadyThis) {
            this._mapid = id;
            this._mapHeight = h;
            this._mapWidth = w;
            this._tileW = tw;
            this._tileH = th;
            this._onReady = onReady;
            this._onReadyThis = onReadyThis;
            this._nowStartX = -1;
            this._nowStartY = -1;
            var that = this;
            var onSmallMapLoaded = function (data) {
                that._smallMap = new egret.SpriteSheet(data);
                that.createSmallData(data.textureWidth, data.textureHeight);
                RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + that._mapid + '/roadmap.bin', that.setupRoad, that, RES.ResourceItem.TYPE_BIN);
            };
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/s.jpg', onSmallMapLoaded, this);
        };
        /**
         *
         * @param smallW
         * @param smallH
         */
        UnlimitMap.prototype.createSmallData = function (smallW, smallH) {
            var smallWidth = smallW / (this._mapWidth / this._tileW);
            var smallHeight = smallH / (this._mapHeight / this._tileH);
            var i;
            var l;
            for (l = 0; l < this._mapWidth / this._tileW; l++) {
                for (i = 0; i < this._mapHeight / this._tileH; i++) {
                    this._smallMap.createTexture('small' + l + '_' + i, i * smallWidth, l * smallHeight, smallWidth, smallHeight, 0, 0);
                }
            }
        };
        Object.defineProperty(UnlimitMap.prototype, "width", {
            get: function () {
                return this._mapWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitMap.prototype, "height", {
            get: function () {
                return this._mapHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitMap.prototype, "tileWidth", {
            get: function () {
                return this._tileW;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitMap.prototype, "tileHeight", {
            get: function () {
                return this._tileH;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitMap.prototype, "roadWidth", {
            get: function () {
                return this._roadW;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitMap.prototype, "roadHeight", {
            get: function () {
                return this._roadH;
            },
            enumerable: true,
            configurable: true
        });
        UnlimitMap.prototype.render = function (flush) {
            if (flush === void 0) { flush = false; }
            var zero_x = d5power.UnlimitCamera.zeroX % this._tileW;
            var zero_y = d5power.UnlimitCamera.zeroY % this._tileH;
            this._dbuffer.x = -zero_x;
            this._dbuffer.y = -zero_y;
        };
        UnlimitMap.prototype.resize = function () {
            this._areaX = Math.ceil(d5power.D5Game.screenWidth / this._tileW) + 1;
            this._areaY = Math.ceil(d5power.D5Game.screenHeight / this._tileH) + 1;
            console.log("[D5Game] max tiles number ", this._areaX, this._areaY);
            UnlimitMap.rebuildPool(this._areaX * this._areaY + this._areaX + this._areaY);
        };
        /**
         * 重置地图数据
         */
        UnlimitMap.prototype.resetRoad = function () {
            this._roadArr = [];
            this._alphaArr = [];
            // 定义临时地图数据
            var h = Math.floor(this._mapHeight / this._roadH);
            var w = Math.floor(this._mapWidth / this._roadW);
            for (var y = 0; y < h; y++) {
                var arr = new Array();
                var arr2 = new Array();
                for (var x = 0; x < w; x++) {
                    arr.push(0);
                    arr2.push(0);
                }
                this._roadArr.push(arr);
                this._alphaArr.push(arr2);
            }
        };
        /**
         * 设置地图数据
         * @param data
         */
        UnlimitMap.prototype.setRoad = function (data) {
            this._roadArr = data;
        };
        UnlimitMap.prototype.isInAlphaArea = function (px, py) {
            var tile = this.Postion2Tile(px, py);
            return this._alphaArr[tile.y] && this._alphaArr[tile.y][tile.x] == UnlimitMap.BIN_ALPHA_VALUE;
        };
        /**
         * 尝试寻找周围可以通过的位置
         * 进行若干次尝试，如果没有发现，则返回null，请注意容错判断
         */
        UnlimitMap.prototype.getPointAround = function (center, from, r) {
            if (!center || !from)
                return null;
            var i = 0;
            var max = 5;
            var step = Math.PI * 2 / max;
            var gotoP = new egret.Point();
            var angle = d5power.GMath.getPointAngle(center.x - from.x, center.y - from.y) + (Math.random() > .5 ? 1 : -1) * Math.PI / 8;
            while (i < max) {
                var n = step * i + angle;
                gotoP.x = Math.round(center.x - r * Math.cos(n));
                gotoP.y = Math.round(center.y - r * Math.sin(n));
                if (this.PointCanMove(gotoP, from)) {
                    return gotoP;
                }
                i++;
            }
            return null;
        };
        UnlimitMap.prototype.PointCanMove = function (p, n) {
            if (this._astar == null)
                return true;
            var nodeArr = this._astar.find(n.x, n.y, p.x, p.y);
            return nodeArr != null;
        };
        UnlimitMap.prototype.getRoadPass = function (px, py) {
            if (this._roadArr[py] == null || this._roadArr[py][px] != 0)
                return false;
            return true;
        };
        UnlimitMap.prototype.findPath = function (fromx, fromy, tox, toy) {
            return this._astar == null ? null : this._astar.find(fromx, fromy, tox, toy);
        };
        /**
         * 根据屏幕某点坐标获取其在世界（全地图）内的坐标
         */
        UnlimitMap.prototype.getWorldPostion = function (x, y) {
            this._tempPoint.x = d5power.UnlimitCamera.zeroX + x;
            this._tempPoint.y = d5power.UnlimitCamera.zeroY + y;
            return this._tempPoint;
        };
        /**
         * 根据世界坐标获取在屏幕内的坐标
         */
        UnlimitMap.prototype.getScreenPostion = function (x, y) {
            this._tempPoint.x = x - d5power.UnlimitCamera.zeroX;
            this._tempPoint.y = y - d5power.UnlimitCamera.zeroY;
            return this._tempPoint;
        };
        /**
         * 根据路点获得世界（全地图）内的坐标
         */
        UnlimitMap.prototype.tile2WorldPostion = function (x, y) {
            this._tempPoint.x = x * this._roadW + this._roadW * .5;
            this._tempPoint.y = y * this._roadH + this._roadH * .5;
            return this._tempPoint;
        };
        /**
         * 世界地图到路点的转换
         */
        UnlimitMap.prototype.Postion2Tile = function (px, py) {
            this._tempPoint.x = Math.floor(px / this._roadW);
            this._tempPoint.y = Math.floor(py / this._roadH);
            return this._tempPoint;
        };
        UnlimitMap.prototype.reset = function () {
            this._tempPoint = new egret.Point();
            this._mapResource = { tiles: new Object() };
            //            this._tiledResource = {};
        };
        /**
         * 设置路点。至此，地图准备完毕，通知主程序开始渲染
         * @param data
         */
        UnlimitMap.prototype.setupRoad = function (res) {
            if (res == null || res == undefined) {
                this.resetRoad();
            }
            else {
                var data = new egret.ByteArray(res);
                var sign = data.readUTFBytes(5);
                var value;
                var px = 0;
                var py = 0;
                if (sign == 'D5Map') {
                    py = data.readShort();
                    px = data.readShort();
                    var resmap = [];
                    for (var y = 0; y < py; y++) {
                        var temp = [];
                        for (var x = 0; x < px; x++) {
                            temp.push(data.readByte());
                        }
                        resmap.push(temp);
                    }
                    this.resetRoad();
                    if (px > 1) {
                        var h = Math.floor(this._mapHeight / this._roadH);
                        var w = Math.floor(this._mapWidth / this._roadW);
                        var k = w == px && h == py ? 1 : py / h;
                        for (y = 0; y < h; y++) {
                            for (x = 0; x < w; x++) {
                                try {
                                    py = Math.floor(y * k);
                                    px = Math.floor(x * k);
                                    value = resmap[py][px];
                                    this._roadArr[y][x] = value == UnlimitMap.BIN_NO_VALUE ? 1 : 0;
                                    this._alphaArr[y][x] = value;
                                }
                                catch (e) {
                                    trace("［UnlimitMap］路点超出范围Y:X(" + y + ":" + x + ")", py, px);
                                    this._roadArr[y][x] = UnlimitMap.BIN_NO_VALUE;
                                    this._alphaArr[y][x] = UnlimitMap.BIN_NO_VALUE;
                                }
                            }
                        }
                    }
                }
                else {
                    console.log("[UnlimitMap]非法的地图配置文件");
                }
            }
            this.reset();
            this.resize();
            this._astar = new d5power.SilzAstar(this._roadArr);
            var length = this._data && this._data.npc ? this._data.npc.length : 0;
            if (this._gameObjectManager != null) {
                for (var i = 0; i < length; i++) {
                    var npconf = new d5power.NPConf();
                    npconf.format(this._data.npc[i]);
                    this._gameObjectManager.addNPC(npconf);
                }
            }
            if (this._onReady != null) {
                this._onReady.apply(this._onReadyThis);
            }
        };
        /**
         * 在二进制文件中，由于需要1个字节表示多个状态。因此采用大于0的值表示可通过
         * 在导入后进行了转义
         */
        UnlimitMap.BIN_ALPHA_VALUE = 2;
        UnlimitMap.BIN_CAN_VALUE = 1;
        UnlimitMap.BIN_NO_VALUE = 0;
        /**
         * 地砖池，用于地砖重用
         */
        UnlimitMap._tilePool = new Array();
        return UnlimitMap;
    }());
    d5power.UnlimitMap = UnlimitMap;
    __reflect(UnlimitMap.prototype, "d5power.UnlimitMap", ["d5power.IMap"]);
})(d5power || (d5power = {}));
//# sourceMappingURL=UnlimitMap.js.map