/* We prefere to create a function instead of a class, because we want to parasitate
   a HTMLDivElement.
*/
function HTMLEditor( value: string, config: TEditorInputConfig = null ): Node {

	config = config || {};

	/* Custom eventing system */

	var 

		$EVENTS_QUEUE : {},
	    $EVENTS_ENABLED: boolean         = true,

	    settings: TEditorInputConfig     = {
			width     : config.width     == void 0 	? 100                : ~~config.width,
			height    : config.height    == void 0 	? 100                : ~~config.height,
			toolbars  : config.toolbars  == void 0 	? !!config.toolbars  : true,
			statusbar : config.statusbar == void 0 	? !!config.statusbar : true,
			resizable : config.resizable == void 0 	? !!config.resizable : true,
			readOnly  : config.readOnly  == void 0 	? !!config.readOnly  : true,
			disabled  : config.disabled  == void 0 	? !!config.disabled  : true
		},
		element    : HTMLDivElement      = <HTMLDivElement> document.createElement( 'div' ),
	    toolbar    : HTMLDivElement      = <HTMLDivElement> element.appendChild( document.createElement( 'div' ) ),
	    body       : HTMLDivElement      = <HTMLDivElement> element.appendChild( document.createElement( 'div' ) ),
	    statusbar  : HTMLDivElement      = <HTMLDivElement> element.appendChild( document.createElement( 'div' ) ),
	    resizediv  : HTMLDivElement      = <HTMLDivElement> element.appendChild( document.createElement( 'div' ) ),
	    ui_toolbar : UI_Toolbar,
	    resizer    : Throttler           = new Throttler( function() { resize( settings.width, settings.height );	}, 10 ),
	    viewport   : Viewport            = new Viewport();


	DOM.addClass( element,   'html-editor' );
	DOM.addClass( toolbar,   'toolbar'     );
	DOM.addClass( statusbar, 'statusbar'   );
	DOM.addClass( body,      'body'        );
	DOM.addClass( resizediv, 'resizer'     );


	/* Event handlers. */
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

	/* Viewport initialization */

	viewport.document.on('change', function() {
		(<any>element).fire('change');
	});


	ui_toolbar = new UI_Toolbar( <HTMLElement>toolbar, viewport.router, viewport.selection.editorState );

	// append the canvas in the body element of the editor
	body.appendChild( viewport.canvas );

	if ( settings.toolbars ) {
		DOM.addClass( element, 'has-toolbar' );
	}

	if ( settings.statusbar ) {
		DOM.addClass( element, 'has-statusbar' );
	}

	Object.defineProperty( element, "width", {
		"get": function() {
			return settings.width;
		},
		"set": function( value ) {
			value = ~~value;
			settings.width = value;
			resizer.run();
		}
	} );

	Object.defineProperty( element, "height", {
		"get": function() {
			return settings.height;
		},
		"set": function( value ) {
			value = ~~value;
			settings.height = value;
			resizer.run();
		}
	} );

	Object.defineProperty( element, "toolbars", {
		"get": function() {
			return settings.toolbars;
		},
		"set": function( value ) {
			
			settings.toolbars = !!value;

			if ( settings.toolbars ) {
				DOM.addClass( element, 'has-toolbar' );
			} else {
				DOM.removeClass( element, 'has-toolbar' );
			}

			resizer.run();
		}
	} );

	Object.defineProperty( element, "statusbar", {
		"get": function() {
			return settings.statusbar;
		},
		"set": function( value ) {
			settings.statusbar = !!value;
			if ( settings.statusbar ) {
				DOM.addClass( element, 'has-statusbar' );
				viewport.selection.fire( 'changed' );
			} else {
				DOM.removeClass( element, 'has-statusbar' );
			}
			resizer.run();
		}
	} );

	Object.defineProperty( element, "resizable", {
		"get": function() {
			return settings.resizable;
		},
		"set": function( bool ) {
			settings.resizable = !!bool;
			if ( settings.resizable ) {
				DOM.addClass( element, 'is-resizable' );
			} else {
				DOM.removeClass( element, 'is-resizable' );
			}
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

		var left: number = settings.height;
		
		if ( settings.toolbars ) {
			left -= 46;
		}
		
		if ( settings.statusbar ) {
			left -= 22;
		}

		body['style'].height = left + "px";

		viewport.height( left );
		viewport.width( settings.width );

		ui_toolbar.resize( settings.width );

		element.style.width = settings.width + "px";

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

			if ( !settings.statusbar ) {
				return;
			}

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

	( function() {

		var delta: TPoint = {
			"x": 0,
			"y": 0
		}, previousPoint: TPoint = {
			"x": 0,
			"y": 0
		};

		function onresize_run( evt ) {

			delta.x = evt.clientX - previousPoint.x;
			delta.y = evt.clientY - previousPoint.y;

			if ( delta.x || delta.y ) {
				element['width'] += delta.x;
				element['height'] += delta.y;
			}

			previousPoint.x = evt.clientX;
			previousPoint.y = evt.clientY;

			evt.preventDefault();
			evt.stopPropagation();

		}

		function onresize_end( evt ) {

			evt.preventDefault();
			evt.stopPropagation();

			viewport.document.canRelayout = true;
			viewport.document.relayout( true );

			document.body.removeEventListener( 'mousemove', onresize_run, true );
			document.body.removeEventListener( 'mouseup',   onresize_end, true );
		}

		resizediv.addEventListener( 'mousedown', function( evt ) {

			previousPoint.x = evt.clientX;
			previousPoint.y = evt.clientY;

			evt.preventDefault();
			evt.stopPropagation();

			viewport.document.canRelayout = false;

			document.body.addEventListener( 'mousemove', onresize_run, true );
			document.body.addEventListener( 'mouseup'  , onresize_end, true );
		}, true );

	} )();

	element['value'] = value;

	element[ 'resizable' ] = settings.resizable;

	resize( settings.width, settings.height );

	return element;

}