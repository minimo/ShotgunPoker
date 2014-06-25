/*
 *  CreditScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.CreditScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);
        
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        var lb = this.credit1 = tm.display.OutlineLabel("ＢＧＭ：魔王魂", 50).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.4, SC_H*0.4);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        var lb = this.credit2 = tm.display.OutlineLabel("効果音：ＯＮ－ＪＩＮ", 50).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.4, SC_H*0.5);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        var lb = credit3 = tm.display.OutlineLabel("Powerd by tmlib.js", 50).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.4, SC_H*0.6);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;

        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(1000);
        
        this.time = 0;
    },

    update: function() {
        this.time++;
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
        this.mask.tweener.clear().fadeOut(300);
        app.popScene();
    },

});


