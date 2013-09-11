/**
 * Project: <%= _.camelize(name) %>
 * <%= (new Date).toISOString().split('T')[0] %>
 */

<% if (jquery) { %>
jQuery(document).ready(function() {

    var $launchButton;

    function toggleGadget() {

        //get the current absolute URL path
        var currentAbsPath = (((document.URL).toString()).split('#'))[0]; // the hash is to support chrome HTML components
        var APP_PATH = currentAbsPath.substring(0, currentAbsPath.lastIndexOf('/')) + '/';

        //use the absolute path, make sure gadget and <%= _.camelize(gadgetName) %>.html are in the same folder!
        var url = APP_PATH + '<%= _.camelize(gadgetName) %>.html';
        var width = 100;
        var height = 300;
        var features = 'resizable=no, scrollbars=no, titlebar=no, savelocation=no, saveresizedsize=no, closeonexternalclick=yes, openposition=alignment:(B,R)';
        LaunchGadget(url, width, height, features);
    }

    function initialize() {
        $launchButton = jQuery('#launchGadget');
        $launchButton.on('click', toggleGadget);
    }

    initialize();
});
<% } else { %>
window.onload = function() {

    var closeButton;

    function toggleGadget() {

        //get the current absolute URL path
        var currentAbsPath = (((document.URL).toString()).split('#'))[0]; // the hash is to support chrome HTML components
        var APP_PATH = currentAbsPath.substring(0, currentAbsPath.lastIndexOf('/')) + '/';

        //use the absolute path, make sure gadget and <%= _.camelize(gadgetName) %>.html are in the same folder!
        var url = APP_PATH + '<%= _.camelize(gadgetName) %>.html';
        var width = 100;
        var height = 300;
        var features = 'resizable=no, scrollbars=no, titlebar=no, savelocation=no, saveresizedsize=no, closeonexternalclick=yes, openposition=alignment:(B,R)';
        LaunchGadget(url, width, height, features);
    }

    function initialize() {
        closeButton = document.getElementById('close');
        closeButton.onclick = toggleGadget;
    }

    initialize();
};
<% } %>




