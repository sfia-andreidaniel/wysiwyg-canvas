class UI_Toolbar_Panel extends Events {

	public width: number = 0; // the minWidth of the toolbar, without being resized.
	
	public node : HTMLElement = document.createElement( 'div' );

	constructor( public toolbar: UI_Toolbar, public name: string = 'Toolbar' ) {
		super();

		DOM.addClass( this.node, 'ui-panel' );
		
		toolbar.node.appendChild( this.node );
		
		this.node.title = name || 'Toolbar';

		this.width = 10;
	}

	public resizeByParentWidth( width: number ) {

	}

}