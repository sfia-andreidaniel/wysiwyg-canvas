class UI_Toolbar_Panel_Table extends UI_Toolbar_Panel {
	
	public btnTable           : HTMLDivElement     = null;
	public btnBorderColor	  : HTMLDivElement	   = null;

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

		this.btnInsertRowBefore = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-r-before' );
		this.btnInsertRowAfter  = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-r-after' );
		this.btnDeleteRow       = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-delete-r' );

		this.btnInsertColBefore = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-c-before' );
		this.btnInsertColAfter  = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-insert-c-after' );
		this.btnDeleteCol       = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.table-delete-c' );


		( function( me ) {

			me.makeColorDropdown( me.btnBorderColor, function( color: string ) {
				
				if ( !DOM.hasClass( me.btnBorderColor, 'state-disabled' ) ) {
					me.setBorderColor( color );
				}

			}, '' );

			me.btnTable.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnTable, 'state-disabled' ) ) {
					console.warn( 'insert / edit table' );
				}
			}, true );

			me.btnInsertRowAfter.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnInsertRowAfter, 'state-disabled' ) ) {
					console.warn( 'insert row after' );
				}
			}, true );

			me.btnInsertRowBefore.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnInsertRowBefore, 'state-disabled' ) ) {
					console.warn( 'insert row before' );
				}
			}, true );

			me.btnDeleteRow.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnDeleteRow, 'state-disabled' ) ) {
					console.warn( 'delete row' );
				}
			}, true );

			me.btnInsertColAfter.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnInsertColAfter, 'state-disabled' ) ) {
					console.warn( 'insert col after' );
				}
			}, true );

			me.btnInsertColBefore.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnInsertColBefore, 'state-disabled' ) ) {
					console.warn( 'insert col before' );
				}
			}, true );

			me.btnDeleteCol.addEventListener( 'click', function( evt ) {
				if ( !DOM.hasClass( me.btnDeleteCol, 'state-disabled' ) ) {
					console.warn( 'delete col' );
				}
			}, true );

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
			DOM.removeClass( this.btnInsertColAfter,  'state-disabled' );
			DOM.removeClass( this.btnInsertColBefore, 'state-disabled' );
			DOM.removeClass( this.btnDeleteCol,       'state-disabled' );
			DOM.removeClass( this.btnInsertRowAfter,  'state-disabled' );
			DOM.removeClass( this.btnInsertRowBefore, 'state-disabled' );
			DOM.removeClass( this.btnDeleteRow,       'state-disabled' );
		} else {
			DOM.addClass( this.btnBorderColor,        'state-disabled' );
			DOM.addClass( this.btnInsertColAfter,     'state-disabled' );
			DOM.addClass( this.btnInsertColBefore,    'state-disabled' );
			DOM.addClass( this.btnDeleteCol,          'state-disabled' );
			DOM.addClass( this.btnInsertRowAfter,     'state-disabled' );
			DOM.addClass( this.btnInsertRowBefore,    'state-disabled' );
			DOM.addClass( this.btnDeleteRow,          'state-disabled' );
		}

	}

	private setBorderColor( color: string ) {
		console.info( 'setBorderColor: ' + color );
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