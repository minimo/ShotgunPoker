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
    sounds: null,

    //ボーナスライフ
    bonusLife: 0,

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

        //サウンドセット
        this.sounds = shotgun.SoundSet(MEDIA_DEFAULT);

        //設定情報の読み込み
        this.loadConfig();

        //アセット読み込み
        var loadingScene = shotgun.LoadingScene();
        this.replaceScene(loadingScene);
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
            "volumeBGM": this.sounds.volumeBGM,
            "volumeSE": this.sounds.volumeSE,
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
            this.sounds.volumeBGM = c.volumeBGM;
            this.sounds.volumeSE = c.volumeSE;
        }
        return this;
    },

    playBGM: function(asset) {
        this.sounds.playBGM(asset);
        return this;
    },

    stopBGM: function() {
        this.sounds.stopBGM();
        return this;
    },

    playSE: function(asset) {
        this.sounds.playSE(asset);
        return this;
    },
});

