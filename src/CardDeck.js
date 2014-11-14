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
    jokerInHand: false,

    //カードデッキ情報
    joker: false,   //ジョーカー有りフラグ
    busy: false,    //処理中フラグ
    shuffleLimit: SHUFFLE_LIMIT,    //シャッフルが発生する残り枚数
    jokerTurn: 0,   //ジョーカー戻しターンカウンタ

    demo: false,    //デモンストレーションフラグ

    init: function(suit, num) {
        //親クラスの初期化
        this.superInit();

        //デッキ構築
        this.cards = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 13; j++) {
                var card = shotgun.Card(i, j).addChildTo(this);
                card.setPosition(SC_W/2, -SC_H/2);
                this.cards[i*13+j] = card;
            }
        }

        //ジョーカー追加
        if (appMain.useJoker) {
            this.joker = true;
            var card = shotgun.Card(5, 99).addChildTo(this);
            card.setPosition(SC_W/2, -SC_H/2);
            this.cards.push(card);
        }

        //手札配列        
        this.hands = [];

        //Tweener初期化
        this.tweener.clear();
    },

    //開始時演出
    startup: function() {
        var len = this.cards.length;
        for (var i = 0; i < len; i++) {
            this.cards[i].setPosition( rand(0, SC_W), -rand(200, SC_H));
        }
    },

    //シャッフル
    //flagがtrueの場合、全カードのシャッフル。falseの場合、場に有るカードのみ
    shuffle: function(flag) {
        var num = this.cards.length;
        if (appMain.returnJoker) this.jokerTurn++;

        //ドロップしたカードを場に戻す
        if (flag) {
            for (var i = 0; i < num; i++) {
                var c = this.cards[i];
                if (c.drop && c.suit != 5 || c.drop && c.suit == 5 && appMain.returnJoker && appMain.returnJokerTurn<this.jokerTurn) {
                    c.setPosition(rand(0, SC_W), -100);
                    c.drop = false;
                    this.jokerTurn = 0;
                }
            }
        }

        //カードのシャッフル
        for( var i = 0; i < 200; i++ ){
            var a = rand(0, num-1);
            var b = rand(0, num-1);
            if (a == b)continue;
            if (!flag){
                if (this.cards[a].drop || this.cards[a].hand) continue;
                if (this.cards[b].drop || this.cards[b].hand) continue;
            }
            var tmp = this.cards[a];
            this.cards[a] = this.cards[b];
            this.cards[b] = tmp;
        }

        //表示順を考慮する為、逆に追加
        for( var i = num-1; i > -1; i-- ){
            if (!flag){
                if (this.cards[i].drop || this.cards[i].hand) continue;
            }
            this.cards[i].remove().addChildTo(this);
        }

        //カード位置シャッフル
        for (var i = 0; i < num; i++) {
            var c = this.cards[i];
            if (!flag) {
                if (c.drop || c.hand) continue;
            } else {
                if (c.drop && c.suit == 5 && !appMain.returnJoker) continue;  //ジョーカーはフラグによって戻すか決める
            }
            var x = rand(SC_W*0.1, SC_W*0.9);
            var y = rand(SC_H*0.2, SC_H*0.6);
            var r = rand(0, 360);
            this.cards[i].tweener.clear().to({x: x, y: y, rotation: r}, 1000, "easeOutQuint");
        }
        tm.asset.AssetManager.get("dist").clone().play();
    },

    //カードの取得
    pick: function(x, y) {
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.drop || c.hand)continue;
            if (c.hitTestPoint({x: x, y: y}))return c;
        }
        return null;
    },

    //指定カードの取得
    pickCard: function(suit, num) {
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.suit == suit && c.number == num) return c;
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
        card.tweener.clear().to({x: (CARD_W/2)*CARD_SCALE+(this.hands.length-1)*60, y: SC_H*0.8, rotation: 0}, 500, "easeOutQuint");
        card.tweener.call(function(){that.numHand++;});
        appMain.playSE("deal");
    },

    //手札のクリア
    clearHand: function() {
        this.busy = true;
        for( var i = 0; i < 5; i++ ){
            var c = this.hands[i];
            if (c) {
                c.hand = false;
                c.drop = true;
                c.tweener.clear().wait(300).moveBy(0, SC_H*0.3, 500, "easeOutQuint");
            }
        }
        this.hands = [];
        this.numHand = 0;
        var that = this;
        this.tweener.clear().wait(800)
            .call(function(){
                that.busy = false;
                //場の札が一定数以下の場合、落ち札を戻してシャッフル
                if (that.left < that.shuffleLimit) that.shuffle(true);
            });
    },

    //手札のソート
    sortHand: function() {
        if (this.hands.length < 5)return;

        for( var i = 0; i < 5; i++ ){
            this.hands[i].tweener.clear().move((CARD_W/2)*CARD_SCALE, SC_H*0.8, 100).wait(100);
        }
        this.hands.sort(compairFunc);
        for( var i = 0; i < 5; i++ ){
            var c = this.hands[i];
            if (c) {
                c.remove().addChildTo(this);
                c.rotation = 0;
                c.tweener.move((CARD_W/2)*CARD_SCALE+i*60, SC_H*0.8, 100);
            }
        }
    },

    //役の判定
    checkHand: function() {
        if (this.hands.length < 5)return MISS;

        //手札内ジョーカー有り
        if (this.hands[4].suit == 5) {
            this.jokerInHand = true;
        } else {
            this.jokerInHand = false;
        }

        //フラッシュ判別
        var max = this.jokerInHand ? 4: 5;
        var flash = true;
        var suit = this.hands[0].suit;
        for (var i = 1; i < max; i++) {
            if (suit != this.hands[i].suit) flash = false;
        }

        //ストレート判別
        var straight = true;
        if (!this.jokerInHand) {
            //通常の判定
            var start = this.hands[0].number+1;
            for (var i = 1; i < 5; i++) {
                if (start != this.hands[i].number) straight = false;
                start++;
            }
            //特殊なストレート
            if (!straight) {
                straight = true;
                if (this.hands[0].number == 1 && this.hands[1].number == 10) {
                    var start = this.hands[1].number+1;
                    for (var i = 2; i < 5; i++) {
                        if (start != this.hands[i].number) straight = false;
                        start++;
                    }
                }else{
                    straight = false;
                }
            }
        } else {
            //ジョーカー有りの場合
            var skip = 0, count = 0;
            straight = false;
            var start = this.hands[0].number+1;
            for (var i = 1; i < 4; i++) {
                if (start == this.hands[i].number) count++;
                if (start+1 == this.hands[i].number && skip < 1) {
                    skip++;
                    count++;
                    start++;
                }
                start++;
            }
            if (count == 3) straight = true;
        }

        //ストレートの場合は役確定	
        if (straight) {
            //ストレートフラッシュ判定
            if (flash) {
                //ロイヤルストレートフラッシュ判定（ジョーカー有りは成立しない）
                if (this.hands[0].number == 1 && this.hands[1].number == 10 && !this.jokerInHand) return ROYALSTRAIGHTFLASH;
                return STRAIGHTFLASH;
            }
            return STRAIGHT;
        }

        //フラッシュの場合は役確定
        if (flash) return FLASH;

        //スリーカード、フォーカード判別
        if (this.hands[0].number == this.hands[3].number
         || this.hands[1].number == this.hands[4].number) {
            if (this.jokerInHand) return FIVECARD;
            return FOURCARD;
        }
        var three = false;
        if (this.hands[0].number == this.hands[2].number
         || this.hands[1].number == this.hands[3].number
         || this.hands[2].number == this.hands[4].number) {
            if (this.jokerInHand) return FOURCARD;
            three = true;
        }

        //スリーカード成立の場合は前か後二枚を判別
        if (three) {
            if (this.hands[0].number == this.hands[2].number) {
                if (this.hands[3].number == this.hands[4].number) return FULLHOUSE;
            }
            if (this.hands[2].number == this.hands[4].number) {
                if (this.hands[0].number == this.hands[1].number) return FULLHOUSE;
            }
            return THREECARD;
        }

        //ペア判別
        var pair = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = i+1; j < 5; j++) {
                if (this.hands[i].number == this.hands[j].number) pair++;
            }
        }
        if (pair == 1) {
            if (this.jokerInHand) return THREECARD;
            return ONEPAIR;
        }
        if (pair == 2) {
            if (this.jokerInHand) return FULLHOUSE;
            return TWOPAIR;
        }
        if (this.jokerInHand) return ONEPAIR;
        return NOPAIR;
    },

    //役名を文字列で取得
    handName: function(point) {
        for (var i = 0; i < appMain.handList.length; i++) {
            var n = appMain.handList[i];
            if (n.point == point) return n.name;
        }
        return null;
    },
});

shotgun.CardDeck.prototype.accessor("left", {
    "get": function() {
        var num = 0;
        for (var i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].drop) num++;
        }
        return num;
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

