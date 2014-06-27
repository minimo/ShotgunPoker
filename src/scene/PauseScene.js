/*
 *  PauseScene.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.PauseScene", {
    superClass: tm.app.Scene,
    
    parent: null,

    init: function(parent) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        
        this.parent = parent;

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);

        var lb = tm.display.OutlineLabel("PAUSE", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        var lb = tm.display.OutlineLabel("YOUR HAND LIST", 40).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel(app.handList[i].name+":"+this.parent.handCount[app.handList[i].point], 40).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.2, SC_H*0.28+(i*45));
        }

        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻るボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(300).call(function(){app.popScene();}).fadeOut(300);
        });
        var lb = tm.display.OutlineLabel("RESUME", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.9);

        //終了ボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(300).call(function(){app.popScene();}).fadeOut(300);
        });
        var lb = tm.display.OutlineLabel("GAME EXIT", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.75, SC_H*0.9);

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
        app.popScene();
    },
});
