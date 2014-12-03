/// <reference path="tds/google-extensions.d.ts" />
var noteIt;
(function (noteIt) {
    var MessageSender = (function () {
        function MessageSender() {
        }
        // Sends the given message to the store
        MessageSender.prototype.send = function (message) {
            var c = 'Saved ' + message.pageUrl;
            console.log(c);
        };
        return MessageSender;
    })();
    noteIt.MessageSender = MessageSender;
})(noteIt || (noteIt = {}));
