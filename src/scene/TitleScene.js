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
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);
        
        this.titleLayer = tm.app.Object2D().addChildTo(this);
        this.tutorialLayer = tm.app.Object2D().addChildTo(this);

        var lb = this.title1 = tm.display.OutlineLabel("SHOTGUN", 120).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.4, SC_H*0.2);

        var lb = this.title2 = tm.display.OutlineLabel("POKER", 120).addChildTo(this.titleLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.7, SC_H*0.35);

        var that = this;
        var width = 230, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //プレイスタート
        var sh = this.play = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.5);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.replaceScene(shotgun.MainScene());});
        });
        var lb = this.playLabel = tm.display.OutlineLabel("PLAY", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.5);

        //チュートリアル
        var sh = this.tutorial = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.6);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.MainScene());});
        });
        var lb = this.tutorialLabel = tm.display.OutlineLabel("TUTORIAL", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.6);

        //設定
        var sh = this.setting = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.7);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.SettingScene());});
        });
        var lb = this.settingLabel = tm.display.OutlineLabel("SETTING", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.7);

        //クレジット
        var sh = this.credit = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.8);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeIn(200).call(function(){appMain.pushScene(shotgun.CreditScene());});
        });
        var lb = this.creditLabel = tm.display.OutlineLabel("CREDIT", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.8);

        //マスク
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);
        
        this.time = 0;

        appMain.playBGM("titleBGM");
    },

    onenter: function() {
        this.mask.tweener.clear().fadeOut(200);
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


