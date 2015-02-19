class HTMLParser {
	
	public NODES = [];
	public loops = 0;

	constructor ( public document: HTML_Body, data?: string ) {
		
		if ( data ) {
			this.parse( data, null );
			this.removeWhiteSpaces( this.NODES );
		}
	
	}

	public removeWhiteSpaces( nodes: any[] ) {
		
		var len: number = nodes.length,
		    i: number = 0;

		for ( i=len-1; i>=0; i-- ) {
			if ( nodes[i].type == '#text' && nodes[i].value == ' ' && nodes[i-1] && nodes[i+1] && nodes[i-1].type != '#text' && nodes[i+1].type != '#text' ) {
				nodes.splice(i,1);
			} else
			if ( nodes[i].type == 'node' && nodes[i].children )
				this.removeWhiteSpaces( nodes[i].children );
		}

	}

	public static READ_TEXT( data: string ): string {
		
		var matches = /^[^\<]+/.exec( data );
		
		if ( matches ) {
			return matches[0];
		} else return null;

	}

	public static READ_ATTRIBUTE( data: string ): any {

		if ( /^[\s]+$/.test(data) )
			return null;

		var out = {
				"name": null,
				"value": null,
				"clearBuffer": null
			},
			matches: any;

		if ( matches = /^([\s]+)?([^\"\'\=\>]+)(\=([^\"\'\s>]+|\"[^\"]+\"|\'[^\']+')?)?([\s]+)?/.exec( data ) ) {

				out.name = matches[2];
				out.value = matches[4] || "";
				out.clearBuffer = matches[0];

				if ( out.value.length >= 2 && ( 
					( out.value[0] == '"' && out.value[ out.value.length - 1 ] == '"' ) || 
					( out.value[0] == "'" && out.value[ out.value.length - 1 ] == "'" ) 
				) ) {
					out.value = out.value.substr( 1, out.value.length - 2 );
				}

				return out;

			} else return null;

	}

	public static HAS_ATTRIBUTE( node: any, attributeName: string ): boolean {
		for (var i=0, len = node.attributes.length; i<len; i++ ) {
			if ( node.attributes[i].name == attributeName && node.attributes[i].value ) {
				return true;
			}
		}
		return false;
	}

	public static GET_ATTRIBUTE( node: any, attributeName: string ): string {
		for ( var i=0, len=node.attributes.length; i<len; i++ ) {
			if ( node.attributes[i].name == attributeName ) {
				return String( node.attributes[i].value || '' );
			}
		}
		return '';
	}

	public static SET_ATTRIBUTE( node: any, attributeName: string, attributeValue: string ) {
		for ( var i=0, len=node.attributes.length; i<len; i++ ) {
			if ( node.attributes[i].name == attributeName ) {
				if ( attributeValue === null ) {
					node.attributes.splice( i, 1 );
					return;
				} else {
					node.attributes[i].value = String( attributeValue || '' );
					return;
				}
			}
		}
		if ( attributeValue !== null ) {
			node.attributes.push( {
				"name": String( attributeName || '' ),
				"value": String( attributeValue || '' )
			} );
		}
	}

	public static READ_NODE( data: string, doc: HTML_Body ): any {
		
		var out = {
				"nodeName": "",
				"autoClose": false,
				"clearBuffer": "",
				"attributes": [],
				"children": [],
				"overrideNodeName": null
			},
		    matches, matches1, matches2,
		    attribute,
		    textContents: string = '',
		    r: RegExp,
		    insensitive: boolean = true,
		    overrideNodeName: string = null,
		    dataTagAttribute: string = '',
		    dataTagAttributeValue: string = '';

		if ( matches = /^\<([^\s\>\/]+)([^\>]+)?\>/.exec( data ) ) {

			out.clearBuffer = matches[0];

			if ( matches[1] && /\/$/.test( matches[1] ) ) {
				matches[1] = matches[1].substr( 0, matches[1].length - 1 );
				out.autoClose = true;
			}

			out.nodeName = insensitive ? matches[1].toLowerCase() : matches[1];

			if ( !out.autoClose && HTML_Body.AUTOCLOSE_TAGS.indexOf( out.nodeName ) >= 0 )
				out.autoClose = true;

			if ( matches[2] ) {

				if ( /\/$/.test( matches[2] ) )
					matches[2] = matches[2].substr( 0, matches[2].length - 1 );

				while ( matches[2] && ( attribute = HTMLParser.READ_ATTRIBUTE( matches[2] ) ) ) {

					matches[2] = matches[2].substr( attribute.clearBuffer.length );
					out.attributes.push( { "name": attribute.name, "value": attribute.value } );

				}

			}

			if ( out.nodeName == 'span' ) {
				/* We override the spans, if they have the data-tag set, with their internal node names */
				dataTagAttribute = HTMLParser.GET_ATTRIBUTE( out, 'data-tag' );
				
				switch ( true ) {
					
					case dataTagAttribute == '!b':
					case dataTagAttribute == '!i':
					case dataTagAttribute == '!u':
					case dataTagAttribute == '!strike':
					case dataTagAttribute == '!sub':
					case dataTagAttribute == '!sup':
					
						overrideNodeName = dataTagAttribute;
						HTMLParser.SET_ATTRIBUTE( out, 'data-tag', null );
					
						break;
					
					case ( matches2 = /^(color|font|size)\:(.*)?$/.exec( dataTagAttribute ) ) ? true : false:
					
						HTMLParser.SET_ATTRIBUTE( out, 'data-tag', null );
						
						dataTagAttribute = matches2[1];
						dataTagAttributeValue = matches2[2] || '';

						overrideNodeName = dataTagAttribute;
						
						if ( dataTagAttributeValue ) {
							switch ( dataTagAttribute ) {
								case 'font':
									HTMLParser.SET_ATTRIBUTE( out, 'name', dataTagAttributeValue );
									break;
								case 'color':
									HTMLParser.SET_ATTRIBUTE( out, 'name', dataTagAttributeValue );
									break;
								case 'size':
									HTMLParser.SET_ATTRIBUTE( out, 'value', dataTagAttributeValue );
									break;
							}
						}
						
						break;

					default:
						break;
				}
			}

			/* If the node is one of type with unescaped text, read it's text content,
			   append a child text node inside it, set autoClose to false, and return up
			   to the close tag
			*/

			if ( HTML_Body.FORCE_TEXT_NODES.indexOf( out.nodeName ) >= 0 && !out.autoClose ) {

				r = new RegExp( '([\\s\\S]+)?<\\/' + out.nodeName + '([\s]+)?>', insensitive ? 'i' : ''  );

				matches1 = r.exec( data.substr( matches[0].length ) );

				if ( matches1 ) {

					textContents = matches1[1];
					out.clearBuffer = out.clearBuffer.concat( textContents );
					
					out.children.push( {
						"type": "#text",
						"value": textContents
					} );

				} else {

					// consider all the text upto the end of the string is the text contents of this node
					
					out.clearBuffer = data;
				}

			}

			if ( overrideNodeName ) {
				out.overrideNodeName = overrideNodeName;
			}

			return out;

		} else return null;

	}

	public static READ_END_NODE( data: string, nodeName: string, doc: HTML_Body ): string {

		if ( !data )
			throw "ERR_UNEXPECTED_END_OF_BUFFER";

		var matches: any;

		if ( matches = ( new RegExp('^<\\/' + nodeName + '([\\s]+)?>', 'i' ) ).exec( data ) ) {
			return matches[0];
		} else return null;

	}

	public static READ_COMMENT( data ): any {

		var matches: any;

		if ( matches = /^<\!--([\s\S]+)?\-\-\>/.exec( data ) ) {
			return {
				"value": matches[1] || '',
				"clearBuffer": matches[0]
			};
		} else return null;

	}

	public static READ_CDATA( data ): any {

		var matches: any;

		if ( matches = /^\<\!\[CDATA\[([\s\S]+)?\]\]\>/.exec( data ) ) {
			return {
				"value": matches[1] || '',
				"clearBuffer": matches[0]
			};
		} else return null;

	}

	public parse( data: string, pushIn: any ): string {
		
		this.loops++;

		if ( this.loops > 1000000 )
			throw "ERR_DOCUMENT_TOO_BIG";

		var token1: string = '',
		    token2: any = {},
		    token3: string = '',
		    subData: string = '';

		pushIn = pushIn || null;

		if ( pushIn === null ) {
			this.NODES = [];
			this.loops = 1;
			pushIn = this.NODES;
			data
		}

		while ( data ) {

			if ( ( token1 = HTMLParser.READ_TEXT( data ) ) !== null ) {

				pushIn.push( {

					"type": "#text",
					"value": token1 .replace(/[\s]/g, ' ' )
									.replace(/[\s]+/g, ' ' )
									.replace( /&nbsp;/g, ' ' )
									.replace(/&lt;/g, '<' )
									.replace(/&gt;/g, '>' )
									.replace(/&quot;/g, '"' )

				} );

				data = data.substr( token1.length );

			} else {
	
				if ( ( token2 = HTMLParser.READ_COMMENT( data ) ) !== null ) {
					
					token2.type = 'comment';
					
					data = data.substr( token2.clearBuffer.length );
					
					delete token2.clearBuffer;

					pushIn.push( token2 );

				} else {

					if ( ( token2 = HTMLParser.READ_CDATA( data ) ) !== null ) {

						token2.type = 'cdata';
						
						data = data.substr( token2.clearBuffer.length );
						
						delete token2.clearBuffer;

						pushIn.push( token2 );

					} else {

						if ( ( token2 = HTMLParser.READ_NODE( data, this.document ) ) !== null ) {

							token2.type = 'node';
							
							pushIn.push( token2 );

							data = data.substr( token2['clearBuffer'].length );

							delete token2.clearBuffer;

							if ( !token2['autoClose'] ) {

								while ( !( token3 = HTMLParser.READ_END_NODE( data, token2.nodeName, this.document ) ) ) {

									subData = this.parse( data, token2.children );

									if ( subData != data ) {
										data = subData;
									} else {
										token3 = '';
										break;
									}

								}

								if ( token2.overrideNodeName ) {
									token2.nodeName = token2.overrideNodeName;
								}

								data = data.substr( token3.length );

							}

						} else return data;

					}

				}

			}

		}

		return data;

	}

}