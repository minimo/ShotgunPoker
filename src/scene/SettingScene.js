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

    //ラベル用フォントパラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        var that = this;

        //バックグラウンド
        this.bg = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        tm.display.OutlineLabel("OPTION", 60)
            .addChildTo(this)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.1);

        tm.display.OutlineLabel("SOUND SETTING", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.2);

        //ＢＧＭ音量
        var volBGM = appMain.sounds.volumeBGM;
        tm.display.OutlineLabel("BGM", 60)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.1, SC_H*0.3);
        this.bgm = [];
        for (var i = 0; i < 10; i++) {
            this.bgm[i] = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this)
                .setScale(0.3)
                .setPosition(SC_W*0.25+i*44, SC_H*0.3)
        }
        this.setVolumeBGM(appMain.sounds.volumeBGM);

        //ＳＥ音量
        var volSE = appMain.sounds.volumeSE;
        tm.display.OutlineLabel("SE", 60)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.1, SC_H*0.4);
        this.se = [];
        for (var i = 0; i < 10; i++) {
            this.se[i] = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this)
                .setScale(0.3)
                .setPosition(SC_W*0.25+i*44, SC_H*0.4)
        }
        this.setVolumeSE(appMain.sounds.volumeSE);

        tm.display.OutlineLabel("GAME SETTING", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.5);

        //ジョーカー戻り設定ボタン
        var that = this;
        tm.display.OutlineLabel("RETURN JOKER", 50)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.3, SC_H*0.6);
        var width = 150, height = 70;
        this.retJoker = shotgun.ToggleButton(width, height, "ON", "OFF", {flat: appMain.buttonFlat})
            .addChildTo(this)
            .setPosition(SC_W*0.8, SC_H*0.6)
            .addEventListener("pushed", function() {
                appMain.returnJoker = that.retJoker.toggleON;
            });
        this.retJoker.toggleON = appMain.returnJoker;

        //戻るボタン
        var width = 300, height = 70;
        shotgun.Button(width, height, "RETURN", {flat: appMain.buttonFlat})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.85)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeOut(200);
                appMain.saveConfig();
                appMain.popScene();
            });

        //目隠し
        this.mask = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
        this.mask.tweener.clear().fadeOut(200);

        this.time = 0;
    },

    setVolumeBGM: function(vol) {
        if (vol != appMain.sounds.volumeBGM) {
            appMain.sounds.pauseBGM();
            appMain.sounds.setVolumeBGM(vol);
            appMain.sounds.resumeBGM();
        }
        for (var i = 0; i < 10; i++) {
            this.bgm[i].setFrameIndex(52).setScale(0.3);
            if (i == vol-1) {
                this.bgm[i].remove().addChildTo(this);
                this.bgm[i].setFrameIndex(i).setScale(0.5);
            } else {
                this.bgm[i].setFrameIndex(52).setScale(0.3);
            }
        }
    },

    setVolumeSE: function(vol) {
        if (vol != appMain.sounds.volumeSE) {
            appMain.sounds.setVolumeSE(vol);
            appMain.playSE("hand");
        }
        for (var i = 0; i < 10; i++) {
            this.se[i].setFrameIndex(53).setScale(0.3);
            if (i == vol-1) {
                this.se[i].remove().addChildTo(this);
                this.se[i].setFrameIndex(i+13*3).setScale(0.5);
            } else {
                this.se[i].setFrameIndex(53).setScale(0.3);
            }
        }
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

        sx += 22;
        if (SC_W*0.10 < sx && sx < SC_W*0.25+440) {
            sx -= SC_W*0.25;
            var x = ~~(sx/44)+1;
            //ＢＧＭボリューム
            if ( SC_H*0.25 < sy && sy < SC_H*0.35) {
                if (sx < 0) {
                    this.setVolumeBGM(0);
                } else {
                    this.setVolumeBGM(x);
                }
            }

            //ＳＥボリューム
            if ( SC_H*0.35 < sy && sy < SC_H*0.45) {
                if (sx < 0) {
                    this.setVolumeSE(0);
                } else {
                    this.setVolumeSE(x);
                }
            }
        }
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
    },
});


