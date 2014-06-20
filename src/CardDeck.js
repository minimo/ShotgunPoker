/*
 *  CardDeck.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 */

//盤上カードコントロール
tm.define("shotgun.CardDeck", {
    superClass: tm.app.Object2D,

    //カード配列
    cards: null,

    //手札
    hands: null,
    numHand: 0,

    init: function(suit, num) {
        //親クラスの初期化
        this.superInit();

        //デッキ構築
        this.cards = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 13; j++) {
                var card = shotgun.Card(i, j).addChildTo(this);
                card.setPosition(SC_W/2, SC_H/2);
                this.cards[i*13+j] = card;
            }
        }
        this.shuffle();

        //手札配列        
        this.hands = [];
    },

    //開始時演出
    startup: function() {
    },

    //シャッフル
    shuffle: function(flag) {
        var num = this.cards.length;
		for( var i = 0; i < 100; i++ ){
			var a = rand(0, num-1);
			var b = rand(0, num-1);
			if (a == b)continue;

			var tmp = this.cards[a];
			this.cards[a] = this.cards[b];
			this.cards[b] = tmp;
		}
		//表示順を考慮する為、逆に追加
		for( var i = num-1; i > -1; i-- ){
		    this.cards[i].remove().addChildTo(this);
		}

        for (var i = 0; i < num; i++) {
            var x = rand(SC_W*0.1, SC_W*0.9);
            var y = rand(SC_H*0.2, SC_H*0.6);
            var r = rand(0, 360);
            this.cards[i].tweener.to({x: x, y: y, rotation: r}, 1000, "easeOutQuint");
        }
        tm.asset.AssetManager.get("dist").clone().play();
    },

    //カードの取得
    pickCard: function(x, y) {
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.drop || c.hand)continue;
            if (c.hitTestPoint({x: x, y: y}))return c;
        }
        return null;
    },

    //手札へ追加
    addHand: function(card) {
        if (this.hands.length > 4)return;
        if (!(card instanceof shotgun.Card)) return;

        card.hand = true;
        this.hands.push(card);

        var that = this;
        card.remove().addChildTo(this);
        card.tweener.clear().to({x: SC_W*0.1+(this.hands.length-1)*70, y: SC_H*0.8, rotation: 0}, 500, "easeOutQuint");
        card.tweener.call(function(){that.numHand++;});
    },

    //手札のクリア
    clearHand: function() {
		for( var i = 0; i < 5; i++ ){
		    var c = this.hands[i];
		    if (c) {
		        c.hand = false;
		        c.drop = true;
		        c.tweener.moveBy(0, 500, 500);
		    }
		}
		this.hands = [];
		this.numHand = 0;
    },

    //手札のソート
    sortHand: function() {
        if (this.hands.length < 5)return;

		for( var i = 0; i < 5; i++ ){
		    this.hands[i].tweener.clear().move(SC_W*0.1, SC_H*0.8, 100);
		}
		this.hands.sort(compairFunc);
		for( var i = 0; i < 5; i++ ){
		    var c = this.hands[i];
		    if (c) {
		        c.remove().addChildTo(this);
		        c.tweener.move(SC_W*0.1+i*70, SC_H*0.8, 100);
		    }
		}
    },

    //役の判定
    checkHand: function() {
        if (this.hands.length < 5)return NOHAND;
    },
});

//カードソート用比較関数
compairFunc = function(a,b){
	if( a.number == b.number ){
		if( a.suit == b.suit )return 0;
		return a.suit-b.suit;
	}
	return a.number-b.number;
}	
