/*
 *  GameoverScene.js
 *  2014/06/23
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.GameoverScene", {
    superClass: tm.app.Scene,

    dispExtend: false,

    //ラベル用フォントパラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2 },
    scoreParam: {fontFamily:"azuki", align: "left", baseline:"middle", outlineWidth:2 },
    extendParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2, fillStyle: "red" },

    init: function(parentScene) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        this.parentScene = parentScene;

        //バックグラウンド
        this.bg = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        var that = this;
        var width = SC_W, height = 80;

        //メインとリザルトを分けてレイヤーを作成
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.resultLayer = tm.app.Object2D().addChildTo(this);

        this.top = tm.display.OutlineLabel("RESULT", 60)
            .addChildTo(this)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.05);

        //スコア表示
        var mode = parentScene.mode;
        if (appMain.returnJoker) mode += 10;
        this.score = tm.display.OutlineLabel("SCORE: "+appMain.lastScore[mode], 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.125);

        this.score = tm.display.OutlineLabel("YOUR BEST SCORE: "+appMain.highScore[mode], 40)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.175);

        //役一覧
        for (var i = 0; i < 12; i++) {
            tm.display.OutlineLabel(appMain.handList[i].name+":"+this.parentScene.handCount[appMain.handList[i].point], 40)
                .addChildTo(this.resultLayer)
                .setParam(this.scoreParam)
                .setPosition(SC_W*0.2, SC_H*0.25+(i*45));
        }

        //全画面広告ボタン
        this.Ad = shotgun.Button(width*0.49, height, "Ad", {flat: appMain.buttonFlat, fontSize:60})
            .addChildTo(this)
            .setPosition(SC_W*0.25, SC_H*0.71)
            .addEventListener("pushed", function() {
                if(ENABLE_PHONEGAP && AdMob) {
                    AdMob.prepareInterstitial({
                        adId:admobid.interstitial,
                        autoShow:true
                    });
                }
                if (parentScene.mode != GAMEMODE_HARD) appMain.bonusLife = 1;
            });

        //GAMECENTER
        shotgun.Button(width*0.49, height, "RANKING", {flat: appMain.buttonFlat, fontSize:60})
            .addChildTo(this)
            .setPosition(SC_W*0.75, SC_H*0.71)
            .addEventListener("pushed", function() {
                var lb = "Normal";
                if (parentScene.mode == GAMEMODE_HARD) lb = "Hard";
                if (appMain.returnJoker) lb += "_ReturnJoker";
                showLeadersBoard(lb);
            });

        //リトライボタン
        this.retry = shotgun.Button(width, height, "RETRY", {flat: appMain.buttonFlat, fontSize:60})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.78)
            .addEventListener("pushed", function() {
                var mode = that.parentScene.mode;
                that.parentScene = null;
                that.mask.tweener.clear().fadeIn(300).call(function(){appMain.replaceScene(shotgun.MainScene(mode));});
            });

        //戻るボタン
        this.back = shotgun.Button(width, height, "EXIT", {flat: appMain.buttonFlat, fontSize:60})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.85)
            .addEventListener("pushed", function() {
                that.parentScene = null;
                that.mask.tweener.clear().fadeIn(300).call(function(){appMain.replaceScene(shotgun.TitleScene());});
            });

        //目隠し
        this.mask = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
    },

    update: function() {
        if (!this.dispExtend && appMain.bonusLife != 0) {
            var that = this;
            var c = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this.retry)
//                .setPosition(SC_W*0.40, SC_H*0.85)
                .setPosition(130, 0)
                .setFrameIndex(13*3)
                .tweener.clear()
                .fadeOut(1)
                .wait(1000)
                .call(function(){
                    that.Ad.remove();
                })
                .wait(1000)
                .fadeIn(1)
                .scale(0.4, 1000, "easeOutBounce")
                .call(function(){
                    tm.display.OutlineLabel("+", 70)
                        .addChildTo(that.retry)
                        .setParam(that.extendParam)
                        .setPosition(90, 0);
                });
            this.dispExtend = true;
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
