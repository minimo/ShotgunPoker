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

        //スコア表示
        var lb = this.score = tm.display.OutlineLabel("SCORE: "+app.lastScore, 50).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.4);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        //リトライボタン
        var sh = this.retry = tm.display.RoundRectangleShape(200, 70).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.6);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            app.replaceScene(shotgun.MainScene());
        });
        var lb = this.retryLabel = tm.display.OutlineLabel("RETRY", 50).addChildTo(this);
        lb.setPosition(SC_W*0.25, SC_H*0.6);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        var sh = this.exit = tm.display.RoundRectangleShape(200, 70).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.6);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            app.replaceScene(shotgun.TitleScene());
        });
        var lb = this.exitLabel = tm.display.OutlineLabel("EXIT", 50).addChildTo(this);
        lb.setPosition(SC_W*0.75, SC_H*0.6);
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
    },

});