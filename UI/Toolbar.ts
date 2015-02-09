class UI_Toolbar extends Events {
	
	public node: HTMLElement;

	public rows: HTMLDivElement[];

	public panels: UI_Toolbar_Panel[]     = [];
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
	
		this.panels.push( new UI_Toolbar_Panel_Multimedia ( this, this.rows[0] ) );
		this.panels.push( new UI_Toolbar_Panel_Formatting ( this, this.rows[1] ) );

	}

	// forward the document state changes to the panels.
	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = this.panels.length; i<len; i++ ) {
			this.panels[i].updateDocumentState( propertiesList );
		}
	}

	public resize( width: number ) {

		width = ~~width;

		for ( var i=0, len = this.panels.length; i<len; i++ ) {
			this.panels[i].resizeByParentWidth( width );
		}

	}

}