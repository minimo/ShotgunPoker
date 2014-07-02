/*
 *  PauseScene.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.PauseScene", {
    superClass: tm.app.Scene,

    parentScene: null,
    dialog: null,

    init: function(parentScene) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        this.parentScene = parentScene;
        
        //ダイアログ
        this.dialog = shotgun.YesNoDialog("ExitGame?");

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);

        var lb = tm.display.OutlineLabel("PAUSE", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        var lb = tm.display.OutlineLabel("YOUR HAND LIST", 40).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel(app.handList[i].name+":"+this.parentScene.handCount[app.handList[i].point], 40).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.2, SC_H*0.28+(i*45));
        }

        var that = this;
        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻るボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.tweener.clear().call(function(){app.popScene();});
        });
        var lb = tm.display.OutlineLabel("RESUME", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.9);

        //終了ボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            app.pushScene(that.dialog);
        });
        var lb = tm.display.OutlineLabel("GAME EXIT", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.75, SC_H*0.9);

        this.time = 0;
    },

    update: function() {
        this.time++;
    },

    onenter: function() {
        if (this.dialog.answer == true) {
            if (this.parent instanceof shotgun.MainScene) {
                this.parent.exitGame = true;
                app.replaceScene(shotgun.TitleScene());
            }
            app.popScene();
        }
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

tm.define("shotgun.YesNoDialog", {
    superClass: tm.app.Scene,

    answer: null,

    init: function(caption) {
        this.superInit();

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H/2).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        var lb = tm.display.OutlineLabel(caption, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.4);

        var that = this;
        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //ＹＥＳ
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.5);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.answer = true;
            app.popScene();
        });
        var lb = tm.display.OutlineLabel("YES", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.5);

        //ＮＯ
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.5);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.answer = false;
            app.popScene();
        });
        var lb = tm.display.OutlineLabel("NO", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.75, SC_H*0.5);
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
