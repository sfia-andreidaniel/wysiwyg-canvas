class Character_Line {
	
	// <constructor> public maxWidth       : number = 0;     // physical width of the parent

	public words              : Character_Word[] = [];
	public wordGap            : number           = 0.00;
	public size               : number[]         = [ 0, 0 ]; // dimensions in pixels, [0]=>width, [1]=>height
	public index              : number           = 0;		 // the line index
	public owner              : Layout_BlockChar = null;     // initialized by creator
	
	public fragmentIndexStart : number           = null;
	public fragmentIndexEnd   : number           = null;

	constructor( public maxWidth: number ) {}

	// a line accepts a word either:
	// - if the line contains no words
	// - if the line width + the word width is smaller the the line max allowed physicalWidth
	public acceptWord( w: Character_Word ) {
		if ( this.words.length && w.isBR ) {
			return false;
		} else {
			return !!!(this.words[0]) || (this.size[0] + w.computeSize()[0] < this.maxWidth);
		}
	}

	public addWord( w: Character_Word ) {
		var size: number[] = w.computeSize();
		this.words.push( w );
		this.size[0] += size[0];
		this.size[1] = Math.max( size[1], this.size[1] );
		this.wordGap = ( this.words.length > 2 && !this.words[0].isBR ) ? ( ( this.maxWidth - this.size[0] ) / ( this.words.length - 1 ) ) : 0.00;
	}

	public buildIndexes() {
		var c: Character,
		    nWords: number;

		if ( nWords = this.words.length ) {
			
			c = this.words[0].characters[0];

			this.fragmentIndexStart = c.fragmentPosition();

			c = this.words[ nWords - 1 ].characters[ this.words[ nWords - 1 ].characters.length - 1 ];

			this.fragmentIndexEnd = c.fragmentPosition();

			// add a +1 if line has EOL
			if ( c.node.EOL_POS && c.node.EOL_POS[ c.index ] ) {
				this.fragmentIndexEnd++;
			}

		} else {

			this.fragmentIndexStart = null
			this.fragmentIndexEnd   = null;

		}
	}

	public toString(): string {
		var i: number =0,
		    len: number = this.words.length,
		    out: string = '';
		for ( i=0; i<len; i++ ) {
			out += this.words[i].toString();
		}
		return out;
	}

}