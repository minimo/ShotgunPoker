/*
 *  Button.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.Button", {
    superClass: tm.app.Object2D,

    //���x���p�t�H���g�p�����[�^
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:3 },

    push: false,

    //�{�^���������̈ړ���
    downX: 0,
    downY: 5,

    init: function(width, height, text, style) {
        this.superInit();
        this.width = width;
        this.height = height;

        //�{�^���e
        this.shadow = tm.display.RoundRectangleShape(width, height, {fillStyle:'rgba(0,0,0,1)', strokeStyle:'rgba(0,0,0,1)', lineWidth:4})
            .addChildTo(this)
            .setPosition(this.downX, this.downY);

        //�{�^���{��
        this.button = tm.display.RoundRectangleShape(width, height, {fillStyle:'rgba(0,80,0,1)', lineWidth:4})
            .addChildTo(this);

        //�{�^�����x��
        this.label = tm.display.OutlineLabel(text, 50)
            .addChildTo(this.button)
            .setParam(this.labelParam);

        //���菈���ݒ�
        this.interactive = true;
        this.checkHierarchy = true;
        this.boundingType = "rect";

        //�C�x���g���X�i�o�^
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
});