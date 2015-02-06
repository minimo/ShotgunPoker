/*
 *  Telop.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//メッセージテロップ表示
tm.define("shotgun.Telop", {
    superClass: tm.app.Object2D,

    init: function(text, size) {
        size = size || 30;
        this.superInit();

        this.bg = tm.display.RectangleShape(SC_W, 60, {fillStyle:"rgba(0,0,0,0.5)", strokeStyle:"rgba(0,0,0,0.5)"})
            .addChildTo(this)
            .setAlpha(0);

        this.textLabel = tm.display.OutlineLabel(text, 30)
            .addChildTo(this)
            .setPosition(SC_W, 0);

        this.textLabel.tweener.clear()
            .move(0, 0, 500, "easeInOutSine")
            .wait(1000)
            .move(-SC_W, 0, 500, "easeInOutSine");

        this.bg.tweener.clear()
            .fadeIn(200)
            .wait(2000)
            .fadeOut(200)
            .call(function(){this.remove()}.bind(this));
    },
});

