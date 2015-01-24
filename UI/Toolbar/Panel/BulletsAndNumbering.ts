class UI_Toolbar_Panel_BulletsAndNumbering extends UI_Toolbar_Panel {
	
	public btnUL: HTMLDivElement = null;
	public btnOL: HTMLDivElement = null;

	constructor( public toolbar: UI_Toolbar ) {
		
		super( toolbar, 'Bullets and Numbering' );

		DOM.addClass( this.node, 'ui-panel-bullets-and-numbering')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button ol" title="Ordered List"></div>',
				'<div class="ui-button ul" title="Bulleted List"></div>',
			'</div>',
		].join( '' );

		this.btnUL = <HTMLDivElement>this.node.querySelector( '.ui-button.ul' );
		this.btnOL = <HTMLDivElement>this.node.querySelector( '.ui-button.ol' );

		( function( me ) {

			me.btnUL.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ul', true ] );
			}, true );

			me.btnOL.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ol', true ] );
			}, true );

		} )( this );

	}
}