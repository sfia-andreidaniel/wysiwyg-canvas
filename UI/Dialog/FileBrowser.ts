class UI_Dialog_FileBrowser extends UI_Dialog {

	/*
		<div class="fs">
			<div class="icon mime folder"></div>
			<label>My Documents</label>
		</div>
		<div class="fs">
			<div class="icon mime picture"></div>
			<label>Img 23.jpg</label>
		</div>
		<div class="fs">
			<div class="icon mime audio"></div>
			<label>Rihanna - What are you doing there.mp3</label>
		</div>
		<div class="fs focused">
			<div class="icon mime video"></div>
			<label>The Gladiator MP4 XVid [260p].mp4</label>
		</div>
		<div class="fs">
			<div class="icon mime unknown"></div>
			<label>A file</label>
		</div>

	*/

	public navigator  : FS_Navigator;

	public overlay    : HTMLDivElement   = null; // where files will be placed
	public address    : HTMLInputElement = null; // the address bar

	public btnUp      : HTMLDivElement   = null; // up one level
	public btnRefresh : HTMLDivElement   = null; // refresh
	public btnSortAZ  : HTMLDivElement   = null; // sort files A-Z
	public btnSortZA  : HTMLDivElement   = null; // sort files Z-A

	public on_open    : ( url: string ) => void = null;

	public sorterName: string = 'asc';
	
	public sorters = {
		"asc" : null,
		"desc": null
	};

	constructor( 
		
		config: UI_DialogConfig = {
			"caption": "Open File",
			"width": 500,
			"height": 250,
			"minWidth": 400,
			"minHeight": 250,
			"closable": true,
			"modal": true,
			"buttons": [
				{
					"name": "Open",
					"default": true,
					"callback": function() {
						this.on_ok();
					}
				},
				{
					"name": "Cancel",
					"cancel": true,
					"callback": function() {
						this.on_cancel();
					}
				}
			],
			"innerHTML": UI_Resources.html_fileBrowser
		}

	) {
		super( config );

		this.navigator = FS_Navigator.factory( 'image', '/' );

		this.overlay    = <HTMLDivElement>  this.body.querySelector( 'div.htmleditor-fs > div.files');
		this.address    = <HTMLInputElement>this.body.querySelector( 'div.htmleditor-fs input.fs-location');

		this.overlay.tabIndex = 1;

		this.btnUp      = <HTMLDivElement>  this.body.querySelector( 'div.htmleditor-fs div.buttons > div.button.up' );
		this.btnRefresh = <HTMLDivElement>  this.body.querySelector( 'div.htmleditor-fs div.buttons > div.button.refresh' );
		this.btnSortAZ  = <HTMLDivElement>  this.body.querySelector( 'div.htmleditor-fs div.buttons > div.button.asc' );
		this.btnSortZA  = <HTMLDivElement>  this.body.querySelector( 'div.htmleditor-fs div.buttons > div.button.desc' );

		DOM.addClass( this.btnSortAZ, 'pressed' );

		( function( me ) {

			me.navigator.on( 'loading', function() {
				me.on_loading();
			});

			me.navigator.on( 'loaded', function() {
				me.on_loaded();
			});

			me.navigator.on( 'changed', function() {
				me.on_changed();
			} );

			me.navigator.on( 'error', function( reason: string ) {
				me.on_error( reason || null );
			} );

		} )( this );

		this._setup_mouse_();
		this._setup_keyboard_();

		this.sorters.asc = function( a: FS_Entry, b: FS_Entry ): number {
			var aName: string, bName: string;
			
			if ( a.type == b.type ) {
				aName = a.name.toLowerCase();
				bName = b.name.toLowerCase();
				return aName == bName
					? 0
					: ( aName > bName ? 1 : -1 );
			} else {
				return a.type == FSItem.FOLDER
					? -1
					: 1;
			}
		};

		this.sorters.desc= function( a: FS_Entry, b: FS_Entry ): number {
			var aName: string, bName: string;
			
			if ( a.type == b.type ) {
				aName = a.name.toLowerCase();
				bName = b.name.toLowerCase();
				return aName == bName
					? 0
					: ( aName > bName ? -1 : 1 );
			} else {
				return a.type == FSItem.FOLDER
					? -1
					: 1;
			}
		};

	}

	protected on_loading() {
		
		this.overlay.innerHTML = '<span class="loading">Loading...</span>';

		this.address.disabled = true;
		DOM.addClass( this.btnRefresh, 'pressed' );

	}

	protected setSorter( sorterName: string ) {

		if ( sorterName == this.sorterName ) {
			return;
		}

		if ( [ 'asc', 'desc' ].indexOf( sorterName ) == -1 ) {
			throw "Invalid sorter name!";
		}

		var buttons = [
			this.btnSortAZ,
			this.btnSortZA
		], i: number = 0, len: number = buttons.length;

		for ( i=0; i<len; i++ ) {
			DOM.removeClass( buttons[i], 'pressed' );
		}

		switch ( sorterName ) {
			case 'asc':
				DOM.addClass( this.btnSortAZ, 'pressed' );
				this.sorterName = sorterName;
				if ( this.navigator.lastStatus == FS_Navigator_Status.LOADED )
					this.on_loaded();
				break;
			case 'desc':
				DOM.addClass( this.btnSortZA, 'pressed' );
				this.sorterName = sorterName;
				if ( this.navigator.lastStatus == FS_Navigator_Status.LOADED )
					this.on_loaded();
				break;
		}

	}

	protected getFSType( itemType: FSItem, itemMime: string ): string {
		
		itemMime = itemMime || '';

		switch ( itemType ) {

			case FSItem.FOLDER:
				return 'folder';
				break;

			case FSItem.FILE:

				switch ( true ) {

					case /^image($|\/)/.test( itemMime ):
						return 'picture';
						break;

					case /^audio($|\/)/.test( itemMime ):
						return 'audio';
						break;

					case /^video($|\/)/.test( itemMime ):
						return 'video';
						break;

					default:
						return 'unknown';
						break;

				}

				break;

		}

	}

	protected on_loaded() {
		
		this.address.disabled = false;

		DOM.removeClass( this.btnRefresh, 'pressed' );

		var i: number = 0,
		    len: number = this.navigator.items.length,
		    d: any,
		    im: any,
		    l: any;

		this.overlay.innerHTML = '';

		if ( this.navigator.items.length ) {

			this.navigator.items.sort( this.sorters[ this.sorterName ] );

			for ( i=0; i<len; i++ ) {

				d = document.createElement( 'div' );
				DOM.addClass( d, 'fs' );

				im = d.appendChild( document.createElement( 'div' ) );
				im.className = 'icon mime ' + this.getFSType( this.navigator.items[i].type, this.navigator.items[i].mime );

				l = d.appendChild( document.createElement( 'label' ) );
				l.appendChild( document.createTextNode( this.navigator.items[i].name ) );

				d.setAttribute( 'fs-index', i );

				this.overlay.appendChild( d );

			}

		} else {

			this.overlay.innerHTML = '<span class="empty">There are no items to show in this view</span>';

		}

	}

	protected on_changed() {

		this.address.disabled = false;

		this.address.value = this.navigator.path;
		this.address.focus();
		this.address.select();
	}

	protected on_error( reason: string = null ) {

		this.address.disabled = false;
		DOM.removeClass( this.btnRefresh, 'pressed' );

		this.overlay.innerHTML = '';

		var span = document.createElement( 'span' );
		span.className = 'error';
		span.appendChild( document.createTextNode( reason || 'An unknown error occured' ) );

		this.overlay.appendChild( span );
	}

	protected _setup_mouse_() {

		( function( me ) {

			me.btnRefresh.addEventListener( 'click', function() {
				if ( me.navigator.lastStatus == FS_Navigator_Status.LOADED ) {
					me.navigator.open( me.navigator.path );
				}
			}, true );

			me.btnSortAZ.addEventListener( 'click', function() {
				me.setSorter( 'asc' );
			} );

			me.btnSortZA.addEventListener( 'click', function() {
				me.setSorter( 'desc' );
			} );

			me.overlay.addEventListener( 'click', function( evt ) {

				var target = evt.target,
				    onLabel: boolean = false,
				    onIcon : boolean = false,
				    onItem : boolean = false,
				    prevSelected: any = null;

				if ( target ) {

					if ( ( onLabel = target.nodeName.toLowerCase() == 'label' ) || target.nodeName.toLowerCase() == 'div' && [ onItem = DOM.hasClass( target, 'fs' ), onIcon = DOM.hasClass( target, 'icon' ) ].indexOf( true ) >= 0 ) {

						if ( onLabel || onIcon ) {
							target = target.parentNode;
						}

					} else {
						
						prevSelected = me.overlay.querySelector( 'div.fs.focused' );

						if ( prevSelected ) {
							DOM.removeClass( prevSelected, 'focused' );
						}

						return;

					}

				} else {
					return;
				}

				prevSelected = me.overlay.querySelector( 'div.fs.focused' );

				if ( prevSelected ) {
					DOM.removeClass( prevSelected, 'focused' );
				}

				DOM.addClass( target, 'focused' );

			}, true );

			me.overlay.addEventListener( 'dblclick', function( evt ) {

				var target = evt.target,
				    onLabel: boolean = false,
				    onIcon : boolean = false,
				    onItem : boolean = false,
				    prevSelected: any = null;

				if ( target ) {

					if ( ( onLabel = target.nodeName.toLowerCase() == 'label' ) || target.nodeName.toLowerCase() == 'div' && [ onItem = DOM.hasClass( target, 'fs' ), onIcon = DOM.hasClass( target, 'icon' ) ].indexOf( true ) >= 0 ) {

						if ( onLabel || onIcon ) {
							target = target.parentNode;
						}

					} else {

						prevSelected = me.overlay.querySelector( 'div.fs.focused' );

						if ( prevSelected ) {
							DOM.removeClass( prevSelected, 'focused' );
						}

						return;
					}

				} else {
					return;
				}

				prevSelected = me.overlay.querySelector( 'div.fs.focused' );

				if ( prevSelected ) {
					DOM.removeClass( prevSelected, 'focused' );
				}

				DOM.addClass( target, 'focused' );

				me.on_ok();

			}, true );

			me.btnUp.addEventListener( 'click', function() {

				if ( me.navigator.lastStatus == FS_Navigator_Status.LOADED ) {

					if ( !me.navigator.goUp() ) {

						UI_Dialog_Manager.alert( "You are allready at the top level and cannot navigate upper.", function() { me.overlay.focus(); }, me.body );

						return;
					}

				}

			}, true );

		} )( this );

	}

	protected _setup_keyboard_() {

		( function( me ) {

			me.address.addEventListener( 'keydown', function( evt ) {

				if ( evt.keyCode == 13 ) {
					
					evt.preventDefault();
					evt.stopPropagation();

					if ( me.address.value ) {

						me.navigator.open( me.address.value );

					}

				}

			}, true );

		} )( this );
	}

	/*
		
		$args[0] => <string>   mime
		$args[1] => <callback = null> callback

	 */

	public setup( ...args: any[] ): UI_Dialog {

		this.navigator.mimeType = String( args[0] ) || 'image';

		this.on_open = args[1] || null;

		this.navigator.open( this.navigator.path );

		return this;
	}

	public on_ok() {

		/* Find active item. If item is of type folder, then open the folder.
		   If item is of type file, then run the callback and close dialog */

		var item: any = this.overlay.querySelector( 'div.fs.focused' );

		if ( !item ) {
			return;
		}

		var index: number = ~~item.getAttribute( 'fs-index' ),
		    itemURL: string = null;

		if ( !this.navigator.items[ index ] ) {
			UI_Dialog_Manager.alert( "The item could not be found in our files collection. This is due to a bug. Operation canceled.", function() { this.overlay.focus(); }, this.body );
			return;
		}

		switch ( this.navigator.items[index].type ) {

			case FSItem.FOLDER:
				this.navigator.open( this.navigator.path + this.navigator.items[index].name + '/' );
				return;
				break;

			case FSItem.FILE:

				itemURL = String( this.navigator.items[index].url || '' ) || null;

				if ( !itemURL ) {
					itemURL = window['escape']( this.navigator.path + '/' + this.navigator.items[index].name );
				}

				break;

		}

		this.close();

		if ( this.on_open ) {
			this.on_open( itemURL );
		}

	}

	public on_cancel() {
		this.close();
	}


}