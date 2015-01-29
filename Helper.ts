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

}