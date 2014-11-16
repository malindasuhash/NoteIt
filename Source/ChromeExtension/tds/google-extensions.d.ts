// Type defintions for chrome.contextMenus namespace.

declare var chrome: chrome;

interface chrome {
    contextMenus: creator;
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