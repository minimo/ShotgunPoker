/*
 *  AchievementScene.js
 *  2015/02/09
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.DebugScene", {
    superClass: tm.app.Scene,

    //タッチ情報
    startX: 0,
    startY: 0,
    touchTime: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //クレジットラベル用パラメータ
    headerParam: {fontFamily:"CasinoRegular", align: "center", baseline:"middle", outlineWidth:2 },
    labelParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:2 },

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        this.base = tm.display.RectangleShape({width: SC_W, height: SC_H*0.2, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this);

        tm.display.RectangleShape({width: SC_W, height: SC_H*0.15, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setOrigin(0.5, 0)
            .setPosition(SC_W*0.5, 0);
        tm.display.RectangleShape({width: SC_W, height: SC_H*0.23, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setOrigin(0.5, 1)
            .setPosition(SC_W*0.5, SC_H);

        var that = this;
        tm.display.OutlineLabel("INFOMATION", 60)
            .addChildTo(this)
            .setParam(this.headerParam)
            .setPosition(SC_W*0.5, SC_H*0.1);
        shotgun.Button(SC_W*0.6, 80, "", {flat: appMain.buttonFlat, fontSize: 50})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.1)
            .setVisible(false)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeOut(200);
                appMain.popScene();
            });

        var that = this;
        var y = 0;
        tm.display.OutlineLabel("DEBUG : "+(DEBUG? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("DEVICE_IOS : "+(DEVICE_IOS? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("DEVICE_ANDROID : "+(DEVICE_ANDROID? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("ENABLE_PHONEGAP : "+(ENABLE_PHONEGAP? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("DEBUG_PHONEGAP : "+(DEBUG_PHONEGAP? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("ENABLE_GAMECENTER : "+(ENABLE_GAMECENTER? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("DEBUG_GAMECENTER : "+(DEBUG_GAMECENTER? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("ENABLE_ADMOB : "+(ENABLE_ADMOB? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("DEBUG_ADMOB : "+(DEBUG_ADMOB? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("TEST_ADMOB : "+(TEST_ADMOB? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("ENABLE_SOCIAL : "+(ENABLE_SOCIAL? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("ENABLE_ACHIEVEMENT : "+(ENABLE_ACHIEVEMENT? "true": "false"), 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
/*
        tm.display.OutlineLabel("admobid.banner : "+admobid.banner, 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
        tm.display.OutlineLabel("admobid.interstitial : "+admobid.interstitial, 20).addChildTo(that.base).setParam(that.labelParam).setPosition(SC_W*0.5, SC_H*0.2+SC_H*y*0.06);
        y++;
*/
        //戻るボタン
        var width = SC_W, height = 100;
        shotgun.Button(width, height, "RETURN TO TITLE", {flat: appMain.buttonFlat, fontSize:50})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.85)
            .addEventListener("pushed", function() {
                that.mask.tweener.clear().fadeOut(200);
                appMain.popScene();
            });

        //目隠し
        this.mask = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);

        this.time = 0;
    },

    setup: function() {
    },

    update: function() {
        this.time++;
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;
        this.moveX = 0;
        this.moveY = 0;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
        var sx = e.pointing.x;
        var sy = e.pointing.y;
        var moveX = Math.floor(sx - this.beforeX);
        var moveY = Math.floor(sy - this.beforeY);

        this.base.y += moveY;
        if (this.base.y > 0) this.base.y = 0;
        if (this.base.y < -SC_H*1.8) this.base.y = -SC_H*1.8;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
    },
});


