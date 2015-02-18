class UI_Toolbar_Panel_Clipboard extends UI_Toolbar_Panel {
	
	public buttonCut   : HTMLDivElement = null;
	public buttonCopy  : HTMLDivElement = null;
	public buttonPaste : HTMLDivElement = null;

	constructor( toolbar: UI_Toolbar, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		
		super( toolbar, 'Clipboard', appendIn, maxPercentualOrFixedWidth, panelRowIndex );

		DOM.addClass( this.node, 'ui-panel-clipboard');

		this.node.innerHTML = UI_Resources.html_clipboardToolbar;

		this.buttonCut   = <HTMLDivElement>this.node.querySelector( '.ui-button.cut' );
		this.buttonCopy  = <HTMLDivElement>this.node.querySelector( '.ui-button.copy' );
		this.buttonPaste = <HTMLDivElement>this.node.querySelector( '.ui-button.paste' );

		( function( me ) {

			me.buttonCut.addEventListener( 'click', function() {
				if ( DOM.hasClass( me.buttonCut, 'state-disabled' ) )
					return;
				me.cut();
				me.focusCanvas();
			}, false );

			me.buttonCopy.addEventListener( 'click', function() {
				if ( DOM.hasClass( me.buttonCopy, 'state-disabled' ) )
					return;
				me.copy();
				me.focusCanvas();
			}, false );

			me.buttonPaste.addEventListener( 'click', function() {
				if ( DOM.hasClass( me.buttonPaste, 'state-disabled' ) )
					return;
				me.paste();
				me.focusCanvas();
			}, false );

		} )( this );

		this.on_afterload();

		( function( me ) {

			me.toolbar.router.viewport.selection.on( 'changed', function() {
				me.updateState();
			});

		} )( this );
		
	}

	private cut() {
		this.toolbar.router.dispatchCommand( EditorCommand.CUT, [] );
		this.focus( this.toolbar.router.viewport.canvas );
	}

	private copy() {
		this.toolbar.router.dispatchCommand( EditorCommand.COPY, [] );
		this.focus( this.toolbar.router.viewport.canvas );
	}

	private paste() {
		this.toolbar.router.dispatchCommand( EditorCommand.PASTE, [] );
		this.focus( this.toolbar.router.viewport.canvas );
	}

	private updateState() {
		
		var selection = this.toolbar.router.viewport.selection,
		    rng = selection.getRange(),
		    len: number = rng.length();

		switch ( len ) {
			case null:

				if ( rng.isMultiRange() ) {
					DOM.removeClass( this.buttonCopy, 'state-disabled' );
					DOM.addClass( this.buttonCut, 'state-disabled' );
					DOM.removeClass( this.buttonPaste, 'state-disabled' );
				} else {
					DOM.removeClass( this.buttonCopy, 'state-disabled' );
					DOM.removeClass( this.buttonCut,  'state-disabled' );
					
					if ( rng.isOrphan() ) {
						DOM.removeClass( this.buttonPaste, 'state-disabled' );
					} else {
						DOM.addClass   ( this.buttonPaste, 'state-disabled' );
					}
				}

				break;
			case 0:
				DOM.addClass( this.buttonCopy, 'state-disabled' );
				DOM.addClass( this.buttonCut,  'state-disabled' );
				DOM.removeClass( this.buttonPaste, 'state-disabled' );
				break;
			default:
				DOM.removeClass( this.buttonCopy, 'state-disabled' );
				DOM.removeClass( this.buttonCut,  'state-disabled' );
				DOM.removeClass( this.buttonPaste, 'state-disabled' );
				break;
		}

	}

}