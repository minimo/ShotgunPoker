/*
 *  GameoverScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.GameoverScene", {
    superClass: tm.app.Scene,

    init: function(parentScene) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        this.parentScene = parentScene;

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);
        
        var that = this;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = this.score = tm.display.OutlineLabel("YOUR RESULT"+app.lastScore, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.1);

        //スコア表示
        var lb = this.score = tm.display.OutlineLabel("SCORE: "+app.lastScore, 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);
        lb.outlineWidth = 2;

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel(app.handList[i].name+":"+this.parentScene.handCount[app.handList[i].point], 40).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.2, SC_H*0.28+(i*45));
        }

        //リトライボタン
        var sh = this.retry = tm.display.RoundRectangleShape(200, 70, param).addChildTo(this);
        sh.setPosition(SC_W*0.25, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(300).call(function(){app.replaceScene(shotgun.MainScene());});
        });
        var lb = this.retryLabel = tm.display.OutlineLabel("RETRY", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.25, SC_H*0.9);

        //戻るボタン
        var sh = this.exit = tm.display.RoundRectangleShape(200, 70, param).addChildTo(this);
        sh.setPosition(SC_W*0.75, SC_H*0.9);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(300).call(function(){app.replaceScene(shotgun.TitleScene());});
        });
        var lb = this.exitLabel = tm.display.OutlineLabel("EXIT", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.75, SC_H*0.9);

/*
        //ツイートボタン
        var sh = this.exit = tm.display.RoundRectangleShape(200, 70, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.7);
        sh.interactive = true;
        sh.addEventListener("click", function() {
            app.replaceScene(shotgun.TitleScene());
        });
        var lb = this.exitLabel = tm.display.OutlineLabel("TWEET", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.7);
*/
        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);
    },

    update: function() {
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
