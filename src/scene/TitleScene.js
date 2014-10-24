/*
 *  TitleScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.TitleScene", {
    superClass: tm.app.Scene,

    //ボタン用フォントパラメータ
    buttonParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:4 },
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:2 },
    scoreParam: {fontFamily:"'azuki'", align: "left", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
//        this.checkHierarchy = true;

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        //タイトルとチュートリアルを分けてレイヤーを作成
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.titleLayer.checkHierarchy = true;
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        this.setupTitle();
        this.setupTutorial1();
        this.setupTutorial2();
        this.setupScoreList();

        //ステータスバー
        var sh = tm.display.RectangleShape(SC_W, STATUSBAR_HEIGHT, {strokeStyle: STATUSBAR_COLOR,fillStyle: STATUSBAR_COLOR}).addChildTo(this);
        sh.originX = sh.originY = 0;

        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);
        
        this.time = 0;

        appMain.playBGM("titleBGM");
    },

    onresume: function() {
        this.mask.tweener.clear().fadeOut(200);
    },

    setupTitle: function() {
        var fillStyle = tm.graphics.LinearGradient(-SC_W*0.2, 0, SC_W*0.1, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(230, 90%, 50%, 0.5)"},
                { offset: 0.5, color: "hsla(230, 80%, 90%, 0.9)"},
                { offset: 0.9, color: "hsla(230, 90%, 50%, 0.5)"},
            ]).toStyle();

        var lb = this.title1 = tm.display.OutlineLabel("SHOTGUN", 120)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.45, SC_H*0.15)
            .setParam({fontFamily:"'CasinoQueen'", align: "center", baseline:"middle", outlineWidth:2 });
        lb.fillStyle = fillStyle;
        lb.shadowColor = "Black";
        lb.shadowBlur = 10;

        var lb = this.title2 = tm.display.OutlineLabel("POKER", 120)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.65, SC_H*0.30)
            .setParam({fontFamily:"'CasinoQueen'", align: "center", baseline:"middle", outlineWidth:2 });
        lb.fillStyle = fillStyle;
        lb.shadowColor = "Black";
        lb.shadowBlur = 10;

        var that = this;
        var width = 300, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //プレイスタート
        shotgun.Button(width, height, "START")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5, SC_H*0.45)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.replaceScene(shotgun.MainScene());});
            });

        //チュートリアル
        shotgun.Button(width, height, "TUTORIAL")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5, SC_H*0.55)
            .addEventListener("pushed", function() {
                that.titleLayer.tweener.clear().moveBy(-SC_W, 0, 500, "easeOutQuint");
            });

        //設定
        shotgun.Button(width, height, "SETTING")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5, SC_H*0.65)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.SettingScene());});
            });

        //クレジット
        shotgun.Button(width, height, "CREDIT")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5, SC_H*0.75)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.CreditScene());});
            });

        //GAMECENTER
        shotgun.Button(width, height, "GAME CENTER")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5, SC_H*0.85)
            .addEventListener("pushed", function() {
                if (!PHONEGAP) return;
                if (!GAMECENTER) {
                    gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
//                    AdvanceAlert('GAMECENTERの準備が出来ていません');
                }
                var data = {
                    period: "today",
                    leaderboardId: "board"
                };
                gamecenter.showLeaderboard(function() {}, function() {AdvanceAlert($trans("GAMECENTERのアクセスに失敗しました"));}, data);
//                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.CreditScene());});
            });
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

    setupTutorial1: function() {
        var page = 1;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("HOW TO PLAY", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.05)
            .setParam(this.labelParam);

        var lb = tm.display.OutlineLabel("プレイ画面の説明", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.1)
            .setParam(this.labelParam);

        var sp = tm.display.Sprite("tutorial1")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.5)
            .setScale(1.5);

        this.addButton(page);
    },

    setupTutorial2: function() {
        var page = 2;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("プレイ画面の説明", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.1)
            .setParam(this.labelParam);

        this.addButton(page);
    },

    setupScoreList: function() {
        var page = 3;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("得点表", 40).addChildTo(this.titleLayer);
        lb.setPosition(SC_W*0.5+SC_W*page, SC_H*0.1);
        lb.setParam(this.labelParam);

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel($trans(appMain.handList[i].name)+" : "+appMain.handList[i].point+"pts", 40)
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.1+SC_W*page, SC_H*0.17+(i*55))
                .setParam(this.scoreParam);
        }

        this.addButton(page, true);
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
//        if (this.time > 30) appMain.replaceScene(shotgun.MainScene());
    },

});

tm.define("shotgun.WaitScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
    },
    update: function() {
        if (fontLoadEnd >= FONT.length) {
            fontLoadEnd = 0;
            tm.app.Object2D().addChildTo(this).tweener
                .wait(100)
                .call(function(){
                    appMain.replaceScene(shotgun.TitleScene());
                });
        }
    },
});


