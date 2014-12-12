/*
 *  CreditScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.CreditScene", {
    superClass: tm.app.Scene,

    //クレジットラベル用パラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        var sizeCredit = 30;
        var sizeURL = 25;

        //バックグラウンド
        this.bg = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor});
        
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        this.credit0 = tm.display.OutlineLabel("CREDIT", 40)
            .addChildTo(this.titleLayer)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.1);

        this.credit1 = tm.display.OutlineLabel("ＢＧＭ：魔王魂様", sizeCredit)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.15);
        this.credit1url = tm.display.OutlineLabel("http://maoudamashii.jokersounds.com/", sizeURL)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.15+45);

        this.credit2 = tm.display.OutlineLabel("効果音：ＯＮ－ＪＩＮ様", sizeCredit)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.25);
        this.credit1url = tm.display.OutlineLabel("http://on-jin.com/", sizeURL)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.25+45);

        this.credit3 = tm.display.OutlineLabel("CARD GRAPHIC：無料素材倶楽部様", sizeCredit)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.35);
        this.credit1url = tm.display.OutlineLabel("http://sozai.7gates.net/", sizeURL)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.35+45);

        this.credit4 = tm.display.OutlineLabel("Powered by tmlib.js", sizeCredit)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.credit3url = tm.display.OutlineLabel("http://phi-jp.github.io/tmlib.js/", sizeURL)
            .addChildTo(this.titleLayer)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.5+45);

        //tmlibロゴ
        tm.display.Sprite("tmliblogo")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.7)
            .setScale(0.5, 0.5);

        //目隠し
        this.mask = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"});
        this.mask.tweener.clear().fadeOut(200);
        
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
        this.mask.tweener.clear().fadeOut(200);
        appMain.popScene();
    },

});


