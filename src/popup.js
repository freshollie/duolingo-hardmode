document.addEventListener('DOMContentLoaded', function() {
    // Once the popup loads

    var duolingoHiderEnabled = true;
    var disableButton = document.getElementById('disableButton');

    function refreshButton() {
        if (duolingoHiderEnabled) {
            disableButton.innerText="Disable";
        } else {
            disableButton.innerText="Enable";
        }
    }

    chrome.runtime.sendMessage({msg: "getEnabled"}, function(response) {
        try {
            duolingoHiderEnabled = response.enabled;
        } catch (e) {
            return;
        }
        refreshButton();
    });

    disableButton.addEventListener('click', function() {
        var request = "";
        if (duolingoHiderEnabled) {
            duolingoHiderEnabled = false;
            request = "setDisabled";
        } else {
            duolingoHiderEnabled = true;
            request = "setEnabled";
        }
        refreshButton();

        chrome.runtime.sendMessage({msg: request}, function(response) {});
    });
}, false);