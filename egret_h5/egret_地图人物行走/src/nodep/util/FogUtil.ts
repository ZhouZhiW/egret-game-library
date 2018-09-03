
/**单个地图块的迷雾的类
 * 
 */
class FogUtil {
	constructor(columnCount:number,rowCount:number){
		this.fogCount=columnCount*rowCount;
		for(let rowNumber:number=0;rowNumber<rowCount;rowNumber++){
			let bArray:Array<boolean>=new Array<boolean>();
			for(let columnNumber:number=0;columnNumber<columnCount;columnNumber++){
				let b:boolean=true;
				bArray.push(b);
			}
			this.isExploreArray.push(bArray);
		}
	}
	public fogCount:number=0;

	public isExploreArray:Array<Array<boolean>>=Array<Array<boolean>>();
}