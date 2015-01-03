/*
 *  LoadingScene.js
 *  2014/12/09
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.LoadingScene", {
    superClass: "tm.app.Scene",

    init: function(param) {
        this.superInit();

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

        this.fromJSON({
            children: {
                stage: {
                    type: "tm.display.CanvasElement",
                },
            }
        });

        this.stage.fromJSON({
            children: {
                bg: {
                    type: "tm.display.Shape",
                    init: [param.width, param.height],
                    originX: 0,
                    originY: 0,
                },
                piyoLayer: {
                    type: "tm.display.CanvasElement",
                },
                label: {
                    type: "tm.display.Label",
                    text: "LOADING",
                    x: param.width/2,
                    y: param.height/2-20,
                    align: "center",
                    baseline: "middle",
                    fontSize: 46,
                    shadowBlur: 4,
                    shadowColor: "hsl(190, 100%, 50%)",
                },
                bar: {
                    type: "tm.ui.Gauge",
                    init: [{
                        width: param.width,
                        height: 10,
                        color: "hsl(200, 100%, 80%)",
                        bgColor: "transparent",
                        borderColor: "transparent",
                        borderWidth: 0,
                    }],
                    x: 0,
                    y: 0,
                },
            }
        });

        // bg
        var bg = this.stage.bg;
        bg.canvas.clearColor(param.bgColor);

        // label
        var label = this.stage.label;
        label.tweener
            .to({alpha:1}, 1000)
            .to({alpha:0.5}, 1000)
            .setLoop(true)

        // bar
        var bar = this.stage.bar;
        bar.animationFlag = false;
        bar.value = 0;
        bar.animationFlag = true;
        bar.animationTime = 100;

        var stage = this.stage;
        stage.alpha = 0.0;
        stage.tweener.clear().fadeIn(100).call(function() {
            if (param.assets) {
                var loader = tm.asset.Loader();
                loader.onload = function() {
                    stage.tweener.clear().wait(200).fadeOut(200).call(function() {
                        if (param.nextScene) {
                                this.app.replaceScene(param.nextScene());
                        }
                        var e = tm.event.Event("load");
                        this.fire(e);
                    }.bind(this));
                }.bind(this);

                loader.onprogress = function(e) {
                    // update bar
                    bar.value = e.progress*100;

                    // dispatch event
                    var event = tm.event.Event("progress");
                    event.progress = e.progress;
                    this.fire(event);
                }.bind(this);

                loader.load(param.assets);
            }
        }.bind(this));
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
        appMain.sounds.add("extend",      "assets/ta_ta_sharara02.mp3");

        //Admob setting
        if (ENABLE_PHONEGAP && AdMob) {
            AdMob.createBanner({
                adId:admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER
            });
        }
    },
});
