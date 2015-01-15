class Layout_BlockChar extends Layout {
	
	public chars      : Character[] = [];
	public children   : Layout[] = null;
	public hasChars   : boolean = true;
	public layoutType : string = 'text';

	public lines      : Character_Line[] = [];

	public addTextNode( node: TNode_Text ) {
		for ( var i=0, len = node._text.length; i<len; i++ ) {
			this.chars.push( new Character( node, i ) );
		}
	}

	// the blockchar layout doesn't contain any sub-layouts, so
	// no building is needed
	public buildAhead() {
		if ( !this.isBuilt ) {
			this.isBuilt = true;
		}
	}

	// routine to build the lines of the block.
	// it takes in consideration the words, etc.
	public buildLines( lineWidthInPixels: number ) {
		var contents          : string = this.textContents(),
		    contentsWithWords : string = contents.replace( /([\s]+)?([^\s]+)/g, '$1$2|' ),
		    i: number = 0,
		    len: number = contentsWithWords.length,
		    j: number = 0,
		    n: number = 0,
		    word: Character[] = [],
		    words: Character_Word[] = [];

		console.log( contents, contentsWithWords );

		for ( i=0; i<len; i++ ) {
			if ( contentsWithWords[i] == contents[j] ) {
				word.push( this.chars[i] );
				j++;
			} else {
				if ( word.length ) {
					words.push( new Character_Word( word ) );
					word = [];
				}
			}
		}

		if ( word.length ) {
			words.push( new Character_Word( word ) );
		}

		console.log( words );

		this.lines = []
	}

	// returns the text contents of block
	public textContents(): string {
		var out: string = '',
		    i: number = 0,
		    len: number = 0;
		
		for ( var i=0, len = this.chars.length; i<len; i++ ) {
			out += this.chars[i].letter();
		}

		return out;
	}

	public serialize( tabIndex: number = 0 ) {
		var out = super.serialize( tabIndex ).split( '\n' );
		return out[0] + this.textContents() + '</text>';
	}

}