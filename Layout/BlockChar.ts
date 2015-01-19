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
	public buildLines( lineWidthInPixels: number ): Character_Line[] {
		var contents          : string = this.textContents(),
		    contentsWithWords : string = contents.replace( /([\S]+)([\s]+)?/g, '$1$2|' ),
		    i: number = 0,
		    len: number = contentsWithWords.length,
		    j: number = 0,
		    n: number = 0,
		    word: Character[] = [],
		    words: Character_Word[] = [],
		    line: Character_Line,
		    ownerNode: TNode_Element = this.ownerNode();

		for ( i=0; i<len; i++ ) {
			if ( contentsWithWords[i] == contents[j] ) {
				word.push( this.chars[j] );
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

		this.lines = [];

		if ( !words.length ) // no lines in this block
			return;

		line = new Character_Line( lineWidthInPixels );

		for ( i=0, len = words.length; i<len; i++ ) {
			if ( line.acceptWord( words[i] ) ) {
				line.addWord( words[i] );
			} else {
				this.lines.push( line );
				line = new Character_Line( lineWidthInPixels );
				line.addWord( words[i] );
			}
		}

		if ( line.words.length )
			this.lines.push( line );

		/* Add the lineHeight factor */
		for ( i=0, len = this.lines.length; i<len; i++ ) {
			this.lines[i].size[1] *= ownerNode.style.lineHeight();
		}

		return this.lines;

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

	public computeWidths() {
		this.buildLines( this.innerWidth );
	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {
		
		this.offsetTop = this.innerTop = topPlacement;
		this.offsetHeight = this.innerHeight = 0;

		for ( var i=0, len = this.lines.length; i<len; i++ ) {
			
			topPlacement += this.lines[i].size[1];

			//console.log( this.tab( indent ) + 'added line height: ' + this.lines[i].size[1], this.lines[i] );

			this.offsetHeight += this.lines[i].size[1];
			this.innerHeight = this.offsetHeight;

		}

		return topPlacement;
	}

	public paint( ctx: any ) {

		var i: number = 0,
			len: number = 0,
		    start: number = this.offsetTop;

		ctx.fillStyle = 'green';
		ctx.lineWidth = .5;

		for ( i=0, len = this.lines.length; i<len; i++ ) {

			ctx.fillRect( this.offsetLeft, start, this.offsetWidth, this.lines[i].size[1] );

			start += this.lines[i].size[1];

		}


	}

}