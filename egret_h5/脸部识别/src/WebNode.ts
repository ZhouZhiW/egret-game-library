module one {
    /**
     * 显示到 egret 中的 DOM 元件
     */
    export class WebNode extends egret.DisplayObject {
        private tempStage: egret.Stage;

        private domNode: DOMNode;

        public constructor() {
            super();

            this.domNode = new DOMNode();
            this.domNode.mapDisplayObject(this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);

            this.$renderNode = new egret.sys.RenderNode();
        }

        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        public bind(element: HTMLElement): void {
            this.domNode.bind(element);
        }

        /**
         * 解绑 DOM 元件
         */
        public unbind(): void {
            this.domNode.unbind();
        }

        private addToStage(): void {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                this.domNode.show();
                this.domNode.updatePosition();

                this.tempStage = this.stage;
                this.tempStage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            }
        }

        private removeFromStage(): void {
            this.tempStage.removeEventListener(egret.Event.RESIZE, this.onResize, this);

            this.domNode.hide();

            this.tempStage = null;
        }

        private onResize(): void {
            this.domNode.updatePosition();
        }

        $update(dirtyRegionPolicy: string, bounds?: egret.Rectangle): boolean {
            let result = super.$update(dirtyRegionPolicy, bounds);

            this.domNode.updatePosition();

            return result;
        }
    }
}