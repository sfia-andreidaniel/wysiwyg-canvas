class UI_Resources {
    public static html_alert : string = "<div class=\"dialog-body\">\r\n\r\n\t<img src=\"{png_alertIcon}\" style=\"float: left; border: 0;\" />\r\n\r\n\t<p class=\"alert-text\" style=\"margin-left: 50px; margin-top: 7px; margin-right: 10px;\"></p>\r\n\r\n</div>";
    public static png_alertIcon : string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABFBJREFUeNrsl11Mk1cYx3/n7VsKRYWBJB22fAhY+drcQlQ6wDjnGDKMWbaQjCzZssgyL9gWYsi2sISLXRgy48W8mJk3JmQajRGvNPGu7a5MYAskmABOFBVQqq6l0vfj7KK1gLZQicrNTvLPm77nnP/zP8/zvM/TI6SUrOVQWOOx5gJUrn+x6s3e3j4XQP3htpur5RBy/PPVGF4H/GzLVL8CmA/pvwE/1h9uCz6/B1Y3uguqNx4qqKtVUazc9P956Mbg3RDww0vPAW9vnye3rOS7wo86VZHjRmQVUbC/Q80u3NTp7e3zvIokbN/8br1K5BZE7oA2BdpdSt5rsALtzy/ANEkV3t6+L4t31bWl57kEkftgGlFEZrDnu4VrZ02bt7ev9Xk4FaRJKvD+8odFUZRfnbuaVR7fAFNfBA3C/+Cs9ahAe6qcSBMlfoqVAN3lB5rTiExD5NFTAnSIBFDTbWxtadzlPXqmK1XelELgPXauKnNjzvc5VTsUQtfjRrfvO8v2fWfB0KOEoTHytjVY7Lmv9XiPnXOlFAJp6KwE4OCWpj1WGZpA6nNIQ0PqGlKKKAwtCi2InLvBlsY9VqAjFe4VQ+A7frHJUV319bqCckFwPHZaDUwdEwUTZSEPDB2C46wvrlAc1VXf+I5fbFo5BIbBsoCDhfUeVQaGQZsHI2bI0DClwJRiyTu0eWRgmMJ6jwocXIlfiW5MDN+JSx1le3fvT8u0C0KTC6c0NDA0DKlgSCX+O+6d0CRp6zeIkt11Lb4TlzqWs6E8k80x+E5eyVIzMo44du61yJmBuNujIpIIWLRGzgyQX9+sKhbLEd/JK1nJ7CT3AHSVf7AnTc4Ow3xgycmTe2CRJ8IzyMA1Kj58Pw3oSu6BRK4/5duR7crvzCp1K8z8ndR9prRgSkvSeaYHyHZXK1n5jk7fKZ8noYAkn117ce3bKtN/IY15pGkgzWfXPfHAMxymHt2jh2F6kM2et1SgPfFn+JQi/+mrrY5K92eZuTmKDIyzXAIthCD5Gjk7SmZenvJ61dZP/aevtj49r8bivaTbOd/YoppTA09KMAiRsJNd768EwLw/lbjVSQkmyKkBNlWXqXeGRtox9DNLu+Hi058f6iqqqWywiaAgPAty+SLibBnB2TKyfL2XBoRnsYmgKKqpbPCfH+pKmIT+/hGXzZ7R4yh1WuS90YVioRug67HnUsQrYYK5+J4Yj7w3iqPUabHZM3r8/SOuRXUg3u06CitcqvJwQqCFF4wbBuhmQiO3L5Ry+0JpEgHmUg4tjPJwQhRWuFSg44ldYVwowX95osS+Pn14W53bJh/dAkUiFAHiBf33liBNCaZAbHAy6Ls2P/fv48p3GgvGVMuBMevvH6tvllkjIqI+gLxsXpzlBEqMBzwMRsTwpCxoODA2IYBMIO9oi/pTrp1PEFhf9mUkMMfZby/q3cCMAKwxEdZXfCnSgJD4/3K61gL+GwAUP0sadjombQAAAABJRU5ErkJggg==";
    public static html_clipboardToolbar : string = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button cut\" title=\"Cut (Ctrl + X)\"></div><div \r\n\t\tclass=\"ui-button copy\" title=\"Copy (Ctrl + C)\"></div><div \r\n\t\tclass=\"ui-button paste\" title=\"Paste (Ctrl + V)\"></div>\r\n</div>";
    public static gif_cursorCellSelect : string = "data:image/gif;base64,R0lGODlhFAAUAKECAAAAAP7+/v///////yH5BAEKAAIALAAAAAAUABQAAAJElI8AyG0QlpswTlftTaHrLWSdtIkjaJ5XqmLe2zLKDH/r6JF3VOmuBpkJFYfegxhKPFoLic7JHA5DsafSWFRmQz7psAAAOw==";
    public static gif_cursorColSelect : string = "data:image/gif;base64,R0lGODlhDAASAKEAAP///wAAAP///////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAIALAAAAAAMABIAAAImlBUZxwiwmgkvSgrlrNpljVlN2JEgd34XOimh6z2yis1irDImeBcAOw==";
    public static gif_cursorRowSelect : string = "data:image/gif;base64,R0lGODlhEgAMAKEAAP///wAAAP///////yH5BAEKAAIALAAAAAASAAwAAAIllI8WyRzbYgAwpknV23yDv2DfSJZPiZrdeoIWglWvMMnzM19JAQA7";
    public static html_editLink : string = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\t\t<legend>Hyperlink</legend>\r\n\r\n\t\t<label>\r\n\t\t\t<span>Link:</span>\r\n\t\t\t<input type=\"text\" class=\"i-link focus-first\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Open In:</span>\r\n\t\t\t<select class=\"s-target\">\r\n\t\t\t\t<option value=\"\">Current Window</option>\r\n\t\t\t\t<option value=\"_blank\">New Window</option>\r\n\t\t\t</select>\r\n\t\t</label>\r\n\t</fieldset>\r\n\r\n</div>";
    public static html_fileBrowser : string = "<div class=\"htmleditor-fs\">\r\n\r\n\t<div class=\"toolbar\">\r\n\t\t<div class=\"location\">\r\n\t\t\t<label>\r\n\t\t\t\t<span class=\"label\">Location:</span>\r\n\t\t\t\t<input type=\"text\" class=\"fs-location focus-first\" />\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t<div class=\"buttons\">\r\n\t\t\t<div class=\"button up\" title=\"Up\"></div><div\r\n\t\t\t\t class=\"button refresh\" title=\"Refresh\"></div><div \r\n\t\t\t\t class=\"button asc\" title=\"Sort Ascending\"></div><div \r\n\t\t\t\t class=\"button desc\" title=\"Sort Descending\"></div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"files\">\r\n\t</div>\r\n\r\n</div>";
    public static html_formattingToolbar : string = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button remove-formatting\" title=\"Clear Formatting\"></div>\r\n</div><div class=\"item index-2\">\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"nodeName\" type=\"text\" data-suggestions=\"normal:Normal,h1:Heading 1,h2:Heading 2,h3:Heading 3,h4:Heading 4,h5:Heading 5\" placeholder=\"Style\" value=\"\" >\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"fontFamily\" type=\"text\" data-suggestions value=\"\" placeholder=\"Font\" />\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"fontSize\" type=\"text\" data-suggestions=\"8,9,10,12,14,16,18,20,22,24,26,28,30,32\" value=\"\" placeholder=\"Size\" />\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n</div><div class=\"item index-5\">\r\n\t<div class=\"ui-button bold state\" title=\"Bold (Ctrl+B)\"></div><div\r\n\t\t class=\"ui-button italic\" title=\"Italic (Ctrl+I)\"></div><div\r\n\t\t class=\"ui-button underline\" title=\"Underline (Ctrl+U)\"></div><div\r\n\t\t class=\"ui-button strike\" title=\"Strike\"></div>\r\n</div><div class=\"item index-6\">\r\n\t<div class=\"ui-button subscript\"   title=\"Subscript\"></div><div\r\n\t\t class=\"ui-button superscript\" title=\"Superscript\"></div>\r\n</div><div class=\"item index-7\">\r\n\t<div class=\"ui-button left\" title=\"Left (Ctrl+L)\"></div><div\r\n\t\t class=\"ui-button center\" title=\"Center (Ctrl+E)\"></div><div\r\n\t\t class=\"ui-button right\" title=\"Right (Ctrl+R)\"></div><div\r\n\t\t class=\"ui-button justified\" title=\"Justified (Ctrl+J)\"></div>\r\n</div><div class=\"item index-8\">\r\n\t<div class=\"ui-button ol\" title=\"Ordered List\"></div><div\r\n\t\t class=\"ui-button ul\" title=\"Bulleted List\"></div><div\r\n\t\t class=\"ui-button increase\" title=\"Increase Indent (Tab)\"></div><div\r\n\t\t class=\"ui-button decrease\" title=\"Decrease Indent (Shift + Tab)\"></div>\r\n</div><div class=\"item index-9\">\r\n\t<div\r\n\t\t class=\"ui-button ui-color-button color\" title=\"Color\"></div>\r\n</div>\r\n";
    public static html_insertLink : string = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\t\t<legend>Hyperlink</legend>\r\n\r\n\t\t<label>\r\n\t\t\t<span>Text:</span>\r\n\t\t\t<input type=\"text\" class=\"i-text\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Link:</span>\r\n\t\t\t<input type=\"text\" class=\"i-link focus-first\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Open In:</span>\r\n\t\t\t<select class=\"s-target\">\r\n\t\t\t\t<option value=\"\">Current Window</option>\r\n\t\t\t\t<option value=\"_blank\">New Window</option>\r\n\t\t\t</select>\r\n\t\t</label>\r\n\t</fieldset>\r\n\r\n</div>";
    public static html_insertPicture : string = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\r\n\t\t<legend>Source</legend>\r\n\r\n\t\t<label class=\"two-lines\">Specify a picture source, or browse for a picture:</label>\r\n\r\n\t\t<div class=\"horizontal-flex one-kid\">\r\n\t\t\t<div class=\"cell\">\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Source:</span> \r\n\t\t\t\t\t<input type=\"text\" class=\"txt-src focus-first\" />\r\n\t\t\t\t\t<button class=\"browse\">...</button>\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</fieldset>\r\n\t<fieldset>\r\n\t\t\r\n\t\t<legend>Settings</legend>\r\n\r\n\r\n\t\t<div class=\"horizontal-flex two-kids\">\r\n\r\n\t\t\t<div class=\"cell\">\r\n\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Width:</span>\r\n\t\t\t\t\t<input type=\"number\" class=\"int-width\" disabled style=\"max-width: 50px\" />\r\n\t\t\t\t</label>\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Height:</span>\r\n\t\t\t\t\t<input type=\"number\" class=\"int-height\" disabled style=\"max-width: 50px\" />\r\n\t\t\t\t</label>\r\n\t\t\t\t<label class=\"checkbox\">\r\n\t\t\t\t\t<span>Maintain propoportions:</span>\r\n\t\t\t\t\t<input type=\"checkbox\" class=\"bool-proportions\" disabled />\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"cell\" style=\"text-align: right\">\r\n\t\t\t\r\n\t\t\t\t<img class=\"img-preview\" style=\"display: inline-block; margin: 10px 0px 10px 10px; max-width: 150px; max-height: 150px\" src=\"{img_insertPicture}\" />\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class=\"horizontal-flex one-kid\">\r\n\r\n\t\t\t<div class=\"cell\">\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Alternate text:</span>\r\n\t\t\t\t\t<input type=\"text\" class=\"txt-alt\" />\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\r\n\t</fieldset>\r\n\r\n</div>";
    public static img_insertPicture : string = "data:image/png;base64,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";
    public static html_multimediaToolbar : string = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button link\" title=\"Link\"></div><div\r\n\tclass=\"ui-button picture\" title=\"Picture\"></div><div\r\n\tclass=\"ui-button video\" title=\"Video\"></div>\r\n</div>";
    public static html_tableToolbar : string = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button table\" title=\"Insert Table\"></div><div \r\n\t\tclass=\"ui-button ui-color-button borderColor\" title=\"Border Color\"></div><div \r\n\t\tclass=\"ui-button ui-color-button backgroundColor\" title=\"Background Color\"></div>\r\n</div>\r\n<div class=\"item index-2\">\r\n\t<div\r\n\t\t class=\"ui-button table-merge-cells\" title=\"Merge Cells\"></div><div\r\n\t\t class=\"ui-button table-split-cells\" title=\"Split Cells\"></div>\r\n</div>\r\n<div class=\"item index-3\">\r\n\t<div class=\"ui-button table-insert-r-before\" title=\"Insert Row Before\"></div><div\r\n\t\t class=\"ui-button table-insert-r-after\" title=\"Insert Row After\"></div><div\r\n\t\t class=\"ui-button table-delete-r\" title=\"Delete Row\"></div><div \r\n\t\t class=\"ui-button table-insert-c-before\" title=\"Insert Column Before\"></div><div \r\n\t\t class=\"ui-button table-insert-c-after\" title=\"Insert Column After\"></div><div \r\n\t\t class=\"ui-button table-delete-c\" title=\"Delete Column\"></div>\r\n</div>";

    public static _init_( ) {
        var props = ["html_alert","png_alertIcon","html_clipboardToolbar","gif_cursorCellSelect","gif_cursorColSelect","gif_cursorRowSelect","html_editLink","html_fileBrowser","html_formattingToolbar","html_insertLink","html_insertPicture","img_insertPicture","html_multimediaToolbar","html_tableToolbar"];
        for ( var i=0, len = props.length; i<len; i++ ) {
            if ( /^html_/.test( props[i] ) ) {
                UI_Resources._patch_( props[i] );
            }
        }
    }
    public static _patch_( propertyName ) {
        var s: string = UI_Resources[propertyName],
            matches;
        while ( matches = /(\{([a-zA-Z\d\_]+)\})/.exec( s ) ) {
            s = s.replace( matches[1], UI_Resources[matches[2]] || "" );
        }
        //console.log( "patched: ", propertyName, ", value: ", s );
        UI_Resources[ propertyName ] = s;
    }
}

UI_Resources._init_();