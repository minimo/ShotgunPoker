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
    pick: true,     //カードピック可能フラグ
    count: 10,      //カード選択カウントダウン用
    level: 0,       //ゲームレベル

    //再生中BGM
    bgm: null,

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

        //BGM
        this.bgm = tm.asset.AssetManager.get("bgm").clone();
        this.bgm.loop = true;
        this.bgm.play();

        //スタートアップ
        var lb = this.scoreLabel = tm.display.OutlineLabel("READY", 100).addChildTo(this.upperLayer);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 2;
        lb.tweener.clear().wait(500).fadeOut(500);
        lb.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
        });

        //カウントダウン表示
        var lb = this.countDown = tm.display.OutlineLabel("5", 300).addChildTo(this.upperLayer);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 3;
        lb.beforeCount = 9;
        lb.alpha = 0.8;
        lb.update = function() {
            if (that.count < 6) {
                this.visible = true;
                this.text = ""+that.count;
            } else {
                this.visible = false;
            }
            if (this.beforeCount == that.count) {
                this.alpha -= 0.05;
                if (this.alpha < 0)this.alpha = 0;
            } else {
                this.alpha = 0.8;
            }
            this.beforeCount = that.count;
        }
    },
    
    update: function() {
        if (!this.start) return;

        var level = Math.sqrt(this.absTime*0.0001)+1;
        var interval = 41-~~(level*10);
        if (interval < 20) interval = 20;
        if (this.time % interval == 0) {
            this.count--;
            tm.asset.AssetManager.get("countdown").clone().play();
        }

        //手札が五枚揃った
        if (this.deck.numHand == 5 || this.count < 0) {
            this.pick = false;
            this.deck.sortHand();
            this.deck.numHand = 0;
            var sc = this.deck.checkHand();
            this.dispHand(sc);
            if (sc == NOHAND) this.life--;
            if (sc == MISS) this.life -= 2;
            if (sc == ROYALSTRAIGHTFLASH) this.life++;

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
            this.score += sc;
            if (this.score < 0) this.score = 0;

            //ゲームオーバー判定
            if (this.life < 0) {
                this.gameover();
            }
            this.count = 9;
            this.time = 0;
        }
        this.time++;
        this.absTime++;
    },

    //リスタート
    restart: function() {
        this.start = false;
        this.pick = true;
        this.score = 0;
        this.life = 6;
        this.time = 0;
        this.absTime = 0;
    },

    //ゲームオーバー
    gameover: function() {
        this.start = false;
        this.pick = false;
        var lb = this.title2 = tm.display.OutlineLabel("GAME OVER", 200).addChildTo(this.upperLayer);
        lb.setPosition(SC_W*0.6, SC_H*0.5-SC_H);
        lb.fontFamily = "'azuki'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.outlineWidth = 3;
        lb.tweener.wait(500).move(SC_W*0.6, SC_H*0.35, 1500,"easeOutBounce");
    },

    //役名表示
    dispHand: function(hand) {
        var name;
        switch (hand) {
            case MISS:          name = "MISS!";break;
            case NOHAND:        name = "NO HAND";break;
            case ONEPAIR:       name = "ONE PAIR";break;
            case FLASH:         name = "FLASH";break;
            case TWOPAIR:       name = "TWO PAIR";break;
            case THREECARD:     name = "THREE CARD";break;
            case FULLHOUSE:     name = "FULL HOUSE";break;
            case STRAIGHT:      name = "STRAIGHT";break;
            case FOURCARD:      name = "FOURCARD";break;
            case STRAIGHTFLASH: name = "STRAIGHT FLASH";break;
            case ROYALSTRAIGHTFLASH: name = "ROYAL STRAIGHT FLASH!";break;
        }
        //役名表示
        var that = this;
        var lb = tm.display.OutlineLabel(name, 60).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.8);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.outlineWidth = 3;
        lb.tweener.clear().wait(1000).call(function(){lb.remove(); that.deck.clearHand();that.pick = true;});

        //効果音
        if (hand > 0) {
            tm.asset.AssetManager.get("hand").clone().play();
        } else {
            tm.asset.AssetManager.get("nohand").clone().play();
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
                this.deck.shuffle(true);
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

        if (this.pick && !this.shuffled) {
            var c = this.deck.pickCard(sx, sy);
            if (c) this.deck.addHand(c);
        }
        this.shuffled = false;
    },
});


