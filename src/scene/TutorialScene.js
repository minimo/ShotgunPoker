/*
 *  TutorialScene.js
 *  2014/11/12
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.TutorialScene", {
    superClass: tm.app.Scene,

    //ボタン用フォントパラメータ
    buttonParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:4 },
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:2 },
    scoreParam: {fontFamily:"'azuki'", align: "left", baseline:"middle", outlineWidth:2 },

    bgColor: 'rgba(50, 150, 50, 1)',

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
//        this.checkHierarchy = true;

        //バックグラウンド
        this.bg = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: this.bgColor, strokeStyle: this.bgColor});

        this.demo = tm.display.OutlineLabel("DEMONSTRATION", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.demo.time = 1;
        this.demo.update = function() {
            if (this.time % 30 == 0) this.visible = !this.visible;
            this.time++;
        }

        //マスク
//        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
//        this.mask.tweener.clear().fadeOut(200);
        
        this.time = 0;
    },

    onresume: function() {
        this.mask.tweener.clear().fadeOut(200);
    },

    setupTitle: function() {
    },

    addButton: function(page, finish) {
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻る
        shotgun.Button(width, height, "PREV")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.25+SC_W*page, SC_H*0.9)
            .addEventListener("pushed", function() {
                that.titleLayer.tweener.clear().moveBy(SC_W, 0, 500, "easeOutQuint");
            });

        if (!finish) {
            //次
            shotgun.Button(width, height, "NEXT")
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.75+SC_W*page, SC_H*0.9)
                .addEventListener("pushed", function() {
                    that.titleLayer.tweener.clear().moveBy(-SC_W, 0, 500, "easeOutQuint");
                });
        } else {
            //終了
            shotgun.Button(width, height, "EXIT")
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.75+SC_W*page, SC_H*0.9)
                .addEventListener("pushed", function() {
                    that.titleLayer.tweener.clear().moveBy(SC_W*page, 0, 500, "easeOutQuint");
                });
        }
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
    },

});
