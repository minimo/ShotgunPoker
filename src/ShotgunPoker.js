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

    lastScore: 0,
    highScore: 0, 

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
//                return shotgun.MainScene();
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
        if (this.bgm) this.bgm.stop();
        this.bgm = tm.asset.AssetManager.get(asset);
        if (this.bgm) {
            this.bgm.loop = true;
            this.bgm.play();
        }
        return this.bgm;
    },

    stopBGM: function() {
        if (this.bgm) this.bgm.stop();
        return this.bgm;
    },
});

