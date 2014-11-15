/// <reference path="tds/google-extensions.d.ts" />

var noteIt;
(function (noteIt) {
    var MenuBuilder = (function () {
        function MenuBuilder() {
        }
        MenuBuilder.prototype.build = function () {
            chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
        };
        return MenuBuilder;
    })();

    var builder = new MenuBuilder();
    builder.build();
})(noteIt || (noteIt = {}));
