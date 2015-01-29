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
		var apply: any[] = [ removeLength, startIndex ],
		        i: number = 0,
		      len: number = addNodes.length;

		for ( i=0; i<len; i++ ) {
			apply.push( addNodes[i] );
		}

		Array.prototype.splice.apply( thisArray, apply );
		return thisArray;
	}

}