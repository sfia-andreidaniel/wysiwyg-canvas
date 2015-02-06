class Clipboard extends Events {

	protected static $instance: Clipboard = null;

	protected effect        : TClipboardEffect = TClipboardEffect.COPY;
	
	//protected data          : TClipboardItem   = null;

	public    trap          : any = document.createElement('textarea');
	public    activeElement : any = null; // will point to an instance of a viewport.canvas

	protected get data(): TClipboardItem {
		var v = window.localStorage.getItem( '_clipboard_data_' );

		if ( v ) {
			return JSON.parse( v );
		} else {
			return null;
		}
	}

	protected set data(v: TClipboardItem) {
		window.localStorage.setItem( "_clipboard_data_", JSON.stringify( v ) );
	}

	/* Should not be used by the programmer, but instead use the static "singleton" method,
	   in order to access it as a singleton
	 */
	constructor( ) {
	    super();

	    ( function( me ) {
	    	
	    	me.on( 'cut', function( evt ) {
	    		
	    		if ( !me.trap.parentNode || me.trap != document['activeElement'] ) {
	    			
	    		} else {

	    			if ( !me.trap.value ) {
	    				return;
	    			}

	    			me.setContents( me.trap.value, 'text/html', TClipboardEffect.CUT );

	    			setTimeout( function() {
		    			// the command is inside the trap
		    			me.activeElement.execCommand( EditorCommand.CUT, false );
	    			}, 5 );
	    		}

	    	} );
	    	
	    	me.on( 'copy', function( evt ) {
	    		
	    		if ( !me.trap.parentNode || me.trap != document['activeElement'] ) {

	    			// the copy occured outside our trap.
	    		
	    		} else {

	    			if ( !me.trap.value ) {
	    				return;
	    			}

	    			// the copy occured in the trap.

	    			me.setContents( me.trap.value, 'text/html', TClipboardEffect.COPY );

	    		}

	    	} );
	    	
	    	me.on( 'paste', function( evt ) {
	    		
	    		if ( !me.trap.parentNode || me.trap != document['activeElement'] ) {
	    			// paste outside the trap...
	    			return;
	    		}

	    		if ( evt.clipboardData ) {

	    			var asText: string = evt.clipboardData.getData( 'text/plain' ),
	    			    asHTML: string = evt.clipboardData.getData( 'text/html' );

	    			if ( asHTML ) {
	    				me.setContents( asHTML, 'text/html' );
	    			} else {
	    				me.setContents( asText, /<[a-z\][\s\S]*>/i.test( asText ) ? 'text/html' : 'text/plain' );
	    			}

	    			me.activeElement.execCommand( EditorCommand.PASTE );

    			} else {

    				setTimeout( function() {

    					me.fire( 'after-paste' );

    				}, 5 );

    			}


	    	} );

	    	me.on( 'after-paste', function() {

	    		var asText: string = me.trap.value;

	    		me.trap.value = this.activeElement.onclipboardtrap();

	    		me.setContents( asText, /<[a-z\][\s\S]*>/i.test( asText ) ? 'text/html' : 'text/plain' );

	    		me.activeElement.execCommand( EditorCommand.PASTE );

	    	} );

	    	me.trap.addEventListener( 'keyup', function( evt ) {
	    		if ( evt.keyCode == 17 ) {
	    			me.uninstallTrap();
	    		} else {
	    			me.activeElement.forwardKeyboardEvent( 'keyup', evt );
	    		}
	    	}, true );

	    	me.trap.addEventListener( 'keypress', function( evt ) {
	    		me.activeElement.forwardKeyboardEvent( 'keypress', evt );
	    	}, true );

	    	me.trap.addEventListener( 'keydown', function( evt ) {
	    		me.activeElement.forwardKeyboardEvent( 'keydown', evt );
	    	} );


	    } )( this );

	    //this.trap.readOnly = true;
	    this.trap.style.cssText = 'position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; width: 50px; height: 50px; display: block; background-color: red; opacity: 0 !important; z-index: 1000; overflow: hidden;';
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
		
		if ( typeof document.activeElement['onclipboardtrap'] == 'undefined' ) {
			return;
		}

		this.activeElement = document.activeElement;

		this.trap.style.top = document.body.scrollTop + "px";
		this.trap.style.left = document.body.scrollLeft + "px";

		document.body.appendChild( this.trap );

		this.trap.value = this.activeElement.onclipboardtrap();

		this.trap.focus();
		this.trap.select();

		//console.log( 'trap installed' );
	}

	public uninstallTrap() {

		if ( this.trap.parentNode )
			document.body.removeChild( this.trap );
		
		if ( this.activeElement ) {
			this.activeElement.focus();
		}

		//console.log( 'trap uninstalled' );
	}

}

window.addEventListener( 'load', function( e ) {

	document.body.addEventListener( 'keydown', function( evt ) {
		if ( evt.keyCode == 17 ) {
			Clipboard.singleton().installTrap();
		}
	}, true );

	document.body.addEventListener( 'keyup', function( evt ) {
		if ( evt.keyCode == 17 && Clipboard.singleton().trap.parentNode ) {
			Clipboard.singleton().uninstallTrap();
		}
	} );

	document.body.addEventListener( 'cut', function( evt ) {
		Clipboard.singleton().fire( 'cut', evt );
	}, true );

	document.body.addEventListener( 'copy', function( evt ) {
		Clipboard.singleton().fire( 'copy', evt );
	}, true );

	document.body.addEventListener( 'paste', function( evt ) {
		Clipboard.singleton().fire( 'paste', evt );
	}, true );


} );