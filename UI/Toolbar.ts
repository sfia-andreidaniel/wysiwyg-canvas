class UI_Toolbar extends Events {
	
	public node: HTMLElement;

	public rows: HTMLDivElement[];

	public panels: UI_Toolbar_Panel[]     = [];
	public panelRows: [UI_Toolbar_Panel[]] = [ [], [] ];

	public router: Viewport_CommandRouter = null;

	public state : Selection_EditorState  = null;

	constructor( DOMNodeContainer: HTMLElement, router: Viewport_CommandRouter, state: Selection_EditorState ) {
		
		super();
		
		this.node = DOMNodeContainer;

		this.router = router;
		this.state = state;

		this.node.innerHTML = '<div class="toolbar-row index-1"></div><div class="toolbar-row index-2"></div>';

		this.rows = [
			<HTMLDivElement>this.node.querySelector( '.toolbar-row.index-1' ),
			<HTMLDivElement>this.node.querySelector( '.toolbar-row.index-2' )
		];
		
		this.panels.push( new UI_Toolbar_Panel_Clipboard  ( this, this.rows[0], 70, 0 ) );
		this.panels.push( new UI_Toolbar_Panel_Multimedia ( this, this.rows[0], 70, 0 ) );
		this.panels.push( new UI_Toolbar_Panel_Table      ( this, this.rows[0], 310, 0 ) );
		this.panels.push( new UI_Toolbar_Panel_Formatting ( this, this.rows[1],  1, 1 ) );

		for ( var i=0, len = this.rows.length; i<len; i++ ) {
			
			( function( row, toolbar ) {

				row.addEventListener( 'click', function( evt ) {
					
					if ( evt.srcElement != row && evt.target != row ) {
						return;
					}

					toolbar.closeExpandedSheets();

				}, true );

			} )( this.rows[i], this );
		}

	}

	protected closeExpandedSheets() {

		for ( var i=0, len = this.panels.length; i<len; i++ ) {
			DOM.removeClass( this.panels[i].showMore, 'opened' );
		}

	}

	// forward the document state changes to the panels.
	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = this.panels.length; i<len; i++ ) {
			this.panels[i].updateDocumentState( propertiesList );
		}
	}

	public resize( width: number ) {

		width = ~~width;

		var panel             : number = 0,
		    panels            : number = 0,
		    row               : number = 0,
		    rows              : number = 0,
		    percentualDefined : number = 0,

		    fixedWidths       : UI_Toolbar_Panel[],
		    fixedWidthsSum    : number = 0,

		    remainingFixedWidth: number = 0;

		for ( row = 0, rows = this.panelRows.length; row < rows; row++ ) {

			fixedWidthsSum = 0;

			// compute the percentualWidth of the panels with fixed width;
			percentualDefined = 0;
			fixedWidths       = [];

			for ( panel = 0, panels = this.panelRows[ row ].length; panel < panels; panel++ ) {
				if ( this.panelRows[ row ][ panel ].fixedWidth === null ) {
					percentualDefined += this.panelRows[ row ][ panel ].percentualWidth;
				} else {
					fixedWidths.push( this.panelRows[ row ][ panel ] );
					fixedWidthsSum += this.panelRows[ row ][ panel ].fixedWidth;
				}
			}

			remainingFixedWidth = ( 1 - percentualDefined ) * width;

			for ( panel = 0, panels = this.panelRows[ row ].length; panel < panels; panel++ ) {
				
				if ( this.panelRows[ row ][ panel ].fixedWidth === null ) {
					this.panelRows[ row ][ panel ].resizeByParentWidth( width - fixedWidthsSum );
				} else {
					this.panelRows[ row ][ panel ].resizeByParentWidth( remainingFixedWidth );
					remainingFixedWidth -= this.panelRows[ row ][ panel ].fixedWidth;
				}

			}
		}

	}

}