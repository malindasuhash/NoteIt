/// <reference path="tds/google-extensions.d.ts" />

module noteIt {
    class MenuBuilder {
        build() {
            var menuRef = chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
            chrome.contextMenus.onClicked.addListener(this.callback);
        }
        private callback(info: any, tab: any) {
            var result = prompt('Subject for "' + info.selectionText + '" ?');
            console.log(result);
        }
    }

    var builder = new MenuBuilder();
    builder.build();
}