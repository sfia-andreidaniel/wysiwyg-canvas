/* This class handles all the utility for dom working */
class DOM {

	static hasClass( DOMElement: Node, className: string ): boolean {
		if ( !className ) {
			return false;
		} else {
			className = String( className );
		}

		var classes: string[] = String( DOMElement['className'] || '' ).split( /[\s]+/g ),
		    i: number = 0,
		    len = classes.length;
		
		for ( i=0; i<len; i++ ) {
			if ( classes[i] == className ) {
				return true;
			}
		}
		
		return false;
	}

	static addClass( DOMElement: Node, className: string ): void {
		if ( !className ) {
			return;
		} else {
			className = String( className );
		}

		var classes: string[] = String( DOMElement['className'] || '' ).split( /[\s]+/g ),
		    i: number = 0,
		    len = classes.length;

		for ( i=0; i<len; i++ ) {
			if ( classes[i] == className ) {
				return;
			}
		}

		classes.push( className );

		DOMElement['className'] = classes.join( ' ' );
	}

	static removeClass( DOMElement: Node, className: string ): void {
		if ( !className ) {
			return;
		} else {
			className = String( className );
		}

		var classes: string[] = String( DOMElement['className'] || '' ).split( /[\s]+/g ),
		    i: number = 0,
		    len = classes.length;

		for ( i=0; i<len; i++ ) {
			if ( classes[i] == className ) {
				classes.splice( i, 1 );
				break;
			}
		}

		DOMElement['className'] = classes.join( ' ' );
	}

}