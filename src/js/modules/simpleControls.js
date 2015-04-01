/**
 * Provides a simple user control module via keyboard.
 *
 * @class simpleControls
 * @param {Object} app - The main app
 */
;(function controls(app) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof simpleControls
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof simpleControls
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores the currently active controls.
     *
     * @private
     * @memberof simpleControls
     * @type     {Object}
     * @property {Boolean} moveUp    - Flag for handling the moving up event
     * @property {Boolean} moveRight - Flag for handling the moving right event
     * @property {Boolean} moveDown  - Flag for handling the moving down event
     * @property {Boolean} moveLeft  - Flag for handling the moving left event
     */
    priv.controls = {
        moveUp:    false,
        moveRight: false,
        moveDown:  false,
        moveLeft:  false
    };



    priv.scope = 'body';



    /**
     * Adds simple controlling events.
     *
     * @private
     * @memberof simpleControls
     * @return {Object} simpleControls.pub
     */
    priv.addSimpleKeyboardEvents = function addSimpleKeyboardEvents() {
        $(priv.scope).bind("keydown", function(e) {
            if (e.keyCode === 38 || e.keyCode === 87) { // VK_UP || W
                priv.controls.moveUp = true;
            }
            else if (e.keyCode === 39 || e.keyCode === 68) { // VK_RIGHT || D
                priv.controls.moveRight = true;
            }
            else if (e.keyCode === 40 || e.keyCode === 83) { // VK_DOWN || S
                priv.controls.moveDown = true;
            }
            else if (e.keyCode === 37 || e.keyCode === 65) { // VK_LEFT || A
                priv.controls.moveLeft = true;
            }
        });

        $(priv.scope).bind("keyup", function(e) {
            if (e.keyCode === 38 || e.keyCode === 87) { // VK_UP || W
                priv.controls.moveUp = false;
            }
            else if (e.keyCode === 39 || e.keyCode === 68) { // VK_RIGHT || D
                priv.controls.moveRight = false;
            }
            else if (e.keyCode === 40 || e.keyCode === 83) { // VK_DOWN || S
                priv.controls.moveDown = false;
            }
            else if (e.keyCode === 37 || e.keyCode === 65) { // VK_LEFT || A
                priv.controls.moveLeft = false;
            }
        });

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof simpleControls
     */
    pub.init = function init() {
        priv.addSimpleKeyboardEvents();
    };



    /**
     * Returns the currently active controls.
     *
     * @public
     * @memberof simpleControls
     * return {Object}
     */
    pub.getControls = function getControls() {
        return priv.controls;
    };



    // ------------------------------------------------------------------------------------------------ Append



    app.appendModule({ simpleControls: pub });



})(window.dev_perspectiveview);
