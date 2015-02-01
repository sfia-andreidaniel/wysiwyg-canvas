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
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ul' ] );
			}, true );

			me.btnOL.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ol' ] );
			}, true );

		} )( this );

	}

	private update() {
		var state = this.toolbar.state.state.listType;

		DOM.removeClass( this.btnUL, 'state-pressed' );
		DOM.removeClass( this.btnOL, 'state-pressed' );

		switch ( state ) {
			case 'ul':
				DOM.addClass( this.btnUL, 'state-pressed' );
				break;
			case 'ol':
				DOM.addClass( this.btnOL, 'state-pressed' );
				break;
			default:
				break;
		}
	}

	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = propertiesList.length; i<len; i++ ) {
			if ( propertiesList[i] == 'listType' ) {
				this.update();
				break;
			}
		}
	}
}