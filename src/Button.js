/*
 *  Button.js
 *  2014/06/24
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.Button", {
    superClass: tm.display.CanvasElement,

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

    text: "",
    push: false,
    lock: false,

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
            var e = tm.event.Event("push");
            this.dispatchEvent(e);
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
                this.push = false;
                this.button.x -= this.downX;
                this.button.y -= this.downY;

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
        var shadowStyle = {
            fillStyle: style.shadowColor,
            strokeStyle: style.shadowColor,
            lineWidth: style.lineWidth
        };
        this.shadow = tm.display.RectangleShape(width, height, shadowStyle)
            .addChildTo(this)
            .setPosition(this.downX, this.downY);
        this.shadow.blendMode = "source-over";

        //ボタン本体
        var buttonStyle = {
            fillStyle: style.buttonColor,
            strokeStyle: style.lineColor,
            lineWidth: style.lineWidth
        };
        this.button = tm.display.RectangleShape(width, height, buttonStyle)
            .addChildTo(this);

        //ボタンラベル
        this.labelParam.fontFamily = style.fontFamily;
        this.label = tm.display.OutlineLabel(this.text, style.fontSize)
            .addChildTo(this.button)
            .setParam(this.labelParam);
    },
    setVisible: function(b) {
        this.shadow.visible = b;
        this.button.visible = b;
        this.label.visible = b;
        this.lock = !b;
        return this;
    },
    setLock: function(b) {
        this.lock = b;
        return this;
    },
});

tm.define("shotgun.RoundButton", {
    superClass: tm.display.CanvasElement,

    //描画スタイル設定
    DEFAULT_STYLE: {
        buttonColor: 'rgba(50, 150, 255, 0.8)',
        lineColor: 'rgba(200, 200, 200, 0.5)',
        lineWidth: 4,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "azuki",
        fontSize: 50,
        radius: 16,
    },

    labelParam: {fontFamily: "azuki", align: "center", baseline:"middle", outlineWidth:3 },

    text: "",
    push: false,
    lock: false,

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
            var e = tm.event.Event("push");
            this.dispatchEvent(e);
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
                this.push = false;
                this.button.x -= this.downX;
                this.button.y -= this.downY;

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
        var shadowStyle = {
            fillStyle: style.shadowColor,
            strokeStyle: style.shadowColor,
            lineWidth: style.lineWidth,
            radius: style.radius,
        };
        this.shadow = tm.display.RoundRectangleShape(width, height, shadowStyle)
            .addChildTo(this)
            .setPosition(this.downX, this.downY);
        this.shadow.blendMode = "source-over";

        //ボタン本体
        var buttonStyle = {
            fillStyle: style.buttonColor,
            strokeStyle: style.lineColor,
            lineWidth: style.lineWidth,
            radius: style.radius,
        };
        this.button = tm.display.RoundRectangleShape(width, height, buttonStyle)
            .addChildTo(this);

        //ボタンラベル
        this.labelParam.fontFamily = style.fontFamily;
        this.label = tm.display.OutlineLabel(this.text, style.fontSize)
            .addChildTo(this.button)
            .setParam(this.labelParam);
    },
    setLock: function(b) {
        this.lock = b;
        return this;
    },
});

tm.define("shotgun.ToggleButton", {
    superClass: tm.display.CanvasElement,

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

    onText: "",
    offText: "",
    push: false,
    lock: false,
    _toggleON: false,

    //ボタン押下時の移動量
    downX: 0,
    downY: 10,

    init: function(width, height, onText, offText, style) {
        this.superInit();

        this.width = width || 200;
        this.height = height || 80;
        this.onText = onText || "";
        this.offText = offText || "";

        this.text = this.offText;

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
            if (this._toggleON) {
                this.button.x += this.downX*0.5;
                this.button.y += this.downY*0.5;
            } else {
                this.button.x += this.downX*1.5;
                this.button.y += this.downY*1.5;
            }

            var e = tm.event.Event("push");
            this.dispatchEvent(e);
        });
        this.addEventListener("touchmove", function(e) {
            if (this.lock) return;

            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                if (!this.push) {
                    this.push = true;
                    if (this._toggleON) {
                        this.button.x += this.downX*0.5;
                        this.button.y += this.downY*0.5;
                    } else {
                        this.button.x += this.downX*1.5;
                        this.button.y += this.downY*1.5;
                    }
                }
            } else {
                if (this.push) {
                    this.push = false;
                    if (this._toggleON) {
                        this.button.x -= this.downX*0.5;
                        this.button.y -= this.downY*0.5;
                    } else {
                        this.button.x -= this.downX*1.5;
                        this.button.y -= this.downY*1.5;
                    }
                }
            }
        });
        this.addEventListener("touchend", function(e) {
            if (this.lock) return;

            var pt = e.pointing;
            if (this.isHitPoint(pt.x, pt.y)) {
                this.push = false;
                this._toggleON = !this._toggleON;
                if (this._toggleON) {
                    this.text = this.onText;
                    this.button.x -= this.downX*0.5;
                    this.button.y -= this.downY*0.5;
                } else {
                    this.text = this.offText;
                    this.button.x -= this.downX*1.5;
                    this.button.y -= this.downY*1.5;
                }
                this.label.text = this.text;
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
        var shadowStyle = {
            fillStyle: style.shadowColor,
            strokeStyle: style.shadowColor,
            lineWidth: style.lineWidth
        };
        this.shadow = tm.display.RectangleShape(width, height, shadowStyle)
            .addChildTo(this)
            .setPosition(this.downX, this.downY);
        this.shadow.blendMode = "source-over";

        //ボタン本体
        var buttonStyle = {
            fillStyle: style.buttonColor,
            strokeStyle: style.lineColor,
            lineWidth: style.lineWidth
        };
        this.button = tm.display.RectangleShape(width, height, buttonStyle)
            .addChildTo(this);

        //ボタンラベル
        this.labelParam.fontFamily = style.fontFamily;
        this.label = tm.display.OutlineLabel(this.text, style.fontSize)
            .addChildTo(this.button)
            .setParam(this.labelParam);
    },
    setLock: function(b) {
        this.lock = b;
        return this;
    },
});

shotgun.ToggleButton.prototype.accessor("toggleON", {
    "set": function(b) {
        this._toggleON = b;

        if (this._toggleON) {
            this.button.x = this.downX;
            this.button.y = this.downY;
            this.text = this.onText;
        } else {
            this.button.x = 0;
            this.button.y = 0;
            this.text = this.offText;
        }
        this.label.text = this.text;
    },

    "get": function() {
        return this._toggleON;
    },
});



tm.define("shotgun.SlideButton", {
    superClass: tm.display.CanvasElement,

    //描画スタイル設定
    DEFAULT_STYLE: {
        width: 160,
        height: 80,

        buttonWitdh: 80,
        buttonHeight: 80,

        //ボタン色
        buttonColor: 'rgba(255, 255, 255, 1.0)',
        buttonLine:  'rgba(200, 200, 200, 1.0)',
        lineWidth: 2,

        //ベース(on/off)色
        onColor: 'rgba(0, 255, 0, 1.0)',
        offColor: 'rgba(200, 200, 200, 1.0)',
    },

    style: null,

    _slideON: false,

    init: function(style) {
        this.superInit();

        this.style = style || {};
        this.style.$safe(this.DEFAULT_STYLE)

        this.width = style.width || 160;
        this.height = style.height || 80;

        this.text = this.offText;

        //セットアップ
        this.setup();

        //判定処理設定
        this.interactive = true;
        this.boundingType = "rect";
//        this.checkHierarchy = true;

        //イベントリスナ登録
        this.addEventListener("touchstart", function() {
            if (this._slideON) {
            } else {
            }
            var e = tm.event.Event("slide");
            this.dispatchEvent(e);
        });
    },

    setup: function() {
        //登録済みの場合破棄する
        if (this.shadow) {
            this.shadow.remove();
            this.label.remove();
            this.button.remove();
        }

        var style = this.style;
        var width = this.width, height = this.height;
        var buttonWidth = this.button, heightButton = this.heightButton;

        //ボタンベース
        var baseStyle = {fillStyle: style.offColor, strokeStyle: style.offColor, lineWidth:  style.lineWidth};
        this.button = tm.display.RectangleShape(width, height, buttonStyle)
            .addChildTo(this);

        //ボタン本体
        var buttonStyle = {fillStyle: style.buttonColor, strokeStyle: style.lineColor, lineWidth:  style.lineWidth};
        this.button = tm.display.RectangleShape(buttonWidth, buttonHeight, buttonStyle)
            .addChildTo(this);
    },
});

shotgun.SlideButton.prototype.accessor("slideON", {
    "set": function(b) {
        this._slideON = b;

        if (this._slideON) {
        } else {
        }
    },

    "get": function() {
        return this._slideON;
    },
});
