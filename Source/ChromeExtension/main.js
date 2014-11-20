/// <reference path="tds/google-extensions.d.ts" />
var noteIt;
(function (noteIt) {
    // Responsible for building, and handling the callback of the selection.
    var MenuBuilder = (function () {
        function MenuBuilder() {
        }
        MenuBuilder.prototype.build = function () {
            var menuRef = chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
            chrome.contextMenus.onClicked.addListener(this.callback);
        };

        // Callback when the menu item is clicked.
        MenuBuilder.prototype.callback = function (info, tab) {
            var selectedText = info.selectionText;
            var optionalSubject = selectedText.length > 30 ? selectedText.substr(0, 30) + '...' : selectedText;

            var response = prompt('Subject for "' + info.selectionText + '" ?', optionalSubject);

            // When the response is null, this means the person clicked "cancel" or used
            // the "X" in the dialog.
            // In this case we do not need to store the content.
            if (response != null) {
                // publish a message to store
                chrome.runtime.sendMessage({ address: "msg/store", content: selectedText });
            }
        };
        return MenuBuilder;
    })();

    // Registers the callback from the menu.
    var MessageHandler = (function () {
        function MessageHandler() {
        }
        MessageHandler.prototype.register = function () {
            chrome.runtime.onMessage.addListener(function (r) {
                console.log('received ' + r.address + ' ' + r.content);
            });
        };
        return MessageHandler;
    })();

    // Register message handler
    var handler = new MessageHandler();
    handler.register();

    var builder = new MenuBuilder();
    builder.build();
})(noteIt || (noteIt = {}));
