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
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);
        
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        var lb = this.credit1 = tm.display.OutlineLabel("CREDIT", 40).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        var lb = this.credit1 = tm.display.OutlineLabel("ＢＧＭ：魔王魂様", 30).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.15);
        var lb = this.credit1url = tm.display.OutlineLabel("http://maoudamashii.jokersounds.com/", 20).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.15+45);

        var lb = this.credit2 = tm.display.OutlineLabel("効果音：ＯＮ－ＪＩＮ様", 30).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.25);
        var lb = this.credit1url = tm.display.OutlineLabel("http://on-jin.com/", 20).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.25+45);

        var lb = this.credit3 = tm.display.OutlineLabel("CARD GRAPHIC：無料素材倶楽部様", 30).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.35);
        var lb = this.credit1url = tm.display.OutlineLabel("http://sozai.7gates.net/", 20).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.35+45);

        var lb = this.credit4 = tm.display.OutlineLabel("Powered by tmlib.js", 30).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.5);
        var lb = this.credit3url = tm.display.OutlineLabel("http://phi-jp.github.io/tmlib.js/", 20).addChildTo(this.titleLayer);
        lb.setParam(this.labelParam);
        lb.setPosition(SC_W*0.5, SC_H*0.5+45);

        //tmlibロゴ
        var sp = tm.display.Sprite("tmliblogo").addChildTo(this);
        sp.setPosition(SC_W*0.5, SC_H*0.7);
        sp.setScale(0.5, 0.5);

        //ステータスバー
        var sh = tm.display.RectangleShape(SC_W, STATUSBAR_HEIGHT, {strokeStyle: STATUSBAR_COLOR,fillStyle: STATUSBAR_COLOR}).addChildTo(this);
        sh.originX = sh.originY = 0;

        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
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


