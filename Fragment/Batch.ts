class Fragment_Batch {
	
	public range: TRange;
	public items: TNode_Collection_Dettached[];
	private ended: boolean = false;

	constructor ( range: TRange, items: TNode_Collection_Dettached[] ) {
		this.range = range;
		this.items = items;

	}

	public wrapInElement( elementName: string ): Fragment_Batch {
		if ( this.ended ) {
			throw "ERR_BATCH_ENDED";
		}
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].wrapInElement( elementName );
		}
		return this;
	}

	public unwrapFromElement( elementName: string ): Fragment_Batch {
		if ( this.ended ) {
			throw "ERR_BATCH_ENDED";
		}
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].unwrapFromElement( elementName );
		}
		return this;
	}

	public end(): Fragment_Batch {

		if ( this.ended ) {
			throw "ERR_BATCH_ENDED";
		}

		this.ended = true;

		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].reInsert();
			this.items[i].parentNode.defragment();
		}

		this.range.restore();

		return this;
	}

	public debug() {
		console.info( 'Batch: ' + this.items.length + ' ranges' );
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			console.info('Range #' + i + ': parent[' + this.items[i].parentNode.FRAGMENT_START + ',' + this.items[i].parentNode.FRAGMENT_END + ']: ' + this.items[i].parentNode.xmlBeginning() + ', nodes: ' + this.items[i].length + ':' );
			console.log( '    "' + this.items[i].toString( '"\n     "' ) + '"' );
		}
	}

}