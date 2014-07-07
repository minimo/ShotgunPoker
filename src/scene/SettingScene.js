/*
 *  SettingScene.js
 *  2014/06/25
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.SettingScene", {
    superClass: tm.app.Scene,

    bgm: null,
    se: null,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        var that = this;

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        var lb = this.credit1 = tm.display.OutlineLabel("SETTING", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.5, SC_H*0.2);

        //ＢＧＭ音量
        var lb = tm.display.OutlineLabel("BGM", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.2, SC_H*0.4);
        this.bgm = [];
        for (var i = 0; i < 6; i++) {
            var lb = this.bgm[i] = tm.display.OutlineLabel(""+i, 30).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.4+i*60, SC_H*0.4);
            if ((appMain.volumeBGM/2) == i) lb.fontSize = 80;
        }

        //ＳＥ音量
        var lb = tm.display.OutlineLabel("SE", 60).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W*0.2, SC_H*0.6);
        this.se = [];
        for (var i = 0; i < 6; i++) {
            var lb = this.se[i] = tm.display.OutlineLabel(""+i, 30).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 2;
            lb.setPosition(SC_W*0.4+i*60, SC_H*0.6);
            if ((appMain.volumeSE/2) == i) lb.fontSize = 80;
        }

        var that = this;
        var width = 250, height = 70;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻るボタン
        var sh = tm.display.RoundRectangleShape(width, height, param).addChildTo(this);
        sh.setPosition(SC_W*0.5, SC_H*0.9);
        sh.interactive = true;
        sh.boundingType = "rect";
        sh.addEventListener("click", function() {
            that.mask.tweener.clear().fadeOut(200);
            appMain.popScene();
        });
        var lb = tm.display.OutlineLabel("RETURN", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.9);

        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);

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
        var sx = e.pointing.x;
        var sy = e.pointing.y;

        //ＢＧＭボリューム
        if ( SC_H*0.35 < sy && sy < SC_H*0.45 && sx > SC_W*0.4-30 && sx < SC_W*0.4-30+360) {
            var x = sx-(SC_W*0.4-30);
            x = ~~(x/60);
            if (appMain.volumeBGM != x*2) {
                this.bgm[~~(appMain.volumeBGM/2)].fontSize = 30;
                appMain.volumeBGM = x*2;
                this.bgm[x].fontSize = 80;
                this.pauseBGM();
                this.resumeBGM();
            }
        }
        //ＳＥボリューム
        if ( SC_H*0.55 < sy && sy < SC_H*0.65 && SC_W*0.4-30 < sx && sx < SC_W*0.4-30+360) {
            var x = sx-(SC_W*0.4-30);
            x = ~~(x/60);
            if (appMain.volumeSE != x*2) {
                this.se[~~(appMain.volumeSE/2)].fontSize = 30;
                appMain.volumeSE = x*2;
                this.se[x].fontSize = 80;
                appMain.playSE("hand");
            }
        }
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
    },
});


