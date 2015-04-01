/**
 * Main initial management class of the development application.
 *
 * @class app
 * @param {Object} doc - Global HTML document
 * @param {Object} win - Global window object
 */
;(function app(doc, win) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof app
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof app
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores a list of appended modules.
     *
     * @private
     * @memberof app
     * @type {Array}
     */
    priv.modules = [];




    /**
     * Initializes all priv.modules that are appended.
     *
     * @private
     * @memberof app
     * @return {Object} app.priv
     */
    priv.initModules = function initModules() {
        var id, module;

        for (id in priv.modules) {
            module = priv.modules[id];
            if (module.init() && {}.toString.call(module.init()) === '[object Function]') {
                module.init();
            }
        }

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof app
     */
    pub.init = function init() {
        priv.initModules();

        pub.run();
    };



    /**
     * Starts the complete application.
     *
     * @public
     * @memberof app
     * @return {Object} app.pub
     */
    pub.run = function run() {
        var game = pub.getModule('simpleGame');
        game.run();

        return this;
    };



    /**
     * Provides an interface for priv.modules to append them.
     *
     * @public
     * @memberof app
     * @param  {Object} module - Complete module object, that should be appended
     * @return {Object} app.pub
     */
    pub.appendModule = function appendModule(module) {
        var id;

        for (id in module) {
            if (priv.modules.hasOwnProperty(id)) {
                console.error('There already exists an module named \'' + id + '\'');
            }
            else {
                priv.modules[id] = module[id];
            }
        }

        return this;
    };



    /**
     * Returns a requested module.
     *
     * @public
     * @memberof app
     * @param  {String} moduleName - Name of the requested module
     * @return {Object}
     */
    pub.getModule = function getModule(moduleName) {
        var id;

        for (id in priv.modules) {
            if (id === moduleName) {
                return priv.modules[id];
            }
        }

        return {};
    };



    // ------------------------------------------------------------------------------------------------ Append



    win.dev_perspectiveview =  pub;



})(document, window);



// ------------------------------------------------------------------------------------------------------ DOCUMENT READY



jQuery(document).ready(function() {
    'use strict';

    window.dev_perspectiveview.init();
});
