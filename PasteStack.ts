class PasteStack {

	protected ptr : TNode          = null;						//pointer where next insertion will be made
	protected pos : TPastePosition = TPastePosition.AFTER;		//position relative to pointer where next insertion will be made

	constructor( fragment: Fragment, position: number ) {

		var node: TNode = fragment.getNodeAtIndex( position ),
		    s   : string = '',
		    s1  : string = '';

		// builds the chain of the stack.
		switch ( node.nodeType ) {
			
			case TNode_Type.TEXT:
				
				s = (<TNode_Text>node).textContentsFragment( node.FRAGMENT_START, position - 1 );
				s1= (<TNode_Text>node).textContentsFragment( position, node.FRAGMENT_END );

				console.warn( JSON.stringify( s ), JSON.stringify( s1 ) );

				switch ( true ) {
					case s == '':
						this.pos = TPastePosition.BEFORE;
						this.ptr = node;
						break;
					case s1== '':
						this.pos = TPastePosition.AFTER;
						this.ptr = node;
						break;
					default:
						// fragmentate the node
						(<TNode_Text>node).textContents( s );
						node.parentNode.appendChild( node.documentElement.createTextNode( s1 ), node.siblingIndex + 1 );
						this.pos = TPastePosition.AFTER;
						this.ptr = node;
						break;
				}

				break;

			case TNode_Type.ELEMENT:
				
				switch ( position ) {
					case node.FRAGMENT_START:
						this.pos = TPastePosition.FIRST;
						this.ptr = node;
						break;
					case node.FRAGMENT_END:
						this.pos = TPastePosition.LAST;
						this.ptr = node;
						break;
					default:
						throw "ERR_UNHANDLED_EXCEPTION";
						break;
				}

				break;
		}

	}

	public debug(): PasteStack {

		var posStr: string = '';

		switch ( this.pos ) {
			case TPastePosition.FIRST:
				posStr = 'First Child';
				break;
			case TPastePosition.LAST:
				posStr = 'Last Child';
				break;
			case TPastePosition.AFTER:
				posStr = 'After Sibling';
				break;
			case TPastePosition.BEFORE:
				posStr = 'Before Sibling';
				break;
		}

		console.log( posStr, this.ptr );

		return this;

	}

	public resolveInsertionPoint( target: TNode_Element, index: number, node: TNode ): { "node": TNode_Element; index: number; policy: TPastePolicy } {
		var resolved = {
			node: target,
			index: index,
			policy: TPastePolicy.APPEND_INSERT
		},
		paragraph: TNode_Element,
		block: TNode_Element,
		host: TNode_Element;

		switch ( true ) {
			case node.nodeType == TNode_Type.TEXT:

				switch ( resolved.node.nodeClass ) {
					//try to append a text node inside an inline element
					case TNode_Class.INLINE:
					// try to append a text node inside an editable element
					case TNode_Class.BLOCK_EDITABLE:
						return resolved;
						break;
					// try to append a text node inside a non-editable element: Append after, in non editable's parent
					case TNode_Class.BLOCK_NONEDITABLE:
						return this.resolveInsertionPoint( resolved.node.parentNode, resolved.node.siblingIndex + 1, node );
						break;
					// try to append a text node inside a selective block
					case TNode_Class.BLOCK_SELECTIVE:
						if ( resolved.node.canAppendNode( node ) ) {
							return resolved;
						} else {
							return this.resolveInsertionPoint( resolved.node.parentNode, resolved.node.siblingIndex + 1, node );
						}
						break;
					case TNode_Class.HOST:
						// td's are the single block of type host which can append direct text nodes.
						if ( resolved.node.nodeName == 'td' ) {
							return resolved;
						} else {
							// create a paragraph, and return the first position in the paragraph where to insert the node.
							paragraph = resolved.node.documentElement.createElement( 'p' );
							resolved.node.appendChild( paragraph, resolved.index );
							resolved.node = paragraph;
							resolved.index = 0;
							return resolved;
						}
						break;
					case TNode_Class.NONE:
						resolved.policy = TPastePolicy.APPEND_IGNORE;
						return resolved;
						break;
				}

				break;

			case node.nodeType == TNode_Type.ELEMENT:
				// try to insert an element inside another element
				switch ( node.nodeClass ) {

					case TNode_Class.HOST:

						// there should be one exception in TR, which can append TD.
						if ( resolved.node.canAppendNode( node ) ) {
							return resolved;
						} else {
							// insert a HOST element inside of a host element? Niet. Traverse.
							resolved.policy = TPastePolicy.APPEND_TRAVERSE;
							return resolved;
						}

						break;

					case TNode_Class.BLOCK_EDITABLE:
						// editable blocks cand be appended only inside host nodes.

						switch ( resolved.node.nodeClass ) {

							case TNode_Class.HOST:
								// append block in host? OK
								return resolved;
								break;

							case TNode_Class.BLOCK_NONEDITABLE:
							case TNode_Class.BLOCK_EDITABLE:
							case TNode_Class.INLINE:
								// append block inside a non-editable?
								// append bloc in inline?
								block = resolved.node.splitUptoFirstHost( true, (<TNode_Element>node).nodeName );
								resolved.node = block.parentNode;
								resolved.index = block.siblingIndex + 1;
								return resolved;
								break;

							case TNode_Class.BLOCK_SELECTIVE:
								if ( resolved.node.canAppendNode( node ) ) {
									return resolved;
								} else {
									block = resolved.node.splitUptoFirstHost( true, (<TNode_Element>node).nodeName );
									resolved.node = block.parentNode;
									resolved.index = block.siblingIndex + 1;
									return resolved;
								}
								break;
							case TNode_Class.NONE:
								resolved.policy = TPastePolicy.APPEND_IGNORE;
								break;

						}
						break;

					case TNode_Class.BLOCK_NONEDITABLE:
						// non-editable nodes can be inserted only in the root of the hosts or in the
						// root of the editable blocks.

						switch ( resolved.node.nodeClass ) {
							case TNode_Class.HOST:
							case TNode_Class.BLOCK_EDITABLE:
								return resolved;
								break;
							case TNode_Class.INLINE:
								block = resolved.node.splitUptoFirstBlock( true, (<TNode_Element>node).nodeName );
								resolved.node = block.parentNode;
								resolved.index = block.siblingIndex + 1;
								return resolved;
								break;
							case TNode_Class.BLOCK_NONEDITABLE:
								return this.resolveInsertionPoint( resolved.node.parentNode, resolved.node.siblingIndex + 1, node );
								break;
							case TNode_Class.BLOCK_SELECTIVE:
								if ( resolved.node.canAppendNode( node ) ) {
									return resolved;
								} else {
									block = resolved.node.splitUptoFirstHost( true, (<TNode_Element>node).nodeName );
									resolved.node = block.parentNode;
									resolved.index = block.siblingIndex + 1;
									return resolved;

								}
								break;
							case TNode_Class.NONE:
								resolved.policy = TPastePolicy.APPEND_IGNORE;
								break;
						}
						break;

					case TNode_Class.BLOCK_SELECTIVE:
					case TNode_Class.BLOCK_EDITABLE:

						//// HERE"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
						//// WARNING: NOT FINISHED.

						break;

				}

				break;
		}

		return resolved;
	}

	public appendNext( node: TNode ) {

		var targetNode: TNode_Element = null,
		         index: number = null;

		switch ( this.pos ) {
			case TPastePosition.LAST:
				targetNode = <TNode_Element>this.ptr;
				index = null;
				break;
			case TPastePosition.FIRST:
				targetNode = <TNode_Element>this.ptr;
				index = 0;
				break;
			case TPastePosition.AFTER:
				targetNode = this.ptr.parentNode;
				index = this.ptr.siblingIndex + 1;
				break;
			case TPastePosition.BEFORE:
				targetNode = this.ptr.parentNode;
				index = this.ptr.siblingIndex;
				break;
		}

	}


}