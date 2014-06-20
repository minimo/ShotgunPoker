/*
 *  CardDeck.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 */

//盤上カードコントロール
tm.define("shotgun.CardDeck", {
    superClass: tm.app.Object2D,

    //カード枚数
    num: 0,

    //カード配列
    cards: null,

    //手札
    hands: null,

    init: function(suit, num) {
        //親クラスの初期化
        this.superInit();

        //デッキ構築
        this.cards = [];
        this.num = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 13; j++) {
                var card = shotgun.Card(i, j).addChildTo(this);
                card.setPosition(SC_W/2, SC_H/2);
                this.cards[this.num] = card;
                this.num++;
            }
        }
        this.shuffle();
    },

    //開始時演出
    startup: function() {
    },

    //シャッフル
    shuffle: function(flag) {
		for( var i = 0; i < 100; i++ ){
			var a = rand(0, 4*13-1);
			var b = rand(0, 4*13-1);
			if (a == b)continue;

			var tmp = this.cards[a];
			this.cards[a] = this.cards[b];
			this.cards[b] = tmp;
		}
		//表示順を考慮する為、逆に追加
		for( var i = 4*13-1; i >= 0; i-- ){
		    this.cards[i].remove().addChildTo(this);
		}

        for (var i = 0; i < this.cards.length; i++) {
            var x = rand(SC_W*0.1, SC_W*0.9);
            var y = rand(SC_H*0.2, SC_H*0.7);
            var r = rand(0, 360);
            this.cards[i].tweener.to({x: x, y: y, rotation: r}, 1000, "easeOutQuint");
        }
        tm.asset.AssetManager.get("dist").clone().play();
    },

    //カードの追加
    addHand: function(x, y) {
        if (this.hands.length > 5)return;
        if (!(card instanceof shotgun.Card)) return;

        var card = null;        
        for (var i = 0; i < this.cards.length; i++) {
        }
        
        this.hands.push(card);
    },

    //役の判定
    checkHand: function() {
        if (this.hands.length < 5)return;
    },
});
