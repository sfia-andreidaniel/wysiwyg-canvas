class UI_Toolbar_Panel_Formatting extends UI_Toolbar_Panel {
	
	public blockLevel         : HTMLInputElement   = null;
	public fontFamily 		  : HTMLInputElement   = null;
	public fontSize 		  : HTMLInputElement   = null;
	public btnClearFormatting : HTMLDivElement     = null;
	public btnBold        	  : HTMLDivElement 	   = null;
	public btnItalic          : HTMLDivElement 	   = null;
	public btnUnderline       : HTMLDivElement     = null;
	public btnStrike          : HTMLDivElement     = null;
	public btnSubscript       : HTMLDivElement     = null;
	public btnSuperscript     : HTMLDivElement     = null;
	public btnLeft      	  : HTMLDivElement     = null;
	public btnRight     	  : HTMLDivElement     = null;
	public btnCenter    	  : HTMLDivElement     = null;
	public btnJustified 	  : HTMLDivElement     = null;
	public btnUL 			  : HTMLDivElement 	   = null;
	public btnOL 			  : HTMLDivElement     = null;
	public btnIndent  		  : HTMLDivElement     = null;
	public btnUnindent 		  : HTMLDivElement     = null;

	public btnColor           : HTMLDivElement     = null;

	constructor( toolbar: UI_Toolbar, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		
		super( toolbar, 'Formatting', appendIn, maxPercentualOrFixedWidth, panelRowIndex );

		DOM.addClass( this.node, 'ui-panel-style')

		this.node.innerHTML = UI_Resources.html_formattingToolbar;

		this.blockLevel         = <HTMLInputElement>this.node.querySelector( 'input.nodeName' );
		this.fontFamily         = <HTMLInputElement>this.node.querySelector( 'input.fontFamily' );

		this.fontFamily.setAttribute( 'data-suggestions', TStyle.$FontFamily.join(',') );

		this.fontSize           = <HTMLInputElement>this.node.querySelector( 'input.fontSize' );
		this.btnClearFormatting = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.remove-formatting' );

		this.btnBold 		    = <HTMLDivElement>  this.node.querySelector( '.ui-button.bold' );
		this.btnItalic          = <HTMLDivElement>  this.node.querySelector( '.ui-button.italic' );
		this.btnUnderline       = <HTMLDivElement>  this.node.querySelector( '.ui-button.underline' );
		this.btnStrike          = <HTMLDivElement>  this.node.querySelector( '.ui-button.strike' );

		this.btnSubscript       = <HTMLDivElement>  this.node.querySelector( '.ui-button.subscript' );
		this.btnSuperscript     = <HTMLDivElement>  this.node.querySelector( '.ui-button.superscript' );

		this.btnLeft      		= <HTMLDivElement>  this.node.querySelector( '.ui-button.left' );
		this.btnRight     		= <HTMLDivElement>  this.node.querySelector( '.ui-button.right' );
		this.btnCenter    		= <HTMLDivElement>  this.node.querySelector( '.ui-button.center' );
		this.btnJustified 		= <HTMLDivElement>  this.node.querySelector( '.ui-button.justified' );

		this.btnUL 			    = <HTMLDivElement>  this.node.querySelector( '.ui-button.ul' );
		this.btnOL 				= <HTMLDivElement>  this.node.querySelector( '.ui-button.ol' );

		this.btnIndent  		= <HTMLDivElement>  this.node.querySelector( '.ui-button.increase' );
		this.btnUnindent 		= <HTMLDivElement>  this.node.querySelector( '.ui-button.decrease' );

		this.btnColor           = <HTMLDivElement>  this.node.querySelector( 'div.ui-button.color' );


		( function( me ) {

			me.btnClearFormatting.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.CLEAR_FORMATTING, [] );
			}, true );

			me.dropdownize( me.blockLevel , function( v: string ) {
				me.setBlockLevel( v );
			}, true );
			
			me.dropdownize( me.fontFamily , function( v: string ) {
				me.setFontFamily( v );
			}, false );
			
			me.dropdownize( me.fontSize , function( v: string ) {
				me.setFontSize( v );
			}, false );

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

			me.btnLeft.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'left' ] );
			}, true );

			me.btnRight.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'right' ] );
			}, true );

			me.btnCenter.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'center' ] );
			}, true );

			me.btnJustified.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'justified' ] );
			}, true );

			me.btnUL.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ul' ] );
			}, true );

			me.btnOL.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.LIST, [ 'ol' ] );
			}, true );

			me.btnIndent.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.INDENT, [] );
			}, true );
			
			me.btnUnindent.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.UNINDENT, [] );
			}, true );

			me.makeColorDropdown( me.btnColor, function( color: string ) {
				me.setColor( color );
			}, '');

		})( this );

		this.on_afterload();

	}

	protected setBlockLevel( nodeName: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.BLOCK_LEVEL, [ nodeName ] )
	}

	private setFontFamily( fontFamily: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.FONT, [ fontFamily ] );
	}

	private setFontSize( fontSize: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.SIZE, [ fontSize ] );
	}

	private updateBlockLevel() {
		var level: string = String( this.toolbar.state.state.blockLevel || '' ),
		    strs = {
		    	"normal": "Normal",
		    	"h1": "Heading 1",
		    	"h2": "Heading 2",
		    	"h3": "Heading 3",
		    	"h4": "Heading 4",
		    	"h5": "Heading 5"
		    };
		this.blockLevel.value = strs[ level ] || '';
	}

	private updateFontFamily() {
		var family: string = String( this.toolbar.state.state.fontFamily || '' );
		this.fontFamily.value = family;
	}

	private updateFontSize() {
		var size: string = String( this.toolbar.state.state.fontSize || '' );
		this.fontSize.value = size;
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

	private updateAlignmentState() {
		var state: string = this.toolbar.state.state.textAlign,
		    btns: HTMLDivElement[] = [
		    	this.btnLeft,
		    	this.btnRight,
		    	this.btnCenter,
		    	this.btnJustified
		    ],
		    i: number;
		
		for ( i=0; i<4; i++ ) {
			DOM.removeClass( btns[i], 'state-pressed' );
		}

		switch ( state ) {
			case 'left':
				DOM.addClass( this.btnLeft, 'state-pressed' );
				break;
			case 'right':
				DOM.addClass( this.btnRight, 'state-pressed' );
				break;
			case 'center':
				DOM.addClass( this.btnCenter, 'state-pressed' );
				break;
			case 'justified':
				DOM.addClass( this.btnJustified, 'state-pressed' );
				break;
		}
	}

	private updateListState() {
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

	private setColor( color: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.COLOR, [ color ] );
	}

	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = propertiesList.length; i<len; i++ ) {
			switch ( propertiesList[i] ) {
				case 'blockLevel':
					this.updateBlockLevel();
					break;
				case 'fontFamily':
					this.updateFontFamily();
					break;
				case 'fontSize':
					this.updateFontSize();
					break;
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
				case 'textAlign':
					this.updateAlignmentState();
					break;
				case 'listType':
					this.updateListState();
					break;
			}
		}
	}
}