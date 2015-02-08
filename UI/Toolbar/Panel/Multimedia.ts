class UI_Toolbar_Panel_Multimedia extends UI_Toolbar_Panel {
	
	public buttonLink: HTMLDivElement = null;
	public buttonPicture: HTMLDivElement = null;
	public buttonVideo: HTMLDivElement = null;

	constructor( toolbar: UI_Toolbar ) {
		super( toolbar, 'Multimedia' );

		DOM.addClass( this.node, 'ui-panel-multimedia');

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button link" title="Link"></div>',
				'<div class="ui-button picture" title="Picture"></div>',
				'<div class="ui-button video" title="Video"></div>',
			'</div>',
		].join( '' );

		this.buttonLink = <HTMLDivElement>this.node.querySelector( '.ui-button.link' );
		this.buttonPicture= <HTMLDivElement>this.node.querySelector( '.ui-button.picture' );
		this.buttonVideo = <HTMLDivElement>this.node.querySelector( '.ui-button.video' );

		( function( me ) {

			me.buttonLink.addEventListener( 'click', function( e ) {

				me.insertLink();

			}, true );

			me.buttonPicture.addEventListener( 'click', function( e ) {

				me.insertPicture();

			}, true );

			me.buttonVideo.addEventListener( 'click', function( e ) {

				me.insertVideo();

			}, true );
		} )( this );
		
	}

	public insertLink() {

		var selection = this.toolbar.router.viewport.selection,
		    rng       = selection.getRange(),
		    dialog: UI_Dialog = null,
		    fragment: Fragment_Contextual,
		    elements: TNode_Element[],

		    cursor: TNode,
		    cursorBlock: TNode_Element,

		    aText: string = null,
		    aTarget: string = null,
		    aHref: string = null,

		    i: number = 0,
		    len: number;

		/* We dissalow the command if no rng.focusNode() is definde */
		if ( rng.focusNode() === null ) {

			UI_Dialog_Manager.alert( 'Please click or select a text first!', function() {
				selection.viewport.canvas.focus();
			}, selection.viewport.canvas );

			return;
		}

		if ( !rng.length() && rng.focusNode() ) {
			// If nothing is selected, but the caret is inside of an "A" element,
			// we select that element first!.
			cursor = rng.focusNode().target;
			cursorBlock = cursor.ownerBlockElement();
			while ( cursor != cursorBlock ) {
				if ( cursor.is() == 'a' ) {

					selection.selectByFragmentIndexes( cursor.FRAGMENT_START, cursor.FRAGMENT_END );

					rng = selection.getRange();

					break;
				}
				cursor = cursor.parentNode;
			}
		}

		if ( rng.length() ) {
			/* Find out if selection contains any links */
			fragment = rng.createContextualFragment();

			aText = fragment.toString( 'text/plain' );

			elements = fragment.affectedInlineElements();

			// see if we have any "A" in elements. If we have, we borrow it's target and href.

			for ( i=0, len = elements.length; i<len; i++ ) {
				if ( elements[i].is() == 'a' ) {
					aTarget = (<HTML_Anchor>elements[i]).target();
					aHref   = (<HTML_Anchor>elements[i]).href();
					
					dialog = UI_Dialog_Manager.singleton( 'EditLink' );
					
					break;
				}
			}

			if ( !dialog ) {
				dialog = UI_Dialog_Manager.singleton('InsertLink');
			}

		} else {
			dialog = UI_Dialog_Manager.singleton('InsertLink');
		}

		if ( dialog ) {
			dialog.setup( this.toolbar.router.viewport, aText, aHref, aTarget ).centerTo( selection.viewport.canvas ).open();
		}

	}

	public insertPicture() {

	}

	public insertVideo() {

	}
}