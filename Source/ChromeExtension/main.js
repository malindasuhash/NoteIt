/// <reference path="sendmessagehandler.ts" />
/// <reference path="tds/google-extensions.d.ts" />
/// <reference path="eventaggregator.ts" />
// Full API for Google Extensions: https://developer.chrome.com/extensions/api_index
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

            // When the response is null, this means I clicked "cancel" or used
            // the "X" in the dialog.
            // In this case we do not need to store the content.
            if (response != null) {
                // publish a message to store
                eventing.publish({ address: "msg.new", content: selectedText });
            }
        };
        return MenuBuilder;
    })();

    var eventing = new noteIt.EventAggregator();
    var messageSender = new noteIt.MessageSender();
    eventing.register('msg.new', messageSender.send);

    // Builds and registers the menu item
    var builder = new MenuBuilder();
    builder.build();
})(noteIt || (noteIt = {}));
