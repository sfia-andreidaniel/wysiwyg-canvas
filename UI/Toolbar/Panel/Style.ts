class UI_Toolbar_Panel_Style extends UI_Toolbar_Panel {
	
	public blockLevel         : HTMLInputElement   = null;
	public fontFamily 		  : HTMLInputElement   = null;
	public fontSize 		  : HTMLInputElement   = null;
	public btnClearFormatting : HTMLDivElement     = null;

	constructor( toolbar: UI_Toolbar ) {
		
		super( toolbar, 'Style' );

		DOM.addClass( this.node, 'ui-panel-style')

		this.node.innerHTML = [
			'<div class="item">',
				'<div class="ui-button remove-formatting" title="Clear Formatting">',
				'</div>',
			'</div>',
			'<div class="item index-0">',
				'<div class="text-dropdown">',
					'<input class="nodeName" type="text" data-suggestions="normal:Normal,h1:Heading 1,h2:Heading 2,h3:Heading 3,h4:Heading 4,h5:Heading 5,h6:Heading 6" placeholder="Style" value="" >',
					'<div class="expander"></div>',
				'</div>',
			'</div>',
			'<div class="item index-1">',
				'<div class="text-dropdown">',
					'<input class="fontFamily" type="text" data-suggestions="' + TStyle.$FontFamily.join(',') + '" value="" placeholder="Font" />',
					'<div class="expander"></div>',
				'</div>',
			'</div>',
			'<div class="item index-2">',
				'<div class="text-dropdown">',
					'<input class="fontSize" type="text" data-suggestions="8,9,10,12,14,16,18,20,22,24,26,28,30,32" value="" placeholder="Size" />',
					'<div class="expander"></div>',
				'</div>',
			'</div>'
		].join( '' );

		this.blockLevel   = <HTMLInputElement>this.node.querySelector( 'input.nodeName' );
		this.fontFamily = <HTMLInputElement>this.node.querySelector( 'input.fontFamily' );
		this.fontSize   = <HTMLInputElement>this.node.querySelector( 'input.fontSize' );
		this.btnClearFormatting = <HTMLDivElement>this.node.querySelector( 'div.ui-button.remove-formatting' );

		( function( me ) {
			me.btnClearFormatting.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.CLEAR_FORMATTING, [] );
			}, true );
		})( this );

		( function( me ) {

			me.dropdownize( me.blockLevel , function( v: string ) {
				me.setBlockLevel( v );
			}, true );
			
			me.dropdownize( me.fontFamily , function( v: string ) {
				me.setFontFamily( v );
			}, false );
			
			me.dropdownize( me.fontSize , function( v: string ) {
				me.setFontSize( v );
			}, false );

		})( this );

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

	private dropdownize( input: HTMLInputElement, submit: ( v: string ) => any, allowSuggestionsOnly: boolean = false ) {

		/* indeed.com corby nn18 nn95nb */

		// make the parent of the input focusable
		input.parentNode['tabIndex'] = 0;

		var suggestions : string[] = ( input.getAttribute( 'data-suggestions' ) || '' ).split( ',' ),
		    len: number = suggestions.length,
		    i: number = 0,
		    items: TNameValuePair[] = [],
		    value: TNameValuePair,
		    sp: string[],
		    overlay: HTMLDivElement,
		    option: HTMLDivElement,
		    valueOnFocus: string = '',
		    expander: HTMLDivElement = ( <HTMLDivElement>(<HTMLDivElement>input.parentNode).querySelector( 'div.expander' ) );

		for ( i=0, len = suggestions.length; i<len; i++ ) {
			suggestions[i] = suggestions[i].replace( /(^[\s]+|[\s]+$)/g, '' );
			if ( suggestions[i] ) {
				sp = suggestions[i].split(':');
				if ( sp.length == 1 ) {
					items.push( {
						"name": sp[0],
						"value": sp[0]
					});
				} else {
					items.push( {
						"value": sp[0],
						"name": sp.slice(1).join(':')
					});
				}
			}
		}

		overlay = document.createElement( 'div' );
		DOM.addClass( overlay, 'overlay' );

		// create an overlay object, and append it after the input
		if ( items.length ) {

			for ( i=0, len = items.length; i<len; i++ ) {
				option = document.createElement( 'div' );
				DOM.addClass( option, 'option' );
				option.appendChild( document.createTextNode( items[i].name ) );
				option.setAttribute( 'data-value', items[i].value );
				overlay.appendChild( option );
			}

			input.parentNode.appendChild( overlay );

		}

		// webkit minor bugfix
		overlay.addEventListener( 'mousewheel', function( DOMEvent ) {
			overlay.scrollTop -= DOMEvent.wheelDelta > 0 ? 10 : -10;
			DOMEvent.preventDefault();
			DOMEvent.stopPropagation();
		}, true );

		overlay.addEventListener( 'click', function( DOMEvent ) {
			var target: any = DOMEvent.target || DOMEvent.srcElement,
			    which  = DOMEvent.which;

			if ( which != 1 ) {
				return;
			}

			if ( !DOM.hasClass( target, 'option' ) ) {
				return;
			}

			input.value = target.textContent;
			
			// focus the parentNode of the input, in order to avoid focusing something
			// else outside our marvelous editor.
			input.parentNode['focus']();

			submit( target.getAttribute( 'data-value' ) );

		}, true );

		overlay.addEventListener( 'mousedown', function( DOMEvent ) {
			DOMEvent.preventDefault();
			DOMEvent.stopPropagation();
		}, true );

		if ( expander ) {
			expander.addEventListener('click', function() {
				input.focus();
			}, true );
		}

		input.addEventListener( 'focus', function() {
			valueOnFocus = input.value;
			input.select();
			DOM.addClass( input.parentNode, 'focused' );
			for ( var i=0, items = Array.prototype.slice.call( overlay.childNodes, 0 ) || [], len = items.length; i<len; i++ ) {
				DOM.removeClass( items[i], 'hidden' );
				/* "select" the option if the option textContents equals with the input value */
				if ( items[i].textContent == input.value ) {
					items[i].scrollIntoViewIfNeeded();
					DOM.addClass( items[i], 'on' );
				} else {
					DOM.removeClass( items[i], 'on' );
				}
			}
		}, true );

		input.addEventListener( 'blur', function() {
			DOM.removeClass( input.parentNode, 'focused' );
		}, true );

		var preventFiltering: boolean = false,
		    onTextInput: Throttler = new Throttler( function() {
			
			if ( preventFiltering ) {
				preventFiltering = false;
				return;
			}

			var value: string = input.value.toLowerCase(),
			    i: number = 0,
			    len: number = items.length,
			    nodes = Array.prototype.slice.call( overlay.childNodes, 0 );
			
			for ( i=0; i<len; i++ ) {
				DOM.removeClass( nodes[i], 'on' );
				if ( value == '' || items[i].name.toLowerCase().indexOf( value ) >= 0 ) {
					DOM.removeClass( nodes[i], 'hidden' );
				} else {
					DOM.addClass( nodes[i], 'hidden' );
				}
			}
		
		}, 10 );

		function onUpArrow() {
			var opts: HTMLDivElement[] = [],
			    i: number = 0,
			    len: number = 0,
			    childNodes: HTMLDivElement[] = <HTMLDivElement[]>Array.prototype.slice.call(overlay.childNodes, 0),
			    onIndex: number = -1,
			    onOption: HTMLDivElement;

			for ( i=0, len = childNodes.length; i<len; i++ ) {
				if ( !DOM.hasClass( childNodes[i], 'hidden' ) ) {
					opts.push( childNodes[i] );
					if ( DOM.hasClass( childNodes[i], 'on' ) ) {
						onIndex = opts.length - 1;
					}
				}
			}

			if ( opts.length ) {

				if ( onIndex == -1 || onIndex == 0 ) {
					
					if ( onIndex == 0 )
						DOM.removeClass( opts[0], 'on' );

					DOM.addClass( onOption = opts[ opts.length - 1 ], 'on' );
				} else {
					
					DOM.removeClass( opts[ onIndex ], 'on' );
					DOM.addClass( onOption = opts[ onIndex - 1 ], 'on' );
				
				}

				onOption['scrollIntoViewIfNeeded']();

				// set the value of the control to onOption.textContents

				input.value = onOption.textContent;
				input.select();
				preventFiltering = true;

			}

		}

		function onDownArrow() {
			var opts: HTMLDivElement[] = [],
			    i: number = 0,
			    len: number = 0,
			    childNodes: HTMLDivElement[] = <HTMLDivElement[]>Array.prototype.slice.call(overlay.childNodes, 0),
			    onIndex: number = -1,
			    onOption: HTMLDivElement;

			for ( i=0, len = childNodes.length; i<len; i++ ) {
				if ( !DOM.hasClass( childNodes[i], 'hidden' ) ) {
					opts.push( childNodes[i] );
					if ( DOM.hasClass( childNodes[i], 'on' ) ) {
						onIndex = opts.length - 1;
					}
				}
			}

			if ( opts.length ) {

				if ( onIndex == -1 || onIndex == opts.length -1 ) {
					
					if ( onIndex == opts.length - 1 )
						DOM.removeClass( opts[ opts.length - 1], 'on' );

					DOM.addClass( onOption = opts[ 0 ], 'on' );
				} else {
					
					DOM.removeClass( opts[ onIndex ], 'on' );
					DOM.addClass( onOption = opts[ onIndex + 1 ], 'on' );
				
				}


				onOption['scrollIntoViewIfNeeded']();
				// set the value of the control to onOption.textContents

				input.value = onOption.textContent;
				input.select();
				preventFiltering = true;

			}

		}

		function onEnterKey() {
			
			preventFiltering = true;

			var v: string = input.value,
			    i: number = 0,
			    len: number = 0,
			    valid: boolean = false,
			    val: string = input.value;

			if ( !v ) {
				return;
			}

			if ( allowSuggestionsOnly ) {
				// check if the input value is one of the items list.
				for ( i =0, len = items.length; i<len; i++ ) {
					if ( items[i].name == v ) {
						valid = true;
						val = items[i].value;
						break;
					}
				}
			} else {
				valid = true;
			}

			if ( !valid ) {
				return;
			}

			input.parentNode['focus']();

			submit( val );
			
		}

		function changed( event ) {

			var keyCode = event.keyCode;

			switch ( keyCode ) {
				case 38: // up:
					onUpArrow();
					event.preventDefault();
					event.stopPropagation();
					break;
				case 40: // down:
					onDownArrow();
					event.preventDefault();
					event.stopPropagation();
					break;
				case 13: // enter
					onEnterKey();
					event.preventDefault();
					event.stopPropagation();
					break;
				case 27:
					input.parentNode['focus']();
					input.value = valueOnFocus;
					event.preventDefault();
					event.stopPropagation();
					break;
				default:
					onTextInput.run();
					break;
			}

			onTextInput.run();
		}

		input.addEventListener( 'keydown', changed, true );

	}

	private updateBlockLevel() {
		var level: string = String( this.toolbar.state.state.blockLevel || '' ),
		    strs = {
		    	"normal": "Normal",
		    	"h1": "Heading 1",
		    	"h2": "Heading 2",
		    	"h3": "Heading 3",
		    	"h4": "Heading 4",
		    	"h5": "Heading 5",
		    	"h6": "Heading 6"
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
			}
		}
	}
}