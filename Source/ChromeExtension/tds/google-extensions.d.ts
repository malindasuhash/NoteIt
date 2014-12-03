// Type defintions for chrome.contextMenus namespace.

declare var chrome: chrome;

interface chrome {
    contextMenus: creator;
    runtime: messaging
}

interface creator {
    create(data: { id: string; title: string; contexts: string[] }): string;
    onClicked: addingListener;
}

interface addingListener {
    addListener(func: (info: infoContext, tabs?: any) => void): void;
}

interface infoContext {
    selectionText: string;
}

interface messaging {
    sendMessage(data: messageContext);
    onMessage: msgCallbackLister;
}

interface messageContext {
    address: string;
    content: string
}

interface messageContextAggregator {
    address: string;
    content: string;
    aggre: Aggregator;
}

interface Aggregator {
    handlers: eventInfo[]
}

interface eventInfo {
    eventName: string;
    callback: (args: messageContext) => void
}

interface msgCallbackLister {
    addListener(func: (request: messageContext) => void): void;
}