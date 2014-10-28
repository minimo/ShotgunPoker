/*
 *  Button.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.Button", {
    superClass: tm.display.RoundRectangleShape,

    //ラベル用フォントパラメータ
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:3 },

    push: false,

    //ボタン押下時の移動量
    downX: 0,
    downY: 5,

    init: function(width, height, text) {
        this.superInit(width, height, {fillStyle:'rgba(0,80,0,1)', lineWidth:4});

        this.interactive = true;
        this.checkHierarchy = true;
        this.boundingType = "rect";
        this.addEventListener("pointingstart", function() {
            this.push = true;
            this.x += this.downX;
            this.y += this.downY;
        });
        this.addEventListener("pointingmove", function(e) {
            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                if (!this.push) {
                    this.push = true;
                    this.x += this.downX;
                    this.y += this.downY;
                }
            } else {
                if (this.push) {
                    this.push = false;
                    this.x -= this.downX;
                    this.y -= this.downY;
                }
            }
        });
        this.addEventListener("pointingend", function(e) {
            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                this.x -= this.downX;
                this.y -= this.downY;
                this.push = false;

                var e = tm.event.Event("pushed");
                this.dispatchEvent(e);
            }
        });

        tm.display.OutlineLabel(text, 50)
            .addChildTo(this)
            .setParam(this.labelParam);
    },
});