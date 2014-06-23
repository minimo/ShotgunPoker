/*
 *  GameoverScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.GameoverScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);

        var lb = this.title1 = tm.display.OutlineLabel("SCORE: "+app.lastScore, 50).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.4);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);
    },

    update: function() {
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
        var x = e.x;
        var y = e.y;
        app.replaceScene(shotgun.TitleScene());
    },

});
