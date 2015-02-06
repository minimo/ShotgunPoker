/*
 *  Achievement.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//実績達成チェック
tm.define("shotgun.Achievement", {
    init: function() {
    },

    check: function(lastHand, handLog, score) {
        var acList = [];
        var ac = shotgun.achievementList;
        var len = shotgun.achievementList.length;
        for (var i = 0; i < len; i++) {
            var a = ac[i];
            if (a.percent != "100" && a.check(lastHand, handLog)) {
                a.percent = "100";
                acList.push(a);
            }
        }
        if (acList.length == 0) return null;
        return acList;
    },

    //ローカルストレージへ保存
    save: function() {
    },

    //ローカルストレージから読み込み
    load: function() {
    },
});

//実績判定
shotgun.achievementList = [
    {
        id:     "onepair",
        name:   "ワンペア",
        percent: "0",
        secret: false,
        check: function(lastHand, handLog) {
            if (lastHand == ONEPAIR) return true;
            return false;
        },
    },{
        id:     "twopair",
        name:   "ツーペア",
        percent: "0",
        secret: false,
        check: function(lastHand, handLog) {
            if (lastHand == TWOPAIR) return true;
            return false;
        },
    },
/*
    "threecard":    "スリーカード",
    "fourcard":     "フォーカードカード",
    "fivecard":     "ファイブカードカード",
    "flash":        "フラッシュ",
    "fullhouse":    "フルハウス",
    "straight":     "ストレート",
    "straightflash":"ストレートフラッシュ",
    "royalflash":   "ロイヤルストレートフラッシュ",
    "complete":     "コンプリート",
    "fullcomplete": "フルコンプリート",
*/
];
