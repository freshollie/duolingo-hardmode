/**
 * This background service is only used as a global check to see if the extension is enabled
 */

var enabled = true;

/**
 * Load the old settings
 */
chrome.storage.sync.get(
    {
        enabled: true
    }, 
    function(items) {
        enabled = items.enabled;
    }        
);


/**
 * Set up the listener service for setting and getting enabled
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getEnabled") {
        sendResponse({enabled: enabled});
        return true;

    } else if (request.msg == "setEnabled") {
        chrome.storage.sync.set({enabled: true});
        enabled = true;
        sendResponse();
        return true;
        
    } else if (request.msg == "setDisabled") {
        chrome.storage.sync.set({enabled: false});
        enabled = false;
        sendResponse();
        return true;
    }
});
