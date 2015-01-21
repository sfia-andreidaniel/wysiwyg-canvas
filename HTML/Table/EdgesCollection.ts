class HTML_Table_EdgesCollection {

	public edges: HTML_Table_Edge[] = [];
	public purposedSizes: any = {};

	constructor( public name: string ) {

	}

	public setNumber( numEdges: number ) {
		
		this.edges = [];

		for ( var i=0; i<numEdges; i++ ) {
			this.edges.push( new HTML_Table_Edge( i, this ) );
		}
	}

	public setSize( edgeStartIndex: number, edgeEndIndex: number, size: number ) {
		
		var key: string;

		if ( edgeStartIndex == edgeEndIndex ) {
			key = ':' + String( edgeStartIndex );
		} else {
			key = '/' + String( edgeStartIndex + ' ' + edgeEndIndex );
		}

		if ( this.purposedSizes[ key ] ) {
			this.purposedSizes[ key ] = Math.max( this.purposedSizes[key], size );
		} else {
			this.purposedSizes[ key ] = size;
		}

	}

	public resetSizes() {
		this.purposedSizes = {};
	}

	private applyRangeSize( start: number, end: number, size: number ) {

		var unset: HTML_Table_Edge[] = [],
		    i: number = 0,
		    len: number = start - end,
		    sum: number = 0,
		    pieceWidth: number = 0;

		for ( i = start; i<=end; i++ ) {
			if ( this.edges[i].isSet ) {
				sum += this.edges[i].value;
			} else {
				unset.push( this.edges[i] );
			}
		}

		if ( len = unset.length ) {

			if ( size < sum ) //already single cols were defined with a bigger width
				return;

			pieceWidth = ( size - sum ) / len;

			for ( i=0; i<len; i++ ) {
				this.edges[i].value = pieceWidth;
				this.edges[i].isSet = true;
				sum += pieceWidth;
			}

			return;

		}

		if ( size - sum > 0 ) {
			pieceWidth = ( size - sum ) / ( end - start + 1 );
			for ( i = start; i<=end; i++ ) {
				this.edges[i].value += pieceWidth;
			}
		}

	}

	public applySizes() {

		var i: number = 0,
		    len: number = 0,
		    k: string = '',
		    iStart: number = 0,
		    iStop: number = 0,
		    rng: string[];

		for ( i=0, len = this.edges.length; i<len; i++ ) {
			this.edges[i].value = 0;
			this.edges[i].isSet = false;
		}

		// single ranges apply widths
		for ( k in this.purposedSizes ) {
			if ( k[0] == ':' ) {
				iStart = ~~k.substr(1);
				this.edges[iStart].value = this.purposedSizes[k];
				this.edges[iStart].isSet = true;
			}
		}

		// multiple ranges apply widths
		for ( k in this.purposedSizes ) {
			if ( k[0] == '/' ) {
				rng = k.substr(1).split(' ');
				this.applyRangeSize( ~~rng[0], ~~rng[1], this.purposedSizes[k] );
			}
		}
	}

	public toString() {
		
		var out: string[] = [];
		
		for ( var i=0, len = this.edges.length; i<len; i++ ) {
			out.push( String( this.edges[i].offsetIndexStart + '->' + this.edges[i].offsetIndexEnd ) );
		}

		return '|' + out.join( '|,|' ) + '|';
	}

	public resizeToFit( totalWidth: number, border: number, padding: number, spacing: number, shiftLeft: number = 0 ) {

		var sumTotal: number = 0,
		    unset: HTML_Table_Edge[] = [],
		    i: number = 0,
		    len: number = 0,
		    pieceWidth: number = 0,
		    maxPieceWidth: number = 0,
		    minPieceWidth: number = -1,
		    scale: number = 0.00,
		    lastEdgeIndex: number = this.edges.length - 1;

		if ( totalWidth != null ) {

			for ( i=0, len = this.edges.length; i < len; i++ ) {
				
				this.edges[i].scaledValue = this.edges[i].value;

				if ( this.edges[i].value > 0 ) {

					sumTotal += this.edges[i].value;

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

					pieceWidth = ( totalWidth - sumTotal ) / unset.length;

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

		} else {

			for ( i=0, len = this.edges.length; i<len; i++ ) {
				this.edges[i].scaledValue = this.edges[i].value;
			}

		}


		this.edges[0].indexStart = shiftLeft + spacing;
		this.edges[0].offsetIndexStart = shiftLeft + spacing;

		for ( i=0, len = this.edges.length; i <( len-1); i++ ) {
			this.edges[i].indexEnd = this.edges[i].indexStart + this.edges[i].scaledValue + ( 2 * ( padding + border ) ) + ( spacing * .5 );
			this.edges[i].offsetIndexEnd = this.edges[i].offsetIndexStart + 2 * border + 2 * padding + this.edges[i].scaledValue;

			this.edges[ i + 1 ].indexStart = this.edges[i].indexEnd;
			this.edges[ i + 1 ].offsetIndexStart = this.edges[i].indexEnd + spacing * .5;
		}

		this.edges[ lastEdgeIndex ].indexEnd = 
			this.edges[ lastEdgeIndex ].indexStart +
			this.edges[ lastEdgeIndex ].scaledValue +
			padding * 2 +
			2 * border +
			spacing * 1.5;

		this.edges[ lastEdgeIndex ].offsetIndexEnd = this.edges[ lastEdgeIndex ].indexEnd - spacing;

	}

}