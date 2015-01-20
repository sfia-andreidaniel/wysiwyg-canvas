class HTML_Table_EdgesCollection {

	public edges: HTML_Table_Edge[] = [];

	constructor() {

	}

	public setNumber( numEdges: number ) {
		
		this.edges = [];

		for ( var i=0; i<numEdges; i++ ) {
			this.edges.push( new HTML_Table_Edge( i, this ) );
		}
	}

	public setSize( edgeStartIndex: number, edgeEndIndex: number, size: number ) {
		
		var sum: number = 0,
		    i: number = 0;

		size = ~~size;

		if ( edgeStartIndex < 0 || edgeEndIndex < edgeStartIndex ) {
			throw "HTML_Table_EdgesCollection: Bad arguments!";
		}

		for ( i=edgeStartIndex; i < edgeEndIndex; i++ ) {
			sum += this.edges[i].value;
		}

		this.edges[ edgeEndIndex ].setValue( size - sum );

	}

	public toString() {
		
		var out: string[] = [];
		
		for ( var i=0, len = this.edges.length; i<len; i++ ) {
			out.push( String( this.edges[i].scaledValue + ',' + this.edges[i].indexStart + '->' + this.edges[i].indexEnd ) );
		}

		return '[' + out.join( '],[' ) + ']';
	}

	public resizeToFit( totalWidth: number ) {

		var sumTotal: number = 0,
		    unset: HTML_Table_Edge[] = [],
		    i: number = 0,
		    len: number = 0,
		    pieceWidth: number = 0,
		    maxPieceWidth: number = 0,
		    minPieceWidth: number = -1,
		    scale: number = 0.00;

		for ( i=0, len = this.edges.length; i < len; i++ ) {
			
			if ( this.edges[i].value > 0 ) {

				sumTotal = this.edges[i].value;
				this.edges[i].scaledValue = this.edges[i].value;

				if ( maxPieceWidth < this.edges[i].value ) {
					maxPieceWidth = this.edges[i].value;
					if ( minPieceWidth == -1 ) {
						minPieceWidth = maxPieceWidth;
					}
				}

				if ( minPieceWidth < this.edges[i].value ) {
					minPieceWidth = this.edges[i].value;
				}

			} else {
				unset.push( this.edges[i] );
			}
		}

		if ( unset.length ) {

			if ( sumTotal < totalWidth ) {

				pieceWidth = totalWidth / unset.length;

				for ( i=0, len = unset.length; i<len; i++ ) {
					unset[i].scaledValue = pieceWidth;
					sumTotal += pieceWidth;
				}

			} else {

				for ( i=0, len = unset.length; i<len; i++ ) {
					unset[i].scaledValue = minPieceWidth;
					sumTotal += minPieceWidth;
				}

			}

		}

		scale = totalWidth / sumTotal;

		for ( i=0, len = this.edges.length; i<len; i++ ) {
			this.edges[i].scaledValue *= scale;
		}

	}	

}