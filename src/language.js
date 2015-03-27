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

    //Setting
    "実績をリセットしますか？": {
        "ENGLISH": "Resets the Achievements?"
    },
    "（リセット後、元に戻す事はできません）": {
        "ENGLISH": "(After reset, you can not undo)"
    },
    "実績をリセットしました": {
        "ENGLISH": "I've reset the achievements."
    },
    "未達成": {
        "ENGLISH": "Unachieved"
    },
    "** 達成済 **": {
        "ENGLISH": "** Achieved **"
    },

    //GameCenter warning
    "GameCenterに接続できませんでした": {
        "ENGLISH": "I failed to access the GAMECENTER."
    },

    //GameOver Ad telop
    "Adボタンで広告を見るとライフ１個ボーナス！": {
        "ENGLISH": "View ad 'Ad' button and life one bonus !"
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
    "R.STRAIGHT FLUSH": {
        "ENGLISH": "ROYAL FLUSH"
    },
    "ワンペア": {
        "ENGLISH": "One Pair"
    },
    "ツーペア": {
        "ENGLISH": "Two Pair"
    },
    "スリーカード": {
        "ENGLISH": "Three of a Kind"
    },
    "フォーカード": {
        "ENGLISH": "Four of a Kind"
    },
    "ファイブカード": {
        "ENGLISH": "Five of a Kind"
    },
    "フラッシュ": {
        "ENGLISH": "Flush"
    },
    "ストレート": {
        "ENGLISH": "Straight"
    },
    "フルハウス": {
        "ENGLISH": "Full House"
    },
    "ストレートフラッシュ": {
        "ENGLISH": "Straight Flush"
    },
    "Ｒ．ストレートフラッシュ": {
        "ENGLISH": "Royal Flush"
    },
    "ロイヤルストレートフラッシュ": {
        "ENGLISH": "Royal Flush"
    },

    //Achievement
    "実績「": {
        "ENGLISH": "Achievement '"
    },
    "」が解除されました": {
        "ENGLISH": "' unlocked."
    },
    "中級者": {
        "ENGLISH": "Intermediate"
    },
    "熟練者": {
        "ENGLISH": "Skilled person"
    },
    "ゲームの達人": {
        "ENGLISH": "Master of The Game"
    },
    "ポーカーチャンプ": {
        "ENGLISH": "Poker Champ"
    },
    "あなたが神か": {
        "ENGLISH": "The God"
    },
    "上級者": {
        "ENGLISH": "Senior Player"
    },
    "ポーカーマスター": {
        "ENGLISH": "Poker Master"
    },
    "ポーカー神": {
        "ENGLISH": "The God of Poker"
    },
    "ゲームスタート": {
        "ENGLISH": "Beginning"
    },
    "挑戦者": {
        "ENGLISH": "Challenger"
    },
    "ジョーカー": {
        "ENGLISH": "Joker"
    },
    "勿体ない？": {
        "ENGLISH": "Mottainai?"
    },
    "ビリー・ザ・キッド": {
        "ENGLISH": "Billy the KID"
    },
    "ランナーランナー": {
        "ENGLISH": "Runner Runner"
    },
    "大富豪": {
        "ENGLISH": "Millionaire"
    },
    "ラブデラックス": {
        "ENGLISH": "Love Delux"
    },
    "コンプリート": {
        "ENGLISH": "Complete"
    },
    "グランドスラム": {
        "ENGLISH": "Grand Slam"
    },
    "スリーセブン": {
        "ENGLISH": "Three Seven"
    },
    "ビッグセブン": {
        "ENGLISH": "Big Seven"
    },
    "キラークイーン": {
        "ENGLISH": "Killer Queen"
    },
    "ウィング": {
        "ENGLISH": "Wing"
    },
    "ビッグウィング": {
        "ENGLISH": "Big Wing"
    },
    "リトライ": {
        "ENGLISH": "Retry"
    },
    "１－２－３": {
        "ENGLISH": "1-2-3"
    },
    "素数を数えるんだ": {
        "ENGLISH": "Count The Prime number"
    },
    "恋の２－４－１１": {
        "ENGLISH": "2-4-11 of Love"
    },
    "エーシーズアップ": {
        "ENGLISH": "Aces up"
    },
    "ダブルロイヤル": {
        "ENGLISH": "Double Royal"
    },
    "エクステンド": {
        "ENGLISH": "Extend"
    },

    //AchievementList
    "ワンペアを成立した": {
        "ENGLISH": "You've passed a One Pair."
    },
    "ツーペアを成立した": {
        "ENGLISH": "You've passed a Two Pair."
    },
    "スリーカードを成立した": {
        "ENGLISH": "You've passed a Three of a Kind."
    },
    "フォーカードを成立した": {
        "ENGLISH": "You've passed a Four of a Kind."
    },
    "ファイブカードを成立した": {
        "ENGLISH": "You've passed a Five of a Kind."
    },
    "フラッシュを成立した": {
        "ENGLISH": "You've passed a Flush."
    },
    "ストレートを成立した": {
        "ENGLISH": "You've passed a Straight."
    },
    "フルハウスを成立した": {
        "ENGLISH": "You've passed a Full House."
    },
    "ストレートフラッシュを成立した": {
        "ENGLISH": "You've passed a Straight Flush."
    },
    "ロイヤルストレートフラッシュを成立した": {
        "ENGLISH": "You've passed a Royal Flush."
    },
    "ノーマルモードでゲームをスタートした": {
        "ENGLISH": "You started the game in Normal."
    },
    "ハードモードでゲームをスタートした": {
        "ENGLISH": "You started the game in Hard."
    },
    "ジョーカーを使った": {
        "ENGLISH": "Used the joker"
    },
    "ジョーカーを使わずにゲームオーバーになった": {
        "ENGLISH": "It became the gameover without a joker."
    },
    "３回連続でカウント開始前に役を成立した": {
        "ENGLISH": "3 times You have met a hand before the count starts in a row."
    },
    "３回連続で残り０カウントで役を成立した": {
        "ENGLISH": "3 times You have met a hand in the remainder 0 count in a row."
    },
    "ダイヤのフラッシュを成立した": {
        "ENGLISH": "Satisfied The flash of diamond."
    },
    "ハートのフラッシュを成立した": {
        "ENGLISH": "Satisfied The flash of heart."
    },
    "１ゲーム内でファイブカード以外の全役を成立した": {
        "ENGLISH": "You passed a whole hands of non Five of a Kind in one game."
    },
    "１ゲーム内で全ての役を成立した": {
        "ENGLISH": "You were met all of the role in one game."
    },
    "スコアが２０００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 2000pts."
    },
    "スコアが３０００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 3000pts."
    },
    "スコアが５０００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 5000pts."
    },
    "スコアが１００００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 10000pts."
    },
    "スコアが２００００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 20000pts."
    },
    "ハードモードで２０００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 2000pts in Hard mode."
    },
    "ハードモードで５０００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 5000pts in Hard mode."
    },
    "ハードモードで１００００ＰＴＳを超えた": {
        "ENGLISH": "Score exceeds the 10000pts in Hard mode."
    },
    "ワンペア、ツーペア、スリーカードの順で役を成立した": {
        "ENGLISH": "One Pair, Two Pair, You was passed a hand in the order of Three of a Kind."
    },
    "役が成立した手札の中に２、４、Ｊがあった": {
        "ENGLISH": "2,4 in the hand that winning combination has been established, there was a Jack."
    },
    "７のスリーカードを成立した": {
        "ENGLISH": "You've passed a Three of a Kind is seven."
    },
    "７がハイカードであるフォーカードを成立した": {
        "ENGLISH": "Satisfied Four of a kind is a 7 high-card."
    },
    "Ｑのフォーカードを成立した": {
        "ENGLISH": "Satisfied Four of a kind is Queen."
    },
    "３０回連続でミス無しだった": {
        "ENGLISH": "It was no mistake in 30 consecutive."
    },
    "５０回連続でミス無しだった": {
        "ENGLISH": "It was no mistake in 50 consecutive."
    },
    "ゲームオーバー後にリトライした": {
        "ENGLISH": "You were retry after the game is over."
    },
    "素数のカードだけで役を成立した": {
        "ENGLISH": "You have established a hand in only prime number of card."
    },
    "エースのペアと別のペアの組み合わせのツーペアを成立した": {
        "ENGLISH": "You met the two pair of combination of ace pair and another pair."
    },
    "エクステンド条件を達成した": {
        "ENGLISH": "You have achieved the extended conditions."
    },
    "ロイヤルストレートフラッシュを２回成立した": {
        "ENGLISH": "Royal Flush You was established in two consecutive."
    },
};
