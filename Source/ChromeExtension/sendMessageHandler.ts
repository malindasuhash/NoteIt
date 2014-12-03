/// <reference path="tds/google-extensions.d.ts" />

module noteIt {
    export class MessageSender {
        // Sends the given message to the store
        public send(message: messageContext) {
            var c = 'Saved ' + message.pageUrl;
            console.log(c);
        }
    }
}