/// <reference path="tds/google-extensions.d.ts" />
// Reference: https://developer.chrome.com/extensions/messaging
var noteIt;
(function (noteIt) {
    // Defines a wrapper around the chrome.runtime.onMessage/sendMessage API.
    var EventAggregator = (function () {
        function EventAggregator() {
            this.handlers = [];
        }
        // Registers the event and its callback locally.
        EventAggregator.prototype.register = function (eventName, callback) {
            var _this = this;
            var callbackHandler = function (args) {
                for (var handler in _this.handlers) {
                    if (_this.handlers[handler].eventName == args.address) {
                        _this.handlers[handler].callback(args);
                    }
                }
            };

            chrome.runtime.onMessage.addListener(callbackHandler);
            chrome.runtime.onMessage.addListener(callbackHandler);
            this.handlers.push(new EventInfo(eventName, callback));
            this.self = this;
        };

        // Publish an event by calling chrome.runtime.sendMessage.
        EventAggregator.prototype.publish = function (context) {
            chrome.runtime.sendMessage(context);
        };
        return EventAggregator;
    })();
    noteIt.EventAggregator = EventAggregator;

    var EventInfo = (function () {
        function EventInfo(eventName, callback) {
            this.eventName = eventName;
            this.callback = callback;
        }
        return EventInfo;
    })();
    noteIt.EventInfo = EventInfo;
})(noteIt || (noteIt = {}));
