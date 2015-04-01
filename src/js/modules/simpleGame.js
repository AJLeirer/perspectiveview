/**
 *
 *
 * @class simpleGame
 * @param {Object} $   - jQuery
 * @param {Object} app - The main app
 */
;(function simpleGame($, app, raf) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof simpleGame
     * @type {Object}
     */
    pub  = {},


    /**
     * Stores the scope for modules.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    mod  = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores a map module.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    mod.map      = {};



    /**
     * Stores a rendering module.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    mod.renderer = {};



    /**
     * Stores the current controls of the user.
     *
     * @private
     * @memberof simpleGame
     * @type {Object}
     */
    priv.controls = {};



    /**
     * Stores the current map or map-section.
     *
     * @private
     * @memberof simpleGame
     * @type {Array}
     */
    priv.map      = [];



    /**
     * Flag for trigger the loop.
     *
     * @private
     * @memberof simpleGame
     * @type {Boolean}
     */
    priv.isRunning = false;



    /**
     * The main gameloop.
     *
     * @private
     * @memberof simpleGame
     * @return {Object} simpleGame.priv
     */
    priv.loop = function loop() {
        var position       = mod.character.getPosition(),
            width          = mod.character.getWidth(),
            height         = mod.character.getHeight(),
            speed          = mod.character.getSpeed(),
            movement       = mod.character.getMovement(),
            topPosition    = (position.y - (height / 2)),
            rightPosition  = (position.x + (width  / 2)),
            bottomPosition = (position.y + (height / 2)),
            leftPosition   = (position.x - (width  / 2)),
            gridY, gridX;


        if (priv.isRunning) {
            if (movement.moveUp) {
                topPosition -= speed;

                gridX = position.x  / 50 | position.x  / 50;
                gridY = topPosition / 50 | topPosition / 50;

                if (priv.map[gridY][gridX] > 0) {
                    //position.y += speed;
                }
                else {
                    position.y -= speed;
                }
            }
            else if (movement.moveDown) {
                bottomPosition += speed;

                gridX = position.x  / 50 | position.x  / 50;
                gridY = bottomPosition / 50 | bottomPosition / 50;

                if (priv.map[gridY][gridX] > 0) {
                    //position.y -= speed;
                }
                else {
                    position.y += speed;
                }
            }

            if (movement.moveLeft) {
                leftPosition -= speed;

                gridX = leftPosition / 50 | leftPosition / 50;
                gridY = position.y  / 50 | position.y  / 50;

                if (priv.map[gridY][gridX] > 0) {
                    //position.x -= (50 - (leftPosition % 50));

                }
                else {
                    position.x -= speed;
                }
            }
            else if (movement.moveRight) {
                rightPosition += speed;

                gridX = rightPosition / 50 | rightPosition / 50;
                gridY = position.y  / 50 | position.y  / 50;

                if (priv.map[gridY][gridX] > 0) {
                    //position.x -= speed;
                }
                else {
                    position.x += speed;
                }
            }
            mod.character.setPosition({x: position.x, y: position.y});



            mod.renderer
                .clean()
                .renderMap(priv.map)
                .renderCharacter(position.x, position.y, width, height);

            //mod.perspectiveView.setReferencePoint(position.x, position.y);
            //mod.perspectiveView.render();

            raf(priv.loop);
        }

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof simpleGame
     */
    pub.init = function init() {

    };



    /**
     *
     */
    pub.run = function run() {
        mod.character       = app.getModule('simpleCharacter');
        mod.renderer        = app.getModule('simpleRenderer');
        mod.map             = app.getModule('simpleMap');
        mod.perspectiveView = new PerspectiveView();

        mod.character.run();

        mod.renderer
            .setUnit(50, 50)
            .setCanvas($('canvas[data-scene="application"]')[0], 850, 850)
            .setContext($('canvas[data-scene="application"]')[0].getContext("2d"));

        priv.map = mod.map.getMap();


        mod.perspectiveView.setConfig({
            canvas:  $('canvas[data-scene="application"]')[0],
            context: $('canvas[data-scene="application"]')[0].getContext("2d"),
            unit: {
                width:  50,
                height: 50
            },
            depth: 0.05,
            referencePoint: {
                x: 425,
                y: 325
            },
            map: priv.map
        });

        pub.start();
    };



    /**
     * Starts the looping.
     *
     * @public
     * @memberof simpleGame
     * @return {Object} simpleGame.pub
     */
    pub.start = function start() {
        priv.isRunning = true;

        //setInterval(priv.loop, 1000);
        priv.loop();


        return this;
    };



    /**
     * Stops the looping.
     *
     * @public
     * @memberof simpleGame
     * @return {Object} simpleGame.pub
     */
    pub.stop = function stop() {
        priv.isRunning = false;

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Append



    app.appendModule({ simpleGame: pub });



})(jQuery, window.dev_perspectiveview, requestAnimFrame);
