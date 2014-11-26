/*
 *  GameoverScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.GameoverScene", {
    superClass: tm.app.Scene,

    //ラベル用フォントパラメータ
    labelParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2 },
    scoreParam: {fontFamily:"azuki", align: "left", baseline:"middle", outlineWidth:2 },

    init: function(parentScene) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        this.parentScene = parentScene;

        //バックグラウンド
        this.bg = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor});

        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //メインとリザルトを分けてレイヤーを作成
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.resultLayer = tm.app.Object2D().addChildTo(this);

        this.top = tm.display.OutlineLabel("RESULT", 40)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.1);

        //スコア表示
        this.score = tm.display.OutlineLabel("SCORE: "+appMain.lastScore, 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.15);

        this.score = tm.display.OutlineLabel("YOUR BEST SCORE: "+appMain.highScore, 30)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.2);

        //役一覧
        for (var i = 0; i < 12; i++) {
            tm.display.OutlineLabel(appMain.handList[i].name+":"+this.parentScene.handCount[appMain.handList[i].point], 40)
                .addChildTo(this.resultLayer)
                .setParam(this.scoreParam)
                .setPosition(SC_W*0.2, SC_H*0.28+(i*45));
        }

        //リトライボタン
        shotgun.Button(width, height, "RETRY")
            .addChildTo(this)
            .setPosition(SC_W*0.25, SC_H*0.9)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeIn(300).call(function(){appMain.replaceScene(shotgun.MainScene());});
            });

        //戻るボタン
        shotgun.Button(width, height, "EXIT")
            .addChildTo(this)
            .setPosition(SC_W*0.75, SC_H*0.9)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeIn(300).call(function(){appMain.replaceScene(shotgun.TitleScene());});
            });

/*
        //ツイートボタン
        var sh = this.exit = tm.display.RoundRectangleShape(200, 70, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.7);
        sh.interactive = true;
        sh.addEventListener("pointingstart", function() {this.y += 10;});
        sh.addEventListener("pointingend", function() {
            this.y -= 10;
            appMain.replaceScene(shotgun.TitleScene());
        });
        var lb = this.exitLabel = tm.display.OutlineLabel("TWEET", 50).addChildTo(this);
        lb.fontFamily = "azuki"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.7);
*/
        //目隠し
        this.mask = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"});
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
