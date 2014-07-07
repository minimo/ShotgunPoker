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
    volumeBGM: 6,
    volumeSE: 6,

    //スコア保存
    lastScore: 0,
    highScore: 0,

    //各種設定
    useJoker: USE_JOKER,
    returnJoker: RETURN_JOKER,
    handList: null,

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
            nextScene: function() {
                this._onLoadAssets();
                return shotgun.TitleScene();
            }.bind(this),
        });
        loadingScene.bg.canvas.clearColor("black");
        this.replaceScene(loadingScene);

        //役名一覧
        this.handList = [];
        this.handList[0]  = {name: "MISS", point: MISS};
        this.handList[1]  = {name: "NO HAND", point: NOHAND};
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

        this.checkDevice();
    },

    //実行環境チェック
    checkDevice: function() {
        this.isPad = (navigator.userAgent.indexOf('iPad')+1?true:false);
        this.isPod = (navigator.userAgent.indexOf('iPad')+1?true:false);
        this.isPhone = (navigator.userAgent.indexOf('iPhone')+1?true:false);
        this.isAndroid = (navigator.userAgent.indexOf('Android')+1?true:false);
        this.isiOS4 = navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i)!==null;
        this.isiOS5 = navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i)!==null;
        this.isiOS6 = navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i)!==null;

        if (PHONEGAP) {
            this.version = window.device.version;
            this.model = window.device.name;
            this.uuid = window.device.uuid;
            this.pageY = $('body').height();
            this.pageX = $('body').width();
        }
    },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
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
            this.bgm.volume = this.volumeBGM*0.1;
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
                this.bgmIsPlay = true;
            }
        }
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.volumeSE*0.1;
            se.play();
        }
        return se;
    },
});

