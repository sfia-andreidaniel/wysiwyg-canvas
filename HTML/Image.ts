class HTML_Image extends TNode_Element {

	private node = document.createElement( 'img' );
	private loaded: boolean = false; // is the image loaded successfully
	private error: boolean = false; // an error occured after loading

	public  isSelectable: boolean = true; // when the user clicks on this element, it is selectable

	constructor( src: string = null ) {
		super();
		this.nodeName = 'img';
		this.style.display( 'block' );

		( function( me ) {
			me.node.addEventListener( 'load', function() {
				me.loaded = true;
				me.error = false;
				me.style.aspectRatio( String( ( me.node.width / me.node.height ) ) );
				if ( !me.style._width.isSet && !me.style._height.isSet ) {
					me.style.width( String( me.node.width ) );
				}
				me.requestRelayout();
			}, false );
			me.node.addEventListener( 'erorr', function() {
				me.loaded = true;
				me.error = true;
				me.style.aspectRatio( '1' );
				me.requestRelayout();
			}, false );
		} )( this );
		if ( src !== null ) {
			this.src( src );
		}
	}

	public src( source: string = null ): string {

		if ( source === null ) {
			// getter
			return this.node.getAttribute( 'src' ) || '';
		} else {
			// setter
			this.loaded = false;
			this.error = false;
			this.node.setAttribute( 'src', String( source || '' ) );
			this.requestRelayout();
		}

	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'src':
				this.src( attributeValue || null );
				break;
			case 'align':
				this.style.float( attributeValue || '' );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;	
		}
	}

	public width( size: string = null ): string {
		if ( size === null ) {
			// getter
			return String( this.style.width() || '' );
		} else {
			if ( size == '' ) {
				this.style._width.isSet = false;
			} else {
				this.style.width( size );
			}
			return size;
		}
	}

	public height( size: string = null ) : string {
		if ( size === null ) {
			//getter
			return String( this.style.height() || '' );
		} else {
			if ( size == '' ) {
				this.style._height.isSet = false;
			} else {
				this.style.height( size );
			}
			return size;
		}
	}

	public align( align: string = null ): string {
		if ( align === null ) {
			// getter
			return this.style.float();
		} else {
			if ( align == '' ) {
				this.style._float.isSet = false;
			} else {
				this.style.float( align );
			}
			return align;
		}
	}

	public paint( ctx: any, layout: Layout, scrollLeft: number, scrollTop: number ) {
		
		super.paint( ctx, layout, scrollLeft, scrollTop );

		if ( this.loaded ) {
			
			if ( this.error ) {

			} else {

				if ( this.isPaintedSelected )
					ctx.globalAlpha = .5;

				ctx.drawImage( this.node, 0, 0, this.node.width, this.node.height, layout.innerLeft - scrollLeft, layout.innerTop - scrollTop, layout.innerWidth, layout.innerHeight );

				if ( this.isPaintedSelected )
					ctx.globalAlpha = 1;

			}

		}

	}

	public removeOrphanNodes() {
		// void, intentionally.
	}

}