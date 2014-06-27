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

        var lb = this.credit1 = tm.display.OutlineLabel("CREDIT", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        var lb = this.credit1 = tm.display.OutlineLabel("ＢＧＭ：魔王魂", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);
        var lb = this.credit1url = tm.display.OutlineLabel("http://maoudamashii.jokersounds.com/", 30).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2+45);

        var lb = this.credit2 = tm.display.OutlineLabel("効果音：ＯＮ－ＪＩＮ", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "cnter"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.3);
        var lb = this.credit1url = tm.display.OutlineLabel("http://on-jin.com/", 30).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.3+45);

        var lb = this.credit2 = tm.display.OutlineLabel("CARD GRAPHIC：", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "cnter"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.4);
        var lb = this.credit1url = tm.display.OutlineLabel("http://on-jin.com/", 30).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.4+45);

        var lb = this.credit2 = tm.display.OutlineLabel("Programmer：minimo", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "cnter"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.5);

        var lb = credit3 = tm.display.OutlineLabel("Powerd by tmlib.js", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.6);
        var lb = this.credit3url = tm.display.OutlineLabel("http://phi-jp.github.io/tmlib.js/", 30).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.6+45);

        //tmlibロゴ
        var sp = tm.display.Sprite("tmliblogo").addChildTo(this);
        sp.setPosition(SC_W*0.5, SC_H*0.8);
        sp.setScale(0.5, 0.5);

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


