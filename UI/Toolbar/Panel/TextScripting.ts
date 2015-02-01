class UI_Toolbar_Panel_TextScripting extends UI_Toolbar_Panel {
	
	public btnSubscript  : HTMLDivElement = null;
	public btnSuperscript: HTMLDivElement = null;

	constructor( public toolbar: UI_Toolbar ) {
		super( toolbar, 'Indentation' );

		DOM.addClass( this.node, 'ui-panel-text-scripting')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button subscript"   title="Subscript"></div>',
				'<div class="ui-button superscript" title="Superscript"></div>',
			'</div>',
		].join( '' );

		this.btnSubscript   = <HTMLDivElement>this.node.querySelector( '.ui-button.subscript' );
		this.btnSuperscript = <HTMLDivElement>this.node.querySelector( '.ui-button.superscript' );

		( function( me ) {

			me.btnSubscript.addEventListener( 'click', function( DOMEvent ) {
				
				if ( me.toolbar.state.state.verticalAlign == 'sub' ) {	
					me.toolbar.router.dispatchCommand( EditorCommand.VALIGN, [ 'normal' ] );
				} else {
					me.toolbar.router.dispatchCommand( EditorCommand.VALIGN, [ 'sub' ] );
				}
			
			}, true );
			
			me.btnSuperscript.addEventListener( 'click', function( DOMEvent ) {
			
				if ( me.toolbar.state.state.verticalAlign == 'super' ) {
					me.toolbar.router.dispatchCommand( EditorCommand.VALIGN, [ 'normal' ] );
				} else {
					me.toolbar.router.dispatchCommand( EditorCommand.VALIGN, [ 'sup' ] );
				}
			
			}, true );

		} )( this );
	}

	private update() {
		var state: string = this.toolbar.state.state.verticalAlign,
		    btns: HTMLDivElement[] = [
		    	this.btnSuperscript,
		    	this.btnSubscript
		    ],
		    i: number;

		for ( i=0; i<2; i++ ) {
			DOM.removeClass( btns[i], 'state-pressed' );
			/* DOM.removeClass( btns[i], 'state-mixed' ); */
		}



		switch ( state ) {
			case 'super':
				DOM.addClass( this.btnSuperscript, 'state-pressed' );
				break;
			case 'sub':
				DOM.addClass( this.btnSubscript, 'state-pressed' );
				break;
			case null:
				/*
				DOM.addClass( this.btnSubscript, 'state-mixed' );
				DOM.addClass( this.btnSuperscript, 'state-mixed' );
				*/
				break;
		}
	}

	public updateDocumentState( propertiesList: string[] ) {
		if ( propertiesList.indexOf( 'verticalAlign' ) >= 0 ) {
			this.update();
		}
	}
}