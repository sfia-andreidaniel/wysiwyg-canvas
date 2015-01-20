class HTML_Table_Edge {

	public value: number = 0;
	public scaledValue: number = 0;

	public indexStart: number = 0;
	public indexEnd: number = 0;

	constructor ( public index: number, public group: HTML_Table_EdgesCollection ) {
	}

	public setValue( amount: number ) {
		
		amount = ~~amount;

		if ( this.value < amount ) {
			this.value = amount;
			this.scaledValue = amount;
		}
	}
	
}