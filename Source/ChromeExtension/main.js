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
            var selectedText = info.selectionText;
            var optionalSubject = selectedText.length > 30 ? selectedText.substr(0, 30) + '...' : selectedText;

            var response = prompt('Subject for "' + info.selectionText + '" ?', optionalSubject);
            console.log(response);
        };
        return MenuBuilder;
    })();

    var builder = new MenuBuilder();
    builder.build();
})(noteIt || (noteIt = {}));
