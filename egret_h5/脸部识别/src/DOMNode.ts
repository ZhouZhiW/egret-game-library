module one {
	class DOMRoot {
        private static tempStage: egret.Stage;
        /**
         * 初始化 DOM root，调用一次即可
         */
        static initDOMRoot(stage: egret.Stage): void {
            let rootDiv = document.getElementById("egretDOMRoot") as HTMLDivElement;
            if (rootDiv == null) {
                let player = document.getElementsByClassName("egret-player")[0];
                rootDiv = document.createElement("div");
                initElementStyle(rootDiv);
                rootDiv.setAttribute("id", "egretDOMRoot");

                player.appendChild(rootDiv);

                DOMRoot.tempStage = stage;

                let onResize = () => {
                    let player = document.getElementsByClassName("egret-player")[0];
                    let canvas = player.getElementsByTagName("canvas")[0];

                    let playerRect = player.getBoundingClientRect();
                    let canvasRect = canvas.getBoundingClientRect();
                    let shouldRotate = false;

                    let orientation: string = this.tempStage.orientation;
                    if (orientation != egret.OrientationMode.AUTO) {
                        shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                            || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
                    }

                    let domScaleX;
                    let domScaleY;
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
                }

                this.tempStage.addEventListener(egret.Event.RESIZE, onResize, this);
                onResize();
            }
        }

        static getDOMRoot(): HTMLDivElement {
            let rootDiv = document.getElementById("egretDOMRoot") as HTMLDivElement;
            if (DEBUG) {
                if (rootDiv == null) {
                    console.error("请先调用 initDOMRoot 初始化");
                }
            }
            return rootDiv;
        }

    }

    function initElementStyle(element: HTMLElement): void {
        element.style.position = "absolute";
        element.style.border = "0";
        element.style.left = "0px";
        element.style.top = "0px";
    }

    /**
     * DOM 元件和 egret 显示对象的映射。 egret 显示对象属性的修改会同时改变 DOM 元件属性
     */
    export class DOMNode {
        private node: HTMLDivElement;
        public constructor() {
            this.node = document.createElement("div");
            initElementStyle(this.node);
        }

        private element: HTMLElement;

        private dp: egret.DisplayObject;
        /**
         * 将 DOM 节点和 egret 对象映射
         */
        public mapDisplayObject(displayObject: egret.DisplayObject): void {
            this.dp = displayObject;
        }

        /**
         * 显示 DOM 节点
         */
        public show(): void {
            DOMRoot.initDOMRoot(this.dp.stage);

            let rootDiv = DOMRoot.getDOMRoot();

            rootDiv.appendChild(this.node);
        }

        /**
         * 隐藏 DOM 节点
         */
        public hide(): void {
            if (this.node && this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }
        }

        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        public bind(element: HTMLElement): void {
            this.unbind();

            this.element = element;
            this.element.style.width = "100%";
            this.element.style.height = "100%";
            initElementStyle(this.element);
            this.node.appendChild(element);
        }

        /**
         * 解绑 DOM 元件
         */
        public unbind(): void {
            if (this.element && this.element.parentNode == this.node) {
                this.node.removeChild(this.element);
            }
            this.element = null;
        }

        updatePosition(): void {
            let displayObject = this.dp;

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

            let matrix = displayObject.$renderNode.renderMatrix;
            if (this.lastMatrix.a != matrix.a
                || this.lastMatrix.b != matrix.b
                || this.lastMatrix.c != matrix.c
                || this.lastMatrix.d != matrix.d
                || this.lastMatrix.tx != matrix.tx
                || this.lastMatrix.ty != matrix.ty
            ) {
                let transformKey = egret["web"].getPrefixStyleName("transform");
                this.node.style.transformOrigin = "0% 0% 0px";
                this.node.style[transformKey] = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.tx + "," + matrix.ty + ")";

                this.lastMatrix.a = matrix.a;
                this.lastMatrix.b = matrix.b;
                this.lastMatrix.c = matrix.c;
                this.lastMatrix.d = matrix.d;
                this.lastMatrix.tx = matrix.tx;
                this.lastMatrix.ty = matrix.ty
            }

            let width = displayObject.width;
            if (this.lastWidth != width) {
                this.node.style.width = width + "px";
                this.lastWidth = width;
            }
            let height = displayObject.height;
            if (this.lastHeight != height) {
                this.node.style.height = height + "px";
                this.lastHeight = height;
            }
        }

        private lastMatrix: egret.Matrix = new egret.Matrix();
        private lastWidth: number = 0;
        private lastHeight: number = 0;
    }
}