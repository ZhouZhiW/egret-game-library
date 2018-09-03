/**
 * 特殊的链表数组,可通过排序链表成员中的某个字段达到效果排序的效果
 * 为满足一些特殊需求,这里只排序从小到大.
 * 该数组主要用于实时排序,但大部分参与排序对象是静止不动的时候效果更佳
 * @author nodep
 * @version 1.0
 */
class LinkArray {

	//是否在添加元素的时候自动排序,只能通过buildLink来实现
	private _autoLink: boolean = false;
	//排序字段
	private _sortArg: string;
	//内部数组
	private _list: Array<ILink> = new Array<ILink>();
	//开始
	private _start: ILink;
	//结束
	private _end: ILink;
	//遍历对象
	private _ite: ILink;

	public constructor() {
	}

	/**重置迭代 */
	public resetIteration(): void {
		this._ite = null;
	}

	/**遍历下一个 */
	public next(): any {
		if (this._ite == null)
			this._ite = this._start;
		else
			this._ite = this._ite.getNext();
		return this._ite;
	}

	/**
	 * 按照指定的参数重新构建link
	 * 为链表设置一个排序的键,因为用到的地方比较单一,暂时不实现多字段。
	 */
	public buildLink(arg: string): void {
		this._sortArg = arg;
		var sortBy: string = this._sortArg;
		this._autoLink = true;
		this._list.sort(function (a: ILink, b: ILink): number {
			if (a[sortBy] > b[sortBy])
				return 1;
			else if (a[sortBy] == b[sortBy])
				return 0;
			return -1;
		});
		var i: number = 0;
		var ele: ILink;
		for (i; i < this._list.length; i++) {
			ele = this._list[i];
			if (this._list.length > i + 1)//设置下一个
				ele.setNext(this._list[i + 1]);
			else//设置为结束
				this._end = ele;
			if (i == 0)
				this._start = ele;
			else
				ele.setPre(this._list[i - 1]);
		}
	}

	/**互换位置 */
	public swapNear(lk1: ILink, nearTo: number): void {
		var index1: number = this._list.indexOf(lk1);
		var index2: number = index1 + nearTo;
		var lk2: ILink = this._list[index2];
		this._list[index2] = lk1;
		this._list[index1] = lk2;
		if (nearTo == -1)//和前置交换
		{
			lk1.setPre(lk2.getPre());
			lk2.setNext(lk1.getNext());
			lk2.setPre(lk1);
			lk1.setNext(lk2);
			if(lk1.getPre()!=null)
				lk1.getPre().setNext(lk1);
			if(lk2.getNext()!=null)
				lk2.getNext().setPre(lk2);
		}
		else {//和后置交换
			lk1.setNext(lk2.getNext());
			lk2.setPre(lk1.getPre());
			lk2.setNext(lk1);
			lk1.setPre(lk2);
			if(lk1.getNext()!=null)
				lk1.getNext().setPre(lk1);
			if(lk2.getPre()!=null)
				lk2.getPre().setNext(lk2);
		}
	}

	/**
	 * 像link中添加一个对象
	 * @param 添加的元素 必须实现ILink
	 * @returns 添加的元素所在位置(排序后的)
	 */
	public put(ele: any): number {
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
	}

	/**
	 * 删除一个元素
	 */
	public remove(ele: any): void {
		var index: number = this._list.indexOf(ele);
		if (index < 0)
			return;
		this._list.splice(index, 1);
		var lk: ILink = ele as ILink;
		if (lk.getNext() != null)
			lk.getNext().setPre(lk.getPre());
		if (lk.getPre() != null)
			lk.getPre().setNext(lk.getNext());
		lk.setPre(null);
		lk.setNext(null);
	}

	/**
	 * 将一个元素按照指定的规则插入到一个范围内
	 */
	private insertEle(ele: any, sIndex: number, endIndex: number): number {
		if (sIndex != endIndex) {
			if (ele[this._sortArg] <= this._list[sIndex][this._sortArg])//如果小于开端,插入开端
				return this.insertEle(ele, sIndex, sIndex);
			else if (ele[this._sortArg] >= this._list[endIndex - 1][this._sortArg])//如果大于结尾,插入到末端
				return this.insertEle(ele, endIndex, endIndex);
			else//将数组一分为二,进行插入.取中间位置,如果<=后部的开端,用前部。如果>后部开端,用后部
			{
				var cutIndex: number = Math.floor((endIndex - sIndex) / 2) + sIndex;//得到后部开端坐标
				if (ele[this._sortArg] <= this._list[cutIndex][this._sortArg])
					return this.insertEle(ele, sIndex, cutIndex);
				else
					return this.insertEle(ele, cutIndex, endIndex);
			}
		}
		else//如果两者相等,即插入点
		{
			var len: number = this._list.length;
			this._list.splice(sIndex, 0, ele);
			if (sIndex == 0)//加在开头
			{
				this._start = ele;
				if (this._list.length > sIndex + 1)//连接0,1位
				{
					this._list[sIndex].setNext(this._list[sIndex + 1]);
					this._list[sIndex + 1].setPre(this._list[sIndex]);
				}
			}
			else if (sIndex >= len)//加在末尾
			{
				this._end = ele;//连接末尾两位
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
	}
}