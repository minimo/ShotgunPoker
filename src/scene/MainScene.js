/*
 *  MainScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.MainScene", {
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

    //デッキ
    deck: null,

    shuffled: false,
    startTime: 0,

    //ゲーム内情報
    start: false,   //ゲームスタートフラグ
    score: 0,       //スコア
    life: 6,        //ライフ
    pick: false,    //カードピック可能フラグ
    count: 9,       //カード選択カウントダウン用
    level: 0,       //ゲームレベル
    handCount: null,//役の回数
    onePair: 0,     //ワンペアの連続回数

    //経過時間
    time: 0,
    absTime: 0,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W*2, SC_H*2).addChildTo(this);

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //レイヤー準備
        this.lowerLayer = tm.app.Object2D().addChildTo(this);
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.upperLayer = tm.app.Object2D().addChildTo(this);

        //上がり回数配列
        this.handCount = [];

        //スコア表示
        var that = this;
        var lb = this.scoreLabel = tm.display.OutlineLabel("SCORE:", 50).addChildTo(this);
        lb.setPosition(8, 64);
        lb.fontFamily = "'azuki'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.outlineWidth = 1;
        lb.update = function() {
            this.text = "SCORE:"+that.score;
        }

        //ライフ表示
        var lb = this.lifeLabel = tm.display.OutlineLabel("LIFE:", 50).addChildTo(this);
        lb.setPosition(SC_W*0.7, 64);
        lb.fontFamily = "'azuki'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.outlineWidth = 1;
        lb.update = function() {
            var life = that.life < 0 ? 0 : that.life;
            this.text = "LIFE:"+life;
        }

        //目隠し
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(100);

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this.mainLayer);

        //BGM再生
        app.playBGM("mainBGM");

        //スタートアップ
        var lb = this.readyLabel = tm.display.OutlineLabel("READY", 100).addChildTo(this.upperLayer);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;
        lb.tweener.clear().wait(500).fadeOut(500).wait(300);
        lb.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
            that.pick = true;
        });

        //カウントダウン表示
        var lb = this.countDown = tm.display.OutlineLabel("5", 300).addChildTo(this.upperLayer);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 3;
        lb.beforeCount = 9;
        lb.alpha = 1.0;
        lb.update = function() {
            if (that.count < 6) {
                this.visible = true;
                if (this.beforeCount == that.count) {
                    this.alpha -= 0.05;
                    if (this.alpha < 0)this.alpha = 0;
                } else {
                    this.alpha = 1.0;
                    tm.asset.AssetManager.get("countdown").clone().play();
                }
            } else {
                this.visible = false;
            }
            this.text = ""+that.count;
            this.beforeCount = that.count;
        }
    },
    
    update: function() {
        if (!this.start) return;
        if (this.deck.busy) return;

        this.level = Math.sqrt(this.absTime*0.0001)+1;
        var interval = 41-~~(this.level*10);
        if (interval < 20) interval = 20;
        if (this.time % interval == 0 && this.pick) {
            this.count--;
        }

        //手札が五枚揃ったor時間切れ
        if (this.deck.numHand == 5 || this.count < 0) {
            this.pick = false;
            this.deck.sortHand();
            this.deck.numHand = 0;
            var sc = this.deck.checkHand();
            this.dispHand(sc);
            if (sc == ONEPAIR) {
                this.onePair++;
                if (this.onePair % 2 == 0) this.life--;
            } else {
                this.onePair = 0;
            }
            if (sc == NOHAND) this.life--;
            if (sc == MISS) this.life -= 2;
            if (sc == ROYALSTRAIGHTFLASH) this.life++;
            if (this.life > 6)this.life = 6;

            //早上がりボーナス
            if (this.count > 5 && sc > 0) {
                sc = ~~(sc*1.5);
                var lb = tm.display.OutlineLabel("EXCELLENT!", 100).addChildTo(this);
                lb.setPosition(SC_W*0.5, SC_H*0.5);
                lb.fontFamily = "'KS-Kohichi-FeltPen'";
                lb.align     = "center";
                lb.baseline  = "middle";
                lb.outlineWidth = 3;
                lb.tweener.clear().wait(1000).call(function(){lb.remove();});
            }
            this.handCount[sc]++;
            this.score += sc;
            if (this.score < 0) this.score = 0;

            //ゲームオーバー判定
            if (this.life < 0) {
                app.stopBGM();
                this.gameover();
            }

            this.count = 10;
            this.time = 0;
        }

        if (this.pick) {
            this.time++;
            this.absTime++;
        }
    },

    //リスタート
    restart: function() {
        this.start = false;
        this.pick = true;
        this.score = 0;
        this.life = 6;
        this.count = 9;
        this.time = 0;
        this.absTime = 0;
        this.level = 0;
        this.hand = [];

        this.readyLabel.tweener.clear().wait(500).fadeOut(500);
        this.readyLabel.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
        });
    },

    //ゲームオーバー
    gameover: function() {
        this.start = false;
        this.pick = false;

        //スコア情報更新
        app.lastScore = this.score;
        if (this.score > app.highScore) app.highScore = this.score;

        //メッセージ
        var that = this;
        var lb = this.title2 = tm.display.OutlineLabel("GAME OVER", 100).addChildTo(this.upperLayer);
        lb.setPosition(SC_W*0.5, SC_H*0.5-SC_H);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 4;
        lb.tweener.wait(500).move(SC_W*0.5, SC_H*0.5, 4000,"easeOutBounce").wait(2000);
        lb.tweener.call(function(){app.replaceScene(shotgun.GameoverScene());});
    },

    //役名表示
    dispHand: function(hand) {
        var name1 = "", name2 = "", name3 = "";
        switch (hand) {
            case MISS:          name1 = "MISS!";break;
            case NOHAND:        name1 = "NO HAND";break;
            case ONEPAIR:       name1 = "ONE"; name2 = "PAIR";break;
            case FLASH:         name1 = "FLASH";break;
            case TWOPAIR:       name1 = "TWO"; name2 = "PAIR";break;
            case THREECARD:     name1 = "THREE"; name2 = "CARD";break;
            case FULLHOUSE:     name1 = "FULL"; name2 = "HOUSE";break;
            case STRAIGHT:      name1 = "STRAIGHT";break;
            case FOURCARD:      name1 = "FOUR"; name2 = "CARD";break;
            case FIVECARD:      name1 = "FIVE"; name2 = "CARD";break;
            case STRAIGHTFLASH: name1 = "STRAIGHT"; name2 = "FLASH";break;
            case ROYALSTRAIGHTFLASH: name1 = "ROYAL"; name2 = "STRAIGHT"; name3 = "FLASH!";break;
        }
        //役名表示
        var that = this;
        var x = SC_W*0.55, y = SC_H*0.8;
        if (name2 != "") y-=SC_H*0.04;
        if (name3 != "") y-=SC_H*0.04;

        var lb1 = tm.display.OutlineLabel(name1, 80).addChildTo(this);
        lb1.fontFamily = "'KS-Kohichi-FeltPen'"; lb1.align = "left"; lb1.baseline  = "middle"; lb1.outlineWidth = 3;
        lb1.setPosition(x, y);
        lb1.tweener.clear().wait(1200).call(function(){lb1.remove(); that.deck.clearHand();that.pick = true;});

        y += SC_H*0.08;
        var lb2 = tm.display.OutlineLabel(name2, 80).addChildTo(this);
        lb2.fontFamily = "'KS-Kohichi-FeltPen'"; lb2.align = "left"; lb2.baseline  = "middle"; lb2.outlineWidth = 3;
        lb2.setPosition(x, y);
        lb2.tweener.clear().wait(1200).call(function(){lb2.remove();});

        y += SC_H*0.08;
        var lb3 = tm.display.OutlineLabel(name3, 80).addChildTo(this);
        lb3.fontFamily = "'KS-Kohichi-FeltPen'"; lb3.align = "left"; lb3.baseline  = "middle"; lb3.outlineWidth = 3;
        lb3.setPosition(x, y);
        lb3.tweener.clear().wait(1200).call(function(){lb3.remove();});

        //効果音
        if (hand > 0) {
            app.playSE("hand");
        } else {
            app.playSE("nohand");
        }
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


