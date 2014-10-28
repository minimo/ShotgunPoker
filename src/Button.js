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
    down: 5,

    init: function(width, height, text) {
        this.superInit(width, height, {fillStyle:'rgba(0,80,0,1)', lineWidth:4});

        this.interactive = true;
        this.checkHierarchy = true;
        this.boundingType = "rect";
        this.addEventListener("pointingstart", function() {
            this.push = true;
            this.y += this.down;
        });
        this.addEventListener("pointingmove", function(e) {
            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                if (!this.push) {
                    this.push = true;
                    this.y += this.down;
                }
            } else {
                if (this.push) {
                    this.push = false;
                    this.y -= this.down;
                }
            }
        });
        this.addEventListener("pointingend", function(e) {
            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                this.y -= this.down;
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