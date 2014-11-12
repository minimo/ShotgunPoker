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

        //タイトルとチュートリアルを分けてレイヤーを作成
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.titleLayer.checkHierarchy = true;
        this.underLayer = tm.app.Object2D().addChildTo(this.titleLayer);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        //チュートリアル側バックグラウンド
        this.bg2 = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*1.5, SC_H*0.5)
            .renderRectangle({fillStyle: this.bgColor, strokeStyle: this.bgColor});

        //各画面セットアップ
        this.setupTitle();
        this.setupTutorial1();
        this.setupTutorial2();
        this.setupScoreList();

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
/*
        var fillStyle = tm.graphics.LinearGradient(-SC_W*0.2, 0, SC_W*0.1, 64)
            .addColorStopList([
                { offset: 0.1, color: "hsla(130, 90%, 0%, 0.5)"},
                { offset: 0.5, color: "hsla(130, 90%, 0%, 0.9)"},
                { offset: 0.9, color: "hsla(140, 90%, 0%, 0.5)"},
            ]).toStyle();
*/
        var fillStyle = "Red";
        var outlineStyle = "White";
        var shadowColor = 'rgba(160, 160, 160, 1)';

        //カード
/*
        for (var i = 0; i < 5; i++) {
            var c = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.5+50, SC_H*0.2+CARD_H*0.3)
                .setFrameIndex(i);
            c.rotation = -15+i*15;
            c.originX = c.originY = 0.9;
        }
*/
        //ショットガンシルエット
        var sg = tm.display.Sprite("shotgun", SC_W, SC_H*0.2)
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.5, SC_H*0.2);
        sg.scaleX = -1;
        sg.rotation = -10;

        //タイトルロゴ１
        var lb = this.title1 = tm.display.OutlineLabel("SHOTGUN", 130)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5-310, SC_H*0.16)
            .setParam({fontFamily:"'CasinoRegular'", align: "left", baseline:"middle", outlineWidth:3 });
        lb.fillStyle = fillStyle;
        lb.fillStyleOutline = outlineStyle;
        lb.shadowColor = shadowColor;
        lb.shadowBlur = 5;

        //タイトルロゴ２
        var lb = this.title2 = tm.display.OutlineLabel("POKER", 130)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+280, SC_H*0.29)
            .setParam({fontFamily:"'CasinoRegular'", align: "right", baseline:"middle", outlineWidth:3 });
        lb.fillStyle = fillStyle;
        lb.fillStyleOutline = outlineStyle;
        lb.shadowColor = shadowColor;
        lb.shadowBlur = 5;

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

        tm.display.OutlineLabel("HOW TO PLAY", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.05)
            .setParam(this.labelParam);

        tm.display.OutlineLabel("プレイ画面の説明", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.1)
            .setParam(this.labelParam);

        tm.display.Sprite("tutorial1")
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

        tm.display.OutlineLabel("プレイ画面の説明", 40)
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

        tm.display.OutlineLabel("得点表", 40)
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.5+SC_W*page, SC_H*0.1)
            .setParam(this.labelParam);

        for (var i = 0; i < 12; i++) {
            tm.display.OutlineLabel($trans(appMain.handList[i].name)+" : "+appMain.handList[i].point+"pts", 40)
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.1+SC_W*page, SC_H*0.17+(i*55))
                .setParam(this.scoreParam);
        }

        this.addButton(page, true);
    },

    update: function() {
        if (this.time % 7 == 0) {
            var c = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this.underLayer)
                .setPosition(rand(0, SC_W), -100-rand(0, 50))
                .setFrameIndex(rand(0, 54));
            c.update = function() {
                this.rotation+=this.vr;
                this.y+=this.vy;
                if (this.y > SC_H*1.2) {this.remove();}
            }
            c.vr = rand(-5, 5) || 1;
            c.vy = rand(5, 15);
            c.setScale(rand(5, 8)/10);
        }

        //スクリーンショット保存
        var kb = appMain.keyboard;
        if (kb.getKeyDown("s")) appMain.canvas.saveAsImage();

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


