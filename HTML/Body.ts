class HTML_Body extends TNode_Element {
	
	private _needRelayout	 : boolean = true;
	private _needRepaint 	 : boolean = true;
	public  _layout 		 : Layout = null;
	public  viewport 		 : Viewport = null;
	public  fragment 		 : Fragment;
	public  lines            : Character_LinesCollection;

	public isBlockTextNode   : boolean = true; //user can write inside this element ( or sub-elements );
	public canRelayout       : boolean = true; //we can disable relayouting of the document by setting this flag to false.

	public static AUTOCLOSE_TAGS: string[] = [
		'br',
		'canvas',
		'input',
		'hr',
		'img'
	];

	public static FORCE_TEXT_NODES: string[] = [
		'pre',
		'script',
		'textarea',
		'style',
		'code'
	];

	public static IGNORE_ELEMENTS: string[] = [
		'head',
		'style',
		'script',
		'iframe'
	];

	public static TRAVERSE_ELEMENTS: string[] = [
		'html',
		'body',
		'span'
	];

	constructor( viewport: Viewport ) {
		super();

		this.fragment = new Fragment( this );
		this.viewport = viewport;
		this.lines    = new Character_LinesCollection();

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
		this.style.color( 'black' );
		this.style.verticalAlign( 'normal' );
		this.style.textAlign('left');

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
			case 'br':
				node = new HTML_BreakElement();
				break;
			case 'img':
				node = new HTML_Image( String( args[0] || '' ) || null );
				break;
			case 'h1':
				node = new HTML_Heading1();
				break;
			case 'h2':
				node = new HTML_Heading2();
				break;
			case 'h3':
				node = new HTML_Heading3();
				break;
			case 'h4':
				node = new HTML_Heading4();
				break;
			case 'h5':
				node = new HTML_Heading5();
				break;
			case 'b':
				node = new HTML_Bold();
				break;
			case 'i':
				node = new HTML_Italic();
				break;
			case 'u':
				node = new HTML_Underline();
				break;
			case 'a':
				node = new HTML_Anchor();
				break;
			case 'ul':
				node = new HTML_BulletedList();
				break;
			case 'ol':
				node = new HTML_OrderedList();
				break;
			case 'li':
				node = new HTML_ListItem();
				break;
			case 'sup':
				node = new HTML_Superscript();
				break;
			case 'sub':
				node = new HTML_Subscript();
				break;
			case 'table':
				node = new HTML_Table();
				break;
			case 'tr':
				node = new HTML_TableRow();
				break;
			case 'td':
				node = new HTML_TableCell();
				break;
			default:
				node = new TNode_Element();
				node.nodeName = elementName;
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

	public requestRelayoutNowIfNeeded() {
		if ( this._needRelayout ) {
			this.relayout();
		}
	}

	public requestRepaint() {
		this._needRepaint = true;
		this.fire( 'repaint' );
		this.viewport.painter.run();
	}

	public repaint( ) {

		if ( !this.canRelayout )
			return;

		// repaints the document
		var now = Date.now(),
		    diff: number = 0;

		if ( this._needRepaint == false && this._needRelayout == false ) {
			return;
		}

		if ( this._needRelayout ) {
			this.relayout();
		}

		//this.viewport.context.clearRect( 0, 0, this.viewport.width() - this.viewport._scrollbarSize, this.viewport.height() - this.viewport._scrollbarSize );
		this.viewport.context.fillStyle = 'white';
		this.viewport.context.fillRect( 0, 0, this.viewport.width() - this.viewport._scrollbarSize, this.viewport.height() - this.viewport._scrollbarSize );

		this._layout.paint( this.viewport.context, this.viewport.scrollLeft(), this.viewport.scrollTop(), this.viewport );

		this._needRepaint = false;

		diff = Date.now() - now;

		if ( diff > 20 )
			Helper.warn( 'repaint ended in ' + diff + ' ms.');
	}

	// full document relayout. this function computes where to draw
	// objects in the canvas.
	public relayout( force: boolean = false ) {
		
		if ( !this.canRelayout ) {
			return;
		}

		if ( !this._needRelayout && force == false ) {
			//console.log( 'body.relayout: up to date.' );
			return;
		}

		this.fragment.reset();

		var now = Date.now(),
		    diff: number = 0;

		if ( !this.viewport ) {
			return;
		}

		this._layout = this.createLayout();
		this.lines.reset();

		this._layout.offsetTop   = -this.style.marginTop();
		this._layout.offsetLeft  = -this.style.marginLeft();
		this._layout.offsetWidth = this.viewport.width() - this.viewport._scrollbarSize;
		
		this._layout.innerWidth  = this._layout.offsetWidth - this.style.paddingLeft() - this.style.paddingRight() - ( this.style.borderWidth() * 2 );
		this._layout.innerTop    = this._layout.offsetTop + this.style.paddingTop() + this.style.borderWidth();
		this._layout.innerLeft   = this._layout.offsetLeft + this.style.paddingLeft() + this.style.borderWidth();

		this.style._width.value = String( this._layout.offsetWidth );
		this.style._width.isSet = true;

		this._layout.computeWidths( );
		this._layout.computeHeights( this.style.marginTop() );

		this.viewport.scrollTop( this.viewport.scrollTop() );

		//console.log( this._layout.serialize() );

		this.bakeIntoFragment();
		this._needRelayout = false;

		diff = Date.now() - now;

		if ( diff > 20 )
			Helper.warn( 'relayout completed in ' + diff + ' ms.' );

		if ( force ) {
			this._needRepaint = true;
			this.repaint();
		}

	}

	public removeOrphanNodes() {
		for ( var i=this.childNodes.length - 1; i>=0; i-- ) {
			if ( this.childNodes[i].nodeType == TNode_Type.ELEMENT ) {
				(<TNode_Element>this.childNodes[i]).removeOrphanNodes();
			} else {
				if ( (<TNode_Text>this.childNodes[i]).textContents() == '' ) {
					this.childNodes[i].remove();
				}
			}
		}
	}

}