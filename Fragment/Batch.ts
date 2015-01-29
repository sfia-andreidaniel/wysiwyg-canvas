class Fragment_Batch {
	
	public range: TRange;
	public items: TNode_Collection_Dettached[];

	constructor ( range: TRange, items: TNode_Collection_Dettached[] ) {
		this.range = range;
		this.items = items;

	}

	public wrapInElement( elementName: string ): Fragment_Batch {
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].wrapInElement( elementName );
		}
		return this;
	}

	public unwrapFromElement( elementName: string ): Fragment_Batch {
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].unwrapFromElement( elementName );
		}
		return this;
	}

	public end(): Fragment_Batch {
		for ( var i=0, len = this.items.length; i<len; i++ ) {
			this.items[i].reInsert();
		}
		this.range.restore();
		return this;
	}

}