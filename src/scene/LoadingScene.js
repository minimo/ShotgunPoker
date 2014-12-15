/*
 *  LoadingScene.js
 *  2014/12/09
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.LoadingScene", {
    superClass: "tm.ui.LoadingScene",

    init: function() {
        var param = {
            assets: assets,
            width: SC_W,
            height: SC_H,
            bgColor: 'rgba(50, 110, 50, 1)',
            nextScene: function() {
                this._onLoadAssets();
                return shotgun.TitleScene();
            }.bind(this),
        };
        this.superInit(param);
    },

    _onLoadAssets: function() {
        appMain.sounds.add("titleBGM",    "assets/game_maoudamashii_5_casino02.mp3");
        appMain.sounds.add("mainBGM",     "assets/game_maoudamashii_5_casino01.mp3");
        appMain.sounds.add("tutorialBGM", "assets/game_maoudamashii_5_casino04.mp3");
        appMain.sounds.add("countdown",   "assets/se_countdown.mp3");
        appMain.sounds.add("deal",        "assets/se_deal.mp3");
        appMain.sounds.add("dist",        "assets/se_maoudamashii_se_paper01.mp3");
        appMain.sounds.add("hand",        "assets/se_hand.mp3");
        appMain.sounds.add("nopair",      "assets/se_nopair.mp3");

        if(PHONEGAP && AdMob) {
            AdMob.createBanner({
                adId:admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                autoShow:true
            });
        }
    },
});
