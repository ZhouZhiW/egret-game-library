/**移动处理类，返回摄像机和人物的坐标
 * 
 */
class Move {

	/**移动
	 * 
	 * @param moveEnum 移动Enum
	 * @param hero 人物
	 * @param camera 相机
	 * @param mapInfo 地图信息
	 */
	public move(moveEnum:MoveEnum,hero:RoleBase,camera:eui.Scroller,mapInfo:MapInformation):MoveUtil{
		let endPoint:MoveUtil=null;
		switch(moveEnum){
			case MoveEnum.LEFT:endPoint=this.calculateLOrT(new MoveUtil(camera.viewport.scrollH,hero.x),mapInfo.width,mapInfo.tileWidth,camera.width,mapInfo.tileWidth);break;
			case MoveEnum.RIGHT:endPoint=this.calculateROrB(new MoveUtil(camera.viewport.scrollH,hero.x),hero.width,mapInfo.width,mapInfo.tileWidth,camera.width,mapInfo.tileWidth);break;
			case MoveEnum.TOP:endPoint=this.calculateLOrT(new MoveUtil(camera.viewport.scrollV,hero.y),mapInfo.height,mapInfo.tileHeight,camera.height,mapInfo.tileHeight);break;
			case MoveEnum.BOTTOM:endPoint=this.calculateROrB(new MoveUtil(camera.viewport.scrollV,hero.y),hero.height,mapInfo.height,mapInfo.tileHeight,camera.height,mapInfo.tileHeight);break;
		}
		return endPoint;
	}
	private calculateLOrT(movePoint:MoveUtil,mapAspect:number,tileAspect:number,scrollAspect:number,moveDistance:number):MoveUtil{
		if(scrollAspect>=mapAspect){
			if(movePoint.realPosition>0){
				movePoint.realPosition-=moveDistance;
				return movePoint;
			}
		}
		if(scrollAspect<mapAspect){
			if(movePoint.scrollPosition+scrollAspect==mapAspect){
				if(movePoint.realPosition>=mapAspect-scrollAspect/2&&movePoint.realPosition<mapAspect){
					movePoint.realPosition-=moveDistance;
					return movePoint;					
				}
			}
			let space:number=(mapAspect-scrollAspect)%tileAspect;
			if(movePoint.realPosition<mapAspect-scrollAspect/2&&movePoint.scrollPosition>space){
				movePoint.scrollPosition-=moveDistance;
				movePoint.realPosition-=moveDistance;
				return movePoint;
			}
			if(movePoint.scrollPosition==0){
				if(movePoint.realPosition>0&&movePoint.realPosition<=scrollAspect/2){
					movePoint.realPosition-=moveDistance;						
				}
					return movePoint;	
			}				
			if(movePoint.scrollPosition==space){
				movePoint.realPosition-=tileAspect-space;
				movePoint.scrollPosition-=space;
				return movePoint;
			}
		}
		return movePoint;
	}
	private calculateROrB(movePoint:MoveUtil,roleAspect:number,mapAspect:number,tileAspect:number,scrollAspect:number,moveDistance:number):MoveUtil{
		if(scrollAspect>=mapAspect){
			if(movePoint.realPosition+tileAspect<mapAspect){
				movePoint.realPosition+=moveDistance;
				return movePoint;
			}
		}
		if(scrollAspect<mapAspect){
			if(movePoint.realPosition+tileAspect<scrollAspect/2){
				movePoint.realPosition+=moveDistance;
				return movePoint;
			}
			let space:number=(mapAspect-scrollAspect)%tileAspect;
			if(movePoint.realPosition>=scrollAspect/2-tileAspect&&movePoint.realPosition+scrollAspect/2+tileAspect+space<mapAspect){
				movePoint.realPosition+=moveDistance;
				movePoint.scrollPosition+=moveDistance;
				return movePoint;
			}
			if(movePoint.realPosition+tileAspect>=mapAspect-scrollAspect/2&&movePoint.scrollPosition+scrollAspect+space<mapAspect){
				movePoint.scrollPosition+=moveDistance;
				movePoint.realPosition+=moveDistance;
				return movePoint;
			}
			if(movePoint.scrollPosition+scrollAspect==mapAspect){
				if(movePoint.realPosition+tileAspect>=mapAspect-scrollAspect/2&&movePoint.realPosition+tileAspect<mapAspect){
					movePoint.realPosition+=moveDistance;
				}	
				return movePoint;
			}
			if(movePoint.scrollPosition+scrollAspect+space==mapAspect){
				movePoint.realPosition+=tileAspect-space;
				movePoint.scrollPosition+=space;
				return movePoint;			
			}
		}
		return movePoint;
	}
}