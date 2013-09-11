/**
 * Project: <%= _.camelize(name) %>
 * <%= (new Date).toISOString().split('T')[0] %>
 */
<% if (jquery) { %>
jQuery(document).ready(function() {

    /**
     * @method navigateInNewTab
     * This function is used to open a new tab and navigate it to
     * @param url
     *
     * http://wiki.conduit.com/display/conduitapis/NavigateInNewTab
     */
    function navigateInNewTab(url) {
        if ((typeof url === 'string')) {
            NavigateInNewTab(url);
        }
        else {
            throw 'navigateInNewTab invalid param. url must be a string';
        }
    }

    /**
     * @method navigateInCurrentPage
     * This function is used to navigate the current active tab in the browser to the provided url
     * @param url
     *
     * http://wiki.conduit.com/display/conduitapis/NavigateInMainFrame
     */
    function navigateInCurrentPage(url) {
        if ((typeof url === 'string')) {
            NavigateInMainFrame(url);
        }
        else {
            throw 'navigateInCurrentPage invalid param. url must be a string';
        }
    }

    /**
     * @method getInfo
     * Useful Parameters:
     *      info.general.toolbarName
     *      info.appId
     *      info.general.browser
     *      info.general.browserVersion
     *
     * @returns {Object}
     *
     * http://wiki.conduit.com/display/conduitapis/GetInfo
     */
    function getInfo() {
        return GetInfo();
    }

    /**
     * @method getCTID
     * Return the current toolbars unique CTID
     * @returns {string}
     */
    function getCTID() {
        return GetToolbarId();
    }

    /**
     * @method getKey
     * @param key
     * @returns {string} or empty string if key does not exist
     *
     * http://wiki.conduit.com/display/conduitapis/RetrieveGlobalKey
     */
    function getKey(key) {
        if ((typeof key === 'string')) {
            return RetrieveGlobalKey(key) || '';
        }
        else {
            throw 'getKey invalid param. key must be a string';
        }
    }

    /**
     * @method storeKey
     * @param key {string}
     * @param value {string}
     *
     * http://wiki.conduit.com/display/conduitapis/StoreGlobalKey
     */
    function storeKey(key, value) {
        if ((typeof key === 'string') && (typeof value === 'string')) {
            StoreGlobalKey(key, value);
        }
        else {
            throw 'storeKey invalid params. key and value must be a string';
        }
    }

    /**
     * @method deleteKey
     * @param key {string}
     *
     * http://wiki.conduit.com/display/conduitapis/DeleteGlobalKey
     */
    function deleteKey(key) {
        if ((typeof key === 'string')) {
            DeleteGlobalKey(key);
        }
        else {
            throw 'deleteKey invalid param. key must be a string';
        }
    }

    function initialize() {
        /**
         * @method EBDocumentComplete
         * Used to handle the current pages document.onload event
         * @param tabid {int}
         *
         * http://wiki.conduit.com/display/conduitapis/EBDocumentComplete
         */
        window.EBDocumentComplete = function(tabid) {
            //the page has loaded!
        };

        /**
         * @method EBGlobalKeyChanged
         * This event is called whenever a global key changes via StoreGlobalKey()
         * @param key {string}
         * @param value {string}
         *
         * http://wiki.conduit.com/display/conduitapis/EBGlobalKeyChanged
         */
        window.EBGlobalKeyChanged = function(key, value) {
            //a key has changed
        };
    }

    initialize();
});
<% } else { %>
window.onload = function() {

    /**
     * @method navigateInNewTab
     * This function is used to open a new tab and navigate it to
     * @param url
     *
     * http://wiki.conduit.com/display/conduitapis/NavigateInNewTab
     */
    function navigateInNewTab(url) {
        if ((typeof url === 'string')) {
            NavigateInNewTab(url);
        }
        else {
            throw 'navigateInNewTab invalid param. url must be a string';
        }
    }

    /**
     * @method navigateInCurrentPage
     * This function is used to navigate the current active tab in the browser to the provided url
     * @param url
     *
     * http://wiki.conduit.com/display/conduitapis/NavigateInMainFrame
     */
    function navigateInCurrentPage(url) {
        if ((typeof url === 'string')) {
            NavigateInMainFrame(url);
        }
        else {
            throw 'navigateInCurrentPage invalid param. url must be a string';
        }
    }

    /**
     * @method getInfo
     * Useful Parameters:
     *      info.general.toolbarName
     *      info.appId
     *      info.general.browser
     *      info.general.browserVersion
     *
     * @returns {Object}
     *
     * http://wiki.conduit.com/display/conduitapis/GetInfo
     */
    function getInfo() {
        return GetInfo();
    }

    /**
     * @method getCTID
     * Return the current toolbars unique CTID
     * @returns {string}
     */
    function getCTID() {
        return GetToolbarId();
    }

    /**
     * @method getKey
     * @param key
     * @returns {string} or empty string if key does not exist
     *
     * http://wiki.conduit.com/display/conduitapis/RetrieveGlobalKey
     */
    function getKey(key) {
        if ((typeof key === 'string')) {
            return RetrieveGlobalKey(key) || '';
        }
        else {
            throw 'getKey invalid param. key must be a string';
        }
    }

    /**
     * @method storeKey
     * @param key {string}
     * @param value {string}
     *
     * http://wiki.conduit.com/display/conduitapis/StoreGlobalKey
     */
    function storeKey(key, value) {
        if ((typeof key === 'string') && (typeof value === 'string')) {
            StoreGlobalKey(key, value);
        }
        else {
            throw 'storeKey invalid params. key and value must be a string';
        }
    }

    /**
     * @method deleteKey
     * @param key {string}
     *
     * http://wiki.conduit.com/display/conduitapis/DeleteGlobalKey
     */
    function deleteKey(key) {
        if ((typeof key === 'string')) {
            DeleteGlobalKey(key);
        }
        else {
            throw 'deleteKey invalid param. key must be a string';
        }
    }

    function initialize() {
        /**
         * @method EBDocumentComplete
         * Used to handle the current pages document.onload event
         * @param tabid {int}
         *
         * http://wiki.conduit.com/display/conduitapis/EBDocumentComplete
         */
        window.EBDocumentComplete = function(tabid) {
            //the page has loaded!
        };

        /**
         * @method EBGlobalKeyChanged
         * This event is called whenever a global key changes via StoreGlobalKey()
         * @param key {string}
         * @param value {string}
         *
         * http://wiki.conduit.com/display/conduitapis/EBGlobalKeyChanged
         */
        window.EBGlobalKeyChanged = function(key, value) {
            //a key has changed
        };
    }

    initialize();
};
<% } %>



