/// <reference path="tds/google-extensions.d.ts" />

module noteIt {
    class MenuBuilder {
        build() {
            var menuRef = chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
            chrome.contextMenus.onClicked.addListener(this.callback);
        }
        private callback(info: infoContext, tab: any) {
            var selectedText = info.selectionText;
            var optionalSubject: string = selectedText.length > 30 ?
                selectedText.substr(0, 30) + '...' :
                selectedText;

            var response = prompt('Subject for "' + info.selectionText + '" ?', optionalSubject);
            console.log(response);
        }
    }

    var builder = new MenuBuilder();
    builder.build();
}