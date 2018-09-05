module d5power {
	/**
	 *
	 * @author 
	 *
	 */
	export interface ID5Particle {
    	
        run(t:number):void;
        isLife(t:number):boolean;
        dispose():void;
	}
}
