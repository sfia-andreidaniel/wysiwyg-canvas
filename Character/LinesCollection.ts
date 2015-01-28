class Character_LinesCollection {
	
	private items: Character_Line[];
	private count: number = 0;

	constructor( ) {
		this.items = [];
	}

	public reset() {
		var i: number = 0;

		for ( i=0; i<this.count; i++ ) {
			this.items[i] = null;
		}

		this.count = 0;
	}

	public length(): number {
		return this.count;
	}

	public add( line: Character_Line ): Character_Line {
		
		line.index = this.count;

		this.items[ this.count ] = line;
		this.count++;
		return line;
	}

	public at( index: number ): Character_Line {

		if ( !this.items[ index ] ) {
			throw "ERR_INDEX_OUTSIDE_BOUNDS (" + index + ")";
		}

		if ( this.items[ index ].fragmentIndexStart === null ) {
			this.items[ index ].buildIndexes();
		}

		return this.items[ index ] || null;
	}

}