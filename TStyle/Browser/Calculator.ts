/* This class is used to read the default appearence of the nodes in the browser,
   in order to apply them as best as possible inside the canvas */

class TStyle_Browser_Calculator {

	public static nativeNodes: any = {}

	
	public static parseColor( c: string ): string {

		var matches: any,
		    rs: string,
		    gs: string,
		    bs: string;

		switch ( true ) {
			case /^\#[a-f\d]{3}$/i.test( c ):
			case /^\#[a-f\d]{6}$/i.test( c ):
			case /^[a-z]+$/i.test(c):
				return c;
				break;
			case ( matches = /^rgb\(([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\)$/i.exec( c ) ) ? true : false :
			case ( matches = /^rgba\(([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\)$/i.exec( c ) ) ? true : false :
				rs = ( ~~matches[2] ).toString(16);
				gs = ( ~~matches[5] ).toString(16);
				bs = ( ~~matches[8] ).toString(16);

				rs = rs.length == 1 ? '0' + rs : rs;
				gs = gs.length == 1 ? '0' + gs : gs;
				bs = bs.length == 1 ? '0' + bs : bs;

				return '#' + rs + gs + bs;

				break;
			default:
				return null;
				break;

		}
	}

	public static parseDimension( c: string ): string {
		var matches = /^([\-])?([\d\.]+)(px|\%)$/.exec( c ),
		    f: string,
		    f1: number;

		if ( !matches ) {
			return null;
		} else {
			f = String( matches[1] || '' ) + ( matches[2] || '' );
			if ( f.indexOf('.') > -1 ) {
				f = parseFloat(f).toFixed(1);
			}
			return f + ( matches[3] == '%' ? '%' : '' );
		}
	}

	public static initializeNode( nodeName: string ) {
		var node = document.createElement( nodeName ),
		    computed;

		if ( nodeName == 'a' ) {
			node.innerHTML = 'aaa';
			node['href'] = '#';
		}

		document.body.appendChild( node );
		
		computed = Helper.peek( window.getComputedStyle( node ), [
			"color",
			"backgroundColor",
			"borderWidth",
			"borderColor",
			"paddingLeft",
			"paddingRight",
			"paddingBottom",
			"paddingTop",
			"marginLeft",
			"marginRight",
			"marginTop",
			"marginBottom",
			"fontFamily",
			"fontSize",
			"textDecoration",
			"fontStyle",
			"fontWeight",
			"verticalAlign",
			"textAlign"
		] );

		computed['color'] = TStyle_Browser_Calculator.parseColor( computed['color'] );
		
		computed['backgroundColor'] = TStyle_Browser_Calculator.parseColor( computed['backgroundColor'] );

		computed['backgroundColor'] = computed['backgroundColor'] == '#000000' ? null : computed['backgroundColor'];

		computed['borderColor'] = TStyle_Browser_Calculator.parseColor( computed['borderColor'] );

		computed['borderWidth'] = TStyle_Browser_Calculator.parseDimension( computed['borderWidth'] );
		
		computed['paddingLeft'] = TStyle_Browser_Calculator.parseDimension( computed['paddingLeft'] );
		computed['paddingRight']= TStyle_Browser_Calculator.parseDimension( computed['paddingRight'] );
		computed['paddingBottom']=TStyle_Browser_Calculator.parseDimension( computed['paddingBottom'] );
		computed['paddingTop'] =TStyle_Browser_Calculator.parseDimension( computed['paddingTop'] );

		computed['marginLeft']   = TStyle_Browser_Calculator.parseDimension( computed['marginLeft'] );
		computed['marginRight']  = TStyle_Browser_Calculator.parseDimension( computed['marginRight'] );
		computed['marginBottom'] = TStyle_Browser_Calculator.parseDimension( computed['marginBottom'] );
		computed['marginTop']  = TStyle_Browser_Calculator.parseDimension( computed['marginTop'] );

		computed['fontSize']  = TStyle_Browser_Calculator.parseDimension( computed['fontSize'] );

		computed['textAlign'] = [ 'left', 'right', 'center', 'justify', 'justified' ].indexOf( computed['textAlign'] ) >= 0 ? computed['textAlign'] : null;

		if ( computed['textAlign'] == 'justify' ) {
			computed['textAlign'] = 'justified';
		}

		computed['fontFamily'] = /^"(.*)"$/.test( computed['fontFamily'] )
			? computed['fontFamily'].substr( 1, computed['fontFamily'].length - 2 )
			: computed['fontFamily'];
		computed['fontFamily'] = /^'(.*)'$/.test( computed['fontFamily'] )
			? computed['fontFamily'].substr( 1, computed['fontFamily'].length - 2 )
			: computed['fontFamily'];

		if ( computed['verticalAlign'] != 'sub' && computed['verticalAlign'] != 'super' ) {
			computed['verticalAlign'] = null;
		} else {
			if ( computed['verticalAlign'] == 'super' ) {
				computed['verticalAlign'] = 'sup';
			}
		}

		if ( TStyle.$FontFamily.indexOf( computed['fontFamily'] ) == -1 ) {
			computed['fontFamily'] = 'Times New Roman';
		}

		var computed1 = {};

		for ( var k in computed ) {
			if ( computed[k] ) {
				computed1[ k ] = computed[k];
			}
		}

		TStyle_Browser_Calculator.nativeNodes[nodeName] = computed1;

		document.body.removeChild( node );
	}

	public static initialize() {
		var nodes = HTML_Body.IMPLEMENTED_NODES,
	        i: number = 0,
	        len: number = nodes.length;

	    for ( i=0; i<len; i++ ) {
	    	TStyle_Browser_Calculator.initializeNode( nodes[i] );
	    }
	}

	public static applyDefaultStyles( node: TNode_Element, fromNode: string, styleNames: string[] ) {
		for ( var i=0, len = styleNames.length; i<len; i++ ) {
			if ( TStyle_Browser_Calculator.nativeNodes[fromNode][styleNames[i]] ) {
				node.style[ styleNames[i] ]( TStyle_Browser_Calculator.nativeNodes[fromNode][styleNames[i]] );
			}
		}
	}
}

window.addEventListener( 'load', function() {
	TStyle_Browser_Calculator.initialize();
}, true );