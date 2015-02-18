class HTML_Video extends TNode_Element {

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
		this.style.width('10');
		this.style.height('10');

		( function( me ) {

			me._poster.addEventListener( 'load', function( evt ) {
				me._posterLoaded = true;
				me.requestRepaint();
			}, true );

			me._poster.addEventListener( 'error', function( evt ) {
				me._posterLoaded = false;
				me.requestRepaint();
			}, true );

		} )( this );
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
				this.controls( attributeValue ? true : false );
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
			out.push( 'controls="controls"' );
		}
		if ( this.poster() ) {
			out.push( 'poster="' + this.poster() + '"' );
		}
		if ( this.src() ) {
			out.push( 'src="' + this.src() + '"' );
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
		    isSelected: boolean = false;

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

			if ( this.isOrphanElement() && !range.focusNode() && range.anchorNode().target == this ) {
				// paint a caret inside this element
				ctx.fillStyle = '#000';
				ctx.fillRect( layout.innerLeft - scrollLeft + ( this.style.textAlign() == 'center' ? ( this.layout.innerWidth / 2 ) : ( this.style.textAlign() == 'right' ? this.layout.innerWidth - 2 : 0 ) ), layout.innerTop  - scrollTop + 1, 2, this.style.fontSize() * this.style.lineHeight() );

			}

		} else {

			if ( this.isOrphanElement() ) {
				ctx.strokeStyle = '#ddd';
				ctx.lineWidth = 1;

				ctx.save();

				if ( ctx.setLineDash ) {
					ctx.setLineDash([1,2]);
				}

				ctx.beginPath();
				ctx.strokeRect( layout.offsetLeft + .5 - scrollLeft, layout.offsetTop + .5 - scrollTop, layout.offsetWidth - 1, layout.offsetHeight - 1 );
				ctx.closePath();


				ctx.restore();

				if ( !range.focusNode() && range.anchorNode().target == this ) {
					// paint a caret inside this element
					ctx.fillStyle = '#000';
					ctx.fillRect( layout.innerLeft - scrollLeft + ( this.style.textAlign() == 'center' ? ( this.layout.innerWidth / 2 ) : ( this.style.textAlign() == 'right' ? this.layout.innerWidth - 2 : 0 ) ), layout.innerTop  - scrollTop + 1, 2, this.style.fontSize() * this.style.lineHeight() );

				}
			}
		}

		if ( !isSelected ) {
			ctx.fillStyle = 'black';
			ctx.fillRect( layout.offsetLeft + borderWidth - scrollLeft, layout.offsetTop + borderWidth - scrollTop, layout.offsetWidth - 2 * borderWidth, layout.offsetHeight - 2 * borderWidth );
		}

		if ( this.isPaintedSelected ) {
			this.paintResizeHandles( ctx, layout, scrollLeft, scrollTop );
		}

		if ( this.isPaintSelected ) {
			ctx.globalAlpha = .5;
		}

		if ( this.isPaintSelected ) {
			ctx.globalAlpha = 1;
		}

	}


}