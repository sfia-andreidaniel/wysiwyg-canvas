class HTML_Table_Matrix {
	
	public cols: number = 0;
	public rows: number = 0;

	public data: number[][] = [];

	public xEdges: HTML_Table_EdgesCollection = new HTML_Table_EdgesCollection();
	public yEdges: HTML_Table_EdgesCollection = new HTML_Table_EdgesCollection();

	constructor( public cellsArray ) {

	}

	public setCols( numCols: number ) {

		if ( numCols > this.cols ) {
			for ( var y=0, len = this.data.length; y<len; y++ ) {
				for ( var x = this.cols; x<numCols; x++ ) {
					this.data[y].push( null );
				}
			}
			this.cols = ~~numCols;
		}
	}

	public setRows( numRows: number ) {
		var row: number[];
		if ( numRows > this.rows ) {
			for ( var y = this.rows; y < numRows; y++ ) {
				row = [];
				for ( var x = 0; x < this.cols; x++ ) {
					row.push( null );
				}
				this.data.push( row );
			}
			this.rows = ~~numRows;
		}
	}

	public writeAt( row: number, value: number, colSpan: number, rowSpan: number ) {

		this.setRows( row + rowSpan );

		var index: number = 0;

		this.setCols( 1 );

		while ( this.data[ row ][ index ] !== null ) {
			index++;
			this.setCols( index + 1 );
		}

		this.setCols( index + colSpan );

		for ( var x = 0; x < colSpan; x++ ) {
			for ( var y = 0; y < rowSpan; y++ ) {

				this.data[ y + row ][ x + index ] = value;
			
			}
		}

	}

	public compute() {
		this.xEdges.setNumber( this.cols );
		this.yEdges.setNumber( this.rows );

		var row: number = 0,
		    col: number = 0,
		    lastCell: number = null,
		    i: number = 0,
		    len: number = 0;

		for ( row=0; row < this.rows; row++ ) {
			
			for ( col = 0; col < this.cols; col++ ) {
				
				if ( lastCell != this.data[row][col] ) {
					
					lastCell = this.data[row][col];
					
					if ( lastCell !== null ) {

						if ( !this.cellsArray[ lastCell ].edgeLeft ) {

							this.cellsArray[ lastCell ].edgeLeft = this.cellsArray[ lastCell ].edgeLeft || this.xEdges.edges[ col ];
							this.cellsArray[ lastCell ].edgeTop  = this.cellsArray[ lastCell ].edgeTop  || this.yEdges.edges[ row ];

							for ( i = col; i<this.cols; i++ ) {
								if ( this.data[row][i] == lastCell ) {
									this.cellsArray[lastCell].edgeRight = this.xEdges.edges[i];
								} else break;
							}

							for ( i = row; i<this.rows; i++ ) {
								if ( this.data[i][col] == lastCell ) {
									this.cellsArray[ lastCell ].edgeBottom = this.yEdges.edges[i];
								}
							}

						}
					
					}
				}

			}
		}
	}

	public toString(): string {
		var lines: string[] = [],
		    line: string = '';
		for ( var y = 0; y < this.rows; y++ ) {
			line = '|';
			for ( var x = 0; x < this.cols; x++ ) {
				line += String( this.data[ y ][ x ] == 0 ? this.data[y][x] : ( this.data[y][x] || ' ' ) );
			}
			lines.push( line + '|' );
		}
		return lines.join( '\n ' );
	}

}