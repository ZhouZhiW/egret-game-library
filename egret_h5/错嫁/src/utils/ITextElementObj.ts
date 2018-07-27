/**
 *
 * @author 
 *
 */
class ITextElementObj {
    private text: string;
    private style: ITextStyleObj;
    public constructor(str: string, mtextColor: number) {
        this.text = str;
        this.style = new ITextStyleObj(mtextColor);
    }
}
