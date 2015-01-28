class Layout_BlockChar extends Layout {
	
	public chars      : Character[] = [];
	public children   : Layout[] = null;
	public hasChars   : boolean = true;
	public layoutType : string = 'text';

	public lines      : Character_Line[] = [];
	public lineIndexStart: number = 0;

	public addTextNode( node: TNode_Text ) {
		node.EOL_POS = null;
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
		    len: number = contentsWithWords.length,
		    word: Character[] = [],
		    words: Character_Word[] = [],
		    line: Character_Line,
		    ownerNode: TNode_Element = this.ownerNode(),
		    i: number = 0,
		    j: number = 0,
		    n: number = 0,
		    w: Character_Word,
		    c: Character,
		    chIndex: number = 0;

		for ( i=0; i<len; i++ ) {
			if ( contentsWithWords[i] == contents[j] ) {
				
				// if we find a break character, we create a new word.
				if ( this.chars[j].isBR ) {
					if ( word.length ) {
						words.push( new Character_Word(word) );
					}
					word = [ this.chars[j] ];
				} else {
					word.push( this.chars[j] );
				}

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

		this.lineIndexStart = ownerNode.documentElement.lines.length();

		/* Add the lineHeight factor and the EOL_POS */
		for ( i=0, len = this.lines.length; i<len; i++ ) {
			this.lines[i].size[1] *= ownerNode.style.lineHeight();
			if ( ( n = this.lines[i].words.length ) ) {
				w = this.lines[i].words[ n - 1 ];
				if ( ( n = w.characters.length ) ) {
					c = w.characters[ n-1 ];
					c.node.EOL_POS = c.node.EOL_POS || {};
					c.node.EOL_POS[ c.index ] = 1;
				}
			}
			this.lines[i].owner = this;
			ownerNode.documentElement.lines.add( this.lines[i] );
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

	protected paintCaret( ctx: any, x: number, y: number, height: number, scrollLeft: number, scrollTop: number ) {
		ctx.save();
		ctx.fillStyle = '#000';
		ctx.fillRect( 
			Math.min( this.offsetLeft + this.offsetWidth, x - .5 ),
			y - 2,
			2,
			( height + 2 ) * 1.12
		);

		ctx.restore();
	}

	public paint( ctx: any, scrollLeft: number, scrollTop: number, viewport: Viewport ) {

		if ( !this.isPaintable( viewport ) ) {
			return;
		}

		/*
		ctx.fillStyle = '#ddd';
		ctx.fillRect( this.offsetLeft - scrollLeft, this.offsetTop - scrollTop, this.offsetWidth, this.offsetHeight );
		*/

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
		    valignShift: number = 0,
		    fragPos: number = 0,
		    lastTextNode: TNode_Text = null,
		    range: TRange = node.documentElement.viewport.selection.getRange(),
		    caret: TRange_Target = range.focusNode(),
		    saveColor: string = '',
		    isPaintedSelected: boolean = node.isPaintedSelected;

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

					if ( lastTextNode != this.lines[i].words[j].characters[k].node ) {
						lastTextNode = this.lines[i].words[j].characters[k].node;
						fragPos = lastTextNode.FRAGMENT_START;
					}

					// recompute text drawing settings each time the parentNode of the text node changes.
					if ( currentNode != this.lines[i].words[j].characters[k].node.parentNode ) {
						
						currentNode = this.lines[i].words[j].characters[k].node.parentNode;

						ctx.font = currentNode.style.fontStyleText();
						ctx.fillStyle = isPaintedSelected ? 'white' : ( saveColor = currentNode.style.color() );
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

					if ( caret && range.contains( fragPos ) && !isPaintedSelected ) {

						ctx.fillStyle = DocSelection.$Colors.focus;
						ctx.fillRect( startX, ~~startY, size[0] + ( wordGap && ( k == l - 1 ) && ( i < len - 1 ) ? this.lines[i].wordGap : 0 ) + .5, ~~this.lines[i].size[1] + 1 );
						ctx.fillStyle = 'white';

						ctx.fillText( this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift );
						
						if ( isUnderline ) {
							ctx.fillRect( 
								startX, 
								~~( ( startY + lineDiff ) + 2 + valignShift ), 
								size[0] + ( wordGap && ( k == l - 1 ) && ( i < len - 1 ) ? this.lines[i].wordGap : 0 ), 
								underlineWidth 
							);
						}

						ctx.fillStyle = saveColor;

					} else {

						ctx.fillText( this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift );
						
						if ( isUnderline ) {
							ctx.fillRect( 
								startX, 
								~~( ( startY + lineDiff ) + 2 + valignShift ), 
								size[0] + ( wordGap && ( k == l - 1 ) && ( i < len - 1 ) ? this.lines[i].wordGap : 0 ), 
								underlineWidth 
							);
						}

					}

					if ( caret && caret.fragPos == fragPos ) {
						//paint caret @ this pos
						this.paintCaret( ctx, startX, startY, lineDiff, scrollLeft, scrollTop );
					}

					startX += size[0];

					fragPos++; // reached end of character, increment the fragment position
				}

				if ( wordGap && ( i < len - 1 ) ) {
					startX += this.lines[i].wordGap;
				}

			}

			if ( caret && caret.fragPos == fragPos ) {
				// paint caret @ this pos
				this.paintCaret( ctx, startX, startY, lineDiff, scrollLeft, scrollTop );
			}

			startY += this.lines[i].size[1];
			fragPos++; // reached end of line, increment the fragment position

		}

	}

	public getTargetAtXY( point: TPoint, boundsChecking: boolean = true ): TRange_Target {
		
		var target: TRange_Target = super.getTargetAtXY( point, false ),
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
		    wordGap: boolean = false,
		    size: number[],
		    breakFor: boolean = false,
		    relative: TPoint,
		    w: number,
		    isLastLine: boolean = false;
		
		if ( target !== null ) {
			
			relative = {
				"x": point.x - this.offsetLeft,
				"y": point.y - this.offsetTop
			};

			bestCharTargetIndex = target.fragPos;

			for ( line=0, lines = this.lines.length; line<lines; line++ ) {
				if ( relative.y >= startY ) {
					bestLine = this.lines[line];
					bestLineIndex = line;
					isLastLine = line == lines-1;
				} else {
					break;
				}
				startY += this.lines[line].size[1];
			}

			if ( bestLine !== null ) {
				
				align = (<TNode_Element>target.target).style.textAlign();

				wordGap = align == 'justified' && !isLastLine;

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
							w = size[0] + bestLine.wordGap;
						} else {
							w = size[0];
						}
						
						if ( ( ( w / 2 ) + startX < point.x ) ) {
							bestCharLineIndex++;
							bestNode = bestLine.words[i].characters[j].node;
							bestCharTargetIndex = bestLine.words[i].characters[j].fragmentPosition() + 1;
							startX += w;
						} else {
							bestNode = bestLine.words[i].characters[j].node;
							bestCharTargetIndex = bestLine.words[i].characters[j].fragmentPosition();
							breakFor = true;
							break;
						}
					}

					if ( breakFor )
						break;
				}

				target.target = bestNode;
				target.fragPos = bestCharTargetIndex;
				return target;

			} else return target;
		} else return null;
	}

}