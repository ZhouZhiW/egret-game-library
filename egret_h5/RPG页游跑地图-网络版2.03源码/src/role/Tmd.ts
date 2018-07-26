/**
 *
 * 匿名函数 操作 外部变量
 *
 */
class Tmd {
    private aaa:number = 0;
    private bbb:string = "";
	public constructor() {
	}
	public setTmd_a(a:number):void{
	    this.aaa = a;
	}
	public getTmd_a():number{
	    return this.aaa;
	}
    public setTmd_b(b: string): void {
        this.bbb = b;
    }
    public getTmd_b(): string {
        return this.bbb;
    }
}
