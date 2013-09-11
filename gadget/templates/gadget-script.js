/**
 * Project: <%= _.camelize(name) %>
 * <%= (new Date).toISOString().split('T')[0] %>
 */

<% if (jquery) { %>
jQuery(document).ready(function() {

    var $closeButton;

    function initialize() {
        $closeButton = jQuery('#closeButton');
        $closeButton.on('click', closeWindow);
    }

    function closeWindow() {
        CloseFloatingWindow();
    }

    initialize();
});
<% } else { %>
window.onload = function() {

    var closeButton;

    function closeWindow() {
        CloseFloatingWindow(); //closes gadget window
    }

    function initialize() {
        closeButton = document.getElementById('closeButton');
        closeButton.onclick = closeWindow;
    }

    initialize();
};
<% } %>


