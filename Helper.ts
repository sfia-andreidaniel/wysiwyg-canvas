class Helper {

	/* Logging */

	static dev: boolean = false;

	static log( ...args: any[] ) {
		if ( !Helper.dev ) {
			console.log.apply( console, args );
		}
	}

	static warn( ...args: any[] ) {
		if ( !Helper.dev ) {
			console.warn.apply( console, args );
		}
	}

	static error( ...args: any[] ) {
		if ( !Helper.dev ) {
			console.error.apply( console, args );
		}
	}

	/* Array helpers */

	static reverse( arr: any[] ): any[] {
		if ( Array.prototype.reverse ) {
			return Array.prototype.reverse.call( arr );
		} else {
			var out: any[] = [],
			    i: number = arr.length - 1;
			while ( i >= 0 ) {
				out.push( arr[i--] );
			}
			return out;
		}
	}

	static filter( arr: any[], callback: ( item: any ) => boolean ): any[] {
		var out = [];

		for ( var i=0, len=arr.length; i<len; i++ ) {
			if ( callback( arr[i] ) ) {
				out.push( arr[i] );
			}
		}

		return out;
	}

	// a modified version of array splice, only that the adding elements are passed into an array but not as
	// function arguments.
	static spliceApply( thisArray: any[], startIndex: number, removeLength: number, addNodes: any[] = [] ) {

		var apply: any[] = [ startIndex, removeLength ],
		        i: number = 0,
		      len: number = addNodes.length;

		for ( i=0; i<len; i++ ) {
			apply.push( addNodes[i] );
		}

		Array.prototype.splice.apply( thisArray, apply );

		return thisArray;
	}

	static createCollectionFromHTMLText( s: string, documentElement: HTML_Body ): TNode_Collection {

		try {

			var parser = new HTMLParser( documentElement, s || '' ),
			    nodes: TNode[] = [],
			    i: number = 0,
			    len: number = parser.NODES.length,
			    element: TNode_Element,
			    n: number = 0,
			    j: number = 0,
			    traverser: TNode_Element = null;

			for ( i=0; i<len; i++ ) {
				
				switch ( parser.NODES[i].type ) {
					case '#text':
						nodes.push( documentElement.createTextNode( parser.NODES[i].value ) );
						break;
					case 'node':

						if ( HTML_Body.IGNORE_ELEMENTS.indexOf( parser.NODES[i].nodeName ) == -1 ) {
							
							if ( HTML_Body.TRAVERSE_ELEMENTS.indexOf( parser.NODES[i].nodeName ) == -1 ) {

								element = documentElement.createElement( parser.NODES[i].nodeName );
								
								if ( parser.NODES[i].attributes && ( n = parser.NODES[i].attributes.length ) ) {

									for ( j = 0; j<n; j++ ) {
										element.setAttribute( parser.NODES[i].attributes[j].name, parser.NODES[i].attributes[j].value );
									}

								}

								if ( parser.NODES[i].children && parser.NODES[i].children.length ) {
									element.setInnerNodes( parser.NODES[i].children, element );
								}

								nodes.push( element );

							} else {

								if ( parser.NODES[i].children && parser.NODES[i].children.length ) {

									// TRAVERSE NODE CONTENTS
									traverser = traverser || documentElement.createElement( 'traverse' );
									traverser.childNodes.splice( 0, traverser.childNodes.length );
									traverser.setInnerNodes( parser.NODES[i].children, traverser );

									for ( j=0, n = traverser.childNodes.length; j<n; j++ ) {
										nodes.push( traverser.childNodes[j] );
									}

								}

							}
						}
						break;

					default:
						break;
				}

			}

			return new TNode_Collection( nodes );

		} catch ( parserError ) {
			return null;
		}

	}

	public static peek( o: any, properties: string[] ) {
		var out = {};
		for ( var i=0, len = properties.length; i<len; i++ ) {
			if ( o[ properties[i] ] ) {
				out[ properties[i] ] = o[ properties[i] ];
			}
		}
		return out;
	}

}