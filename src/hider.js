$(document).ready(function() {
    // Make a global variable which can be changed by the GUI config

    // Add the CSS we need to the page
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".hoverSentence { opacity: 0;} .hoverSentence:hover{ opacity: 1;}"
    document.head.appendChild(style);

    // Default variables
    var enabled = true;
    var alreadyChecking = false;

    /**
     * Checks the page for sentences with voices and hides them
     */
    function checkForSentence() {
        // Find all prompts
        $('[data-test=challenge-translate-prompt]').each(function(index, translationPrompt) {

            // See if the sentence is voiced
            if (translationPrompt.children[0].tagName != "NOSCRIPT") {
                checkEnabled(); // Start a check for enabled

                // But go off the last value
                if (enabled){
                    if (!translationPrompt.children[1].className.endsWith("hoverSentence")) {
                        translationPrompt.children[1].className += " hoverSentence";  
                    } 
                } else {
                    // Revert to normal
                    translationPrompt.children[1].className = translationPrompt.children[1].className.split(" ")[0];
                }
            }
        });
    }

    /**
     * Asks the service if it is enabled
     */
    function checkEnabled() {
        if (!alreadyChecking) {
            // Only check if we don't have an ongoing check
            alreadyChecking = true;

            // Sometimes this had errors
            try {
                // Ask if enabled
                chrome.runtime.sendMessage({msg: "getEnabled"}, function(response) {
                    try {
                        // Set the new settings and recheck the page
                        enabled = response.enabled
                        checkForSentence();

                        // Allow us to check again
                        alreadyChecking = false;
                    } catch (e) {
                        return;
                    }
                });

                
            } catch (e) {
                alreadyCheking = false;
            }
        }
    }

    // When our document updates we need to check if there is a sentence we need to block
    $(document).bind('DOMNodeInserted DOMNodeRemoved', checkForSentence);
});