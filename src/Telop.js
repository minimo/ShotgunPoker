/*
 *  Telop.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//メッセージテロップ表示
tm.define("shotgun.Telop", {
    superClass: tm.app.Object2D,

    //テロップメッセージキュー
    queue: [],

    //終了フラグ
    finish: false,

    init: function(wait) {
        this.superInit();
        wait = wait || 1000;

        this.bg = tm.display.RectangleShape({width:SC_W, height:60, fillStyle:"rgba(0,0,0,0.5)", strokeStyle:"rgba(0,0,0,0.5)"})
            .addChildTo(this)
            .setAlpha(0);
        this.bg.tweener.clear().wait(wait).fadeIn(100);

        this.textLabel = tm.display.OutlineLabel("", 30)
            .addChildTo(this)
            .setPosition(SC_W, 0);
        this.textLabel.tweener.clear().wait(wait);
    },

    update: function() {
        if (this.finish) {
            this.finish = false;
            this.bg.tweener.clear()
                .fadeOut(100)
                .call(function(){
                    this.remove();
                }.bind(this));
        }
    },

    add: function(text, size, dispWait) {
        text = text || "test message";
        size = size || 30;
        dispWait = dispWait || 1000;
        this.queue.push({text:text, size:size, dispWait:dispWait});

        var that = this;
        this.textLabel.tweener
            .call(function() {
                this.setPosition(SC_W, 0);
                this.text = that.queue[0].text;
                this.fontSize = that.queue[0].size;
                appMain.playSE("achievement");
            }.bind(this.textLabel))
            .move(0, 0, 250, "easeInOutSine")
            .wait(dispWait)
            .move(-SC_W, 0, 250, "easeInOutSine")
            .call(function() {
                that.queue.splice(0, 1);
                if (that.queue.length == 0) that.finish = true;
            }.bind(this.textLabel));
    },
});
