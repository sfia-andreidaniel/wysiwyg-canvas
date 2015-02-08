class UI_Dialog_InsertPicture extends UI_Dialog {
	
	public    iWidth                : HTMLInputElement = null;
	public    iHeight               : HTMLInputElement = null;
	public    iConstrainProportions : HTMLInputElement = null;
	public    iAlternateText        : HTMLInputElement = null;
	public    iSource               : HTMLInputElement = null;

	public    iPreview              : HTMLImageElement = null;
	public    iLoaded               : boolean = false;

	public    aspectRatio           : number = 1;
	public    iInitialWidth         : number = null;

	public    initialImage          : HTML_Image = null;
	public    ownerDocument         : HTML_Body  = null;

	protected emptySrc              : string = '';

	constructor( 
		config: UI_DialogConfig = {
			"caption": "Insert Picture",
			"width": 400,
			"height": 400,
			"minWidth": 400,
			"minHeight": 400,
			"closable": true,
			"modal": true,
			"buttons": [
				{
					"name": "Ok",
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
			"innerHTML": UI_Resources.html_insertPicture
		}
	) {
		super( config );

		this.iWidth                = <HTMLInputElement>this.body.querySelector( 'input.int-width' );
		this.iHeight               = <HTMLInputElement>this.body.querySelector( 'input.int-height' );
		this.iConstrainProportions = <HTMLInputElement>this.body.querySelector( 'input.bool-proportions' );
		this.iAlternateText        = <HTMLInputElement>this.body.querySelector( 'input.txt-alt' );
		this.iSource               = <HTMLInputElement>this.body.querySelector( 'input.txt-src' );

		this.iPreview              = <HTMLImageElement>this.body.querySelector( 'img.img-preview' );
		this.emptySrc              = this.iPreview.src;

		this._setupPreview_();

	}

	private _setupPreview_() {

		( function( me ) {

			me.iPreview.addEventListener( 'error', function() {
				me.iPreview.src = me.emptySrc;
				me.iLoaded = false;
				me.onLoadStateChanged();
			}, true );

			me.iPreview.addEventListener( 'load', function() {
				if ( me.iPreview.src != me.emptySrc ) {
					me.iLoaded = true;

					me.iPreview.style.maxWidth = '';
					me.iPreview.style.maxHeight = '';

					me.iWidth.value = me.iPreview.width;
					me.iHeight.value = me.iPreview.height;
					me.aspectRatio = me.iPreview.width / me.iPreview.height;

					if ( me.iInitialWidth ) {
						me.iWidth.value = String( me.iInitialWidth );
						me.iHeight.value = String( Math.round( me.iInitialWidth / this.aspectRatio ) );
						me.iWidth.focus();
					}

					me.iPreview.style.maxWidth = '150px';
					me.iPreview.style.maxHeight = '150px';

				} else {
					me.iLoaded = false;
				}
				me.onLoadStateChanged();
			}, true );

			me.iSource.addEventListener( 'input', function() {
				console.warn( 'setup input' );

				if ( me.iSource.value ) {
					me.iPreview.src = me.iSource.value;
				} else {
					me.iPreview.src = me.emptySrc;
				}
			} );

			me.iWidth.addEventListener( 'wheel', function(evt) {
				if ( me.iWidth.disabled ) {
					evt.preventDefault();
					evt.stopPropagation();
				} else {
					me.onWidthChanged();	
				}
			}, true );

			me.iHeight.addEventListener( 'wheel', function(evt) {
				if ( me.iHeight.disabled ) {
					evt.preventDefault();
					evt.stopPropagation();
				} else {
					me.onHeightChanged();	
				}
			}, true );

			me.iWidth.addEventListener( 'blur', function() {
				me.onWidthChanged();
			}, true );

			me.iHeight.addEventListener( 'blur', function() {
				me.onHeightChanged();
			}, true );

			me.iConstrainProportions.addEventListener( 'click', function() {
				if ( me.iConstrainProportions.checked ) {
					me.onWidthChanged();
				}
			}, false );

		} )( this );

	}

	protected onLoadStateChanged() {
		if ( this.iLoaded ) {
			this.iWidth.disabled = false;
			this.iHeight.disabled = false;
			this.iConstrainProportions.disabled = false;
			this.iConstrainProportions.checked = true;
		} else {
			this.iWidth.disabled = true;
			this.iHeight.disabled = true;
			this.iConstrainProportions.disabled = true;
			this.iWidth.value = '';
			this.iHeight.value = '';
		}
	}

	protected onWidthChanged() {
		if ( this.iConstrainProportions.checked ) {
			var w = ~~this.iWidth.value;

			if ( w > 0 )
			this.iHeight.value = String( Math.round( w / this.aspectRatio ) );
		}
	}

	protected onHeightChanged() {
		if ( this.iConstrainProportions.checked ) {
			var h = ~~this.iHeight.value;
			if ( h > 0 )
			this.iWidth.value = String( Math.round( h * this.aspectRatio ) );
		}
	}

	/* $args[0] => <picture> : HTML_Image = null
	   $args[1] => <document>: HTML_Body  = null;
	 */
	public setup( ...args: any[] ): UI_Dialog {
		
		var img: HTML_Image = args[0] || null;
		var doc: HTML_Body  = args[1] || null;

		this.ownerDocument = doc;

		if ( img === null ) {

			/* Setup for a new image */

			this.iInitialWidth = null;
			this.iPreview.src = this.emptySrc;
			this.iSource.value = '';
			this.initialImage = null;
			this.iWidth.value = '';
			this.iHeight.value = '';
			this.iInitialWidth = 400;
			this.aspectRatio = 1;

		} else {

			/* Setup for an existing image */

			this.iWidth.value = String( ~~img.style.width() );

			this.iInitialWidth = ~~img.style.width();

			this.iHeight.value = String( ~~img.style.height() );

			this.iAlternateText.value = img.alt();

			this.iSource.value = img.src();

			this.iPreview.src = img.src();

			this.initialImage = img;

		}

		this.iConstrainProportions.checked = true;

		return this;	
	}

	public on_ok() {
		
		var width = ~~( this.iWidth.value ),
		    height= ~~( this.iHeight.value ),
		    src   = this.iSource.value,
		    me    = this;

		if ( !this.iLoaded ) {
			UI_Dialog_Manager.alert( 'Please input a valid image source!', function() {
				me.iSource.focus();
			}, this.body );
			return;
		}

		if ( width <= 0 ) {
			UI_Dialog_Manager.alert( 'Please input a valid image width!', function() {
				me.iWidth.focus();
			}, this.body );
			return;
		}

		if ( height <= 0 ) {
			UI_Dialog_Manager.alert( 'Please input a valid image height!', function() {
				me.iHeight.focus();
			}, this.body );
			return;
		}

		if ( this.initialImage ) {
			this.initialImage.src( src );
			this.initialImage.width( String( width ) );
			this.initialImage.height( String( height ) );
			this.initialImage.alt( this.iAlternateText.value );
		} else {

			var img = <HTML_Image>this.ownerDocument.createElement( 'img' );
			img.src( src );
			img.width( String( width ) );
			img.height( String( height ) );
			img.alt( this.iAlternateText.value );

			this.ownerDocument.viewport.selection.insertHTML( img.outerHTML() );

		}

		this.close();

	}

	public on_cancel() {

		this.ownerDocument = null;
		this.initialImage = null;

		this.close();
	}
}