class Clipboard extends Events {

	protected static $instance: Clipboard = null;

	protected effect : TClipboardEffect = TClipboardEffect.COPY;
	protected data   : TClipboardItem   = null;

	public    trap = document.createElement('div');
	public    activeElement: any = null;

	/* Should not be used by the programmer, but instead use the static "singleton" method,
	   in order to access it as a singleton
	 */
	constructor( ) {
	    super();

	    ( function( me ) {
	    	me.on( 'cut', function( EVT ) {
	    		console.warn( 'cut: ', EVT );
	    	} );
	    	me.on( 'copy', function( EVT ) {
	    		console.warn( 'copy: ', EVT );
	    	} );
	    	me.on( 'paste', function( EVT ) {
	    		console.warn( 'paste: ', EVT );
	    	} );
	    } )( this );

	    this.trap.setAttribute( 'contenteditable', 'true' );
	    this.trap.style.cssText = 'position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; display: block; background-color: red; opacity: .4; z-index: 1000';
	}

	public static singleton(): Clipboard {
		return Clipboard.$instance || ( Clipboard.$instance = new Clipboard() );
	}

	public isEmpty(): boolean {
		return this.data == null;
	}

	public setContents( content: string, contentType: string = 'text/plain', effect: TClipboardEffect = TClipboardEffect.COPY ) {
		this.effect = effect;
		this.data = {
			"data": content || '',
			"type": contentType || ''
		}
	}

	public getContents( autoClear: boolean = true ): TClipboardItem {
		
		var returnValue = this.data || null;

		if ( autoClear && this.effect == TClipboardEffect.CUT ) {
			this.data = null;
		}

		return returnValue;
	}

	public installTrap() {
		
		if ( this.trap.parentNode ) {
			//trap allready installed
			return;
		}

		this.activeElement = document.activeElement;

		this.trap.style.top = document.body.scrollTop + "px";
		this.trap.style.left = document.body.scrollLeft + "px";

		document.body.appendChild( this.trap );

		switch ( true ) {

			case typeof this.activeElement.onclipboardtrap !== 'undefined':
				this.trap.innerHTML = this.activeElement.onclipboardtrap();
				break;

			case typeof this.activeElement.value == 'string':
				this.trap.innerHTML = '';
				this.trap.appendChild( document.createTextNode( this.activeElement.value ) );
				break;

			default:
				this.trap.innerHTML = '';

		}

		this.trap.focus();

		( function( trap ) {

			setTimeout( function() {

		        if (window.getSelection) {
		            var range = document.createRange();
		            range.selectNodeContents( trap );
		            window.getSelection().removeAllRanges();
		            window.getSelection().addRange(range);
		        }

		    }, 10 );

		} )( this.trap );


		


		console.log( 'trap installed' );
	}

	public uninstallTrap() {

		if ( this.trap.parentNode )
			document.body.removeChild( this.trap );
		
		if ( this.activeElement ) {
			this.activeElement.focus();
		}

		console.log( 'trap uninstalled' );
	}

}

window.addEventListener( 'load', function() {

	var clipboard = Clipboard.singleton();

	document.body.addEventListener( 'cut', function( DOMEvt ) {
		clipboard.fire( 'cut', DOMEvt );
	}, true );

	document.body.addEventListener( 'paste', function( DOMEvt ) {
		clipboard.fire( 'paste', DOMEvt );
	}, true );

	document.body.addEventListener( 'copy', function( DOMEvt ) {
		clipboard.fire( 'copy', DOMEvt );
	}, true );

	document.body.addEventListener( 'keydown', function( evt ) {
		if ( evt.keyCode == 17 ) {
			clipboard.installTrap();
		}
	}, true );

	document.body.addEventListener( 'keydown', function( evt) {
		if ( evt.keyCode == 17 ) {
			clipboard.uninstallTrap();
		} else {
			if ( evt.ctrlKey ) {
				if ( clipboard.trap.parentNode && clipboard.activeElement && clipboard.activeElement.forwardkeyboardevent ) {
					clipboard.activeElement.forwardkeyboardevent( 'keydown', evt );
				}
			}
		}
	} );

	document.body.addEventListener( 'keypress', function( evt) {
		if ( evt.ctrlKey ) {
			if ( clipboard.trap.parentNode && clipboard.activeElement && clipboard.activeElement.forwardkeyboardevent ) {
				clipboard.activeElement.forwardkeyboardevent( 'keypress', evt );
			}
		}
	} );

	document.body.addEventListener( 'keyup', function( evt) {
		if ( evt.ctrlKey ) {
			if ( clipboard.trap.parentNode && clipboard.activeElement && clipboard.activeElement.forwardkeyboardevent ) {
				clipboard.activeElement.forwardkeyboardevent( 'keyup', evt );
			}
		}
	} );


} );