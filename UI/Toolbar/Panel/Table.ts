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
				me.setBorderColor( color );
			}, '' );

		} )( this );

		this.on_afterload();
		
	}

	private setBorderColor( color: string ) {
		console.info( 'setBorderColor: ' + color );
	}

}