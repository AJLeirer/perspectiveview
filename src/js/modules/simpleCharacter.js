/**
 * Provides a simple character for an user.
 *
 * @class simpleCharacter
 * @param {Object} app - The main app
 */
;(function simpleCharacter(app) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof simpleCharacter
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof simpleCharacter
     * @type {Object}
     */
    pub = {},



    /**
     * Stores the scope for modules.
     *
     * @private
     * @memberof simpleCharacter
     * @type {Object}
     */
    mod  = {};



    // ----------------------------------------------------------------------------------------------- Modules



    /**
     * Stores a controlling module.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    mod.controls = {};



    // ----------------------------------------------------------------------------------------------- Private



    priv.movement = {
        up:    false,
        left:  false,
        down:  false,
        right: false
    };



    priv.speed = 2;



    priv.position = {
        x: 260,
        y: 180
    };



    priv.width = 20;



    priv.height = 20;



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof simpleCharacter
     */
    pub.init = function init() {

    };



    pub.run = function run() {
        mod.controls  = app.getModule('simpleControls');
    };



    pub.getMovement = function getMovement() {
        return mod.controls.getControls();
    };



    pub.getSpeed = function getSpeed() {
        return priv.speed;
    };



    pub.getPosition = function getPosition() {
        return priv.position;
    };



    pub.getWidth = function getWidth() {
        return priv.width;
    };



    pub.getHeight = function getHeight() {
        return priv.height;
    };



    pub.setSpeed = function setSpeed(speed) {
        priv.speed = speed;
    };



    pub.setPosition = function setPosition(position) {
        priv.position = position;
    };



    pub.setWidth = function setWidth(width) {
        priv.width = width;
    };



    pub.setHeight = function setHeight(height) {
        priv.height = height;
    };



    // ------------------------------------------------------------------------------------------------ Append



    app.appendModule({ simpleCharacter: pub });



})(window.dev_perspectiveview);
