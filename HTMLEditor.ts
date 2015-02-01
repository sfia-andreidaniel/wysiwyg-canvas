/* We prefere to create a function instead of a class, because we want to parasitate
   a HTMLDivElement.
*/
function HTMLEditor( value: string, hasToolbars: boolean = true, hasStatusbar: boolean = true, initialWidth: number = null, initialHeight: number = null ): Node {

	/* Custom eventing system */
	var $EVENTS_QUEUE : {},
	    $EVENTS_ENABLED: boolean = true;


	/* End of custom eventing system */


	var element   = document.createElement( 'div' ),
	    toolbar   = element.appendChild( document.createElement( 'div' ) ),
	    body      = element.appendChild( document.createElement( 'div' ) ),
	    statusbar = element.appendChild( document.createElement( 'div' ) ),
	    disabled : boolean = false,
	    readOnly : boolean = false,
	    width    : number = initialWidth || 100,
	    height   : number = initialHeight || 100,
	    toolbars : boolean = true,
	    ui_toolbar: UI_Toolbar,
	    resizer  : Throttler = new Throttler( function() {
		    	resize( width, height );
		    }, 10 ),
	    viewport : Viewport = new Viewport();


	element['on'] = function( eventName: string, callback: ( ...args ) => void ) {
			
		$EVENTS_QUEUE = $EVENTS_QUEUE || {};

		if ( !$EVENTS_QUEUE[ eventName ] )
			$EVENTS_QUEUE[ eventName ] = [];

		$EVENTS_QUEUE[ eventName ].push( callback );
	}

	element['off'] = function( eventName: string, callback: ( ... args ) => void ) {

		if ( $EVENTS_QUEUE && $EVENTS_QUEUE[ eventName ] ) {
			for ( var i=0, len = $EVENTS_QUEUE[ eventName ].length; i<len; i++ ) {
				if ( $EVENTS_QUEUE[ eventName ][ i ] == callback ) {
					$EVENTS_QUEUE[ eventName ].splice( i, 1 );
					return;
				}
			}
		}
	}

	element['fire'] = function( eventName, ...args ) {
		if ( $EVENTS_QUEUE && $EVENTS_QUEUE[ eventName ] ) {
			for ( var i=0, len = $EVENTS_QUEUE[ eventName ].length; i<len; i++ ) {
				$EVENTS_QUEUE[ eventName ][i].apply( element, args );
			}
		}
	}

	viewport.document.on('change', function() {
		(<any>element).fire('change');
	});


	element['cssText'] = toolbar['cssText'] = statusbar['cssText'] = body['cssText'] = viewport.canvas['cssText'] 
		= "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none";

	DOM.addClass( element,   'html-editor' );
	DOM.addClass( toolbar,   'toolbar' );
	DOM.addClass( statusbar, 'statusbar' );
	DOM.addClass( body,      'body' );

	ui_toolbar = new UI_Toolbar( <HTMLElement>toolbar, viewport.router, viewport.selection.editorState );

	// append the canvas in the body element of the editor
	body.appendChild( viewport.canvas );

	if ( hasToolbars ) {
		DOM.addClass( element, 'has-toolbar' );
	}

	if ( hasStatusbar ) {
		DOM.addClass( element, 'has-statusbar' );
	}

	Object.defineProperty( element, "width", {
		"get": function() {
			return width;
		},
		"set": function( value ) {
			value = ~~value;
			width = value;
			resizer.run();
		}
	} );

	Object.defineProperty( element, "height", {
		"get": function() {
			return height;
		},
		"set": function( value ) {
			value = ~~value;
			height = value;
			resizer.run();
		}
	} );

	Object.defineProperty( element, "toolbars", {
		"get": function() {
			return hasToolbars;
		},
		"set": function( value ) {
			hasToolbars = !!value;

			if ( hasToolbars ) {
				DOM.addClass( element, 'has-toolbars' );
			} else {
				DOM.removeClass( element, 'has-toolbars' );
			}

			resizer.run();
		}
	} );

	Object.defineProperty( element, "statusbar", {
		"get": function() {
			return hasStatusbar;
		},
		"set": function( value ) {
			hasStatusbar = !!value;
			if ( hasStatusbar ) {
				DOM.addClass( element, 'has-statusbar' );
			} else {
				DOM.removeClass( element, 'has-statusbar' );
			}

			resizer.run();
		}
	} );

	Object.defineProperty( element, "value", {
		"get": function() {
			return viewport.document.innerHTML();
		},
		"set": function( html: string = ' ' ) {
			viewport.document.innerHTML( html || ' ' );
		}
	});

	Object.defineProperty( element, "document", {
		"get": function() {
			return viewport.document;
		}
	} );

	Object.defineProperty( element, "viewport", {
		"get": function() {
			return viewport;
		}
	});

	Object.defineProperty( element, "router", {
		"get": function() {
			return viewport.router;
		}
	} );
	
	Object.defineProperty( element, "state", {
		"get": function() {
			return viewport.selection.editorState;
		}
	} );

	Object.defineProperty( element, "selection", {
		"get": function() {
			return viewport.selection;
		}
	} );

	Object.defineProperty( element, "fragment", {
		"get": function() {
			return viewport.document.fragment;
		}
	} );

	function resize( newWidth, newHeight ) {
		
		element.style.width = newWidth + "px";
		element.style.height = newHeight + "px";

		var left: number = height;
		
		if ( hasToolbars ) {
			left -= 40;
		}
		
		if ( hasStatusbar ) {
			left -= 20;
		}

		body['style'].height = left + "px";

		viewport.height( left );
		viewport.width( width );

		ui_toolbar.resize( width );

		element.style.width = width + "px";

	}

	viewport.selection.editorState.on( 'changed', function( properties: string[] ) {
		ui_toolbar.updateDocumentState( properties );
	});

	(function( me ) {
		var links: HTMLAnchorElement[] = [],
		    i: number = 0,
		    len: number = 0,
		    anchor: HTMLAnchorElement = null;

		for ( i=0; i<40; i++ ) {
			anchor = <HTMLAnchorElement>document.createElement('a');
			anchor.appendChild( document.createTextNode(' ' ) );
			
			( function( link ) {

				link.addEventListener( 'click' ,function() {
					
					var start = ~~link.getAttribute('data-start'),
					     stop = ~~link.getAttribute('data-stop');

					viewport.selection.selectByFragmentIndexes( start, stop );

					viewport.canvas.focus();

				} );

				link.href = 'javascript:;'

			} )( anchor );

			links.push( anchor );
		}

		viewport.selection.on( 'changed', function() {


			var rng: TRange = viewport.selection.getRange(),
			    focus: TRange_Target = rng.focusNode(),
			    anchor: TRange_Target = rng.anchorNode(),
			    debug = focus || anchor,
			    node: TNode = debug.target,
			    stack: string[] = [],
			    i: number = 0,
			    j: number = 0;

			/* Clear the contents of the statusBar */
			while ( statusbar.childNodes.length ) {
				statusbar.removeChild( statusbar.childNodes[0] );
			}

			i = -1;

			while ( node ) {
				i++;
				if ( node.nodeType == TNode_Type.TEXT ) {
					i--;
					node = node.parentNode;
					continue; // ignore text nodes
					//links[i].firstChild.textContent = '#text';
				} else {
					links[i].firstChild.textContent = (<TNode_Element>node).nodeName.toUpperCase();
				}

				links[i].setAttribute('data-start', String(node.FRAGMENT_START) );
				links[i].setAttribute('data-stop',  String(node.FRAGMENT_END ) );

				node = node.parentNode;
			}

			for ( j=i; j>=0; j-- ) {
				statusbar.appendChild( links[j] );
			}

		} );

	} )( this );

	element['value'] = value;

	resize( width, height );

	return element;

}