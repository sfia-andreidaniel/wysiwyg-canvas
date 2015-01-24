class UI_Toolbar_Panel_Formatting extends UI_Toolbar_Panel {
	
	public btnBold     : HTMLDivElement = null;
	public btnItalic   : HTMLDivElement = null;
	public btnUnderline: HTMLDivElement = null;

	constructor( public toolbar: UI_Toolbar ) {
		super( toolbar, 'Style' );

		DOM.addClass( this.node, 'ui-panel-formatting')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button bold state" title="Bold (Ctrl+B)"></div>',
				'<div class="ui-button italic" title="Italic (Ctrl+I)"></div>',
				'<div class="ui-button underline" title="Underline (Ctrl+U)"></div>',
			'</div>',
		].join( '' );

		this.btnBold = <HTMLDivElement>this.node.querySelector( '.ui-button.bold' );
		this.btnItalic = <HTMLDivElement>this.node.querySelector( '.ui-button.italic' );
		this.btnUnderline = <HTMLDivElement>this.node.querySelector( '.ui-button.underline' );

		( function( me ) {
			
			me.btnBold.addEventListener( 'click', function() {
				me.toolbar.router.dispatchCommand( EditorCommand.BOLD, [] );
			}, true );
			
			me.btnItalic.addEventListener( 'click', function() {
				me.toolbar.router.dispatchCommand( EditorCommand.ITALIC, [] );
			}, true );

			me.btnUnderline.addEventListener( 'click', function() {
				me.toolbar.router.dispatchCommand( EditorCommand.UNDERLINE, [] );
			}, true );

		} )( this );
	}

	private updateBoldState() {
		
		var state = this.toolbar.state.state.bold;

		DOM.removeClass( this.btnBold, 'state-pressed' );
		DOM.removeClass( this.btnBold, 'state-mixed' );
		
		if ( state ) {
			DOM.addClass( this.btnBold, 'state-pressed' );
		} else {
			if( state === null ) {
				DOM.addClass( this.btnBold, 'state-mixed' );
			}
		}

	}

	private updateItalicState() {

		var state = this.toolbar.state.state.italic;

		DOM.removeClass( this.btnItalic, 'state-pressed' );
		DOM.removeClass( this.btnItalic, 'state-mixed' );
		
		if ( state ) {
			DOM.addClass( this.btnItalic, 'state-pressed' );
		} else {
			if( state === null ) {
				DOM.addClass( this.btnItalic, 'state-mixed' );
			}
		}

	}

	private updateUnderlineState() {

		var state = this.toolbar.state.state.underline;
		
		DOM.removeClass( this.btnUnderline, 'state-pressed' );
		DOM.removeClass( this.btnUnderline, 'state-mixed' );

		if ( state ) {
			DOM.addClass( this.btnUnderline, 'state-pressed' );
		} else {
			if( state === null ) {
				DOM.addClass( this.btnUnderline, 'state-mixed' );
			}
		}
	}

	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = propertiesList.length; i<len; i++ ) {
			switch ( propertiesList[i] ) {
				case 'bold':
					this.updateBoldState();
					break;
				case 'italic':
					this.updateItalicState();
					break;
				case 'underline':
					this.updateUnderlineState();
					break;
			}
		}
	}
}