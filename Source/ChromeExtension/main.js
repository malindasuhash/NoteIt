/// <reference path="tds/google-extensions.d.ts" />
var noteIt;
(function (noteIt) {
    var MenuBuilder = (function () {
        function MenuBuilder() {
        }
        MenuBuilder.prototype.build = function () {
            var menuRef = chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
            chrome.contextMenus.onClicked.addListener(this.callback);
        };
        MenuBuilder.prototype.callback = function (info, tab) {
            console.log(info.selectionText + ' ' + tab);
        };
        return MenuBuilder;
    })();

    var builder = new MenuBuilder();
    builder.build();
})(noteIt || (noteIt = {}));
