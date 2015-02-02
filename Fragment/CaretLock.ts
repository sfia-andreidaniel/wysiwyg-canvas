class Fragment_CaretLock {
	
	private fragment : Fragment;
	private chars    : number = 0;
	private lockIndex: number = 0;
	public  direction: CaretLockDirection;

	private startedEOL: boolean = false;
	public  canCancelEOL: boolean = true;


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

		if ( direction == CaretLockDirection.FROM_ENDING_OF_DOCUMENT ) {
			if ( this.lockIndex < this.fragment.length() - 2 && this.fragment.at( this.lockIndex + 1 ) == FragmentItem.EOL ) {
				this.startedEOL = true;
			}
		}
		

		if ( direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {

			// count from beginning to cursor pos

			for ( i=0; i<=lockIndex; i++ ) {
			
				at = this.fragment.at( i );
			
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}
			
			}

			i = lockIndex + 1; n = this.fragment.length();

			while ( i < n ) {

				at = this.fragment.at( i );

				if ( at == FragmentItem.EOL ) {

					this.startedEOL = true;

					break;

				} else {

					if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
						break;
					}
				}

				i++;
			}

			this.chars = len;

		} else {

			// count from ending to cursor pos.

			for ( i = this.fragment.length() - 1; i>lockIndex; i-- ) {

				at = this.fragment.at(i);

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}

			}

			this.chars = len;

		}

		/*

		if ( this.startedEOL ) {
			console.error( this.lockName + ' startedEOL @ ' + this.lockIndex );
		} else {
			console.error( this.lockName + ' started NOTEOL @ ' + this.lockIndex + ' ' + this.direction );
		}

		console.info( this.lockName + ' has ' + this.chars + ' chars' );
		*/

	}

	public getTarget(): TRange_Target {

		var at: FragmentItem,
		     i: number = 0,
		     len: number = 0,
		     n: number = 0,
		     incChars: number = 0,
		     chars: number = this.chars;

		if ( this.direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT ) {

			for ( i=0, len = this.fragment.length(); i < len; i++ ) {
				
				at = this.fragment.at( i );
				
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE || ( at == FragmentItem.EOL && n == chars - 1 ) ) {
					
					if ( at == FragmentItem.EOL && n == chars - 1 ) {
						// HACK 1: There is a particular case in which we should not consider this particular case :)) hehe
						// HACK 2 (when HACK 1 should not work): Found a 2nd particular case of this particular case when we should not cancel ... :(
						if ( this.fragment.at( i + 1 ) == FragmentItem.NODE_END && (<TNode_Element>this.fragment.getNodeAtIndex( i + 1 ) ).isBlockTextNode ) {
							if ( this.canCancelEOL )
								continue;
						}
					}

					n++;

					if ( n == chars ) {

						if ( this.startedEOL && at != FragmentItem.EOL ){
							
							n = i + 1;
							
							while ( n < len ) {
								at = this.fragment.at(n);

								if ( at == FragmentItem.EOL ) {
									// good, break.
									break;
								} else {
									if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
										// gotcha
										i = n;
										break;
									}
								}

								n++;
							}

						}

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}
			}

			return this.chars == 0
				? this.fragment.createTargetAt( FragmentPos.DOC_BEGIN )
				: this.fragment.createTargetAt( FragmentPos.DOC_END );

		} else {

			for ( i = this.fragment.length() - 1; i >= 0; i-- ) {

				at = this.fragment.at( i );

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {

					n++;

					if ( n == chars ) {

						if ( this.startedEOL ) {
							
							n = i-1;

							while ( n >= 0 ) {

								at = this.fragment.at(n);

								if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {

									break;

								} else {
								
									if ( at == FragmentItem.EOL ) {
										i = n;
										break;
									}
								}

								n--;

							}
						}

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}

			}

			return this.chars == 0
				? this.fragment.createTargetAt( FragmentPos.DOC_END )
				: this.fragment.createTargetAt( FragmentPos.DOC_BEGIN );

		}
	}

}