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

    bgm: null,
    bgmVolume: 1.0,
    seVolume: 1.0,

    lastScore: 0,
    highScore: 0,

    useJoker: USE_JOKER,
    returnJoker: RETURN_JOKER,

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
  },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
    },
    
    playBGM: function(asset) {
        if (this.bgm) {
            if (this.bgm.isPlay) this.bgm.stop();
        }
        this.bgm = tm.asset.AssetManager.get(asset).clone();
        if (this.bgm) {
            this.bgm.loop = true;
            this.bgm.volume = this.bgmVolume;
            this.bgm.play();
        }
        return this.bgm;
    },

    stopBGM: function() {
        if (this.bgm) this.bgm.stop();
        return this.bgm;
    },

    playSE: function(asset) {
        var se = tm.asset.AssetManager.get(asset).clone();
        if (se) {
            se.loop = false;
            se.volume = this.seVolume;
            se.play();
        }
        return se;
    },
});

