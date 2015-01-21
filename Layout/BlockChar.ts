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

	public paint( ctx: any, scrollLeft: number, scrollTop: number, viewport: Viewport ) {

		if ( !this.isPaintable( viewport ) ) {
			return;
		}

		ctx.fillStyle = '#ddd';
		ctx.fillRect( this.offsetLeft - scrollLeft, this.offsetTop - scrollTop, this.offsetWidth, this.offsetHeight );

		var i: number = 0,
			len: number = 0,
		    node: TNode_Element = this.ownerNode(),
		    align: string = node.style.textAlign(),
		    j: number = 0,
		    n: number = 0,
		    k: number = 0,
		    l: number = 0,
		    wordGap: boolean = ( align == 'justified' ),
		    lineHeight: number = node.style.lineHeight(),
		    lineDiff: number = 0,
		    startY: number = this.offsetTop - scrollTop,
		    startX: number = this.offsetLeft,
		    currentNode: TNode_Element = null,
		    isUnderline: boolean = false,
		    underlineWidth: number = 0.00,
		    size: number[],
		    valign: string = 'normal',
		    valignShift: number = 0;

		ctx.textAlign = 'left';
		ctx.textBaseline = 'alphabetic';

		for ( i=0, len = this.lines.length; i<len; i++ ) {

			lineDiff = this.lines[i].size[1] / lineHeight;

			switch ( align ) {
				case 'right':
					startX = this.offsetLeft + this.offsetWidth - ( this.lines[i].size[0] );
					break;
				case 'center':
					startX = this.offsetLeft + ( this.offsetWidth / 2 ) - ( this.lines[i].size[0] / 2 );
					break;
				case 'justified':
					startX = this.offsetLeft;
					break;
				default:
					startX = this.offsetLeft;
					break;
			}

			startX -= scrollLeft;

			// ctx.fillRect( this.offsetLeft, start, this.offsetWidth, this.lines[i].size[1] );

			for ( j=0, n = this.lines[i].words.length; j<n; j++ ) {

				for ( k = 0, l = this.lines[i].words[j].characters.length; k<l; k++ ) {

					if ( currentNode != this.lines[i].words[j].characters[k].node.parentNode ) {
						
						currentNode = this.lines[i].words[j].characters[k].node.parentNode;

						ctx.font = currentNode.style.fontStyleText();
						ctx.fillStyle = currentNode.style.color();
						isUnderline = currentNode.style.textDecoration() == 'underline';
						
						valign = currentNode.style.verticalAlign();

						if ( isUnderline ) {
							
							underlineWidth = ~~( currentNode.style.fontSize() * .15 );
							
							if ( underlineWidth < 1 ) {
								underlineWidth = 1;
							}

						}

						switch (valign) {
							case 'super':
								valignShift = this.lines[i].size[1] * -.2;
								break;
							case 'sub':
								valignShift = this.lines[i].size[1] * .1;
								break;
							default:
								valignShift = 0;
								break;
						}

					}

					size = this.lines[i].words[j].characters[k].computeSize();

					ctx.fillText( this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift );
					
					if ( isUnderline ) {
						ctx.fillRect( startX, ~~( ( startY + lineDiff ) + 2 + valignShift ), size[0], underlineWidth );
					}

					startX += size[0];

				}

				startX += ( wordGap ? this.lines[i].wordGap : 0 );

			}

			startY += this.lines[i].size[1];
		}

	}

	public getTargetAtXY( point: TPoint, boundsChecking: boolean = true ): TTarget {
		
		var target: TTarget = super.getTargetAtXY( point, false ),
		    i: number = 0,
		    len: number = 0,
		    j: number = 0,
		    n: number = 0,
		    line: number = 0,
		    lines: number = 0,
		    bestLine: Character_Line = null,
		    bestLineIndex: number = 0,
		    startX: number = 0,
		    startY: number = 0,
		    bestCharLineIndex: number = 0,
		    bestCharTargetIndex: number = 0,
		    bestNode: TNode_Text,
		    align: string,
		    wordGap: boolean,
		    size: number[],
		    breakFor: boolean = false;
		
		if ( target !== null ) {
			
			for ( line=0, lines = this.lines.length; line<lines; line++ ) {
				if ( target.relative.y >= startY ) {
					bestLine = this.lines[line];
					bestLineIndex = line;
				} else {
					break;
				}
				startY += this.lines[line].size[1];
			}

			if ( bestLine !== null ) {
				
				align = (<TNode_Element>target.target).style.textAlign();

				wordGap = align == 'justified';

				switch ( align ) {
					case 'right':
						startX = this.offsetLeft + this.offsetWidth - bestLine.size[0];
						break;
					case 'center':
						startX = this.offsetLeft + ( this.offsetWidth / 2 ) - ( bestLine.size[0] / 2 );
						break;
					default:
						startX = this.offsetLeft;
						break;
				}

				for ( i=0, len = bestLine.words.length; i<len; i++ ) {

					for ( j=0, n = bestLine.words[i].characters.length; j < n; j++ ) {
						
						size = bestLine.words[i].characters[j].computeSize();

						if ( wordGap && j == n - 1 ) {
							size[0] += bestLine.wordGap;
						}
						
						if ( ( ( size[0] / 2 ) + startX < target.absolute.x ) ) {
							bestCharLineIndex++;
							bestNode = bestLine.words[i].characters[j].node;
							bestCharTargetIndex = bestLine.words[i].characters[j].index + 1;

							startX += size[0];
						} else {
							bestNode = bestLine.words[i].characters[j].node;
							bestCharTargetIndex = bestLine.words[i].characters[j].index;
							breakFor = true;
							break;
						}
					}

					if ( breakFor )
						break;
				}

				target.line = bestLineIndex;
				target.target = bestNode;
				target.charLineIndex = bestCharLineIndex;
				target.charTargetIndex = bestCharTargetIndex;
				return target;

			} else return target;
		} else return null;
	}

}