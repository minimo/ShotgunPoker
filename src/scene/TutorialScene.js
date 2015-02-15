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
    limitCount: 300,
    limitMax: 300,
    count: 10,
    countDown: false,
    onePair: 0,

    //ボタン用フォントパラメータ
    buttonParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:4 },
    labelParam: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:4 },
    scoreParam: {fontFamily:"Yasashisa", align: "left", baseline:"middle", outlineWidth:2 },

    labelParamBasic: {fontFamily: "Yasashisa", align: "left", baseline: "middle",outlineWidth: 3},
    labelParamBasicCenter: {fontFamily: "Yasashisa", align: "center", baseline: "middle",outlineWidth: 3},
    labelParamPoker: {fontFamily: "CasinoRegular",align: "center", baseline: "middle", outlineWidth: 3},
    labelParamHand:  {fontFamily: "CasinoRegular",align: "left", baseline: "middle", outlineWidth: 3},
    labelParamBefore:{fontFamily: "Yasashisa",align: "left", baseline: "top", outlineWidth: 3},
    labelParamMsg: {fontFamily:"Yasashisa", align: "center", baseline:"middle", outlineWidth:1 },
    labelParamModeName: {fontFamily: "Yasashisa", align: "right", baseline: "middle",outlineWidth: 3, fontWeight:700},

    bgColor: 'rgba(50, 150, 50, 1)',

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.RectangleShape({width: SC_W, height: SC_H, fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this);
        this.deck.startup();
        this.deck.shuffle();
        this.deck.shuffleLimit = 28;

        //戻るボタン
        var width = 210, height = 60;
        var text = "←BACK";
        if (appMain.firstGame) text = "SKIP";
        shotgun.Button(width, height, text, {flat: appMain.buttonFlat, fontSize:40})
            .addChildTo(this)
            .setPosition(SC_W*0.80, 90)
            .addEventListener("pushed", function() {
                appMain.playBGM("titleBGM");
                appMain.popScene();
            });

        //モード名
        this.modeLabel = tm.display.OutlineLabel("TUTORIAL", 35)
            .addChildTo(this)
            .setParam(this.labelParamModeName)
            .setPosition(SC_W-5, 25);

        //スコア表示
        var that = this;
        this.scoreLabel = tm.display.OutlineLabel("SCORE ", 40)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 32);
        this.scoreLabel.score = 0;
        this.scoreLabel.update = function() {
            this.text = "SCORE "+this.score;
            if (this.score < that.score) {
                var s = ~~((that.score-this.score)/11);
                if (s < 3) s=3;
                this.score += s;
                if (this.score > that.score)this.score = that.score;
            }
        }

        //ライフ表示
        this.lifeLabel = tm.display.OutlineLabel("LIFE:", 40)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 96);
        this.lifeLabel.beforeLife = this.life;
        this.lifeLabel.lg = [];
        for (var i = 0; i < 5; i++ ) {
            var c = this.lifeLabel.lg[i] = tm.display.Sprite("card", CARD_W, CARD_H)
                .addChildTo(this.lifeLabel)
                .setScale(0.3)
                .setPosition(130+i*45, 0)
                .setFrameIndex(13*3+i);
            c.alpha = 0;
            if (i < this.life) c.alpha = 1;
        }
        this.lifeLabel.update = function() {
            if (this.beforeLife == that.life || this.beforeLife == 0) return;
            if (that.lifeMax < that.life ) return;
            if (that.life < this.beforeLife) {
                this.lg[this.beforeLife-1].tweener.clear().scale(0.0, 500);
            } else if (that.life > this.beforeLife) {
                this.lg[that.life-1].tweener.clear().scale(1,1).fadeIn(1).scale(0.3, 1000, "easeOutBounce");
            }
            this.beforeLife = that.life;
        }

        //直前の役表示
        var by = SC_H*0.8+CARD_H*CARD_SCALE*0.5-10;
        this.beforeLabel = tm.display.OutlineLabel("BEFORE:", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(8, by);
        this.beforeHand = tm.display.OutlineLabel("nothing", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(145, by);
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
            .setPosition(SC_W*0.5, SC_H*0.2);
        this.demo.time = 1;
        this.demo.update = function() {
            if (this.time % 30 == 0) this.visible = !this.visible;
            this.time++;
        }

        //タイムリミットゲージ
        var that = this;
        var color = "hsla({0}, 100%, 50%, 1.0)".format(300);
        this.meter = tm.display.Shape({width: 30, height: 500})
            .addChildTo(this)
            .setPosition(20, SC_H*0.65)
            .setOrigin(0.5, 1.0);
        this.meter.update = function() {
            var limit = that.limitCount*(500/that.limitMax);
            var hsl = ~~(that.limitCount*(120/that.limitMax));
            var color = "hsla({0}, 100%, 50%, 1.0)".format(hsl);

            var c = this.canvas;
            c.clear(0,0,30,500);
            c.fillStyle = color;
            c.strokeStyle = color;
            c.lineWidth = 1;

            var lw = Number(c.lineWidth);
            c.fillRect(0, 500-limit, this.width, this.height-(500-limit));
            c.restore();
        }
        tm.display.RectangleShape({width: 30, height: 500, fillStyle: "rgba(0,0,0,0)", strokeStyle: "Black", lineWidth: 3})
            .addChildTo(this)
            .setPosition(20, SC_H*0.65)
            .setOrigin(0.5, 1.0);

        //カウントダウン表示
        var lb = tm.display.Sprite("count", 256, 256)
            .addChildTo(this)
            .setPosition(SC_W/2, SC_H/2)
            .setFrameIndex(4);
        lb.beforeCount = 9;
        lb.alpha = 0;
        lb.update = function() {
            if (that.count < 6) {
                this.visible = true;
                if (this.beforeCount == that.count) {
                    this.alpha -= 0.05;
                    if (this.alpha < 0)this.alpha = 0;
                } else {
                    this.alpha = 1.0;
                    appMain.playSE("countdown");
                }
                this.setFrameIndex(that.count);
            } else {
                this.visible = false;
            }
            this.beforeCount = that.count;
        }

        //ジェスチャー説明用指シルエット
        this.finger = tm.display.Sprite("finger")
            .addChildTo(this)
            .setPosition(SC_W*0.2, SC_H*0.5)
            .setOrigin(0.5, 0.0)
            .setScale(3)
            .setAlpha(0);

        //操作説明用
        this.arrow = tm.display.Sprite("arrow", 320, 128)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .setAlpha(0);
        this.arrow.scaleY = 0.5;

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //チュートリアルコントローラー
        this.ctrl = tm.app.Object2D().addChildTo(this);

        appMain.playBGM("tutorialBGM");

        this.time = 0;
    },

    onresume: function() {
        this.mask.tweener.clear().fadeOut(200);
    },

    setupTitle: function() {
    },

    update: function() {
        if (this.phase == 0) {
            this.startPhase1();
            this.phase++;
        }
        if (this.countDown) {
            this.limitCount--;
            if (this.limitCount < 0) this.limitCount = 0;
            this.count = ~~(this.limitCount/this.limitMax*10)
        }

        //スクリーンショット保存
        var kb = appMain.keyboard;
        if (kb.getKeyDown("s")) appMain.canvas.saveAsImage();

        this.time++;
    },

    countReset: function(val) {
        val = val || 300;
        this.limitCount = val;
        this.limitMax = val;
    },

    //メッセージ表示
    enterMessage: function(y, time, msg, size) {
        size = size || 45;
        var pt = tm.app.Object2D().addChildTo(this);
        pt.tweener.wait(time).call(function(){this.remove();}.bind(pt));

        pt.bg = tm.display.RectangleShape({width: SC_W, height: 80, fillStyle: this.bgColor, strokeStyle: this.bgColor})
            .addChildTo(pt)
            .setPosition(SC_W*0.5, y);

        pt.m1 = tm.display.OutlineLabel(msg, size)
            .addChildTo(pt)
            .setParam(this.labelParamMsg)
            .setPosition(SC_W*0.5, y);
    },

    //基本操作説明
    startPhase1: function() {
        var pos = SC_H*0.3;
        var that = this;
        this.ctrl.tweener.clear()
            .wait(2000)
            .call(function(){
                that.enterMessage(pos, 3000, "ショットガンポーカーの遊び方", 40);
            }).wait(4000);

        if (appMain.firstGame) {
            appMain.firstGame = false;
            this.ctrl.tweener
                .call(function(){
                    that.enterMessage(pos, 3000, "スキップしたい場合は右上の", 40);
                    that.enterMessage(pos+60, 3000, "SKIPボタンを押してください", 40);
                }).wait(4000)
        }

        this.ctrl.tweener
            .call(function(){
                that.enterMessage(pos, 6000, "制限時間内にカードを５枚選んで", 40);
                that.enterMessage(pos+60, 6000, "ポーカーの役を作ってください", 40);
            }).wait(2000)

            //最初にロイヤルストレートフラッシュを作る
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 10));
            }).wait(1000)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 12));
            }).wait(1000)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 11));
            }).wait(1000)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 1));
            }).wait(1000)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 13));
            }).wait(1500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
            }).wait(2000)
            .call(function(){
                that.enterMessage(pos, 12000, "完成した役に応じた", 40);
                that.enterMessage(pos+60, 12000, "得点が入ります", 40);
                shotgun.MainScene.prototype.dispHand.call(that, ROYALSTRAIGHTFLASH, 2400);
                appMain.playSE("hand");
                that.score+=ROYALSTRAIGHTFLASH;
                that.countReset();
            }).wait(5000)

            //ツーペア作成
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 2));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 2));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 11));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 11));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 12));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, TWOPAIR);
                appMain.playSE("hand");
                that.score+=TWOPAIR;
                that.countReset();
            }).wait(2000)

            //スリーカード作成
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 8));
            }).wait(500)
           .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 1));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 1));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 1));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 12));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, THREECARD);
                appMain.playSE("hand");
                that.score+=THREECARD;
                that.countReset();
            }).wait(2000)

            //カード補充の説明
            .call(function(){
                that.enterMessage(pos, 10000, "場のカードが少なくなると", 40);
                that.enterMessage(pos+60, 10000, "カード補充してシャッフルされます", 40);
            }).wait(500)
            //フラッシュ
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 4));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 12));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 10));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 7));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 13));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, FLASH);
                appMain.playSE("hand");
                that.score+=FLASH;
                that.countReset();
            }).wait(2000)

            //ストレート
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 5));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 6));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 7));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 4));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 8));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, STRAIGHT);
                appMain.playSE("hand");
                that.score+=STRAIGHT;
                that.countReset();
            }).wait(2000)

            //フォーカード
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 9));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 9));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 11));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 9));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 9));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, FOURCARD);
                appMain.playSE("hand");
                that.score+=FOURCARD;
                that.countReset();
            }).wait(4000)

            //手動シャッフルの説明
            .call(function(){
                that.enterMessage(pos, 9000, "また、横に大きくスワイプすると", 40);
                that.enterMessage(pos+60, 9000, "カードのシャッフルが出来ます", 40);
                that.finger.tweener.clear().to({alpha:1.0},100)
                    .wait(2500)
                    .moveBy(SC_W*0.6, 0, 500, "easeOutCubic")
                    .wait(2500)
                    .moveBy(-SC_W*0.6, 0, 500, "easeOutCubic")
                    .wait(2000)
                    .to({alpha:0.0},100);
                that.arrow.tweener.clear().to({alpha:1.0},100)
                    .wait(2500)
                    .to({alpha:0.0},500)
                    .wait(1000)
                    .to({scaleX:-1},100)
                    .to({alpha:1.0},100)
                    .wait(1300)
                    .to({alpha:0.0},500);
            }).wait(3000)
            .call(function(){
                that.deck.shuffle(false);
            }).wait(3000)
            .call(function(){
                that.deck.shuffle(false);
            }).wait(3000)

            //ミス条件の説明
            .call(function(){
                that.enterMessage(pos, 6000, "役無し、時間切れはミスとなり", 40);
                that.enterMessage(pos+60, 6000, "左上のライフが一つ減ります", 40);
            }).wait(1000)
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 5));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 8));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 9));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 12));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 10));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, NOPAIR, 3000);
            }).wait(3000)
            .call(function(){
                appMain.playSE("nopair");
                that.life--;
                that.countReset(270);
            }).wait(2000)

            //時間切れ
            .call(function(){
                that.countDown = true;
            }).wait(9500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, MISS, 3000);
                appMain.playSE("nopair");
                that.life--;
                that.countReset();
            }).wait(3000)

            //ワンペア二回ミス説明
            .call(function(){
                that.enterMessage(pos, 6000, "ワンペアが２回続いた場合も", 40);
                that.enterMessage(pos+60, 6000, "ミスとなります", 40);
            }).wait(1000)
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 10));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 8));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 6));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 11));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 10));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                that.onePair++;
                shotgun.MainScene.prototype.dispHand.call(that, ONEPAIR);
                appMain.playSE("hand");
                that.score+=ONEPAIR;
                that.countReset();
            }).wait(2000)

            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 1));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 5));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 3));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 1));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 13));
            }).wait(1000)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                that.onePair++;
                shotgun.MainScene.prototype.dispHand.call(that, ONEPAIR, 2400);
                appMain.playSE("nopair");
                that.score+=ONEPAIR;
                that.life--;
                that.countReset();
            }).wait(5000)

            //ゲームオーバー説明
            .call(function() {
                that.enterMessage(pos, 8000, "ライフが０の状態でミスすると", 40);
                that.enterMessage(pos+80, 8000, "ゲームオーバーです", 40);
                that.deck.addHand(that.deck.pickCard(SUIT_DIAMOND, 5));
            }).wait(500)
            .call(function(){
                that.countDown = true;
                that.deck.addHand(that.deck.pickCard(SUIT_HEART, 3));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_SPADE, 9));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 12));
            }).wait(500)
            .call(function(){
                that.deck.addHand(that.deck.pickCard(SUIT_CLOVER, 4));
            }).wait(500)
            .call(function(){
                that.countDown = false;
                that.deck.sortHand();
                shotgun.MainScene.prototype.dispHand.call(that, NOPAIR);
                appMain.playSE("nopair");
                that.life--;
            }).wait(2000)

            .call(function(){
                var lb = tm.display.Sprite("gameover")
                    .addChildTo(that)
                    .setPosition(SC_W*0.5, SC_H*0.5-SC_H);
                lb.tweener.wait(500)
                    .move(SC_W*0.5, SC_H*0.5, 4000,"easeOutBounce")
                    .wait(2000)
                    .call(function(){this.remove()}.bind(lb));
            }).wait(5000)
            .call(function(){
                that.enterMessage(pos, 6000, "以上でチュートリアルは終了です", 40);
            }).wait(5000)
            .call(function(){
                appMain.popScene();
            });
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

        this.shuffled = false;
    },
});
