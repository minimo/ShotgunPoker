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
    buttonColor: 'rgba(20, 100, 20, 1)',
    shadowColor: 'rgba(0, 0, 0, 1)',
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:3 },

    text: "",
    push: false,

    //ボタン押下時の移動量
    downX: 3,
    downY: 10,

    init: function(width, height, text, style) {
        this.superInit();

        this.width = width || 200;
        this.height = height || 80;
        this.text = text || "";

        //セットアップ
        this.setup();

        //判定処理設定
        this.interactive = true;
        this.checkHierarchy = true;
        this.boundingType = "rect";

        //イベントリスナ登録
        this.addEventListener("pointingstart", function() {
            this.push = true;
            this.button.x += this.downX;
            this.button.y += this.downY;
        });
        this.addEventListener("pointingmove", function(e) {
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
        this.addEventListener("pointingend", function(e) {
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

    setup: function() {
        //登録済みの場合破棄する
        if (this.shadow) {
            this.shadow.remove();
            this.label.remove();
            this.button.remove();
        }

        var width = this.width, height = this.height;

        //ボタン影
        this.shadow = tm.display.RectangleShape(width, height, {fillStyle: this.shadowColor, strokeStyle: this.shadowColor, lineWidth: 4})
            .addChildTo(this);
        //ボタン本体
        this.button = tm.display.RectangleShape(width, height, {fillStyle: this.buttonColor, strokeStyle: this.buttonColor, lineWidth: 4})
            .addChildTo(this)
            .setPosition(-this.downX, -this.downY);
        //ボタンラベル
        this.label = tm.display.OutlineLabel(this.text, 50)
            .addChildTo(this.button)
            .setParam(this.labelParam);
    },
});