/*
 *  AchievementScene.js
 *  2015/02/09
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.AchievementScene", {
    superClass: tm.app.Scene,

    //クレジットラベル用パラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        this.base = tm.display.RectangleShape({width: SC_W, height: SC_H*0.2, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this);

        tm.display.OutlineLabel("ACHIEVEMENT", 60)
            .addChildTo(this.base)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.1);

        var that = this;
        var y = 0;
        shotgun.achievementList.$forIn(function(key, value, index) {
            console.log([index, key, value].join(','));
            tm.display.OutlineLabel($trans(value.name)+": "+$trans(value.text)+": "+value.percent, 20)
                .addChildTo(that.base)
                .setParam(that.labelParam)
                .setPosition(SC_W*0.5, SC_H*0.15+SC_H*y*0.02);
            y++;
        });

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
        
        this.time = 0;
    },

    setup: function() {
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


