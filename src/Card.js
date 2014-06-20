/*
 *  Card.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("shotgun.Card", {
    superClass: "tm.display.Sprite",
    
    //パターン番号
    _pattern: 0,

    //カード情報    
    suit: 0,        //マーク
    number: 0,      //数
    drop: false,    //落ち札
    hand: false,    //手札

    //Ｚ値
    zIndex: 0,

    init: function(suit, num) {
        //親クラスの初期化
        this.superInit("card", CARD_W, CARD_H);
        this.setScale(0.5);

        this.suit = suit || SUIT_SPADE;
        this.number = num || 1;

        this.pattern = this.suit*13+this.number;
    },
});

shotgun.Card.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn);
    }
});

