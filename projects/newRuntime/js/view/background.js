var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
        var buildingCount = 10 + Math.random() * 50;

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight, 'black');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var backdrop = draw.bitmap("img/starcraft.jpg");
            backdrop.x = 0;
            backdrop.y = 0;
            backdrop.scaleX = 1.5;
            backdrop.scaleY = 1; // interpic 2.5 goes to ground
            background.addChild(backdrop);

            let stars = (Math.random() * 200) + 100
            for (let i = 0; i < stars; i++) {
                var circle = draw.circle(Math.random() * 2, "white", "teal", Math.random() * 2);
                circle.x = canvasWidth * Math.random();
                circle.y = canvasHeight * Math.random();
                background.addChild(circle);
            }
            console.log(stars);
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < buildingCount; i++) {
                var buildingHeight = 100 + Math.random() * 300;
                var buildingWidth = 20 + Math.random() * 100;
                var building = draw.rect(buildingWidth, buildingHeight, "Gray", "Black", Math.random() * 10);
                building.x = Math.random() * canvasWidth * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tre2a0.png");
            tree.scaleY = 1.5;
            tree.scaleX = 1.2;
            tree.x = 512;
            tree.y = groundY - (128 * tree.scaleY);
            tree.speed = 0.6;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= tree.speed;
            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for (let i = 0; i < buildings.length; i++) {
                buildings[i].x -= 0.5;
                if (buildings[i].x < -400) {
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
