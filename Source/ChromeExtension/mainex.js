// Context menu for selection

var appInfo = {
    name: 'NoteIt!',
    contextId: 'noteItId'
};

(function () {
    chrome.contextMenus.create({
        "id": appInfo.contextId,
        "title": appInfo.name,
        "contexts": ['selection']
    });
})();
