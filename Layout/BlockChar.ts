class Layout_BlockChar extends Layout {
	public chars: Character[] = [];
	public children: Layout[] = null;
	public hasChars : boolean = true;

	public addTextNode( node: TNode_Text ) {
		for ( var i=0, len = node._text.length; i<len; i++ ) {
			this.chars.push( new Character( node, i ) );
		}
	}
}