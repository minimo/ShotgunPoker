/*
 *  TutorialScene.js
 *  2014/11/12
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.TutorialScene", {
    superClass: tm.app.Scene,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,

    //タッチ情報
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //デモンストレーション用カードデッキ
    deck: null,
    shuffled: false,

    //制御情報
    pick: true,
    phase: 0,
    life: 3,
    score: 0,

    //ボタン用フォントパラメータ
    buttonParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:4 },
    labelParam: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:4 },
    scoreParam: {fontFamily:"'azuki'", align: "left", baseline:"middle", outlineWidth:2 },

    labelParamBasic: {fontFamily: "'azuki'", align: "left", baseline: "middle",outlineWidth: 3},
    labelParamBasicCenter: {fontFamily: "'azuki'", align: "center", baseline: "middle",outlineWidth: 3},
    labelParamPoker: {fontFamily: "'KS-Kohichi-FeltPen'",align: "center", baseline: "middle", outlineWidth: 3},
    labelParamHand:  {fontFamily: "'KS-Kohichi-FeltPen'",align: "left", baseline: "middle", outlineWidth: 3},
    labelParamBefore:{fontFamily: "'azuki'",align: "left", baseline: "top", outlineWidth: 3},
    labelParamMsg: {fontFamily:"'azuki'", align: "center", baseline:"middle", outlineWidth:1 },

    bgColor: 'rgba(50, 150, 50, 1)',

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
//        this.checkHierarchy = true;

        //バックグラウンド
        this.bg = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: this.bgColor, strokeStyle: this.bgColor});

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this);
        this.deck.startup();
        this.deck.shuffle();

        //戻るボタン
        var width = 210, height = 60;
        shotgun.Button(width, height, "←BACK")
            .addChildTo(this)
            .setPosition(SC_W*0.84, 72)
            .addEventListener("pushed", function() {
                appMain.popScene();
            });

        //スコア表示
        var that = this;
        this.scoreLabel = tm.display.OutlineLabel("SCORE:", 50)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 72);
        this.scoreLabel.score = 0;
        this.scoreLabel.update = function() {
            this.text = "SCORE:"+this.score;
            if (this.score < that.score) {
                var s = ~~((that.score-this.score)/11);
                if (s < 3) s=3;
                this.score += s;
                if (this.score > that.score)this.score = that.score;
            }
        }

        //ライフ表示
        this.lifeLabel = tm.display.OutlineLabel("LIFE:", 50)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 128);
        this.lg = [];
        for (var i = 0; i < 7; i++ ) {
            var c = this.lg[i] = shotgun.Card(SUIT_HEART, 0).addChildTo(this);
            c.setScale(0.2);
            c.setPosition( 155+i*45, 128);
            c.life = i;
            c.update = function() {
                this.pattern = that.life+this.suit*13-1;
                if (this.life < that.life) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            }
        }

        //直前の役表示
        var by = SC_H*0.8+CARD_H*CARD_SCALE*0.5;
        this.beforeLabel = tm.display.OutlineLabel("BEFORE:", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(8, by);
        this.beforeHand = tm.display.OutlineLabel("nothing", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(120, by);
        this.beforeHand.name = "";
        this.beforeHand.alert = false;
        this.beforeHand.update = function() {
            if (this.alert) {
                this.fillStyle = "Red";
            } else {
                this.fillStyle = "White";
            }
            this.text = this.name;
        }

        //デモンストレーション表示
        this.demo = tm.display.OutlineLabel("TUTORIAL", 80)
            .addChildTo(this)
            .setParam(this.labelParam)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.demo.time = 1;
        this.demo.update = function() {
            if (this.time % 30 == 0) this.visible = !this.visible;
            this.time++;
        }

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //チュートリアルコントローラー
        this.ctrl = tm.app.Object2D().addChildTo(this);

        this.time = 0;
    },

    onresume: function() {
        this.mask.tweener.clear().fadeOut(200);
    },

    setupTitle: function() {
    },

    addButton: function(page, finish) {
        var that = this;
        var width = 230, height = 60;
        var param = {fillStyle:'rgba(0,80,0,1)', lineWidth:4};

        //戻る
        shotgun.Button(width, height, "PREV")
            .addChildTo(this.titleLayer)
            .setPosition(SC_W*0.25+SC_W*page, SC_H*0.9)
            .addEventListener("pushed", function() {
                that.titleLayer.tweener.clear().moveBy(SC_W, 0, 500, "easeOutQuint");
            });

        if (!finish) {
            //次
            shotgun.Button(width, height, "NEXT")
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.75+SC_W*page, SC_H*0.9)
                .addEventListener("pushed", function() {
                    that.titleLayer.tweener.clear().moveBy(-SC_W, 0, 500, "easeOutQuint");
                });
        } else {
            //終了
            shotgun.Button(width, height, "EXIT")
                .addChildTo(this.titleLayer)
                .setPosition(SC_W*0.75+SC_W*page, SC_H*0.9)
                .addEventListener("pushed", function() {
                    that.titleLayer.tweener.clear().moveBy(SC_W*page, 0, 500, "easeOutQuint");
                });
        }
    },

    update: function() {
        if (this.phase == 0) {
            this.startPhase1();
            this.phase++;
        }
        this.time++;
    },

    //メッセージ表示
    enterMessage: function(time, msg1) {
        var bg = tm.display.Shape(SC_W, 100)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.3)
            .renderRectangle({fillStyle: this.bgColor, strokeStyle: this.bgColor});
//        bg.tweener.wait(time).call(function(){this.remove();}.bind(bg));

        var m1 = tm.display.OutlineLabel(msg1, 45)
            .addChildTo(this)
            .setParam(this.labelParamMsg)
            .setPosition(SC_W*0.5, SC_H*0.3);
        m1.tweener.wait(time).call(function(){this.remove();}.bind(m1));
    },

    //基本操作説明
    startPhase1: function() {
        this.enterMessage(5000, "場にあるカードを５枚選んで");

        var that = this;
        this.ctrl.tweener.clear().wait(2000);
        for (var i = 0; i < 5; i++) {
            this.ctrl.tweener
                .call(function(){
                    var c = that.deck.pickCard(SC_W*0.5, SC_H*0.3);
                    if (c) that.deck.addHand(c);
                }).wait(500);
        }
        this.ctrl.tweener.call(function(){
            that.deck.sortHand();
            that.enterMessage(5000, "ポーカーの役を作ってください");
        }).wait(500);
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;

        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;
        this.moveX = 0;
        this.moveY = 0;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
        var moveX = Math.abs(sx - this.beforeX);
        var moveY = Math.abs(sx - this.beforeY);

        if (!this.shuffled) {
            if (moveX > 300) {
                this.deck.shuffle();
                this.shuffled = true;
            }
        }

        if (this.time % 10 == 0) {
            this.beforeX = sx;
            this.beforeY = sy;
        }
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        this.touchID = -1;

        var sx = e.pointing.x;
        var sy = e.pointing.y;

        if (this.pick && !this.shuffled && !this.deck.busy) {
            var c = this.deck.pickCard(sx, sy);
            if (c) this.deck.addHand(c);
        }
        this.shuffled = false;
    },
});
