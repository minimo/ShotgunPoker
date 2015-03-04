/*
 *  AchievementList.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//実績判定
shotgun.achievementList = {

    /*
     * 単体役成立系
     */
    "onepair": {
        name:   "ワンペア",
        text: "ワンペアを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQBQ",
        check: function(param) {
            if (param.lastHand == ONEPAIR) return true;
            return false;
        },
    },
    "twopair": {
        name:   "ツーペア",
        text: "ツーペアを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQBg",
        check: function(param) {
            if (param.lastHand == TWOPAIR) return true;
            return false;
        },
    },
    "threecard": {
        name:   "スリーカード",
        text: "スリーカードを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQBw",
        check: function(param) {
            if (param.lastHand == THREECARD) return true;
            return false;
        },
    },
    "fourcard": {
        name:   "フォーカード",
        text: "フォーカードを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCA",
        check: function(param) {
            if (param.lastHand == FOURCARD) return true;
            return false;
        },
    },
    "threecard": {
        name:   "ファイブカード",
        text: "ファイブカードを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCQ",
        check: function(param) {
            if (param.lastHand == FIVECARD) return true;
            return false;
        },
    },
    "flush": {
        name:   "フラッシュ",
        text: "フラッシュを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand == FLUSH) return true;
            return false;
        },
    },
    "fullhouse": {
        name:   "フルハウス",
        text: "フルハウスを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand == FULLHOUSE) return true;
            return false;
        },
    },
    "straight": {
        name:   "ストレート",
        text: "ストレートを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand == STRAIGHT) return true;
            return false;
        },
    },
    "straightflush": {
        name:   "ストレートフラッシュ",
        text: "ストレートフラッシュを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand == STRAIGHTFLUSH) return true;
            return false;
        },
    },
    "royalstraightflush": {
        name:   "ロイヤルストレートフラッシュ",
        text: "ロイヤルストレートフラッシュを成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand == ROYALSTRAIGHTFLUSH) return true;
            return false;
        },
    },

    /*
     * 単体条件系
     */
    "normal": {
        name:   "ノーマルモード",
        text: "ノーマルモードでゲームをスタートした",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.mode == GAMEMODE_NORMAL? true: false;
        },
    },
    "hard": {
        name:   "ハードモード",
        text: "ハードモードでゲームをスタートした",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.mode == GAMEMODE_HARD? true: false;
        },
    },
    "complete": {
        name:   "コンプリート",
        text: "１ゲーム内でファイブカード以外の全役を成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.complete;
        },
    },

    "grandslam": {
        name:   "グランドスラム",
        text: "１ゲーム内で全ての役を成立させた",
        point: 5,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            return param.complete;
        },
    },

    /*
     * スコア条件系
     */
    "score1000": {
        name:   "１０００ＰＴＳ",
        text: "スコアが１０００ＰＴＳを超えた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<1000? false: true;
        },
    },
    "score5000": {
        name:   "５０００ＰＴＳ",
        text: "スコアが１０００ＰＴＳを超えた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<5000? false: true;
        },
    },
    "score10000": {
        name:   "５０００ＰＴＳ",
        text: "スコアが５０００ＰＴＳを超えた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<10000? false: true;
        },
    },
    "score10000": {
        name:   "１００００ＰＴＳ",
        text: "スコアが１００００ＰＴＳを超えた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<10000? false: true;
        },
    },
    "score20000": {
        name:   "２００００ＰＴＳ",
        text: "スコアが２００００ＰＴＳを超えた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<20000? false: true;
        },
    },

    /*
     * 複合条件系
     */
    "123": {
        name:   "１－２－３",
        text: "ワンペア、ツーペア、スリーカードの順で役を成立させた",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.handLog.length < 3) return false;
            var len = param.handLog.length;
            if (param.handLog[len-3] == ONEPAIR &&
                param.handLog[len-2] == TWOPAIR &&
                param.handLog[len-1] == THREECARD) {
                return true;
            }
            return false;
        },
    },
    "1234": {
        name:   "１－２－３−４",
        text: "ワンペア、ツーペア、スリーカード、フォーカードの順で役を成立させた",
        point: 5,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.handLog.length < 4) return false;
            var len = param.handLog.length;
            if (param.handLog[len-4] == ONEPAIR &&
                param.handLog[len-3] == TWOPAIR &&
                param.handLog[len-2] == THREECARD &&
                param.handLog[len-1] == FOURCARD) {
                return true;
            }
            return false;
        },
    },
    "4211": {
        name:   "恋の２－４－１１",
        text: "役が成立した手札の中に２、４、Ｊがあった",
        point: 5,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand < 1) return false;
            var c2 = false, c4 = false, c11 = false;
            for (var i = 0; i < param.cards.length; i++) {
                var c = param.cards[i];
                if (c.number == 2)  c2 = true;
                if (c.number == 4)  c4 = true;
                if (c.number == 11) c11 = true;
            }
            if (c2 && c4 && c11) return true;
            return false;
        },
    },
    "777": {
        name:   "スリーセブン",
        text: "７のスリーカードを成立させた",
        point: 5,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand != THREECARD) return false;
            var seven = 0;
            for (var i = 0; i < param.cards.length; i++) {
                var c = param.cards[i];
                if (c.number == 7)  seven++;
            }
            if (seven == 3) return true;
            return false;
        },
    },
    "doubleroyal": {
        name:   "ダブルロイヤル",
        text: "ロイヤルストレートフラッシュを２回連続で成立させた",
        point: 5,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.handLog.length < 3) return false;
            var len = param.handLog.length;
            if (param.handLog[len-2] == ROYALSTRAIGHTFLUSH &&
                param.handLog[len-1] == ROYALSTRAIGHTFLUSH) {
                return true;
            }
            return false;
        },
    },

    "senior": {
        name:   "ポーカー上級者",
        text: "ハードモードで２０００ＰＴＳを超えた",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<2000? false: true;
        },
    },
    "pokermaster": {
        name:   "ポーカーマスター",
        text: "ハードモードで５０００ＰＴＳを超えた",
        point: 30,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<5000? false: true;
        },
    },
    "pokergod": {
        name:   "ポーカー神",
        text: "ハードモードで１００００ＰＴＳを超えた",
        point: 50,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<10000? false: true;
        },
    },
};
