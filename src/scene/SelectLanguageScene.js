/*
 *  SelectLanguageScene.js
 *  2015/02/17
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.SelectLanguageScene", {
    superClass: tm.app.Scene,

    //ラベル用フォントパラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        var that = this;

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        tm.display.OutlineLabel("Select your language.", 60)
            .addChildTo(this)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.3);

        //言語選択
        var width = 250, height = 70;
        shotgun.Button(width, height, "日本語", {flat: appMain.buttonFlat, fontSize:50})
            .addChildTo(this)
            .setPosition(SC_W*0.25, SC_H*0.5)
            .addEventListener("pushed", function() {
                appMain.language = "JAPANESE";
                that.mask.tweener.clear().fadeOut(200);
                appMain.replaceScene(shotgun.TutorialScene());
            });
        shotgun.Button(width, height, "English", {flat: appMain.buttonFlat, fontSize:50})
            .addChildTo(this)
            .setPosition(SC_W*0.75, SC_H*0.5)
            .addEventListener("pushed", function() {
                appMain.language = "ENGLISH";
                that.mask.tweener.clear().fadeOut(200);
                appMain.replaceScene(shotgun.TutorialScene());
            });

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
        this.mask.tweener.clear().fadeOut(200);

        this.time = 0;
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


