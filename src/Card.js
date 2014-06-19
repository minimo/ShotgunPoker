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
    mark: 0,
    number: 0,

    //Ｚ値
    zIndex: 0,

    init: function(mark, num) {
        //親クラスの初期化
        this.superInit("card", 32, 48);
        
        this.mark = mark || MARK_SPADE;
        this.number = num || 1;

        this.pattern = mark*13+num;
    },
});

shotgun.Card.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn);
    }
});

