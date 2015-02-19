class HTML_Video extends TNode_Element {

	static  buttonFullScreen = document.createElement( 'img' );
	static  buttonPlay = document.createElement( 'img' );

	public  isSelectable: boolean = true; // when the user clicks on this element, it is selectable
	public  isResizable: boolean = true;

	protected _src: string = null;
	protected _controls: boolean = null;
	protected _poster = document.createElement('img');
	protected _posterLoaded: boolean = false;

	constructor( ) {
		super();
		this.nodeName = 'video';
		this.style.display('block');

		( function( me ) {

			me._poster.addEventListener( 'load', function( evt ) {
				me._posterLoaded = true;
				me.requestRepaint();
			}, true );

			me._poster.addEventListener( 'error', function( evt ) {
				me._posterLoaded = false;
				me.requestRepaint();
			}, true );

			me.style.on( 'changed', function( stylePropertyName: string ) {


				if ( stylePropertyName == 'width' || stylePropertyName == 'height' ) {

					var hasWidth: boolean = me.style._width.isSet,
					    hasHeight: boolean = me.style._height.isSet;

					if ( hasWidth && hasHeight ) {
						// do not enforce an aspect ratio
						me.style._aspectRatio.isSet = false;
					} else {
						// enforce an aspect ratio
						me.style._aspectRatio.value = '1.77';
						me.style._aspectRatio.isSet = true;
					}

				}

			} );

		} )( this );

		this.style.width('10');
	}

	public width( value: number = null ): number {
		if ( value === null ) {
			return this.style.width();
		} else {
			if ( value < 10 ) {
				value = 10;
			}
			this.style.width( String( value ) );
			return value;
		}
	}

	public height( value: number = null ): number {
		if ( value === null ) {
			return this.style.height();
		} else {
			if ( value < 10 ) {
				value = 10;
			}
			this.style.height( String( value ) );
			return value;
		}
	}

	public src( value: string = null ): string {
		if ( value === null ) {
			return this._src;
		} else {
			this._src = ( String( value || '' ) ) || null;
			return this._src;
		}
	}

	public controls( value: boolean = null ): boolean {
		if ( value === null ) {
			return this._controls;
		} else {
			this._controls = !!value;
			this.requestRepaint();
			return this._controls;
		}
	}

	public poster( value: string = null ): string {
		if ( value === null ) {
			return this._poster.getAttribute( 'src' );
		} else {
			this._poster.setAttribute('src', value || '' );
			this.requestRepaint();
			return value;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {

		switch ( attributeName ) {
			case 'width':
				this.style.width( attributeValue || '' );
				break;
			case 'height':
				this.style.height( attributeValue || '' );
				break;
			case 'src':
				this.src( attributeValue || '' );
				break;
			case 'controls':
				this.controls( true );
				break;
			case 'poster':
				this.poster( attributeValue || '' );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}

	}

	public xmlAttributes(): string {
		var out: string[] = [];
		
		if ( this.style._width.isSet ) {
			out.push( 'width="' + this.style.width() + '"' );
		}
		if ( this.style._height.isSet ) {
			out.push( 'height="' + this.style.height() + '"' );
		}
		if ( this._controls ) {
			out.push( 'controls' );
		}
		if ( this.poster() ) {
			out.push( 'poster="' + HTMLParser.escape( this.poster() ) + '"' );
		}
		if ( this.src() ) {
			out.push( 'src="' + HTMLParser.escape( this.src() ) + '"' );
		}
		return out.join( ' ' );
	}

	public removeOrphanNodes() {
		// void, intentionally.
	}

	// images don't have tabstops
	public tabStop( value: number = null ): number {
		return 0;
	}

	public onmousemove( point: TPoint, button: number, driver: Viewport_MouseDriver ): boolean {

		if ( this.isSelected() && button == 0 ) {

			var resizer: TResizer = this.getResizerTypeAtMousePoint( point ),
			    cursor: string = '';
			
			if ( [ TResizer.NW, TResizer.NE, TResizer.SW, TResizer.SE ].indexOf( resizer ) >= 0 ) {
				switch ( resizer ) {
					case TResizer.NW:
						cursor = 'nw-resize';
						break;
					case TResizer.NE:
						cursor = 'ne-resize';
						break;
					case TResizer.SE:
						cursor = 'se-resize';
						break;
					case TResizer.SW:
						cursor = 'sw-resize';
						break;
				}
				this.documentElement.viewport.canvas.style.cursor = cursor;
				return true;
			} else {
				this.documentElement.viewport.canvas.style.cursor = 'default';
				return false;
			}
		} else {
			return false;
		}
	}

	public onmousedown( point: TPoint, button: number, driver: Viewport_MouseDriver ): boolean {

		if ( this.isSelected() && button == 1 ) {

			var resizer: TResizer = this.getResizerTypeAtMousePoint( point );

			if ( [ TResizer.NW, TResizer.NE, TResizer.SW, TResizer.SE ].indexOf( resizer ) >= 0 ) {
				
				driver.lockTargetForResizing( this, resizer, point );

				return true;

			} else {

				return false;

			}

		} else {

			return false;
		
		}

	}

	public paint( ctx: any, layout: Layout, scrollLeft: number, scrollTop: number ) {

		this.layout = layout;

		var borderColor: string,
		    borderWidth: number,
		    backgroundColor: string,
		    selection = this.documentElement.viewport.selection,
		    range = selection.getRange(),
		    isSelected: boolean = false,

		    left: number = 0,
		    top: number = 0,
		    width: number = 0,
		    height: number = 0;

		if ( ( range.equalsNode( this ) && this.isSelectable ) || ( range.contains( this.FRAGMENT_START + 1 ) && range.contains( this.FRAGMENT_END - 1 ) && !this.isSelectionPaintingDisabled ) ) {
			
			isSelected = true;
			
			ctx.fillStyle = DocSelection.$Colors.focus;
			ctx.fillRect( ~~( layout.innerLeft - scrollLeft) , ~~( layout.innerTop - scrollTop ), ~~layout.innerWidth, ~~layout.innerHeight );
		}

		this.isPaintedSelected = isSelected;

		if ( ( borderWidth = this.style.borderWidth() ) ) {
			
			borderColor = this.style.borderColor();
			
			if ( borderColor ) {
				
				ctx.strokeStyle = borderColor;
				ctx.lineWidth   = borderWidth;

				ctx.beginPath();
				ctx.strokeRect( layout.offsetLeft + ( borderWidth / 2) - scrollLeft, layout.offsetTop + ( borderWidth / 2 ) - scrollTop, layout.offsetWidth - borderWidth, layout.offsetHeight - borderWidth );
				ctx.closePath();
			}

		}

		left = layout.offsetLeft + borderWidth - scrollLeft;
		top = layout.offsetTop + borderWidth - scrollTop;
		width = layout.offsetWidth - 2 * borderWidth;
		height = layout.offsetHeight - 2 * borderWidth;

		if ( !isSelected ) {
			ctx.fillStyle = 'black';
			ctx.fillRect( left, top, width, height );
		}

		if ( this.isPaintedSelected ) {
			this.paintResizeHandles( ctx, layout, scrollLeft, scrollTop );
		}

		if ( this.isPaintedSelected ) {
			ctx.globalAlpha = .5;
		}

		/* Draw the video poster */
		if ( this._posterLoaded ) {

			ctx.drawImage( this._poster, left, top, width, height );

		}

		/* Draw the video element */
		if ( this.controls() && width > 70 && height > 40 ) {
			
				// paint the controlbar
				ctx.fillStyle = 'rgba(128,128,128,.5)';

				ctx.fillRect( left + 5, top + height - 30, width - 10, 20 );

				ctx.fillStyle = '#000';

				ctx.fillRect ( left + 30, top + height - 22, width - 70, 5 );

				try {

					ctx.drawImage( HTML_Video.buttonPlay, left + 7, top + height - 28 );

				} catch (e) {

				}

				try {

					ctx.drawImage( HTML_Video.buttonFullScreen, left + width - 30, top + height - 28 );

				} catch (e) {

				}

		}

		if ( this.isPaintedSelected ) {
			ctx.globalAlpha = 1;
		}

	}

	public createLayout( useParentLayout: Layout = null ): Layout {

		if ( this.documentElement ) {

			return new Layout_Block( this );

		} else {

			return null;

		}

	}

	public bakeIntoFragment() {
		if ( this.documentElement ) {
			
			this.FRAGMENT_START = this.documentElement.fragment.length();
			this.documentElement.fragment.add( FragmentItem.NODE_START );

			this.FRAGMENT_END = this.documentElement.fragment.length();
			this.documentElement.fragment.add( FragmentItem.NODE_END );
		}
	}

	public findNodeAtIndex( index: number ): TNode {
		return index >= this.FRAGMENT_START && index <= this.FRAGMENT_END
			? this
			: null;
	}

	public ownerBlockElement(): TNode_Element {
		return this;
	}

}

HTML_Video.buttonPlay.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wISDxsq1r2NXwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACxElEQVQ4y32TX2tcVRTFf/vemz+TSUKmyR2CSMRiUPTRz+GTn6JKQfChFhWrIKJJpFUcpM3g1LYpjakvRbDQ6oNNkQnkQSYEkvoQmoHMncEJk87cTO85Z/swc6dKqwsOHA57r704ay9pNpuvTk1NnWk2m5+uXF/ZKV0uUW/UEVF838c5h+/7CAKAoqCKeB6eeMjBwcFr09PTlSAIFPip0Wh8cvXa1Y3LV0ocHh4iIvi+j6oiIqjq4O6JILVa7ZV8Pr+dJAmqyvDwMMCdWq32fun7Unnl+jVarUeIgO/7WGtRVUCQPsF8GIY7SZLgeR6qirWW0dFRgDvVavXD4nfF32+s3qDd7gDg+x7OuR5JFEUnwzD88/j4GM/zABARnHM458hkMgDre3t7H11cvnj3h7U1kuTxoI4oqr/gnNN2u61xHD912u22Hh0daR/3dh/svnHm7HvMvzzPiy+dRKKo/vyJE7mHcRwPFDwLqaLJyUmA9e3t7c8vfP3VLYmi+nO53FS10+n8L0GKJEkwxhCGYbeytfVmAFhrLcYYfN//z0ZVxRjD2NgYuVxurVKpvPPW6berAWCdc1hrn2pKfTfGMDQ0xMzMzF6r1Tq9uLR461JxmW63y4DAOdf71X8gJQ3D8LGIfHbzx5tfnL9wvvNwf7+3k6r8S0FK4JzDGEMulyObzd4vb5RPLX259Ed5owyA5wnWOlQhUFXrnBtINcaQyWSYnZ1t7Fer7577+NyV1bVVFRFEPFR7arWfjEBErKrS7XYZGRlhbm5O4zi+VPi2cPabQuGvVquFCIiAdQa0FygRwfOEwFrjQMnn84yPj2/9fPv2qYXFhd92H+yg2pPr1GGdpnb0p4OKEGSzWTsxMfGoUtn6YGFxqXD3118SEe3nIpWrz7TVOUdwb/2+3dzcfH25WNwx1pAakYalX/5k93nypKr8De/mtU7SkArBAAAAAElFTkSuQmCC';
HTML_Video.buttonFullScreen.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wISDxwSsf6jBgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABqklEQVQ4y6WUO4oyQRSFv3q07YNWEUNTcRGuwKWIe2gDAwPBdU3eGIipYCbSPrCr7KoJ/LuVHx0H5sKloKh7OOfcQwljjA+CgL+W9t5jrcVay/F4RAiBEIIsy+h2u2it8d6/HPbe45wjCAK0c45qtUqSJMRxTBRF7Pd7RqMRk8mkBBZCvASSUiKlRBeX1lqu1ytpmjIcDhmPx0gpcc4hpXzJqmCktUYLIfDeo5TifD4zHA6ZTqcopbjdbiXYO2l5nj88EkKQpimDwYA4jlFKYYxBKVU+/MkjAJFlmZdSstlsqNVq9Ho9rtcrUsqPmyoYNZtNhDHGG2PKQWvtr0AA8jzHe0+73b6b7ZzDGFNu5yc5RTnnqFQqZFkGgCx05nlenp/aWksYhqxWK47H4x2oQP9tG2NoNBp8fX2xXC4fyS60Fno/eRJFEUmSMJ/P7yb/C6oupL3LyvOa6/U66/Wa2WzG+Xym0+lgrX0wes7DOyCtNdvtlsViweVyIYqiMvHe+3uOdrsdzxH4HwRAKcXhcOB0OhGGIXmeI6Wk1WrR7/cRl8vF12q1P38j35ZbSO0VOkT6AAAAAElFTkSuQmCC';
