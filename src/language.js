/*
 *  language.js
 *  2014/10/23
 *  @auther minimo  
 *  This Program is MIT license.
 */

//言語変換
var $trans = function(text) {
    var ret = languagePack[text];
    if (ret) {
        var retText = ret[appMain.language];
        return retText?retText:text;
    }
    return text;
}

var languagePack = {

    //Tutorial
    "ショットガンポーカーの遊び方": {
        "ENGLISH": "How to play Shotgun Poker"
    },
    "スキップしたい場合は右上の": {
        "ENGLISH": "If you skip this tutorial."
    },
     "SKIPボタンを押してください": {
        "ENGLISH": "Please press SKIP button."
    },
    "制限時間内にカードを５枚選んで": {
        "ENGLISH": "Please make the hand of poker to"
    },
    "ポーカーの役を作ってください": {
        "ENGLISH": "choose 5 cards within the time limit."
    },

    //GameCenter warning
    "GAMECENTERのアクセスに失敗しました": {
        "ENGLISH": "I failed to access the GAMECENTER"
    },
    "GAMECENTERの準備が出来ていません": {
        "ENGLISH": "I failed to access the GAMECENTER"
    },

    //Poker Hand
    "THREE CARD": {
        "ENGLISH": "THREE OF A KIND"
    },
    "FOUR CARD": {
        "ENGLISH": "FOUR OF A KIND"
    },
    "FIVE CARD": {
        "ENGLISH": "FIVE OF A KIND"
    },
    "R.STRAIGHT FLASH": {
        "ENGLISH": "ROYAL FLASH"
    },
};
