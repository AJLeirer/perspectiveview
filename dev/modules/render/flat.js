/**
 * Revealing module for rendering flat maps.
 *
 * @namespace render_flat
 * @memberof PerspectiveView
 * @param {Object} window   - Global window object
 * @param {Object} document - Global document object
 * @param {Object} pv       - PerspectiveView with empty object fallback
 */
;(function render_flat(win, doc, pv) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @ignore
     * @memberof! PerspectiveView.render_flat
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @ignore
     * @memberof! PerspectiveView.validate
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private



    // ------------------------------------------------------------------------------------------------ Public



    // ------------------------------------------------------------------------------------------------ Append



    pv.appendModule({render_flat: pub});



})(window, document, window.PERSPECTIVEVIEW);
