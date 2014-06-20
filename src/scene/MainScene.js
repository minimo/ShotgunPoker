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

    //デッキ
    deck: null,

    //ゲーム内情報
    score: 0,   //スコア
    life: 3,    //ライフ
    pick: true, //カードピック可能フラグ

    //再生中BGM
    bgm: null,

    //経過時間
    time: 0,

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
        lb.setPosition(8, 32);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.outlineWidth = 1;
        lb.update = function() {
            this.text = "SCORE:"+that.score;
        }

        //目隠し
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(100);

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this.mainLayer);
    },

    update: function() {
        var kb = app.keyboard;

        //手札が五枚揃った
        if (this.deck.numHand == 5) {
            this.deck.sortHand();
            this.deck.numHand = 0;
            var sc = this.deck.checkHand();
            this.dispHand(sc);
            this.score += sc;
        }

        this.time++;
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
        var that = this;
        var lb = tm.display.OutlineLabel(name, 60).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.8);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.tweener.clear().wait(1000).call(function(){lb.remove(); that.deck.clearHand()});
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;
        var sx = this.moveX = e.pointing.x;
        var sy = this.moveY = e.pointing.y;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        this.touchID = -1;
        var sx = e.pointing.x;
        var sy = e.pointing.y;

        if (this.pick) {
            var c = this.deck.pickCard(sx, sy);
            if (c) this.deck.addHand(c);
        }
    },
});


