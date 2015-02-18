class UI_Toolbar_Panel_UndoManager extends UI_Toolbar_Panel {
	
	public buttonUndo : HTMLDivElement = null;
	public buttonRedo : HTMLDivElement = null;

	constructor( toolbar: UI_Toolbar, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		
		super( toolbar, 'Undo Manager', appendIn, maxPercentualOrFixedWidth, panelRowIndex );

		DOM.addClass( this.node, 'ui-panel-undomanager');

		this.node.innerHTML = UI_Resources.html_undoManagerToolbar;

		this.buttonUndo = <HTMLDivElement>this.node.querySelector( '.ui-button.undo' );
		this.buttonRedo = <HTMLDivElement>this.node.querySelector( '.ui-button.redo' );

		( function( me ) {

			me.buttonUndo.addEventListener( 'click', function() {
				if ( DOM.hasClass( me.buttonUndo, 'state-disabled' ) )
					return;
				me.undo();
				me.focusCanvas();
			}, false );

			me.buttonRedo.addEventListener( 'click', function() {
				if ( DOM.hasClass( me.buttonRedo, 'state-disabled' ) )
					return;
				me.redo();
				me.focusCanvas();
			}, false );

			me.toolbar.router.viewport.undo.on( 'changed', function() {

				me.updateUndoState();

			} );


		} )( this );

		this.on_afterload();
	}


	private undo() {

		this.toolbar.router.viewport.undo.undo();

	}

	private redo() {

		this.toolbar.router.viewport.undo.redo();

	}

	private updateUndoState() {

		var undo = this.toolbar.router.viewport.undo;

		if ( undo.canUndo() ) {
			DOM.removeClass( this.buttonUndo, 'state-disabled' );
		} else {
			DOM.addClass( this.buttonUndo, 'state-disabled' );
		}

		if ( undo.canRedo() ) {
			DOM.removeClass( this.buttonRedo, 'state-disabled' );
		} else {
			DOM.addClass( this.buttonRedo, 'state-disabled' );
		}

	}

}