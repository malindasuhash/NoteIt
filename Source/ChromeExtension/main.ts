/// <reference path="tds/google-extensions.d.ts" />

declare var chrome: chrome;

module noteIt {
    class MenuBuilder {
        build() {
            chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
        }
    }

    var builder = new MenuBuilder();
    builder.build();
}