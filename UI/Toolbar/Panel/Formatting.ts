class UI_Toolbar_Panel_Formatting extends UI_Toolbar_Panel {
	
	public btnBold        : HTMLDivElement = null;
	public btnItalic      : HTMLDivElement = null;
	public btnUnderline   : HTMLDivElement = null;
	public btnStrike      : HTMLDivElement = null;

	public btnSubscript   : HTMLDivElement = null;
	public btnSuperscript : HTMLDivElement = null;


	constructor( public toolbar: UI_Toolbar ) {
		super( toolbar, 'Style' );

		DOM.addClass( this.node, 'ui-panel-formatting')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button bold state" title="Bold (Ctrl+B)"></div>',
				'<div class="ui-button italic" title="Italic (Ctrl+I)"></div>',
				'<div class="ui-button underline" title="Underline (Ctrl+U)"></div>',
				'<div class="ui-button strike" title="Strike"></div>',
			'</div>',
			'<div class="item index-1">',
				'<div class="ui-button subscript"   title="Subscript"></div>',
				'<div class="ui-button superscript" title="Superscript"></div>',
			'</div>',

		].join( '' );

		this.btnBold = <HTMLDivElement>this.node.querySelector( '.ui-button.bold' );
		this.btnItalic = <HTMLDivElement>this.node.querySelector( '.ui-button.italic' );
		this.btnUnderline = <HTMLDivElement>this.node.querySelector( '.ui-button.underline' );
		this.btnStrike = <HTMLDivElement>this.node.querySelector( '.ui-button.strike' );

		this.btnSubscript   = <HTMLDivElement>this.node.querySelector( '.ui-button.subscript' );
		this.btnSuperscript = <HTMLDivElement>this.node.querySelector( '.ui-button.superscript' );

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

			me.btnStrike.addEventListener( 'click', function() {
				me.toolbar.router.dispatchCommand( EditorCommand.STRIKE, [] );
			}, true );

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

	private updateScriptState() {
		var state: string = this.toolbar.state.state.verticalAlign,
		    btns: HTMLDivElement[] = [ this.btnSuperscript, this.btnSubscript ],
		    i: number;

		for ( i=0; i<2; i++ ) {
			DOM.removeClass( btns[i], 'state-pressed' );
		}

		switch ( state ) {
			case 'super':
				DOM.addClass( this.btnSuperscript, 'state-pressed' );
				break;
			case 'sub':
				DOM.addClass( this.btnSubscript, 'state-pressed' );
				break;
		}
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

	private updateStrikeState() {

		var state = this.toolbar.state.state.strike;
		
		DOM.removeClass( this.btnStrike, 'state-pressed' );
		DOM.removeClass( this.btnStrike, 'state-mixed' );

		if ( state ) {
			DOM.addClass( this.btnStrike, 'state-pressed' );
		} else {
			if( state === null ) {
				DOM.addClass( this.btnStrike, 'state-mixed' );
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
				case 'verticalAlign':
					this.updateScriptState();
					break;
				case 'bold':
					this.updateBoldState();
					break;
				case 'italic':
					this.updateItalicState();
					break;
				case 'underline':
					this.updateUnderlineState();
					break;
				case 'strike':
					this.updateStrikeState();
					break;
			}
		}
	}
}