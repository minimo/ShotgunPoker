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
    labelParam: {fontFamily:"azuki", align: "center", baseline:"middle", outlineWidth:2 },

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
            this.bgm[i].num = i;
            if (i < volBGM) {
                this.bgm[i].setFrameIndex(i);
            } else {
                this.bgm[i].setFrameIndex(52);
            }
        }

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
            this.se[i].num = i;
            if (i < volSE) {
                this.se[i].setFrameIndex(i+13*3);
            } else {
                this.se[i].setFrameIndex(53);
            }
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

        //目隠し
        this.mask = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"});
        this.mask.tweener.clear().fadeOut(200);

        //サウンドテスト
//        this.addSountTestButton();

        this.time = 0;
    },

    setVolumeBGM: function(vol) {
        vol = Math.clamp(vol, 0, 10);
        appMain.sounds.volumeBGM = vol;
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
        vol = Math.clamp(vol, 0, 10);
        if (vol != appMain.sounds.volumeSE) appMain.playSE("hand");
        appMain.sounds.volumeSE = vol;
        for (var i = 0; i < 10; i++) {
            this.se[i].setFrameIndex(53).setScale(0.3);
            if (i < vol) {
                this.se[i].remove().addChildTo(this);
                this.se[i].setFrameIndex(i).setScale(0.5);
            } else {
                this.se[i].setFrameIndex(53).setScale(0.3);
            }
        }
    },

    //サウンドテストボタン追加
    addSoundTestButton: function() {
        var width = 150, height = 70;
        shotgun.Button(width, height, "BGM1")
            .addChildTo(this)
            .setPosition(SC_W*0.2, SC_H*0.7)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("titleBGM").clone().play();
            });
        shotgun.Button(width, height, "BGM2")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.7)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("mainBGM").clone().play();
            });
        shotgun.Button(width, height, "BGM3")
            .addChildTo(this)
            .setPosition(SC_W*0.8, SC_H*0.7)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("tutorialBGM").clone().play();
            });

        var width = 100, height = 70;
        shotgun.Button(width, height, "SE1")
            .addChildTo(this)
            .setPosition(SC_W*0.1, SC_H*0.8)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("countdown").clone().play();
            });
        shotgun.Button(width, height, "SE2")
            .addChildTo(this)
            .setPosition(SC_W*0.3, SC_H*0.8)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("deal").clone().play();
            });
        shotgun.Button(width, height, "SE3")
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.8)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("dist").clone().play();
            });
        shotgun.Button(width, height, "SE4")
            .addChildTo(this)
            .setPosition(SC_W*0.7, SC_H*0.8)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("hand").clone().play();
            });
        shotgun.Button(width, height, "SE5")
            .addChildTo(this)
            .setPosition(SC_W*0.9, SC_H*0.8)
            .addEventListener("pushed", function() {
                tm.asset.AssetManager.get("nopair").clone().play();
            });
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


