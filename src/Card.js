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

    //回転を考慮した矩形と点の当り判定
    hitTestPoint: function(target) {

        //対象をスプライトの中心を原点とした座標に移動
        var tx = target.x - this.x;
        var ty = target.y - this.y;
        var arad = Math.atan2(ty, tx)*toDeg;
        var dis = distance(this, target);

        //元スプライトの回転分、判定座標を回転する
        var rad = this.rotation*toRad;
        tx = Math.sin(rad)*dis;
        ty = Math.cos(rad)*dis;

        if (-this.width/2 < tx && tx < this.width/2 && -this.height/2 < ty && ty < this.height/2)return true;
        return false;
    }
});

shotgun.Card.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn);
    }
});

