class UI_Toolbar_Panel_Table extends UI_Toolbar_Panel {
	
	public btnTable           : HTMLDivElement     = null;
	public btnBorderColor	  : HTMLDivElement	   = null;
	public btnBackgroundColor : HTMLDivElement     = null;


	public btnInsertRowBefore : HTMLDivElement     = null;
	public btnInsertRowAfter  : HTMLDivElement     = null;
	public btnDeleteRow       : HTMLDivElement     = null;

	public btnInsertColBefore : HTMLDivElement     = null;
	public btnInsertColAfter  : HTMLDivElement     = null;
	public btnDeleteCol       : HTMLDivElement     = null;

	constructor( toolbar: UI_Toolbar, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		
		super( toolbar, 'Table', appendIn, maxPercentualOrFixedWidth, panelRowIndex );

		DOM.addClass( this.node, 'ui-panel-table');

		this.node.innerHTML = UI_Resources.html_tableToolbar;


		this.btnTable           = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table' );
		this.btnBorderColor     = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.borderColor' );
		this.btnBackgroundColor = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.backgroundColor' );

		this.btnInsertRowBefore = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-r-before' );
		this.btnInsertRowAfter  = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-r-after' );
		this.btnDeleteRow       = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-delete-r' );

		this.btnInsertColBefore = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-c-before' );
		this.btnInsertColAfter  = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-c-after' );
		this.btnDeleteCol       = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-delete-c' );


		( function( me ) {

			me.makeColorDropdown( me.btnBorderColor, function( color: string ) {
				
				if ( DOM.hasClass( me.btnBorderColor, 'state-disabled' ) )
					return;

				me.setBorderColor( color );

			}, '' );

			me.btnInsertRowAfter.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnInsertRowAfter, 'state-disabled' ) )
					return;
				me.insertRowAfter();
			}, true );

			me.btnInsertRowBefore.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnInsertRowBefore, 'state-disabled' ) )
					return;
				me.insertRowBefore();
			}, true );

			me.btnDeleteRow.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnDeleteRow, 'state-disabled' ) )
					return;
				me.deleteRow();
			}, true );

			me.btnInsertColAfter.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnInsertColAfter, 'state-disabled' ) ) 
					return;
				me.insertColumnAfter();
			}, true );

			me.btnInsertColBefore.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnInsertColBefore, 'state-disabled' ) )
					return;
				me.insertColumnBefore();
			}, true );

			me.btnDeleteCol.addEventListener( 'click', function( evt ) {
				if ( DOM.hasClass( me.btnDeleteCol, 'state-disabled' ) )
					return;
				me.deleteColumn();
			}, true );

			me.createTableDropdown( me.btnTable, function( c: number, r: number ) {
				me.insertTable( c, r );
			} );

			me.makeColorDropdown( me.btnBackgroundColor, function( color: string ) {
				me.setBackgroundColor( color );
			}, '' );


		} )( this );

		this.on_afterload();
		

	}

	private updatePanelState() {

		var tableState: boolean = !!this.toolbar.state.state.table,
		    cellState : boolean = !!this.toolbar.state.state.cell;

		if ( tableState ) {
			DOM.removeClass( this.btnTable, 'state-disabled' );
		} else {
			DOM.addClass( this.btnTable, 'state-disabled' );
		}

		if ( cellState ) {
			DOM.removeClass( this.btnBorderColor,     'state-disabled' );
			DOM.removeClass( this.btnBackgroundColor, 'state-disabled' );
			DOM.removeClass( this.btnInsertColAfter,  'state-disabled' );
			DOM.removeClass( this.btnInsertColBefore, 'state-disabled' );
			DOM.removeClass( this.btnDeleteCol,       'state-disabled' );
			DOM.removeClass( this.btnInsertRowAfter,  'state-disabled' );
			DOM.removeClass( this.btnInsertRowBefore, 'state-disabled' );
			DOM.removeClass( this.btnDeleteRow,       'state-disabled' );
		} else {
			DOM.addClass( this.btnBorderColor,        'state-disabled' );
			DOM.addClass( this.btnBackgroundColor,    'state-disabled' );
			DOM.addClass( this.btnInsertColAfter,     'state-disabled' );
			DOM.addClass( this.btnInsertColBefore,    'state-disabled' );
			DOM.addClass( this.btnDeleteCol,          'state-disabled' );
			DOM.addClass( this.btnInsertRowAfter,     'state-disabled' );
			DOM.addClass( this.btnInsertRowBefore,    'state-disabled' );
			DOM.addClass( this.btnDeleteRow,          'state-disabled' );
		}

	}

	private setBorderColor( color: string ) {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( !cell ) {
			return;
		}

		cell.ownerTable.style.borderColor( color );

		if ( !color ) {
			cell.ownerTable.border( 0 );
		} else {
			if ( cell.ownerTable.border() == 0 ) {
				cell.ownerTable.border( 1 );
			}
		}

	}

	private createTableDropdown( button: HTMLDivElement, onchange: ( cols: number, rows: number ) => void ) {
		
		var overlay = document.createElement( 'div' ),
		    status = document.createElement( 'div' ),
		    row: number,
		    col: number,
		    matrix: [any[]] = [[],[],[],[],[],[],[],[],[],[]];

		function reset() {

			var r: number = 0,
			    c: number = 0;

			for ( r = 0; r < 10; r++ ) {
				for ( c = 0; c < 10; c++ ) {
					matrix[ r ][ c ].className = 'cell';
				}
			}

			status.textContent = '';
		}

		button.addEventListener( 'click', function( evt ) {
			
			if ( DOM.hasClass( button, 'state-disabled' ) ) {
				return;
			}

			if ( DOM.hasClass( button, 'state-expanded' ) ) {
				reset();
				DOM.removeClass( button, 'state-expanded' );
				DOM.removeClass( button, 'state-pressed' );
			} else {
				DOM.addClass( button, 'state-expanded' );
				DOM.addClass( button, 'state-pressed' );
			}

		}, false );

		DOM.addClass( overlay, 'overlay' );

		function highlight( cell ) {
			var row = ~~cell.getAttribute( 'data-row' ),
			    col = ~~cell.getAttribute( 'data-col' ),
			    mc: any,

			    r: number,
			    c: number;

			for ( r=1; r<=10; r++ ) {
				for ( c = 1; c<=10; c++ ) {

					mc = matrix[ r-1 ][ c - 1 ];

					if ( r <= row && c <= col ) {
						DOM.addClass( mc, 'on' );
					} else {
						DOM.removeClass( mc, 'on' );
					}

				}
			}

			status.textContent = col + ' x ' + row;

		}

		for ( row=1; row <= 10; row++ ) {
			for ( col = 1; col <= 10; col++ ) {
				( function( row, col ) {

					var cell = document.createElement( 'div' );
					DOM.addClass( cell, 'cell' );
					cell.setAttribute( 'data-row', row );
					cell.setAttribute( 'data-col', col );
					overlay.appendChild( cell );

					matrix[ row - 1 ].push( cell );

					cell.addEventListener( 'mouseover', function(evt) {
						highlight( cell );
					}, false );

				} )( row, col );
			}
		}

		function dispatchClick( cell ) {

			var row = ~~cell.getAttribute( 'data-row' ),
			    col = ~~cell.getAttribute( 'data-col' );

			DOM.removeClass( button, 'state-expanded' );
			DOM.removeClass( button, 'state-pressed' );

			onchange( col, row );

			reset();

		}

		button.tabIndex = 0;

		overlay.addEventListener( 'click', function( evt ) {

			evt.preventDefault();
			evt.stopPropagation();

			var target: any = evt.target || evt.srcElement;

			if ( target ) {

				if ( DOM.hasClass( target, 'cell' ) ) {

					dispatchClick( target );

				}

			}

		}, true );

		DOM.addClass( status, 'status' );

		overlay.appendChild( status );

		button.appendChild( overlay );
	}

	private insertTable( cols: number, rows: number ) {

		var out: string[] = [
			'<table border="1" bordercolor="#000000" cellpadding="0" cellspacing="0">'
		];

		for ( var r=0; r<rows; r++ ) {
			out.push( '<tr>' );
			for (var c=0; c<cols; c++ ) {
				out.push( '<td></td>' );
			}
			out.push( '</tr>' );
		}

		out.push( '</table>' );

		this.toolbar.router.viewport.selection.insertHTML( out.join( '' ) );
	}

	private insertColumnBefore() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.insertColumn( true );
		}
	}

	private insertColumnAfter() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.insertColumn( false );
		}
	}

	private insertRowBefore() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.insertRow( true );
		}

	}

	private insertRowAfter() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.insertRow( false );
		}

	}

	private deleteColumn() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.deleteColumn();
		}

	}

	private deleteRow() {
		var cell: HTML_TableCell = this.toolbar.router.viewport.selection.editorState.state.cell;
		
		if ( cell ) {
			cell.deleteRow();
		}

	}

	private setBackgroundColor( color: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.BGCOLOR, [ color ] );
	}

	public updateDocumentState( propertiesList: string [] ) {
		
		var i: number = 0,
		    len: number = propertiesList.length;

		for ( i=0; i<len; i++ ) {

			if ( propertiesList[i] == 'table' || propertiesList[i] == 'cell' ) {
				this.updatePanelState();
				break;
			}

		}

	}


}