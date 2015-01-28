class Fragment_CaretLock {
	
	private fragment : Fragment;
	private chars    : number = 0;
	private lockIndex: number = 0;
	public  direction: CaretLockDirection;

	private startedEOL: boolean = false;


	constructor( fragment: Fragment, lockIndex: number, direction: CaretLockDirection = CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {
			
		var at  : FragmentItem,
		    i   : number = 0,
		    len : number = 0;

		this.fragment  = fragment;
		this.lockIndex = lockIndex;
		this.chars     = 0;
		this.direction = direction;

		this.startedEOL = this.fragment.at( this.lockIndex ) == FragmentItem.EOL;

		if ( direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {

			// count from beginning to cursor pos

			for ( i=0; i<=lockIndex; i++ ) {
			
				at = this.fragment.at( i );
			
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}
			
			}

			this.chars = len;

		} else {

			if ( this.startedEOL ) {
				if ( 
					 ( this.fragment.at( this.lockIndex + 1 ) == FragmentItem.NODE_END ) && 
					 ( this.fragment.getNodeAtIndex( this.lockIndex + 1 ) == this.fragment.getNodeAtIndex( this.lockIndex ).ownerBlockElement() )
				) {
					this.startedEOL = false;
				}
			}

			// count from ending to cursor pos.

			for ( i = this.fragment.length() - 1; i>lockIndex; i-- ) {

				at = this.fragment.at(i);

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}

			}

			this.chars = len;

		}

		// if we start with the caret on an EOL, we consider the EOL as a character.

		if ( this.fragment.at( this.lockIndex ) == FragmentItem.EOL ) {
			//this.chars++;
		}

	}

	public getTarget(): TRange_Target {

		var at: FragmentItem,
		     i: number = 0,
		     len: number = 0,
		     n: number = 0,
		     incChars: number = 0,
		     chars: number = this.chars;

		if ( this.startedEOL && ( this.fragment.at( this.lockIndex ) != FragmentItem.EOL ) ) {
			incChars = 1;
			console.warn( 'incChars: ' + incChars );
			chars--;
		}

		if ( this.direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {

			for ( i=0, len = this.fragment.length(); i < len; i++ ) {
				
				at = this.fragment.at( i );
				
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE || ( at == FragmentItem.EOL && n == chars - 1 ) ) {
					
					n++;

					if ( n == chars ) {

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}
			}

			return this.fragment.createTargetAt( FragmentPos.DOC_END );

		} else {

			for ( i = this.fragment.length() - 1; i >= 0; i-- ) {

				at = this.fragment.at( i );

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE || ( at == FragmentItem.EOL && n == chars - 1 ) ) {

					n++;

					if ( n == chars ) {

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}

			}

			return this.fragment.createTargetAt( FragmentPos.DOC_BEGIN );

		}
	}

}