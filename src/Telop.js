/*
 *  Telop.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//メッセージテロップ表示
tm.define("shotgun.Telop", {
    superClass: tm.app.Object2D,

    init: function(text, size, dispWait) {
        this.superInit();

        text = text || "test message";
        size = size || 30;
        dispWait = dispWait || 1000;
        this.finish = false;

        this.bg = tm.display.RectangleShape({width:SC_W, height:60, fillStyle:"rgba(0,0,0,0.5)", strokeStyle:"rgba(0,0,0,0.5)"})
            .addChildTo(this)
            .setAlpha(0);

        this.textLabel = tm.display.OutlineLabel(text, 30)
            .addChildTo(this)
            .setPosition(SC_W, 0);

        this.textLabel.tweener.clear()
            .move(0, 0, 250, "easeInOutSine")
            .wait(dispWait)
            .move(-SC_W, 0, 250, "easeInOutSine");

        this.bg.tweener.clear()
            .fadeIn(100)
            .wait(dispWait+1000)
            .fadeOut(100)
            .call(function(){
                this.finish = true;
                this.remove();
            }.bind(this));
    },
});
