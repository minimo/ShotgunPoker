/*
 *  SettingScene.js
 *  2014/06/25
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.SettingScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        var lb = this.credit1 = tm.display.OutlineLabel("SETTING", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);

        //ＢＧＭ音量
        var lb = this.credit1 = tm.display.OutlineLabel("BGM", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.25, SC_H*0.4);

        //ＳＥ音量
        var lb = this.credit1 = tm.display.OutlineLabel("SE", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.25, SC_H*0.6);

        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(100);

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


