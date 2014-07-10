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
//        this.checkHierarchy = true;

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.titleLayer.checkHierarchy = true;
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        this.setupTitle();
        this.setupTutorial1();
        this.setupTutorial2();
        this.setupScoreList();

        //ステータスバー
        var sh = tm.display.RectangleShape(SC_W, 20, {fillStyle:'rgba(50,100,50,1)'}).addChildTo(this);

        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);
        
        this.time = 0;

        appMain.playBGM("titleBGM");
    },

    onenter: function() {
        this.mask.tweener.clear().fadeOut(200);
    },

    setupTitle: function() {
        var lb = this.title1 = tm.display.OutlineLabel("SHOTGUN", 120).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.4, SC_H*0.2);

        var lb = this.title2 = tm.display.OutlineLabel("POKER", 120).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.7, SC_H*0.35);

        var that = this;
        var width = 300, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //プレイスタート
        var sh = this.play = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.5, SC_H*0.5);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.replaceScene(shotgun.MainScene());});
        });
        var lb = this.playLabel = tm.display.OutlineLabel("PLAY", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.5);

        //チュートリアル
        var sh = this.tutorial = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.5, SC_H*0.6);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            that.titleLayer.tweener.clear().moveBy(-SC_W, 0, 1000, "easeOutQuint");
        });
        var lb = this.tutorialLabel = tm.display.OutlineLabel("TUTORIAL", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.6);

        //設定
        var sh = this.setting = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.5, SC_H*0.7);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.SettingScene());});
        });
        var lb = this.settingLabel = tm.display.OutlineLabel("SETTING", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.7);

        //クレジット
        var sh = this.credit = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.5, SC_H*0.8);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.CreditScene());});
        });
        var lb = this.creditLabel = tm.display.OutlineLabel("CREDIT", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.8);

        //GAMECENTER
        var sh = this.credit = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.5, SC_H*0.9);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            if (GAMECENTER) {
                var data = {
                    period: "today",
                    leaderboardId: "board"
                };
                gamecenter.showLeaderboard(function() {}, function() {alert('GAMECENTERを開けませんでした');}, data);
            } else {
                alert('GAMECENTERの準備が出来ていません');
            }
//            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.CreditScene());});
        });
        var lb = this.creditLabel = tm.display.OutlineLabel("GAME CENTER", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.9);
    },

    addButton: function(page, finish) {
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻る
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
        sh.setPosition(SC_W*0.25+SC_W*page, SC_H*0.9);
        sh.interactive = true;
        sh.checkHierarchy = true;
        sh.boundingType = "rect";
        sh.addEventListener("pointingend", function() {
            that.titleLayer.tweener.clear().moveBy(SC_W, 0, 1000, "easeOutQuint");
        });
        var lb = tm.display.OutlineLabel("PREV", 50).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.25+SC_W*page, SC_H*0.9);

        if (!finish) {
            //次
            var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
            sh.setPosition(SC_W*0.75+SC_W*page, SC_H*0.9);
            sh.interactive = true;
            sh.checkHierarchy = true;
            sh.boundingType = "rect";
            sh.addEventListener("pointingend", function() {
                that.titleLayer.tweener.clear().moveBy(-SC_W, 0, 1000, "easeOutQuint");
            });
            var lb = tm.display.OutlineLabel("NEXT", 50).addChildTo(this.titleLayer);
            lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
            lb.setPosition(SC_W*0.75+SC_W*page, SC_H*0.9);
        } else {
            //終了
            var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this.titleLayer);
            sh.setPosition(SC_W*0.75+SC_W*page, SC_H*0.9);
            sh.interactive = true;
            sh.checkHierarchy = true;
            sh.boundingType = "rect";
            sh.addEventListener("pointingend", function() {
                that.titleLayer.tweener.clear().moveBy(SC_W*page, 0, 1000, "easeOutQuint");
            });
            var lb = tm.display.OutlineLabel("EXIT", 50).addChildTo(this.titleLayer);
            lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
            lb.setPosition(SC_W*0.75+SC_W*page, SC_H*0.9);
        }
    },

    setupTutorial1: function() {
        var page = 1;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("HOW TO PLAY", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5+SC_W*page, SC_H*0.05);

        var lb = tm.display.OutlineLabel("プレイ画面の説明", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5+SC_W*page, SC_H*0.1);

        var sp = tm.display.Sprite("tutorial1").addChildTo(this.titleLayer);
        sp.setPosition(SC_W*0.5+SC_W*page, SC_H*0.5);
        sp.setScale(1.5);

        this.addButton(page);
    },

    setupTutorial2: function() {
        var page = 2;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("プレイ画面の説明", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5+SC_W*page, SC_H*0.1);
 
        this.addButton(page);
    },

    setupScoreList: function() {
        var page = 3;
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var lb = tm.display.OutlineLabel("得点表", 40).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5+SC_W*page, SC_H*0.1);

        for (var i = 0; i < 12; i++) {
            var lb = tm.display.OutlineLabel(appMain.handList[i].name+" : "+appMain.handList[i].point+"pts", 40).addChildTo(this.titleLayer);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.1+SC_W*page, SC_H*0.17+(i*55));
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


