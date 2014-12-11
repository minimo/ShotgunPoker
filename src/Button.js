/*
 *  Button.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.Button", {
    superClass: tm.app.Object2D,

    //描画スタイル設定
    DEFAULT_STYLE: {
        buttonColor: 'rgba(50, 150, 255, 0.8)',
        lineColor: 'rgba(200, 200, 200, 0.5)',
        lineWidth: 4,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "azuki",
        fontSize: 50,
    },
    labelParam: {fontFamily: "azuki", align: "center", baseline:"middle", outlineWidth:3 },

    type: 0, //0:nomal 1:toggle
    text: "",
    push: false,
    lock: false,
    toggleOn: false,

    //ボタン押下時の移動量
    downX: 0,
    downY: 10,

    init: function(width, height, text, style) {
        this.superInit();

        this.width = width || 200;
        this.height = height || 80;
        this.text = text || "";

        //セットアップ
        this.setup(style);

        //判定処理設定
        this.interactive = true;
        this.boundingType = "rect";
//        this.checkHierarchy = true;

        //イベントリスナ登録
        this.addEventListener("touchstart", function() {
            if (this.lock) return;

            this.push = true;
            this.button.x += this.downX;
            this.button.y += this.downY;
        });
        this.addEventListener("touchmove", function(e) {
            if (this.lock) return;

            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                if (!this.push) {
                    this.push = true;
                    this.button.x += this.downX;
                    this.button.y += this.downY;
                }
            } else {
                if (this.push) {
                    this.push = false;
                    this.button.x -= this.downX;
                    this.button.y -= this.downY;
                }
            }
        });
        this.addEventListener("touchend", function(e) {
            if (this.lock) return;

            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                this.button.x -= this.downX;
                this.button.y -= this.downY;
                this.push = false;

                var e = tm.event.Event("pushed");
                this.dispatchEvent(e);
            }
        });
    },

    setup: function(style) {
        style = style || {};
        style.$safe(this.DEFAULT_STYLE)

        //登録済みの場合破棄する
        if (this.shadow) {
            this.shadow.remove();
            this.label.remove();
            this.button.remove();
        }

        var width = this.width, height = this.height;

        //ボタン影
        this.shadow = tm.display.RectangleShape(width, height, {fillStyle: style.shadowColor, strokeStyle: style.shadowColor, lineWidth: style.lineWidth})
            .addChildTo(this)
            .setPosition(this.downX, this.downY);
        this.shadow.blendMode = "source-over";

        //ボタン本体
        this.button = tm.display.RectangleShape(width, height, {fillStyle: style.buttonColor, strokeStyle: style.lineColor, lineWidth:  style.lineWidth})
            .addChildTo(this);
//        this.button.blendMode = "lighter";

        //ボタンラベル
        this.labelParam.fontFamily = style.fontFamily;
        this.label = tm.display.OutlineLabel(this.text, style.fontSize)
            .addChildTo(this.button)
            .setParam(this.labelParam);
    },
});