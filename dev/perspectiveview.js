/**
 * Creates an instance of PerspectiveView
 *
 * @class
 * @constructor
 */
function PerspectiveView() {
    'use strict';



    // --------------------------------------------------------------------------------------------- CONSTANTS



    /**
     * Outer scope for inner functions.
     *
     * @private
     * @alias SELF
     * @ignore
     * @memberof PerspectiveView
     * @type {PerspectiveView}
     */
    var SELF = this,



    /**
     * Toggle the development mode.
     * If DEV_MODE = true all parameters of all method will be validated and repeats logging outputs.
     *
     * @private
     * @alias DEV_MODE
     * @memberof PerspectiveView
     * @type {Boolean}
     */
    DEV_MODE = true;



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @ignore
     * @memberof PerspectiveView
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @ignore
     * @memberof PerspectiveView
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores the default values for the properties.
     *
     * @private
     * @alias defaults
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.defaults = {};



    /**
     * Stores the necessary HTML canvas element to set by user.
     *
     * @private
     * @alias canvas
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.canvas = {};



    /**
     * Stores the context of the HTML canvas element.
     * This property will be set per default as a 2d-context, when the canvas element will be set by user.
     *
     * @private
     * @alias context
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.canvas = {};



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Sets te entire configuration or just one part.
     *
     * @public
     * @function
     * @alias setConfig
     * @memberof PerspectiveView
     * @param {Object} configuration - Complete configuration object
     * @return {void}
     */
    pub.setConfig = function setConfig(configuration) {

    };



    /**
     * Sets the con
     *
     * @public
     * @function
     * @alias setCanvas
     * @memberof PerspectiveView
     * @param {Object} canvas - HTML canvas element
     * @param {Object} canvas - HTML canvas element
     * @return {void}
     *
     * @example
     *  // Create an instance of PerspectiveView
     *  var pv = newPerspectiveView();
     *
     *  // Get HTML canvas element
     *  var myCanvas = document.getElementById('myCanvas');
     *
     *  pv.setCanvas(myCanvas);
     */
    pub.setCanvas = function setCanvas(canvas) {
        if (DEV_MODE) {
            if (!SELF.isHtmlCanvasElement(canvas)) {
                console.error('Parameter <canvas> is not a valid HTML canvas element :: ', canvas);
                return;
            }
        }

        priv.canvas = canvas;

        // Set the context as 2d per default
        pub.setContext(canvas.getContext("2d"));
    };



    /**
     * Sets the HTML canvas element the map manipulations should be rendered to.
     * Automatically the context is set as 2d.
     *
     * @public
     * @function
     * @alias setContext
     * @memberof PerspectiveView
     * @param {Object} context - Context of the HTML canvas element
     * @return {void}
     *
     * @example
     *  // Create an instance of PerspectiveView
     *  var pv = newPerspectiveView();
     *
     *  // Get HTML canvas element
     *  var myCanvas = document.getElementById('myCanvas');
     *  var context  = myCanvas.getContext('2d');
     *
     *  pv.setContext(context);
     */
    pub.setContext = function setContext(context) {
        if (DEV_MODE) {
            if (!SELF.isObject(context)) {
                console.error('Parameter <context> is not a valid context of an HTML canvas element :: ', context);
                return;
            }
        }

        priv.context = context;
    };


    // ------------------------------------------------------------------------------------------------ Return



    return pub;
}
