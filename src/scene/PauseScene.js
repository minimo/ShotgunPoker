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
        this.dialog = shotgun.ConfirmDialog("EXIT GAME?", ["YES", "NO"]);

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);

        var lb = tm.display.OutlineLabel("PAUSE", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        var lb = tm.display.OutlineLabel("YOUR HAND LIST", 40).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel(appMain.handList[i].name+":"+this.parentScene.handCount[appMain.handList[i].point], 40).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.2, SC_H*0.28+(i*45));
        }

        var that = this;
        var width = 250, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻るボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.9);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.tweener.clear().call(function(){appMain.popScene();});
        });
        var lb = tm.display.OutlineLabel("RESUME", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.9);

        //終了ボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.9);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            appMain.pushScene(that.dialog);
        });
        var lb = tm.display.OutlineLabel("EXIT", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.75, SC_H*0.9);

        //ステータスバー
        var sh = tm.display.RectangleShape(SC_W, STATUSBAR_HEIGHT, {strokeStyle: STATUSBAR_COLOR,fillStyle: STATUSBAR_COLOR}).addChildTo(this);
        sh.originX = sh.originY = 0;

        this.time = 0;
    },

    update: function() {
        this.time++;
    },

    onenter: function() {
        if (this.dialog.answer == true) {
            appMain.replaceScene(shotgun.TitleScene());
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

tm.define("shotgun.ConfirmDialog", {
    superClass: tm.app.Scene,

    answer: null,

    init: function(caption, button) {
        this.superInit();
        
        button = button || ["OK", "CANCEL"];

        //バックグラウンド
        var sh = tm.display.RoundRectangleShape(SC_W-20, SC_H*0.3, {fillStyle:'rgba(0,100,0,1)', lineWidth:4}).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.5);

        var that = this;
        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //キャプション
        var lb = tm.display.OutlineLabel(caption, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.45);

        //ＹＥＳ
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.55);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.answer = true;
            appMain.popScene();
        });
        var lb = tm.display.OutlineLabel(button[0], 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.55);

        //ＮＯ
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.55);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.answer = false;
            appMain.popScene();
        });
        var lb = tm.display.OutlineLabel(button[1], 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.75, SC_H*0.55);
    },
});

tm.define("shotgun.AlertDialog", {
    superClass: tm.app.Scene,

    init: function(caption, button) {
        this.superInit();
        button = button || "OK";

        //バックグラウンド
        var sh = tm.display.RoundRectangleShape(SC_W-20, SC_H*0.3, {fillStyle:'rgba(0,100,0,1)', lineWidth:4}).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.5);

        var that = this;
        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //キャプション
        var lb = tm.display.OutlineLabel(caption, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.45);

        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.55);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.answer = true;
            appMain.popScene();
        });
        var lb = tm.display.OutlineLabel(button, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25, SC_H*0.55);
    },
});
