class Character_Word {
	
	//<constructor> public characters: Character[];
	private size: number[] = null;
	public  isBR: boolean;

	constructor ( public characters: Character[] ) {
		if ( this.characters[0].isBR ) {
			this.isBR = true;
		}
	}

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

	public splitWordToFit( lineWidth: number ): Character_Word[] {
		
		var chars: Character[] = [],
			ch: Character,
		    i: number = 0,
		    len: number = this.characters.length,
		    out: Character_Word[] = [],
		    sum: number = 0,
		    size: number[] = [];

		if ( this.characters.length <= 1 ) {
			return [ this ];
		} else {
			for ( i=0; i<len; i++ ) { 

				ch = this.characters[i];
				size = ch.computeSize();

				if ( chars.length == 0 ) {
					chars.push( ch );
					sum += size[0];
				} else {
					if ( sum + size[0] <= lineWidth ) {
						chars.push( ch );
						sum += size[0];
					} else {
						out.push( new Character_Word( chars ) );
						chars = [ ch ];
						sum = size[0];
					}
				}

			}
		}

		if ( chars.length ) {
			out.push( new Character_Word( chars ) );
		}

		return out;
	}

}