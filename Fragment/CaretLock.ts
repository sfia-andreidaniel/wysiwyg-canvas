class Fragment_CaretLock {
	
	private fragment : Fragment;
	private chars    : number = 0;
	private lockIndex: number = 0;
	public  direction: CaretLockDirection;

	private startedEOL: boolean = false;


	constructor( 
		fragment: Fragment, 
		lockIndex: number, 
		direction: CaretLockDirection = CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT, 
		public lockName = 'Lock'
	) {
		
		var at  : FragmentItem,
		    i   : number = 0,
		    len : number = 0,
		    n   : number = 0;

		this.fragment  = fragment;
		this.lockIndex = lockIndex;
		this.chars     = 0;
		this.direction = direction;

		this.startedEOL = this.fragment.at( lockIndex ) == FragmentItem.EOL;

		if ( direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {
			for ( i=0; i<=lockIndex; i++ ) {
				at = this.fragment.at( i );
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					this.chars++;
				}
			}
		} else {
			for ( i = this.fragment.length() - 1; i>= lockIndex; i-- ) {
				at = this.fragment.at( i );
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					this.chars++;
				}
			}
		}

	}

	public getTarget(): TRange_Target {

		var i: number = 0,
		    len: number = 0,
		    chars: number = 0,
		    at: FragmentItem,

		    foundIndex: number = this.direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ? 0 : this.fragment.length() - 1;

		if ( this.direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {

			if ( this.chars != 0 ) {

				for ( i=0, len = this.fragment.length(); i<len; i++ ) {

					at = this.fragment.at( i );

					if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
						chars++;
						foundIndex = i;

						if ( chars == this.chars ) {
							break;
						}
					}
				}
			}

			if ( this.startedEOL || chars < this.chars ) {
				
				foundIndex++;
				
				len = this.fragment.length();
				
				while ( foundIndex < len ) {

					at = this.fragment.at( foundIndex );

					if ( at == FragmentItem.WHITE_SPACE || at == FragmentItem.CHARACTER || at == FragmentItem.EOL ) {
						break;
					}

					foundIndex++;
				}

			}

			return new TRange_Target( this.fragment.getNodeAtIndex( foundIndex ), foundIndex );

		} else {

			if ( this.chars != 0 ) {

				for ( i=foundIndex; i>=0; i-- ) {

					at = this.fragment.at( i );
					
					if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
						chars++;
						if ( chars == this.chars ) {
							foundIndex = i;
							break;
						}
					}
				}
			}

			if ( this.startedEOL ) {
				
				foundIndex--;
				
				while ( foundIndex >= 0 ) {
					at = this.fragment.at( foundIndex );
					
					if ( at == FragmentItem.WHITE_SPACE || at == FragmentItem.CHARACTER || at == FragmentItem.EOL ) {
						break;
					}

					foundIndex--;

				}
			}

			if ( foundIndex >= 0 ) {
				return new TRange_Target( this.fragment.getNodeAtIndex( foundIndex ), foundIndex );
			} else {
				return this.fragment.createTargetAt( FragmentPos.DOC_BEGIN );
			}

		}
	}

}