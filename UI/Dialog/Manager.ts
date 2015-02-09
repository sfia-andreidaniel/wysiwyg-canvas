class UI_Dialog_Manager {

	static dialogs: any[] = [];

	static singleton( dialogType: string ): UI_Dialog {
		var i = 0,
		    len = UI_Dialog_Manager.dialogs.length,
		    add = {
		    	"type": null,
		    	"dialog": null
		    };

		for ( i=0; i<len; i++ ) {
			if ( UI_Dialog_Manager.dialogs[i].type == dialogType ) {
				return UI_Dialog_Manager.dialogs[i].dialog;
				break;
			} 
		}

		add.type = dialogType;

		switch ( dialogType ) {
			case 'Alert':
				add.dialog = new UI_Dialog_Alert();
				UI_Dialog_Manager.dialogs.push( add );
				return add.dialog;
				break;
			case 'InsertPicture':
				add.dialog = new UI_Dialog_InsertPicture();
				UI_Dialog_Manager.dialogs.push( add );
				return add.dialog;
				break;
			case 'InsertLink':
				add.dialog = new UI_Dialog_InsertLink();
				UI_Dialog_Manager.dialogs.push( add );
				return add.dialog;
				break;
			case 'EditLink':
				add.dialog = new UI_Dialog_EditLink();
				UI_Dialog_Manager.dialogs.push( add );
				return add.dialog;
				break;
			case 'FileBrowser':
				add.dialog = new UI_Dialog_FileBrowser();
				UI_Dialog_Manager.dialogs.push( add );
				return add.dialog;
				break;
			default:
				throw "Unknown dialog type: " + dialogType;
				break;
		}
	}

	static alert( message: string, callback: () => void = null, centerTo: any = null ) {

		var dlg = UI_Dialog_Manager.singleton( 'Alert' );

		dlg.setup( message, callback, centerTo ).open();

	}

}