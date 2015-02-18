class UI_Toolbar_Panel extends Events {

	public node : HTMLElement = document.createElement( 'div' );

	public    percentualWidth : number           = 0   ; // the percentualWidth of the toolbar. value is a float between 0 and 1.
	public    fixedWidth      : number           = null; // the fixed width of the toolbar. value should be greater than 1.


	private   items           : HTMLDivElement[] = null;
	private   itemWidths      : number[]         = null;

	public    showMore        : HTMLDivElement   = null;
	private   showMorePanel   : HTMLDivElement   = null;

	constructor( public toolbar: UI_Toolbar, public name: string, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		super();

		DOM.addClass( this.node, 'ui-panel' );
		appendIn.appendChild( this.node );
		this.node.title = name || 'Toolbar';

		if ( maxPercentualOrFixedWidth <= 1 && maxPercentualOrFixedWidth >= 0 ) {
			this.percentualWidth = maxPercentualOrFixedWidth;
		} else {
			this.fixedWidth      = maxPercentualOrFixedWidth;
			this.percentualWidth = 1;
		}

		this.toolbar.panelRows[ panelRowIndex ].push( this );

	}

	// abstract method, which is triggered when the document state changes.
	public updateDocumentState( propertiesList: string [] ) {
		
	}

	public resizeByParentWidth( width: number ) {

		DOM.removeClass( this.showMore, 'opened' );

		var i: number = 0,
			j: number = 0,
		    len: number = 0;

		if ( this.items === null && this.node.offsetWidth ) {
			
			this.items = <HTMLDivElement[]>( Array.prototype.slice.call( this.node.querySelectorAll( 'div.item' ), 0 ) );
			this.itemWidths = [];

			for ( i=0, len = this.items.length; i<len; i++ ) {
				this.itemWidths.push( this.items[i].offsetWidth );
			}

		}

		if ( this.items === null ) {
			// postponed initialization
			( function( me ) {
				setTimeout( function() {
					me.resizeByParentWidth( width );
				}, 10 );
			} )( this );

			return;
		}

		var maxPanelWidth: number = Math.round( width * this.percentualWidth ),
		    itemsSumWidths: number = 0;

		for ( i=0, len = this.itemWidths.length; i<len; i++ ) {
			itemsSumWidths += this.itemWidths[i];
		}

		if ( itemsSumWidths < maxPanelWidth ) {
			
			DOM.removeClass( this.node, 'resized-panel' );

			for ( i=0, len = this.items.length; i<len; i++ ) {
				this.node.insertBefore( this.items[i], this.showMore );
			}

		} else {
			
			DOM.addClass( this.node, 'resized-panel' );
			
			// some panel items will be appended in the showMore part of the toolbar,
			// and some panel items will be appended in the toolbar root.

			var left = maxPanelWidth - 10;


			for ( i=0, len = this.items.length; i<len; i++ ) {
				
				if ( left - this.itemWidths[i] >= 0 ) {
					this.node.insertBefore( this.items[i], this.showMore );
					left -= this.itemWidths[i];
				} else {
					this.showMorePanel.appendChild( this.items[i] );
				}
			
			}

		}

	}

	/* After all the content is initialized in the panel DOM node, this function should be
	   called, in order to initialize the resizer mechanism.
	 */
	protected on_afterload() {

		this.showMore = document.createElement( 'div' );
		DOM.addClass( this.showMore, 'more' );

		this.node.appendChild( this.showMore );
		
		this.showMorePanel = document.createElement( 'div' );
		this.showMorePanel.tabIndex = 1;

		DOM.addClass( this.showMorePanel, 'panel' );

		this.showMore.appendChild( this.showMorePanel );

		( function(me) {

			me.showMore.addEventListener( 'click', function(evt){

				if ( evt.srcElement != me.showMore && evt.target != me.showMore ) {
					return;
				}

				if ( DOM.hasClass( me.showMore, 'opened' ) ) {
					DOM.removeClass( me.showMore, 'opened' );
				} else {
					DOM.removeClass( me.showMorePanel, 'right-aligned' );

					DOM.addClass( me.showMore, 'opened' );

					var rect = me.showMorePanel.getBoundingClientRect();

					if ( rect.left < 0 ) {
						DOM.addClass( me.showMorePanel, 'right-aligned' );
					}

					me.showMorePanel.focus();
				}
			}, true );

			me.showMorePanel.addEventListener( 'keyup', function( evt ) {
				if ( evt.keyCode == 27 ) {
					DOM.removeClass( me.showMore, 'opened' );
					evt.preventDefault();
					evt.stopPropagation();
				}
			}, true );

			me.showMorePanel.addEventListener( 'blur', function( evt ) {

				setTimeout( function() {

					if ( !me.showMorePanel.contains( document.activeElement ) ) {
						DOM.removeClass( me.showMore, 'opened' );	
					}

				}, 2);
				
			}, true );

		} )( this );

	}

	/* Transforms an item of the toolbar into an input[type=color] dropdown */
	protected makeColorDropdown( element: HTMLDivElement, onchange: ( value: string ) => void, initialColor: string ) {
		element.tabIndex = 0;

		var icon = document.createElement( 'div' );
		DOM.addClass( icon, 'icon' );

		var expander = document.createElement( 'div' );
		DOM.addClass( expander, 'expander' );

		var lastColor = document.createElement( 'div' );
		DOM.addClass( lastColor, 'color' );

		var overlay = document.createElement( 'div' );
		DOM.addClass( overlay, 'overlay' );

		var hdr: HTMLDivElement,
		      c: HTMLDivElement;

		c = document.createElement('div');
		DOM.addClass( c, 'c' );
		DOM.addClass( c, 'none' );
		c.setAttribute( 'data-color', '' );
		c.title = 'Default Color';

		overlay.appendChild( c );

		for ( var k in TStyle_Color.$NamedColors ) {
			c = document.createElement( 'div' );
			DOM.addClass( c, 'c' );
			c.setAttribute('data-color', TStyle_Color.$NamedColors[k] )
			c.style.backgroundColor = k;
			overlay.appendChild( c );
		}

		expander.tabIndex = 0;

		element.appendChild( icon );
		element.appendChild( lastColor );
		element.appendChild( expander );
		element.appendChild( overlay );

		lastColor.style.backgroundColor = initialColor;
		lastColor.setAttribute( 'data-color', initialColor );

		if ( !initialColor ) {
			DOM.addClass( lastColor, 'none' );
		}

		function setColor( c: string ) {

			lastColor.style.backgroundColor = c || '';
			lastColor.setAttribute( 'data-color', c || '' );

			if ( !c ) {
				DOM.addClass( lastColor, 'none' );
			} else {
				DOM.removeClass( lastColor, 'none' );
			}

			onchange( c || '' );
		}

		element.addEventListener('mousedown', function( e ) {
			
			if ( DOM.hasClass( element, 'state-disabled' ) ) {
				return;
			}

			var target = <any>( e.target || e.toElement );

			if ( target && DOM.hasClass( target, 'color' ) ) {
				// clicked on the last color

				e.stopPropagation();
				e.preventDefault();

				setColor( lastColor.getAttribute( 'data-color' ) );

				return;
			}

			if ( target && DOM.hasClass( target, 'c' ) ) {

				e.stopPropagation();
				e.preventDefault();
				
				setColor( target.getAttribute( 'data-color' ) );
				
				overlay.style.display = 'none';

				return;
			}

			overlay.style.display = 'block';

		}, true );

		element.addEventListener( 'blur', function() {
			overlay.style.display = 'none';
		}, true );

		expander.addEventListener( 'click', function() {
			if ( DOM.hasClass( element, 'state-disabled' ) ) {
				return;
			}
			setTimeout( function() {
				overlay.style.display = 'block';
			}, 10 );
		}, true );

	}

	/* Transforms an input[type=text] item of the toolbar into a writable select */

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
					try {
						items[i].scrollIntoViewIfNeeded();
					} catch (e ) {}
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

	protected focus( element ) {
		var saveLeft: number = document.body.scrollLeft,
		    saveTop : number = document.body.scrollTop;
		
		element.focus();
		
		document.body.scrollLeft = saveLeft;
		document.body.scrollTop  = saveTop;
	}

	protected focusCanvas() {
		this.focus( this.toolbar.router.viewport.canvas );
	}


}