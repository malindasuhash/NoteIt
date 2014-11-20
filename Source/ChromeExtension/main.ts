/// <reference path="tds/google-extensions.d.ts" />

// Full API for Google Extensions: https://developer.chrome.com/extensions/api_index
module noteIt {
    
    // Responsible for building, and handling the callback of the selection.    
    class MenuBuilder {
        build() {
            var menuRef = chrome.contextMenus.create({ id: 'noteId', title: 'NoteIt!', contexts: ['selection'] });
            chrome.contextMenus.onClicked.addListener(this.callback);
        }

        // Callback when the menu item is clicked.
        private callback(info: infoContext, tab: any) {
            var selectedText = info.selectionText;
            var optionalSubject: string = selectedText.length > 30 ?
                selectedText.substr(0, 30) + '...' :
                selectedText;

            var response = prompt('Subject for "' + info.selectionText + '" ?', optionalSubject);
            
            // When the response is null, this means the person clicked "cancel" or used
            // the "X" in the dialog.
            // In this case we do not need to store the content.
            if (response != null) {
                // publish a message to store
                chrome.runtime.sendMessage({ address: "msg/store", content: selectedText });
            }
        }
    }

    // Registers the callback from the menu.
    // Reference: https://developer.chrome.com/extensions/messaging
    class MessageHandler {
        public register() {
            chrome.runtime.onMessage.addListener((r) => { console.log('received ' + r.address + ' ' + r.content) });
        }
    }

    // Register message handler
    var handler = new MessageHandler();
    handler.register();

    // Builds and registers the menu item
    var builder = new MenuBuilder();
    builder.build();
}