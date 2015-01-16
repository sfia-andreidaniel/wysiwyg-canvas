class Character_Word {
	
	//<constructor> public characters: Character[];
	private size: number[] = null;

	constructor ( public characters: Character[] ) {}

	public computeSize(): number[] { /* [0] => width, [1] => height */
		var i: number,
		    len: number,
		    size: number[] = [0,0],
		    charSize: number[];

		if ( this.size ) {
			return this.size;
		} else {
	
			for ( i=0, len=this.characters.length; i<len; i++ ) {
				charSize = this.characters[i].computeSize();
				size[0] += charSize[0];
				size[1] = Math.max( size[1], charSize[1] );
			}

			this.size = size;

			return size;

		}

	}

	public toString(): string {
		var out = '';
		for ( var i=0, len = this.characters.length; i<len; i++ ) {
			out += this.characters[i].letter();
		}
		return out;
	}

}