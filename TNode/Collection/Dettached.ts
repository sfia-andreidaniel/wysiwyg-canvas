class TNode_Collection_Dettached extends TNode_Collection {

	public surgeryStart         : number = 0;
	public surgeryEnd           : number = 0;
	
	private fragLTR         	: number = 0;
	private fragRTL             : number = 0;

	
	constructor( parentNode: TNode_Element, surgeryStart: number = 0, surgeryEnd: number = 0 ) {

		super( [] );

		this.parentNode = parentNode;

		this.surgeryStart = Math.max( this.parentNode.FRAGMENT_START + 1, surgeryStart );
		this.surgeryEnd   = Math.min( this.parentNode.FRAGMENT_END - 1, surgeryEnd ) + 1;

		var i: number = 0,
		    fragment: Fragment = this.parentNode.documentElement.fragment,
		    at: FragmentItem = null;


		for ( i=parentNode.FRAGMENT_START + 1; i<surgeryStart; i++ ) {
			at = fragment.at( i );
			if ( at != FragmentItem.EOL ) {
				this.fragLTR++;
			}
		}

		for ( i=parentNode.FRAGMENT_END - 1; i>=surgeryEnd; i-- ) {
			
			at = fragment.at( i );

			if ( at != FragmentItem.EOL ) {
				this.fragRTL++;
			}
		}

	}

	public createSlices() {

		this.parentNode.createSurgery( this.surgeryEnd, false, null, TSurgeryHint.RIGHT );
		this.parentNode.createSurgery( this.surgeryStart, false, null, TSurgeryHint.LEFT );

		//console.log( this.fragLTR, this.fragRTL, this.parentNode.xmlBeginning() );

	}

	public createRanges() {
		
		var at: FragmentItem = null,
		    fragment: Fragment = this.parentNode.documentElement.fragment,
		    i: number = 0,
		    len: number = 0,
		    computeLeftSibling: boolean = false,
		    node: TNode;

		this.surgeryStart = this.parentNode.FRAGMENT_START;
		this.surgeryEnd   = this.parentNode.FRAGMENT_END;

		i = 0;

		while ( this.fragLTR > 0 ) {
			at = fragment.at( this.surgeryStart + i );
			if ( at != FragmentItem.EOL ) {
				this.fragLTR--;
			}
			i++;
		}

		this.surgeryStart += i;

		i = 0;

		while ( this.fragRTL > 0 ) {
			at = fragment.at( this.surgeryEnd - i );
			if ( at != FragmentItem.EOL ) {
				this.fragRTL--;
			}
			i++;
		}

		this.surgeryEnd -= i;

		/*
		while ( this.surgeryStart > this.parentNode.FRAGMENT_START && [FragmentItem.NODE_START, FragmentItem.EOL].indexOf( fragment.at( this.surgeryStart ) ) > -1 ) {
			this.surgeryStart--;
			console.log( '<' );
		}

		while ( this.surgeryEnd < this.parentNode.FRAGMENT_END && [FragmentItem.NODE_END, FragmentItem.EOL].indexOf( fragment.at( this.surgeryEnd + 1 ) ) > -1 ) {
			this.surgeryEnd++;
			console.log( '>' );
		}
		*/

		computeLeftSibling = true;

		for ( i=0, len = this.parentNode.childNodes.length; i<len; i++ ) {

			if ( this.parentNode.childNodes[i].FRAGMENT_START >= this.surgeryStart && this.parentNode.childNodes[i].FRAGMENT_END <= this.surgeryEnd ) {
				
				this.add( this.parentNode.childNodes[i] );
				
				if ( computeLeftSibling ) {
					this.leftSibling = this.parentNode.childNodes[i-1] || null;
				}

				computeLeftSibling = false;
			}
		}

		//console.warn( 'after create: ' + this.toString() + ', with ' + this.nodes.length + ' nodes.' );

	}

	public reInsert() {
		this.parentNode.appendCollection( this, this.leftSibling ? this.leftSibling.siblingIndex + 1 : 0 );
		this.parentNode.removeOrphanNodes();
	}



	public toString( separator: string = '' ) {
		var out: string[] = [],
		    i  : number = 0,
		    len: number = this.nodes.length;

		for ( i=0; i<len; i++ ) {
			switch ( this.nodes[i].nodeType ) {
				case TNode_Type.TEXT:
					out.push( ( <TNode_Text>this.nodes[i] ).textContents() );
					break;
				default:
					out.push( ( <TNode_Element>this.nodes[i] ).outerHTML() );
					break;
			}
		}

		return out.join( separator );
	}

}