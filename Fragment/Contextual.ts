class Fragment_Contextual {

	public start: number = 0;
	public end  : number = 0;

	public parts: Fragment_Contextual_Item[] = [];

	constructor( fragment: Fragment, indexStart: number = 0, indexEnd: number = 0 ) {
		var tmp: number = 0;
		
		if ( indexStart > indexEnd ) {
			tmp = indexStart;
			indexStart = indexEnd;
			indexEnd = tmp;
		}

		this.start = indexStart;
		this.end   = indexEnd;
	}
}