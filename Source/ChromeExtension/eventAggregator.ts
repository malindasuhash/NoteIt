/// <reference path="tds/google-extensions.d.ts" />

// Reference: https://developer.chrome.com/extensions/messaging
module noteIt {
    // Defines a wrapper around the chrome.runtime.onMessage/sendMessage API.
    export class EventAggregator implements Aggregator {
        public handlers: eventInfo[];
        private self: any;

        constructor() {
            this.handlers = [];
        }

        // Registers the event and its callback locally.
        register(eventName: string, callback: (args: messageContext) => void) {
            var callbackHandler =  (args: messageContext) => {
                for (var handler in this.handlers) {
                    if (this.handlers[handler].eventName == args.address) {
                        this.handlers[handler].callback(args);
                    }
                }
            }

            chrome.runtime.onMessage.addListener(callbackHandler);
            chrome.runtime.onMessage.addListener(callbackHandler);
            this.handlers.push(new EventInfo(eventName, callback));
            this.self = this;
        }

        // Publish an event by calling chrome.runtime.sendMessage.
        publish(context: messageContext) {
            chrome.runtime.sendMessage(context);
        }
    }

    export class EventInfo implements eventInfo {
        constructor(public eventName: string, public callback: (args: messageContext) => void) { }
    }
}