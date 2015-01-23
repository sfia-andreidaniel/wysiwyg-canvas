/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />

/// <reference path="TNode.ts" />
/// <reference path="./TNode/Text.ts" />
/// <reference path="./TNode/Element.ts" />
/// <reference path="./TNode/Collection.ts" />

/// <reference path="./HTMLParser.ts" />

/// <reference path="./HTML/Body.ts" />
/// <reference path="./HTML/Paragraph.ts" />
/// <reference path="./HTML/Image.ts" />
/// <reference path="./HTML/Heading1.ts" />
/// <reference path="./HTML/Heading2.ts" />
/// <reference path="./HTML/Heading3.ts" />
/// <reference path="./HTML/Heading4.ts" />
/// <reference path="./HTML/Heading5.ts" />
/// <reference path="./HTML/Bold.ts" />
/// <reference path="./HTML/Italic.ts" />
/// <reference path="./HTML/Underline.ts" />
/// <reference path="./HTML/Anchor.ts" />
/// <reference path="./HTML/BulletedList.ts" />
/// <reference path="./HTML/OrderedList.ts" />
/// <reference path="./HTML/ListItem.ts" />
/// <reference path="./HTML/Superscript.ts" />
/// <reference path="./HTML/Subscript.ts" />
/// <reference path="./HTML/Table.ts" />
/// <reference path="./HTML/Table/Matrix.ts" />
/// <reference path="./HTML/Table/EdgesCollection.ts" />
/// <reference path="./HTML/Table/Edge.ts" />
/// <reference path="./HTML/TableRow.ts" />
/// <reference path="./HTML/TableCell.ts" />

/// <reference path="TStyle.ts" />
/// <reference path="./TStyle/TableCell.ts" />
/// <reference path="./TStyle/Property.ts" />
/// <reference path="./TStyle/PropertyInheritable.ts" />
/// <reference path="./TStyle/Dimension.ts" />
/// <reference path="./TStyle/String.ts" />
/// <reference path="./TStyle/Color.ts" />

/// <reference path="Character.ts" />
/// <reference path="./Character/Metrics.ts" />
/// <reference path="./Character/Line.ts" />
/// <reference path="./Character/Word.ts" />

/// <reference path="Layout.ts" />
/// <reference path="Layout/Horizontal.ts" />
/// <reference path="Layout/Vertical.ts" />
/// <reference path="Layout/Block.ts" />
/// <reference path="Layout/BlockChar.ts" />
/// <reference path="Layout/Block/Table.ts" />

/// <reference path="Viewport.ts" />
/// <reference path="./Viewport/MouseDriver.ts" />
/// <reference path="./Viewport/KeyboardDriver.ts" />
/// <reference path="./Viewport/CommandRouter.ts" />

/// <reference path="Fragment.ts" />
/// <reference path="./Fragment/Contextual.ts" />
/// <reference path="./Fragment/Contextual/Item.ts" />
/// <reference path="./Fragment/Contextual/NodeStart.ts" />
/// <reference path="./Fragment/Contextual/NodeEnd.ts" />
/// <reference path="./Fragment/Contextual/TextNode.ts" />

/// <reference path="TRange.ts" />
/// <reference path="./TRange/Target.ts" />
/// <reference path="DocSelection.ts" />

var viewport = new Viewport(),
    body = viewport.document,
    niceHTML = [
    	'<h1 align="center">He<u>adi</u>ng 1</h1>',
    	'<p align="justified">The element above this paragraph is a <b><u>Heading 1</u><sup>citat<u>io</u>n needed</sup></b>. The element above this paragraph is a <b><u>Heading 1</u><sup>citat<u>io</u>n needed</sup></b>. alksdjlak jslakjslkajsldasd asldjalsdkjalskdja</p>',
    	'<h2>Heading 2</h2>',
    	'<p>The element above this paragraph is a <b><i>Heading 2</i><sub>citation <i>need</i>ed</sub></b>.</p>',
    	'<h3>Heading 3</h3>',
    	'<h4>Heading 4</h4>',
    	'<h5>Heading 5</h5>',
    	'<p>The elements above this paragraph are representing a <b>H3</b>, <b>H4</b>, and a <b>H5</b>. </p>',
        '<h1>Table handling</h1>',
    	'<table border=1 cellspacing=0 bordercolor=black cellpadding=5 > this should be ignored',
	    	'<tr>, this also,',
		    	'<td width="33%" rowspan="2">Cell 1 is the best cell in the world</td> and also this',
		    	'<td>Cell 2 is also good, but not the best. Because it\'s the second</td>',
	    	'</tr>',
	    	'<tr>',
                '<td>This is the last cell of the table</td>',
	    	'</tr>',
            '<tr>',
                '<td colspan=2>This is the last cell of the table</td>',
            '</tr>',
            '<tr>',
                '<td colspan=2>end<img align="right" src="./_assets/pic1.jpg" width="100" /></td>',
            '</tr>',
    	'</table>',
    	'<h1>Anchoring</h1>',
    	'<p>This text contains an anchor to <a href="http://www.google.com">Google</a>. Anchoring painting should be rendered on the word Google.</p>',
    	'<h1>Lists</h1>',
    	'<p>Bulleted...</p>',
    	'<ul>',
    		'<li>Item 1</li>',
    		'<li>Item 2</li>',
    		'<li>And this is the third element inside the bulleted <b>UL</b> list. The items should be rendered with discs in their left.</li>',
    	'</ul>',
    	'<p>Ordered...</p>',
    	'<ol>',
    		'<li>Item 1</li>',
    		'<li>Item 2</li>',
    		'<li>Item 3</li>',
    	'</ol>',
    	'<h2>Image handling</h2>',
    	'<p>This is a <img align="right" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    	'<p>This is a <img align="left" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    	'<p>This is a <img align="left" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at <img align="right" src="./_assets/pic1.jpg" width="100" /> the end of the document. Hope you enjoyed it.</p>',
    	'<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    	'<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    	'<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>'
    ].join( '' );

body.innerHTML( niceHTML );

window.addEventListener( 'load', function() {
	document.body.appendChild( viewport.canvas );
	viewport.canvas.focus();
});