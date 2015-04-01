/**
 * Renders simple shapes to a given canvas context.
 *
 * @class simpleRenderer
 * @param {Object} app - The main app
 */
;(function simpleRenderer(app) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof simpleRenderer
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof simpleRenderer
     * @type {Object}
     */
    pub  = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores the canvas element.
     *
     * @private
     * @memberof simpleRenderer
     * @type {Object}
     */
    priv.canvas = {};



    /**
     * Stores the context of the canvas element.
     *
     * @private
     * @memberof simpleRenderer
     * @type {Object}
     */
    priv.context = {};



    /**
     * Stores the size of an unit.
     *
     * @private
     * @memberof simpleRenderer
     * @type     {Object}
     * @property {Number} width  - Width in px of an unit
     * @property {Number} height - Height in px of an unit
     */
    priv.unit = {
        width: 0,
        height: 0
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof simpleRenderer
     */
    pub.init = function init() {

    };



    /**
     *
     *
     * @public
     * @memberof simpleRenderer
     * @param  {Number} width  - Width of an unit in px
     * @param  {Number} height - Height of an unit in px
     * @return {Object} simpleRenderer.pub
     */
    pub.setUnit = function setUnit(width, height) {
        priv.unit.width  = width;
        priv.unit.height = height;

        return this;
    };



    /**
     * Sets the canvas element.
     *
     * @public
     * @memberof simpleRenderer
     * @param  {Object} canvas - DOM CanvasElement
     * @param  {Number} width  - Width of the canvas
     * @param  {Number} height - Height of the canvas
     * @return {Object} simpleRenderer.pub
     */
    pub.setCanvas = function setCanvas(canvas, width, height) {
        priv.canvas = canvas;

        priv.canvas.width  = width;
        priv.canvas.height = height;
        return this;
    };



    /**
     * Sets the context of the canvas element.
     *
     * @public
     * @memberof simpleRenderer
     * @param  {Object} context - Context of the canvas
     * @return {Object} simpleRenderer.pub
     */
    pub.setContext = function setContext(context) {
        priv.context = context;

        return this;
    };



    /**
     * Clean the complete canvas and resets it.
     *
     * @private
     * @memberof canvasHelper
     * @return {Object} simpleRenderer.pub
     */
    pub.clean = function clean() {
        priv.context.save();
        priv.context.setTransform(1, 0, 0, 1, 0, 0);
        priv.context.clearRect(0, 0, priv.canvas.width, priv.canvas.height);
        priv.context.restore();

        return this;
    };


    /**
     * Renders a simple 2d map given by a simple 2d number array.
     *
     * @public
     * @memberof simpleRenderer
     * @param  {Array} map
     * @param  {Object} optional
     * @return {Object} simpleRenderer.pub
     */
    pub.renderMap = function renderMap(map, optional) {
        var opt         = (typeof optional  === 'object')  ? optional     : {},
            unit        = (typeof opt.unit  === 'object')  ? opt.unit     : {},
            unitWidth   = (!isNaN(parseInt(unit.width)))   ? unit.width   : priv.unit.width,
            unitHeight  = (!isNaN(parseInt(unit.height)))  ? unit.height  : priv.unit.height,
            unitAmountY = map.length,
            unitAmountX = map[0].length,
            x, y;

        priv.context.save();
        for (y = 0; y < unitAmountY; y++){
            for (x = 0; x < unitAmountX; x++) {
                if (map[y][x] > 0) {
                    priv.context.fillStyle = 'rgb(50,50,50)';
                }
                else {
                    //priv.context.fillStyle = 'rgb(255,255,255)';
                    priv.context.fillStyle = 'rgba(0,0,0,0.0)';
                }
                priv.context.fillRect(
                    (x * unitWidth),
                    (y * unitHeight),
                    unitWidth,
                    unitHeight
                );
                priv.context.fill();
            }
        }
        priv.context.restore();

        return this;
    };



    /**
     * Renders a simple character.
     *
     * @public
     * @memberof simpleRenderer
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} height
     * @return {Object} simpleRenderer.pub
     */
    pub.renderCharacter = function renderCharacter(x, y, width, height) {
        priv.context.save();
            priv.context.fillStyle = '#09F';
            priv.context.fillRect(
                (x - (width  / 2)),
                (y - (height / 2)),
                width,
                height
            );
        priv.context.restore();

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Append



    app.appendModule({ simpleRenderer: pub });



})(window.dev_perspectiveview);
