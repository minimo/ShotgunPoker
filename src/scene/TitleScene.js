/*
 *  TitleScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.TitleScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);
        
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        var lb = this.title1 = tm.display.OutlineLabel("SHOTGUN", 120).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.4, SC_H*0.2-SC_H*0.6);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;
        lb.tweener.wait(500).move(SC_W*0.4, SC_H*0.2, 1500,"easeOutBounce");

        var lb = this.title2 = tm.display.OutlineLabel("POKER", 120).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.7, SC_H*0.35-SC_H*0.6);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;
        lb.tweener.wait(500).move(SC_W*0.7, SC_H*0.35, 1500,"easeOutBounce");

        var that = this;
        var width = 200, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //スタート
        var sh = this.start = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.5);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(300).call(function(){app.replaceScene(shotgun.MainScene());});
        });
        sh.param = {fillStyle:'rgba(255,0,0,1)', lineWidth:4}

        var lb = this.startLabel = tm.display.OutlineLabel("START", 50).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.5);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 4;

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
//        if (this.time > 30) app.replaceScene(shotgun.MainScene());
    },

});


