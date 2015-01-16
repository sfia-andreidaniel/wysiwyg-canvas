class HTML_Body extends TNode_Element {
	
	private _needRelayout: boolean = true;
	private _needRepaint: boolean = true;
	public  _layout: Layout = null;
	public  viewport: Viewport = null;

	constructor( viewport: Viewport ) {
		super();

		this.viewport = viewport;

		this.nodeName = 'body';
		this.documentElement = this;
		this.parentNode = null;
		this.style.display( 'block' );
		this.style.width( '100%' );
		this.style.height( '100%' );
		this.style.fontFamily( 'Arial' );
		this.style.fontSize( '12' );
		this.style.fontWeight( 'normal' );
		this.style.fontStyle( 'normal' );
		this.style.textDecoration( 'none' );
		this.style.lineHeight( '1.2' );
		this.style.padding( '5' );

		this.relayout();
	}

	createTextNode( textContents: string ): TNode_Text {
		var node: TNode_Text = new TNode_Text( textContents );
		node.documentElement = this;
		return node;
	}

	createElement( elementName: string, ...args: any[] ): TNode_Element {
		
		var node: TNode_Element;
		
		elementName = String( elementName || '' ).toLowerCase();

		switch ( elementName ) {
			case 'p':
				node = new HTML_Paragraph();
				break;
			case 'img':
				node = new HTML_Image( String( args[0] || '' ) || null );
				break;
			default:
				node = new TNode_Element();
				break;
		}

		node.nodeName = elementName;
		node.documentElement = this;

		return node;
	}

	get needRelayout(): boolean {
		return this._needRelayout;
	}

	set needRelayout( v: boolean ) {
		if ( !this._needRelayout ) {
			this._needRelayout = !!v;
			this.requestRepaint();
		}
	}

	public requestRelayout() {
		this.needRelayout = true;
		this.fire( 'relayout' );
		this.requestRepaint();
	}

	public requestRepaint() {
		this._needRepaint = true;
		this.fire( 'repaint' );
		this.viewport.painter.run();
	}

	public repaint() {
		// repaints the document
		var now = Date.now();

		if ( this._needRepaint == false && this._needRelayout == false ) {
			return;
		}

		if ( this._needRelayout ) {
			this.relayout();
		}

		this._layout.paint( this.viewport.context );

		this._needRepaint = false;

		console.log( 'repaint ended in ' + ( Date.now() - now ) + ' ms.');
	}

	// full document relayout. this function computes where to draw
	// objects in the canvas.
	public relayout( ) {
		
		if ( !this._needRelayout ) {
			console.log( 'body.relayout: up to date.' );
			return;
		}

		var now = Date.now();

		if ( !this.viewport ) {
			return;
		}

		this._layout = this.createLayout();

		this._layout.offsetTop   = -this.style.marginTop();
		this._layout.offsetLeft  = -this.style.marginLeft();
		this._layout.offsetWidth = this.viewport.width();
		
		this._layout.innerWidth  = this._layout.offsetWidth - this.style.paddingLeft() - this.style.paddingRight() - ( this.style.borderWidth() * 2 );
		this._layout.innerTop    = this._layout.offsetTop + this.style.paddingTop() + this.style.borderWidth();
		this._layout.innerLeft   = this._layout.offsetLeft + this.style.paddingLeft() + this.style.borderWidth();

		this.style._width.value = String( this._layout.offsetWidth );
		this.style._width.isSet = true;

		this._layout.computeWidths( );
		this._layout.computeHeights( this.style.marginTop() );

		console.log( 'relayout completed in ' + ( Date.now() - now ) + ' ms.' );
		console.log( this._layout.serialize() );

		this._needRelayout = false;

	}

}