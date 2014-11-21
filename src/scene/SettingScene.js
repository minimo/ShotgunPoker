/*
 *  SettingScene.js
 *  2014/06/25
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.SettingScene", {
    superClass: tm.app.Scene,

    volBgm: 50,
    volSe: 50,

    bgm: null,
    se: null,

    //ラベル用フォントパラメータ
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        var that = this;

        //バックグラウンド
        tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor});

        tm.display.OutlineLabel("OPTION", 60)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.1);

        tm.display.OutlineLabel("SOUND VOLUME", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.2);

        //ＢＧＭ音量
        tm.display.OutlineLabel("BGM", 60)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.2, SC_H*0.3);
        this.bgm = [];
        for (var i = 0; i < 6; i++) {
            this.bgm[i] = tm.display.OutlineLabel(""+i, 30)
                .addChildTo(this)
                .setParam(this.labelParam)
                .setPosition(SC_W*0.4+i*60, SC_H*0.3);
            if (appMain.volumeBGM == i) this.bgm[i].fontSize = 80;
        }

        //ＳＥ音量
        tm.display.OutlineLabel("SE", 60)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.2, SC_H*0.4);
        this.se = [];
        for (var i = 0; i < 6; i++) {
            this.se[i] = tm.display.OutlineLabel(""+i, 30).addChildTo(this)
                .setParam(this.labelParam)
                .setPosition(SC_W*0.4+i*60, SC_H*0.4);
            if (appMain.volumeSE == i) this.se[i].fontSize = 80;
        }

        //戻るボタン
        var width = 300, height = 70;
        shotgun.Button(width, height, "RETURN")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.9)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeOut(200);
                appMain.saveConfig();
                appMain.popScene();
            });

        //マスク
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
        if ( SC_H*0.25 < sy && sy < SC_H*0.35 && sx > SC_W*0.4-30 && sx < SC_W*0.4-30+360) {
            var x = sx-(SC_W*0.4-30);
            x = ~~(x/60);
            if (appMain.volumeBGM != x) {
                this.bgm[appMain.volumeBGM].fontSize = 30;
                this.bgm[x].fontSize = 80;
                appMain.setVolumeBGM(x);
            }
        }
        //ＳＥボリューム
        if ( SC_H*0.35 < sy && sy < SC_H*0.45 && SC_W*0.4-30 < sx && sx < SC_W*0.4-30+360) {
            var x = sx-(SC_W*0.4-30);
            x = ~~(x/60);
            if (appMain.volumeSE != x) {
                this.se[appMain.volumeSE].fontSize = 30;
                this.se[x].fontSize = 80;
                appMain.volumeSE = x;
                appMain.playSE("hand");
            }
        }
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
    },
});


