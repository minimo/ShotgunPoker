/*
 *  ShotgunPoker.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace tiger
shotgun = {
    core: null,
};

tm.define("shotgun.CanvasApp", {
    superClass: tm.app.CanvasApp,

    version: "1.0.0",

    //ＢＧＭ＆効果音
    bgm: null,
    bgmIsPlay: false,
    volumeBGM: 3,
    volumeSE: 3,
    sounds: null,

    //スコア保存
    lastScore: 0,
    highScore: 0,

    //各種設定
    useJoker: USE_JOKER,
    returnJoker: RETURN_JOKER,
    returnJokerTuen: RETURN_JOKER_TURN,
    handList: null,

    //バックグラウンドカラー
    bgColor: 'rgba(50, 110, 50, 1)',

    //言語設定
    language: JAPANESE,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = fps;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        shotgun.core = this;

        //設定情報の読み込み
        this.loadConfig();

        var loadingScene = tm.ui["LoadingScene"]({
            assets: assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return shotgun.TitleScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);

        //役名一覧
        this.handList = [];
        this.handList[0]  = {name: "MISS", point: MISS};
        this.handList[1]  = {name: "NO PAIR", point: NOPAIR};
        this.handList[2]  = {name: "ONE PAIR", point: ONEPAIR};
        this.handList[3]  = {name: "TWO PAIR", point: TWOPAIR};
        this.handList[4]  = {name: "FLASH", point: FLASH};
        this.handList[5]  = {name: "THREE CARD", point: THREECARD};
        this.handList[6]  = {name: "FULL HOUSE", point: FULLHOUSE};
        this.handList[7]  = {name: "STRAIGHT", point: STRAIGHT};
        this.handList[8]  = {name: "FOUR CARD", point: FOURCARD};
        this.handList[9]  = {name: "FIVE CARD", point: FIVECARD};
        this.handList[10] = {name: "STRAIGHT FLASH", point: STRAIGHTFLASH};
        this.handList[11] = {name: "R.STRAIGHT FLASH", point: ROYALSTRAIGHTFLASH};
        if (this.language == ENGLISH) {
            this.handList[1]  = {name: "NO PAIR", point: NOPAIR};
            this.handList[5]  = {name: "THREE OF A KIND", point: THREECARD};
            this.handList[8]  = {name: "FOUR OF A KIND", point: FOURCARD};
            this.handList[9]  = {name: "FIVE OF A KIND", point: FIVECARD};
            this.handList[11] = {name: "ROYAL FLASH", point: ROYALSTRAIGHTFLASH};
        }
    },

    _onLoadAssets: function() {
        //PhoneGap出ない場合、音声アセットを登録
        if (!PHONEGAP) {
            this.sounds
                .add("titleBGM")
                .add("mainBGM")
                .add("tutorialBGM")
                .add("countdown")
                .add("deal")
                .add("dist")
                .add("hand")
                .add("nopair");
        }
    },

    exitApp: function() {
        this.stop();
    },

    //設定データの保存
    saveConfig: function() {
        var saveObj = {
            "language": this.language,
            "lastScore": this.lastScore,
            "highScore": this.highScore,
            "volumeBGM": this.volumeBGM,
            "volumeSE": this.volumeSE,
        };
        localStorage.setItem("config", JSON.stringify(saveObj));
        return this;
    },

    //設定データの読み込み
    loadConfig: function() {
        var cfg = localStorage.getItem("config");
        if (cfg) {
            var c = JSON.parse(cfg);
            this.language = c.language;
            this.lastScore = c.lastScore;
            this.highScore = c.highScore;
            this.volumeBGM = c.volumeBGM;
            this.volumeSE = c.volumeSE;
        }
        return this;
    },

    playBGM: function(asset) {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
        }
        this.bgm = tm.asset.AssetManager.get(asset).clone();
        if (this.bgm) {
            this.bgm.loop = true;
            this.bgm.volume = this.volumeBGM*0.34;
            this.bgm.play();
            this.bgmIsPlay = true;
        }
        return this;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
        return this;
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
        return this;
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.volume = this.volumeBGM*0.34;
                this.bgm.resume();
                this.bgmIsPlay = true;
            }
        }
        return this;
    },

    setVolumeBGM: function(v) {
        this.pauseBGM();
        this.volumeBGM = v;
        this.resumeBGM();
        return this;
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.volumeSE*0.34;
            se.play();
        }
        return this;
    },

    setVolumeSE: function(v) {
        this.volumSE = v;
        return this;
    },
});

