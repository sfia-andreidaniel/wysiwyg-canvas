class UndoManager extends Events {
	
	public viewport: Viewport;
	public entries: UndoEntry[] = [];
	public index: number = 0;

	public maxUndoLevels: number = 100;

	private locked: boolean = false;

	private prevOp: string = null;

	constructor ( viewport: Viewport ) {
		super();
		this.viewport = viewport;
	}

	public reset() {

		if ( this.locked ) {
			return;
		}

		this.entries = [];
		this.index = 0;
		this.prevOp = null;

		this.createUndoEntry( 'Document Load' );

		// console.info( 'The undo manager has been reseted!' );
	}

	public createUndoEntry( description: string = 'modification' ) {

		this.prevOp = null;

		var selection = this.viewport.selection,
		    rng       = selection.getRange(),
		    numEntries: number = this.entries.length,

			entry = {
				"description": description || "modification",
				"document": this.viewport.document.innerHTML(),
				"multiRange": rng.isMultiRange() ? (<HTML_MultiRange>rng.anchorNode().target).serialize() : null,
				"focus": rng.focusNode() ? rng.focusNode().fragPos : null,
				"anchor": rng.anchorNode() ? rng.anchorNode().fragPos : null,
				"time": Date.now()
			};

		if ( numEntries && this.index == numEntries && this.entries[ numEntries - 1 ].description == entry.description && ( entry.time - this.entries[ numEntries - 1 ].time ) < 1000 ) {

			switch ( this.entries[ numEntries - 1 ].description ) {
				case 'Delete Text':
				case 'Write':
				case 'New Line':
					//console.info( 'Replace undo', numEntries, this.index );
					this.entries[ numEntries - 1 ] = entry; //replace entry
					return;
					break;
			}

		}

		//console.warn('Add undo' );

		this.truncate();

		if ( this.entries.length >= this.maxUndoLevels ) {
			this.entries.shift();
			this.index--;
		}

		this.entries.push( entry );

		this.index = this.entries.length;

		this.fire( 'changed' );
	}

	public truncate() {
		//console.warn( 'truncate...' );
		this.entries = this.entries.slice( 0, this.index );
	}

	public canUndo(): boolean {
		return this.index > 0;
	}

	public canRedo(): boolean {
		return this.entries[ this.index ] ? true : false;
	}

	private restore( entry: UndoEntry ) {

		this.locked = true;

		this.viewport.document.lockOrphan();

		this.viewport.value( entry.document );

		this.viewport.document.unlockOrphan();

		var selection = this.viewport.selection,
		    rng = selection.getRange();

		if ( !entry.multiRange ) {

			selection.anchorTo( new TRange_Target( this.viewport.document.findNodeAtIndex( entry.anchor ), entry.anchor ) );

			if ( entry.focus !== null ) {

				selection.focusTo( new TRange_Target( this.viewport.document.findNodeAtIndex( entry.focus ), entry.focus ) );

			}

		} else {

			var multiRange = HTML_MultiRange.unserialize( this.viewport.document, entry.multiRange );

			selection.anchorTo( new TRange_Target( multiRange, multiRange.FRAGMENT_START ) );

		}

		this.locked = false;

		return true;

	}

	public undo(): boolean {
		
		if ( this.prevOp != 'undo' ) {
			
			if ( this.prevOp != 'redo' ) {
				this.createUndoEntry( 'Last document state' );
				this.index--;
			}

			this.prevOp = 'undo';
		}

		if ( this.index > 0 ) {
			
			this.index--;

			this.restore( this.entries[ this.index ] );

			this.fire( 'changed' );

			return true;

		} else {

			return false;

		}

	}

	public redo(): boolean {

		if ( this.prevOp != 'redo' ) {
			if ( this.prevOp == 'undo' ) {
				this.index++;
			}
			this.prevOp = 'redo';
		}

		if ( this.canRedo() ) {

			this.index++;

			this.restore( this.entries[ this.index - 1 ] );

			this.fire( 'changed' );

			if ( !this.canRedo() ) {
				this.index--;
				this.prevOp = null;
				this.entries.pop();
			}

			return true;

		} else {

			return false;

		}
	
	}

	public undoSummary(): UndoSummary[] {
		var out: UndoSummary[] = [],
		      i: number = 0;

		for ( i=0; i<this.index; i++ ) {
			out.push( {
				"index": i,
				"description": this.entries[ i ].description
			} );
		}

		return out;
	}

	public redoSummary(): UndoSummary[] {
		var out: UndoSummary[] = [],
		      i: number = 0;

		for ( i=this.index; i<this.entries.length; i++ ) {
			out.push( {
				"index": i,
				"description": this.entries[ i ].description
			} );
		}

		return out;
	}


}