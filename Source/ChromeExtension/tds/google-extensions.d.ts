// Type defintions for chrome.contextMenus namespace.

interface chrome {
    contextMenus: creator;
}

interface creator {
    create(data: { id: string; title: string; contexts: string[] }): void;
}