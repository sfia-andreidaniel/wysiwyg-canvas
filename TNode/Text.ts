class TNode_Text extends TNode {

	static $FragmentTypes = {
		"\n": FragmentItem.WHITE_SPACE,
		"\t": FragmentItem.WHITE_SPACE,
		" " : FragmentItem.WHITE_SPACE
	};

	public _text     : string = '';
	public nodeType  : TNode_Type = TNode_Type.TEXT;
	public isBR      : boolean;
	
	// on building layout, the EOL_POS will be computed. this is needed on bakeIntoFragment method
	public EOL_POS   : any = null;

	static $SpecialChars = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot'
	}

	constructor( textContents: string ) {
		super();
		this._text = String( textContents || '' );
	}

	public textContents( c: string = null, appendFirst: boolean = false ): string {
		if ( c === null ) {
			return this._text;
		} else {
			
			if ( appendFirst ) {
				this._text = String( c || '' ) + this._text;
			} else {
				this._text = String( c || '' );
			}
			
			if ( this.parentNode ) {
				this.parentNode.fire( 'relayout' );
			}
		}
	}

	// escapes the text for HTML exporting
	public escape(): string {
		var out: string = '',
		    i: number = 0,
		    len: number = this._text.length;

		for ( i=0; i<len; i++ ) {
			if ( TNode_Text.$SpecialChars[this._text[i]] ) {
				out += TNode_Text.$SpecialChars[this._text[i]];
			} else {
				out += this._text[i];
			}
		}

		return out;
	}

	public bakeIntoFragment() {
		if ( this.documentElement ) {
			
			this.FRAGMENT_START = this.documentElement.fragment.length();
			for ( var i=0, len = this._text.length; i<len; i++ ) {
				this.documentElement.fragment.add( TNode_Text.$FragmentTypes[ this._text[i] ] || FragmentItem.CHARACTER );
				if ( this.EOL_POS && this.EOL_POS[i] ) {
					this.documentElement.fragment.add( FragmentItem.EOL );
				}
			}
			this.FRAGMENT_END = this.documentElement.fragment.length() - 1;
		}
	}

	/* Fixed bug. */
	public textContentsFragment( indexStart: number, indexEnd: number ): string {
		var out: string = '',
		    i: number = 0,
		    len: number = 0,
		    j: number = 0,
		    eols: number = 0;

		j = this.FRAGMENT_START;

		for ( i=0, len = this._text.length; i<len; i++ ) {
			if ( j >= indexStart && j <= indexEnd ) {
				out += this._text[i];
			}
			if ( this.EOL_POS && this.EOL_POS[i] ) {
				j += 2;
			} else {
				j+=1;
			}
			if ( j > indexEnd ) {
				break;
			}
		}

		return out;
	}

	public deleteTextContentsBetweenFragmentPositions( indexStart: number, indexEnd: number ): number {
		var out: string[] = [],
			returnValue: number = 0;

		if ( indexStart > this.FRAGMENT_START ) {
			out.push( this.textContentsFragment( this.FRAGMENT_START, indexStart - 1 ) );
			returnValue = out[0].length;
		}

		if ( indexEnd < this.FRAGMENT_END ) {
			out.push( this.textContentsFragment( indexEnd + 1, this.FRAGMENT_END ) );
		}

		this.textContents( out.join( '' ) );

		return returnValue;

	}

	/* Fragmentates the text node @ indexes, creating in the worst case scenario two additional
	   siblings, one before and one after of text contents
	 */

	/* 

	public createFragmentationAtIndexes( indexStart: number, indexEnd: number ): TNode_Text {

		var out = {
			"before" : null,
			"after"  : null
		}, s: string;

		if ( indexStart > this.FRAGMENT_START ) {
			s = this.textContentsFragment( this.FRAGMENT_START, indexStart - 1);
			if ( s ) {
				out.before = this.documentElement.createTextNode( s );
			}
		}

		if ( indexEnd < this.FRAGMENT_END ) {
			s = this.textContentsFragment( indexEnd + 1, this.FRAGMENT_END );
			if ( s ) {
				out.after = this.documentElement.createTextNode( s );
			}
		}

		if ( out.before || out.after ) {

			this.textContents( this.textContentsFragment( indexStart, indexEnd ) );

			if ( out.before ) {
				this.parentNode.appendChild( out.before, this.siblingIndex );
			}

			if ( out.after ) {
				this.parentNode.appendChild( out.after, this.siblingIndex + 1 );
			}

			this.FRAGMENT_START = indexStart;
			this.FRAGMENT_END   = indexEnd;

		}

		return this;

	}

	*/


	// I know it seems complicated, but that's 6 hours of work for this function (with empiric tests).
	// Don't even try to understand it, cause even I will not be able to understand it in a few hours
	// from now on
	public insertTextAtTargetOffset( offset: number, str: string ): number {

		var buff: number[] = [],
		    buff1: number[]=[ offset - this.FRAGMENT_START, 0 ],
		    i: number = 0,
		    j: number = 0,
		    len: number = this._text.length,
		    out: string = '',
		    args: any[],
		    eols: number = 0,
		    returnValue: number = 0;

		//build this text
		for ( i=0; i<len; i++ ) {
			buff.push( this._text.charCodeAt(i) );
			if ( this.EOL_POS && this.EOL_POS[i] ) {
				buff.push( 0 );
			}
		}

		// build the other text
		for ( i=0, len=str.length; i<len; i++ ) {
			buff1.push( str.charCodeAt(i) );
		}

		for ( i=0; i<offset - this.FRAGMENT_START; i++ ) {
			if ( buff[i] != 0 ) {
				eols++;
			}
		}

		returnValue = eols + str.length;

		Array.prototype.splice.apply( buff, buff1 );

		for ( i=0,len=buff.length; i<len; i++ ) {
			if ( buff[i] ) {
				out += String.fromCharCode( buff[i] );
			}
		}

		this.textContents( out );

		return returnValue;
	}

	// I know it seems complicated, but that's 6 hours of work for this function (with empiric tests).
	// Don't even try to understand it, cause even I will not be able to understand it in a few hours
	// from now on
	public textIndexToFragmentPosition( index: number ): number {
		var i: number = 0,
		    j: number = 0,
		    len: number = this._text.length,
		    eol: number = 0,
		    retVal: number = this.FRAGMENT_END;

		for ( i=0; i<len; i++ ) {
			if ( this.EOL_POS && this.EOL_POS[i] ) {
				eol++;
			}
			if ( index == i ) {
				retVal = this.FRAGMENT_START + index + eol;
				break;
			}
		}

		if ( retVal == this.FRAGMENT_END && this.documentElement.fragment.at( retVal ) == FragmentItem.EOL )
			return retVal;

		// decrement retval if @jmp on !text
		while ( retVal > 0 && [ FragmentItem.CHARACTER, FragmentItem.WHITE_SPACE ].indexOf( this.documentElement.fragment.at( retVal ) ) == -1 ) {
				retVal--;
		}

		return retVal;
	}

	public ownerBlockElement() {
		return this.parentNode.ownerBlockElement();
	}

}