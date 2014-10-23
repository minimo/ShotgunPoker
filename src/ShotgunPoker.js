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

    //ＢＧＭ＆効果音
    bgm: null,
    bgmIsPlay: false,
    volumeBGM: 3,
    volumeSE: 3,

    //スコア保存
    lastScore: 0,
    highScore: 0,

    //各種設定
    useJoker: USE_JOKER,
    returnJoker: RETURN_JOKER,
    returnJokerTuen: RETURN_JOKER_TURN,
    handList: null,

    language: JAPANESE,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = fps;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        shotgun.core = this;

        var loadingScene = tm.ui["LoadingScene"]({
            assets: assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return shotgun.WaitScene();
//                return shotgun.TitleScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);

        //役名一覧
        this.handList = [];
        this.handList[0]  = {name: $trans("MISS"), point: MISS};
        this.handList[1]  = {name: $trans("NO HAND"), point: NOHAND};
        this.handList[2]  = {name: $trans("ONE PAIR"), point: ONEPAIR};
        this.handList[3]  = {name: $trans("TWO PAIR"), point: TWOPAIR};
        this.handList[4]  = {name: $trans("FLASH"), point: FLASH};
        this.handList[5]  = {name: $trans("THREE CARD"), point: THREECARD};
        this.handList[6]  = {name: $trans("FULL HOUSE"), point: FULLHOUSE};
        this.handList[7]  = {name: $trans("STRAIGHT"), point: STRAIGHT};
        this.handList[8]  = {name: $trans("FOUR CARD"), point: FOURCARD};
        this.handList[9]  = {name: $trans("FIVE CARD"), point: FIVECARD};
        this.handList[10] = {name: $trans("STRAIGHT FLASH"), point: STRAIGHTFLASH};
        this.handList[11] = {name: $trans("R.STRAIGHT FLASH"), point: ROYALSTRAIGHTFLASH};
    },

    _onLoadAssets: function() {
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
        localStorage.setItem("config", JSON.stringfy(saveObj));
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
            this.volumeSE = c.bolumeSE;
        }
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
        return this.bgm;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.resume();
                this.bgm.volume = this.volumeBGM*0.34;
                this.bgmIsPlay = true;
            }
        }
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.volumeSE*0.34;
            se.play();
        }
        return se;
    },
});

