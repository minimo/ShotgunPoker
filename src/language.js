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
        "ENGLISH": "How to play Shotgun Poker."
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
    "完成した役に応じた": {
        "ENGLISH": "Score is obtained in accor-"
    },
    "得点が入ります": {
        "ENGLISH": "dance with the finished hand."
    },
    "場のカードが少なくなると": {
        "ENGLISH": "The field of the card is reduced"
    },
    "カード補充してシャッフルされます": {
        "ENGLISH": "by the card replenished are shuffled."
    },
    "また、横に大きくスワイプすると": {
        "ENGLISH": "Can be made by the lateral to"
    },
    "カードのシャッフルが出来ます": {
        "ENGLISH": "increase swipe card shuffle."
    },
    "役無し、時間切れはミスとなり": {
        "ENGLISH": "No pair, expired becomes a mistake."
    },
    "左上のライフが一つ減ります": {
        "ENGLISH": "You upper left of life is reduced one."
    },
    "ワンペアが２回続いた場合も": {
        "ENGLISH": "It becomes a miss even if one"
    },
    "ミスとなります": {
        "ENGLISH": "pair was followed by twice."
    },
    "ライフが０の状態でミスすると": {
        "ENGLISH": "The game is over when you miss"
    },
    "ゲームオーバーです": {
        "ENGLISH": "in the state of life is not."
    },
    "以上でチュートリアルは終了です": {
        "ENGLISH": "This completes the tutorial above."
    },

    //GameCenter warning
    "GameCenterに接続できませんでした": {
        "ENGLISH": "I failed to access the GAMECENTER."
    },

    //GameOver Ad telop
    "Adボタンで広告を見るとライフ１個ボーナス！": {
        "ENGLISH": "View ad 'Ad' button and life one bonus !"
    },

    //Achievement
    "実績「": {
        "ENGLISH": "Achievement「"
    },
    "」が解除されました": {
        "ENGLISH": "」unlocked."
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
