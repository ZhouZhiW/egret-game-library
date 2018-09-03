var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 特殊的链表数组,可通过排序链表成员中的某个字段达到效果排序的效果
 * 为满足一些特殊需求,这里只排序从小到大.
 * 该数组主要用于实时排序,但大部分参与排序对象是静止不动的时候效果更佳
 * @author nodep
 * @version 1.0
 */
var LinkArray = (function () {
    function LinkArray() {
        //是否在添加元素的时候自动排序,只能通过buildLink来实现
        this._autoLink = false;
        //内部数组
        this._list = new Array();
    }
    /**重置迭代 */
    LinkArray.prototype.resetIteration = function () {
        this._ite = null;
    };
    /**遍历下一个 */
    LinkArray.prototype.next = function () {
        if (this._ite == null)
            this._ite = this._start;
        else
            this._ite = this._ite.getNext();
        return this._ite;
    };
    /**
     * 按照指定的参数重新构建link
     * 为链表设置一个排序的键,因为用到的地方比较单一,暂时不实现多字段。
     */
    LinkArray.prototype.buildLink = function (arg) {
        this._sortArg = arg;
        var sortBy = this._sortArg;
        this._autoLink = true;
        this._list.sort(function (a, b) {
            if (a[sortBy] > b[sortBy])
                return 1;
            else if (a[sortBy] == b[sortBy])
                return 0;
            return -1;
        });
        var i = 0;
        var ele;
        for (i; i < this._list.length; i++) {
            ele = this._list[i];
            if (this._list.length > i + 1)
                ele.setNext(this._list[i + 1]);
            else
                this._end = ele;
            if (i == 0)
                this._start = ele;
            else
                ele.setPre(this._list[i - 1]);
        }
    };
    /**互换位置 */
    LinkArray.prototype.swapNear = function (lk1, nearTo) {
        var index1 = this._list.indexOf(lk1);
        var index2 = index1 + nearTo;
        var lk2 = this._list[index2];
        this._list[index2] = lk1;
        this._list[index1] = lk2;
        if (nearTo == -1) {
            lk1.setPre(lk2.getPre());
            lk2.setNext(lk1.getNext());
            lk2.setPre(lk1);
            lk1.setNext(lk2);
            if (lk1.getPre() != null)
                lk1.getPre().setNext(lk1);
            if (lk2.getNext() != null)
                lk2.getNext().setPre(lk2);
        }
        else {
            lk1.setNext(lk2.getNext());
            lk2.setPre(lk1.getPre());
            lk2.setNext(lk1);
            lk1.setPre(lk2);
            if (lk1.getNext() != null)
                lk1.getNext().setPre(lk1);
            if (lk2.getPre() != null)
                lk2.getPre().setNext(lk2);
        }
    };
    /**
     * 像link中添加一个对象
     * @param 添加的元素 必须实现ILink
     * @returns 添加的元素所在位置(排序后的)
     */
    LinkArray.prototype.put = function (ele) {
        if (this._autoLink) {
            if (this._list.length == 0) {
                this._list.push(ele);
                return 0;
            }
            return this.insertEle(ele, 0, this._list.length);
        }
        else {
            this._list.push(ele);
            return this._list.length - 1;
        }
    };
    /**
     * 删除一个元素
     */
    LinkArray.prototype.remove = function (ele) {
        var index = this._list.indexOf(ele);
        if (index < 0)
            return;
        this._list.splice(index, 1);
        var lk = ele;
        if (lk.getNext() != null)
            lk.getNext().setPre(lk.getPre());
        if (lk.getPre() != null)
            lk.getPre().setNext(lk.getNext());
        lk.setPre(null);
        lk.setNext(null);
    };
    /**
     * 将一个元素按照指定的规则插入到一个范围内
     */
    LinkArray.prototype.insertEle = function (ele, sIndex, endIndex) {
        if (sIndex != endIndex) {
            if (ele[this._sortArg] <= this._list[sIndex][this._sortArg])
                return this.insertEle(ele, sIndex, sIndex);
            else if (ele[this._sortArg] >= this._list[endIndex - 1][this._sortArg])
                return this.insertEle(ele, endIndex, endIndex);
            else {
                var cutIndex = Math.floor((endIndex - sIndex) / 2) + sIndex; //得到后部开端坐标
                if (ele[this._sortArg] <= this._list[cutIndex][this._sortArg])
                    return this.insertEle(ele, sIndex, cutIndex);
                else
                    return this.insertEle(ele, cutIndex, endIndex);
            }
        }
        else {
            var len = this._list.length;
            this._list.splice(sIndex, 0, ele);
            if (sIndex == 0) {
                this._start = ele;
                if (this._list.length > sIndex + 1) {
                    this._list[sIndex].setNext(this._list[sIndex + 1]);
                    this._list[sIndex + 1].setPre(this._list[sIndex]);
                }
            }
            else if (sIndex >= len) {
                this._end = ele; //连接末尾两位
                this._list[sIndex].setPre(this._list[sIndex - 1]);
                this._list[sIndex - 1].setNext(this._list[sIndex]);
            }
            else {
                //重新连接
                this._list[sIndex].setPre(this._list[sIndex - 1]);
                this._list[sIndex].setNext(this._list[sIndex + 1]);
                this._list[sIndex + 1].setPre(this._list[sIndex]);
                this._list[sIndex - 1].setNext(this._list[sIndex]);
            }
            return sIndex;
        }
    };
    return LinkArray;
}());
__reflect(LinkArray.prototype, "LinkArray");
//# sourceMappingURL=LinkArray.js.map