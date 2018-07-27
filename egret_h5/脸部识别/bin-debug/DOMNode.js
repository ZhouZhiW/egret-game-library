var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var one;
(function (one) {
    var DOMRoot = (function () {
        function DOMRoot() {
        }
        /**
         * 初始化 DOM root，调用一次即可
         */
        DOMRoot.initDOMRoot = function (stage) {
            var _this = this;
            var rootDiv = document.getElementById("egretDOMRoot");
            if (rootDiv == null) {
                var player = document.getElementsByClassName("egret-player")[0];
                rootDiv = document.createElement("div");
                initElementStyle(rootDiv);
                rootDiv.setAttribute("id", "egretDOMRoot");
                player.appendChild(rootDiv);
                DOMRoot.tempStage = stage;
                var onResize = function () {
                    var player = document.getElementsByClassName("egret-player")[0];
                    var canvas = player.getElementsByTagName("canvas")[0];
                    var playerRect = player.getBoundingClientRect();
                    var canvasRect = canvas.getBoundingClientRect();
                    var shouldRotate = false;
                    var orientation = _this.tempStage.orientation;
                    if (orientation != egret.OrientationMode.AUTO) {
                        shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                            || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
                    }
                    var domScaleX;
                    var domScaleY;
                    if (shouldRotate) {
                        domScaleX = canvasRect.width / canvas.height;
                        domScaleY = canvasRect.height / canvas.width;
                    }
                    else {
                        domScaleX = canvasRect.width / canvas.width;
                        domScaleY = canvasRect.height / canvas.height;
                    }
                    rootDiv.style.left = canvas.style.left;
                    rootDiv.style.top = canvas.style.top;
                    // rootDiv.style.width = DOMRoot.tempStage.stageWidth + "px";
                    // rootDiv.style.height = DOMRoot.tempStage.stageHeight + "px";
                    rootDiv.style.transformOrigin = "0% 0% 0px";
                    rootDiv.style.transform = canvas.style.transform + " scale(" + domScaleX + "," + domScaleY + ")";
                };
                this.tempStage.addEventListener(egret.Event.RESIZE, onResize, this);
                onResize();
            }
        };
        DOMRoot.getDOMRoot = function () {
            var rootDiv = document.getElementById("egretDOMRoot");
            if (true) {
                if (rootDiv == null) {
                    console.error("请先调用 initDOMRoot 初始化");
                }
            }
            return rootDiv;
        };
        return DOMRoot;
    }());
    __reflect(DOMRoot.prototype, "DOMRoot");
    function initElementStyle(element) {
        element.style.position = "absolute";
        element.style.border = "0";
        element.style.left = "0px";
        element.style.top = "0px";
    }
    /**
     * DOM 元件和 egret 显示对象的映射。 egret 显示对象属性的修改会同时改变 DOM 元件属性
     */
    var DOMNode = (function () {
        function DOMNode() {
            this.lastMatrix = new egret.Matrix();
            this.lastWidth = 0;
            this.lastHeight = 0;
            this.node = document.createElement("div");
            initElementStyle(this.node);
        }
        /**
         * 将 DOM 节点和 egret 对象映射
         */
        DOMNode.prototype.mapDisplayObject = function (displayObject) {
            this.dp = displayObject;
        };
        /**
         * 显示 DOM 节点
         */
        DOMNode.prototype.show = function () {
            DOMRoot.initDOMRoot(this.dp.stage);
            var rootDiv = DOMRoot.getDOMRoot();
            rootDiv.appendChild(this.node);
        };
        /**
         * 隐藏 DOM 节点
         */
        DOMNode.prototype.hide = function () {
            if (this.node && this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }
        };
        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        DOMNode.prototype.bind = function (element) {
            this.unbind();
            this.element = element;
            this.element.style.width = "100%";
            this.element.style.height = "100%";
            initElementStyle(this.element);
            this.node.appendChild(element);
        };
        /**
         * 解绑 DOM 元件
         */
        DOMNode.prototype.unbind = function () {
            if (this.element && this.element.parentNode == this.node) {
                this.node.removeChild(this.element);
            }
            this.element = null;
        };
        DOMNode.prototype.updatePosition = function () {
            var displayObject = this.dp;
            if (displayObject.stage == null) {
                return;
            }
            if (displayObject.$renderNode.renderVisible = false || displayObject.$renderNode.renderAlpha == 0) {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                    return;
                }
            }
            else {
                if (this.element && this.element.parentNode == null) {
                    this.node.appendChild(this.element);
                }
            }
            var matrix = displayObject.$renderNode.renderMatrix;
            if (this.lastMatrix.a != matrix.a
                || this.lastMatrix.b != matrix.b
                || this.lastMatrix.c != matrix.c
                || this.lastMatrix.d != matrix.d
                || this.lastMatrix.tx != matrix.tx
                || this.lastMatrix.ty != matrix.ty) {
                var transformKey = egret["web"].getPrefixStyleName("transform");
                this.node.style.transformOrigin = "0% 0% 0px";
                this.node.style[transformKey] = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.tx + "," + matrix.ty + ")";
                this.lastMatrix.a = matrix.a;
                this.lastMatrix.b = matrix.b;
                this.lastMatrix.c = matrix.c;
                this.lastMatrix.d = matrix.d;
                this.lastMatrix.tx = matrix.tx;
                this.lastMatrix.ty = matrix.ty;
            }
            var width = displayObject.width;
            if (this.lastWidth != width) {
                this.node.style.width = width + "px";
                this.lastWidth = width;
            }
            var height = displayObject.height;
            if (this.lastHeight != height) {
                this.node.style.height = height + "px";
                this.lastHeight = height;
            }
        };
        return DOMNode;
    }());
    one.DOMNode = DOMNode;
    __reflect(DOMNode.prototype, "one.DOMNode");
})(one || (one = {}));
