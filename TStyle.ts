class TStyle extends Events {

	// <constructor> public node: TNode_Element

	public _width           : TStyle_Dimension;
	public _height          : TStyle_Dimension;
	public _aspectRatio     : TStyle_Dimension;

	public _paddingTop      : TStyle_Dimension;
	public _paddingBottom   : TStyle_Dimension;
	public _paddingRight    : TStyle_Dimension;
	public _paddingLeft     : TStyle_Dimension;

	public _marginTop       : TStyle_Dimension;
	public _marginBottom    : TStyle_Dimension;
	public _marginRight     : TStyle_Dimension;
	public _marginLeft      : TStyle_Dimension;

	public _borderWidth     : TStyle_Dimension;

	public _fontSize        : TStyle_Dimension;
	public _fontFamily      : TStyle_String;
	public _fontStyle       : TStyle_String;
	public _fontWeight      : TStyle_String;
	public _textDecoration  : TStyle_String;
	public _lineHeight      : TStyle_Dimension;
	public _textAlign       : TStyle_String;
	public _verticalAlign   : TStyle_String;

	public _display         : TStyle_String;
	public _float           : TStyle_String;

	public _color           : TStyle_Color;
	public _backgroundColor : TStyle_Color;
	public _borderColor     : TStyle_Color;

	static $FontFamily: string[] = [
		"Arial",
		"Calibri",
		"Cambria",
		"Comic Sans MS",
		"Corbel",
		"Courier New",
		"Gabriola",
		"Georgia",
		"Impact",
		"Lucida Console",
		"Miriam",
		"Nyala",
		"Palatino Linotype",
		"Symbol",
		"Tahoma",
		"Times New Roman",
		"Trebuchet MS",
		"Verdana",
		"Webdings",
		"Wingdings"
	];

	static $FontStyle: string[] = [
		"normal",
		"italic"
	];

	static $FontWeight: string[] = [
		"normal",
		"bold"
	];

	static $TextDecoration: string[] = [
		"none",
		"underline",
		"line-through"
	];

	static $Display: string[] = [
		"block",
		"inline",
		"none"
	];
	
	static $Floats: string[] = [
		"none",
		"left",
		"right",
		"center"
	];

	static $TextAlign: string[] = [
		'left',
		'right',
		'center',
		'justified'
	];

	static $VerticalAlign: string[] = [
		'super',
		'sub',
		'normal'
	];

	constructor( public node: TNode_Element ) {

		super();

		this._width = new TStyle_Dimension( this, 'width' );
		this._height= new TStyle_Dimension( this, 'height' );
		this._aspectRatio = new TStyle_Dimension( this, 'aspectRatio' );
		
		this._paddingTop = new TStyle_Dimension( this, 'paddingTop' );
		this._paddingRight = new TStyle_Dimension( this, 'paddingRight');
		this._paddingLeft = new TStyle_Dimension( this, 'paddingLeft' );
		this._paddingBottom = new TStyle_Dimension( this, 'paddingBottom' );

		this._marginTop = new TStyle_Dimension( this, 'marginTop' );
		this._marginRight = new TStyle_Dimension( this, 'marginRight');
		this._marginLeft = new TStyle_Dimension( this, 'marginLeft' );
		this._marginBottom = new TStyle_Dimension( this, 'marginBottom' );

		this._borderWidth = new TStyle_Dimension( this, 'borderWidth' );

		this._fontSize = new TStyle_Dimension( this, 'fontSize' );
		this._fontFamily = new TStyle_String( this, 'fontFamily', TStyle.$FontFamily );
		this._fontStyle = new TStyle_String( this, 'fontStyle', TStyle.$FontStyle );
		this._fontWeight = new TStyle_String( this, 'fontWeight', TStyle.$FontWeight );
		this._textDecoration = new TStyle_String( this, 'textDecoration', TStyle.$TextDecoration );
		this._lineHeight = new TStyle_Dimension( this, 'lineHeight' );
		this._textAlign = new TStyle_String( this, 'textAlign', TStyle.$TextAlign );
		this._verticalAlign = new TStyle_String( this, 'verticalAlign', TStyle.$VerticalAlign );

		this._display = new TStyle_String( this, 'display', TStyle.$Display );
		this._float = new TStyle_String( this, 'float', TStyle.$Floats );

		this._color = new TStyle_Color( this, 'color', true );
		this._backgroundColor = new TStyle_Color( this, 'backgroundColor', false );
		this._borderColor = new TStyle_Color( this, 'borderColor', false );
	}

	public width( v: string = null ): number {
		if ( v === null ) {
			return this._width.get();
		} else {
			this._width.set( ~~v < 0 ? '0' : v );
			this.node.requestRelayout();
			this.fire( 'changed', "width" );
			return null;
		}
	}

	public height( v: string = null ): number {
		if ( v === null ) {
			return this._height.get();
		} else {
			this._height.set( ~~v < 0 ? '0' : v );
			this.node.requestRelayout();
			this.fire( 'changed', "height" );
			return null;
		}
	}

	public aspectRatio( v: string = null ): number {
		if ( v === null ) {
			return this._aspectRatio.get();
		} else {
			this._aspectRatio.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "aspectRatio" );
			return null;
		}
	}

	public paddingLeft( v: string = null ): number {
		if ( v === null ) {
			return this._paddingLeft.get();
		} else {
			this._paddingLeft.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "paddingLeft" );
			return null;
		}
	}

	public paddingTop( v: string = null ): number {
		if ( v === null ) {
			return this._paddingTop.get();
		} else {
			this._paddingTop.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "paddingTop" );
			return null;
		}
	}

	public paddingRight( v: string = null ): number {
		if ( v === null ) {
			return this._paddingRight.get();
		} else {
			this._paddingRight.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "paddingRight" );
			return null;
		}
	}

	public paddingBottom( v: string = null ): number {
		if ( v === null ) {
			return this._paddingBottom.get();
		} else {
			this._paddingBottom.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "paddingBottom" );
			return null;
		}
	}

	public marginLeft( v: string = null ): number {
		if ( v === null ) {
			return this._marginLeft.get();
		} else {
			this._marginLeft.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "marginLeft" );
			return null;
		}
	}

	public marginTop( v: string = null ): number {
		if ( v === null ) {
			return this._marginTop.get();
		} else {
			this._marginTop.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "marginTop" );
			return null;
		}
	}

	public marginRight( v: string = null ): number {
		if ( v === null ) {
			return this._marginRight.get();
		} else {
			this._marginRight.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "marginRight" );
			return null;
		}
	}

	public marginBottom( v: string = null ): number {
		if ( v === null ) {
			return this._marginBottom.get();
		} else {
			this._marginBottom.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "marginBottom" );
			return null;
		}
	}

	public borderWidth( v: string = null ): number {
		if ( v === null ) {
			return this._borderWidth.get();
		} else {
			this._borderWidth.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "borderWidth" );
			return null;
		}
	}

	public fontSize( v: string = null ): number {
		if ( v === null ) {
			return this._fontSize.get();
		} else {
			this._fontSize.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "fontSize" );
			return null;
		}
	}

	public lineHeight( v: string = null ): number {
		if ( v === null ) {
			return this._lineHeight.get();
		} else {
			this._lineHeight.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "lineHeight" );
			return null;
		}
	}

	public fontFamily( v: string = null ): string {
		if ( v === null ) {
			return this._fontFamily.get();
		} else {
			this._fontFamily.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "fontFamily" );
			return v;
		}
	}

	public fontStyle( v: string = null ): string {
		if ( v === null ) {
			return this._fontStyle.get();
		} else {
			this._fontStyle.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "fontStyle" );
			return v;
		}
	}

	public fontWeight( v: string = null ): string {
		if ( v === null ) {
			return this._fontWeight.get();
		} else {
			this._fontWeight.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "fontWeight" );
			return v;
		}
	}

	// the text that is used on the canvas context for fontStyle
	public fontStyleText(): string {
		return ( this.fontStyle() == 'italic' ? 'italic ' : '' ) +
			   ( this.fontWeight() == 'bold'  ? 'bold ' : '' ) +
			   ( this.fontSize() ) + 'px ' +
			   this.fontFamily();
	}

	public textDecoration( v: string = null ): string {
		if ( v === null ) {
			return this._textDecoration.get();
		} else {
			this._textDecoration.set( v );
			this.node.requestRepaint();
			this.fire( 'changed', "textDecoration" );
			return v;
		}
	}

	public display( v: string = null ): string {
		if ( v === null ) {
			return this._display.get();
		} else {
			this._display.set( v );
			this.node.requestRelayout();
			this.fire( 'changed', "display" );
			return v;
		}
	}

	public color( v: string = null ): string {
		if ( v === null ) {
			return this._color.get();
		} else {
			this._color.set( v );
			this.node.requestRepaint();
			this.fire( 'changed', "color" );
			return v;
		}
	}

	public backgroundColor( v: string = null ): string {
		if ( v === null ) {
			return this._backgroundColor.get();
		} else {
			this._backgroundColor.set( v );
			this.node.requestRepaint();
			this.fire( 'changed', "backgroundColor" );
			return v;
		}
	}

	public borderColor( v: string = null ): string {
		if ( v === null ) {
			return this._borderColor.get();
		} else {
			this._borderColor.set( v );
			this.node.requestRepaint();
			this.fire( 'changed', "borderColor" );
			return v;
		}
	}

	public float( v: string = null ): string {
		
		if ( v === null ) {

			return this._float.get();

		} else {

			this._float.set( v );
			this.node.requestRelayout();
			
			if ( [ 'left', 'right', 'center' ].indexOf( v ) >= 0 ) {

				var blockElement = this.node.ownerBlockElement();

				if ( blockElement && blockElement.is() != 'body' ) {
					blockElement.appendChild( this.node, v == 'center' ? null : 0 );
				}

			}

			this.fire( 'changed', "float" );

			return v;
		}
	}

	public padding( value: string ) {
		this._paddingLeft.value =
		this._paddingRight.value =
		this._paddingTop.value =
		this._paddingBottom.value = ( parseFloat( value || '0' ) || 0 );

		this._paddingLeft.isSet =
		this._paddingRight.isSet =
		this._paddingBottom.isSet =
		this._paddingTop.isSet = true;

		this.node.requestRelayout();

		this.fire( 'changed', "padding" );

	}

	public margin( value: string ) {
		this._marginLeft.value =
		this._marginRight.value =
		this._marginTop.value =
		this._marginBottom.value = ( parseFloat( value || '0' ) || 0 );

		this._marginLeft.isSet =
		this._marginRight.isSet =
		this._marginBottom.isSet =
		this._marginTop.isSet = true;

		this.node.requestRelayout();

		this.fire( 'changed', "margin" );
	}

	public textAlign( value: string = null ): string {
		if ( value === null ) {
			//getter
			return this._textAlign.get();
		} else {
			//setter
			this._textAlign.set( value );
			this.node.requestRepaint();
			this.fire( 'changed', "textAlign" );
			return value;
		}
	}

	public verticalAlign( value: string = null ): string {
		if ( value === null ) {
			return this._verticalAlign.get();
		} else {
			this._verticalAlign.set( value );
			this.node.requestRepaint();
			this.fire( 'changed', "verticalAlign" );
			return value;
		}
	}

	public offsetWidth(): number {
		return this.borderWidth() + this.paddingLeft() + this.width() + this.paddingRight() + this.borderWidth();
	}

	public offsetHeight(): number {
		return this.borderWidth() + this.paddingTop() + this.height() + this.paddingRight() + this.borderWidth();
	}

	public copyTo( style: TStyle, properties: string[] ) {
		
		for ( var i=0, len = properties.length; i<len; i++ ) {

			if ( properties[i] && this[ '_' + properties[i] ] && style[ '_' + properties[i] ] && typeof this[ '_' + properties[i] ].isSet != 'undefined' ) {
				this[ '_' + properties[i] ].copyTo( style[ '_' + properties[i] ] );
			}

		}

	}

}