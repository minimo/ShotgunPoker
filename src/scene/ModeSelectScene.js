/*
 *  ModeSelectScene.js
 *  2015/01/07
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.ModeSelectScene", {
    superClass: tm.app.Scene,

    answer: null,

    //ラベル用フォントパラメータ
    labelParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:4 },

    init: function() {
        this.superInit();

        //バックグラウンド
        tm.display.RectangleShape(SC_W, SC_H, {fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);

        var that = this;
        var width = SC_W*0.4, height = SC_H*0.5;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        var buttonStyle = {
            buttonColor: appMain.bgColor,
            lineColor: 'rgba(200, 200, 200, 0.5)',
            lineWidth: 3,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            fontFamily: "Yasashisa",
            fontSize: 60,
            radius: 32,
        }

        var that = this;
        //目隠し
        this.mask = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(300);

        //Normal
        shotgun.Button(width, height, "NOMAL", buttonStyle)
            .addChildTo(this)
            .setPosition(SC_W*0.25, SC_H*0.5)
            .addEventListener("pushed", function() {
                appMain.bonusLife = 0;
                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.replaceScene(shotgun.MainScene());});
            });

        //Hard
        shotgun.Button(width, height, "HARD", buttonStyle)
            .addChildTo(this)
            .setPosition(SC_W*0.75, SC_H*0.5)
            .addEventListener("pushed", function() {
                appMain.bonusLife = 0;
                that.mask.tweener.clear().fadeIn(200).call(function(){appMain.replaceScene(shotgun.MainScene());});
            });
    },
});
