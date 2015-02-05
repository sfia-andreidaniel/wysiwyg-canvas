class HTML_Body extends TNode_Element {
	
	private _needRelayout	 : boolean = true;
	private _needRepaint 	 : boolean = true;
	public  _layout 		 : Layout = null;
	public  viewport 		 : Viewport = null;
	public  fragment 		 : Fragment;
	public  lines            : Character_LinesCollection;

	public isBlockTextNode   : boolean = true; //user can write inside this element ( or sub-elements );
	public canRelayout       : boolean = true; //we can disable relayouting of the document by setting this flag to false.
	
	public changeThrottler   : Throttler= null; // a throttler that is executed each time a dom subtree modification occurs.

	private _tabSize         : number = 20;

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

	/* These are the types of node that can be safely imported / exported by the editor. 
       
       Note that document.createElement may create internally a more richer list of nodes,
       but they are not supported by the browser.
	*/
	public static IMPLEMENTED_NODES: string[] = [
		'p',
		'br',
		'img',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'b',
		'strong',
		'i',
		'em',
		'u',
		'a',
		'ul',
		'ol',
		'li',
		'sup',
		'sub',
		'strike',
		'table',
		'tr',
		'td',
		'span'
	];

	public tabSize( size: number = null ): number {
		if ( size === null ) {
			return this._tabSize;
		} else {
			this._tabSize = ~~size < 0 ? 0 : ~~size;
			this.requestRelayout();
			return this._tabSize;
		}
	}

	constructor( viewport: Viewport ) {
		super();

		this.fragment = new Fragment( this );
		this.viewport = viewport;
		this.lines    = new Character_LinesCollection();

		( function(me){
			me.changeThrottler = new Throttler( function() {
				me.fire('change');
			}, 10 );
		})(this);
		

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
			case 'strong':
				node = new HTML_Bold();
				break;
			case '!b':
				node = new HTML_NegationNode('b');
				break;
			case 'i':
			case 'em':
				node = new HTML_Italic();
				break;
			case '!i':
				node = new HTML_NegationNode('i');
				break;
			case 'u':
				node = new HTML_Underline();
				break;
			case '!u':
				node = new HTML_NegationNode( 'u' );
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
			case '!sup':
				node = new HTML_NegationNode( 'sup' );
				break;
			case 'sub':
				node = new HTML_Subscript();
				break;
			case '!sub':
				node = new HTML_NegationNode('sub');
				break;
			case 'strike':
				node = new HTML_Strike();
				break;
			case '!strike':
				node = new HTML_NegationNode('strike');
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
			case 'font':
				node = new HTML_Font();
				break;
			case 'color':
				node = new HTML_Color();
				break;
			case 'size':
				node = new HTML_Size();
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
		if ( !this.canRelayout )
			return;

		this._needRepaint = true;
		this.fire( 'repaint' );
		this.viewport.painter.run();
	}

	public repaint( ) {

		if ( !this.canRelayout ) {
			//console.warn( 'repaint canceled due to canRelayout setting.')
			return;
		}

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
			//console.warn( 'relayout canceled due to canRelayout setting.')
			return;
		}

		this.changeThrottler.run();

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

		this.viewport._clientWidth = this._layout.offsetWidth + this._layout.offsetHeight;
		this.viewport._clientHeight = this._layout.offsetHeight + this._layout.offsetTop;
		
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

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'bgcolor':
			case 'color':
			case 'align':
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
		}
	}

	// the body cannot become other thing excepting itself.
	public becomeElement( elementName: string ): TNode_Element {
		return this;
	}

	public createCollectionFromHTMLText( s: string ): TNode_Collection {
		return Helper.createCollectionFromHTMLText( s, this );
	}

}