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
     * total: 200 points
     */
    "onepair": {
        name: "ワンペア",
        text: "ワンペアを成立した",
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
        name: "ツーペア",
        text: "ツーペアを成立した",
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
        name: "スリーカード",
        text: "スリーカードを成立した",
        point: 10,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQBw",
        check: function(param) {
            if (param.lastHand == THREECARD) return true;
            return false;
        },
    },
    "fourcard": {
        name: "フォーカード",
        text: "フォーカードを成立した",
        point: 20,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCA",
        check: function(param) {
            if (param.lastHand == FOURCARD) return true;
            return false;
        },
    },
    "fivecard": {
        name: "ファイブカード",
        text: "ファイブカードを成立した",
        point: 30,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCQ",
        check: function(param) {
            if (param.lastHand == FIVECARD) return true;
            return false;
        },
    },
    "flush": {
        name: "フラッシュ",
        text: "フラッシュを成立した",
        point: 10,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCg",
        check: function(param) {
            if (param.lastHand == FLUSH) return true;
            return false;
        },
    },
    "fullhouse": {
        name: "フルハウス",
        text: "フルハウスを成立した",
        point: 20,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQCw",
        check: function(param) {
            if (param.lastHand == FULLHOUSE) return true;
            return false;
        },
    },
    "straight": {
        name: "ストレート",
        text: "ストレートを成立した",
        point: 20,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQDA",
        check: function(param) {
            if (param.lastHand == STRAIGHT) return true;
            return false;
        },
    },
    "straightflush": {
        name: "ストレートフラッシュ",
        text: "ストレートフラッシュを成立した",
        point: 25,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQDQ",
        check: function(param) {
            if (param.lastHand == STRAIGHTFLUSH) return true;
            return false;
        },
    },
    "royalstraightflush": {
        name: "Ｒ．ストレートフラッシュ",
        text: "ロイヤルストレートフラッシュを成立した",
        point: 50,
        percent: "0",
        secret: false,
        id: "CgkI-I-vk7YTEAIQDg",
        check: function(param) {
            if (param.lastHand == ROYALSTRAIGHTFLUSH) return true;
            return false;
        },
    },

    /*
     * スコア条件系
     * total: 380 points
     */
    "score1000": {
        name: "中級者",
        text: "スコアが１０００ＰＴＳを超えた",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<1000? false: true;
        },
    },
    "score2000": {
        name: "熟練者",
        text: "スコアが２０００ＰＴＳを超えた",
        point: 20,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<2000? false: true;
        },
    },
    "score5000": {
        name: "ゲームの達人",
        text: "スコアが５０００ＰＴＳを超えた",
        point: 30,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<5000? false: true;
        },
    },
    "score10000": {
        name: "ポーカーチャンプ",
        text: "スコアが１００００ＰＴＳを超えた",
        point: 50,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.score<10000? false: true;
        },
    },
    "score20000": {
        name: "あなたが神か",
        text: "スコアが２００００ＰＴＳを超えた",
        point: 100,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            return param.score<20000? false: true;
        },
    },
    "senior": {
        name: "上級者",
        text: "ハードモードで２０００ＰＴＳを超えた",
        point: 20,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<2000? false: true;
        },
    },
    "pokermaster": {
        name: "ポーカーマスター",
        text: "ハードモードで５０００ＰＴＳを超えた",
        point: 50,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<5000? false: true;
        },
    },
    "pokergod": {
        name: "ポーカー神",
        text: "ハードモードで１００００ＰＴＳを超えた",
        point: 100,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.mode != GAMEMODE_HARD) return false;
            return param.score<10000? false: true;
        },
    },

    /*
     * 単体条件系
     * total: 165 points
     */
    "normal": {
        name: "ゲームスタート",
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
        name: "挑戦者",
        text: "ハードモードでゲームをスタートした",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.mode == GAMEMODE_HARD? true: false;
        },
    },
    "usejoker": {
        name: "ジョーカー",
        text: "ジョーカーを使った",
        point: 5,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand < 1) return false;
            for (var i = 0; i < param.cards.length; i++) {
                if (param.cards[i].suit == SUIT_JOKER)  return true;
            }
            return false;
        },
    },
    "notusejoker": {
        name: "勿体ない？",
        text: "ジョーカーを使わずにゲームオーバーになった",
        point: 10,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.gameover == true && !param.usejoker) return true;
            return false;
        },
    },
    "quickdraw": {
        name: "ビリー・ザ・キッド",
        text: "３回連続でカウント開始前に役を成立した",
        point: 20,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.handLog.length < 3) return false;
            var len = param.handLog.length;
            if (param.handLog[len-3].leftTime > 6 &&
                param.handLog[len-2].leftTime > 6 &&
                param.handLog[len-1].leftTime > 6) {
                return true;
            }
            return false;
        },
    },
    "runner": {
        name: "ランナーランナー",
        text: "３回連続で残り０カウントで役を成立した",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.handLog.length < 3) return false;
            var len = param.handLog.length;
            if (param.handLog[len-3].leftTime < 1 &&
                param.handLog[len-2].leftTime < 1 &&
                param.handLog[len-1].leftTime < 1) {
                return true;
            }
            return false;
        },
    },
    "millionaire": {
        name: "大富豪",
        text: "ダイヤのフラッシュを成立した",
        point: 10,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand != FLUSH) return false;
            var c = param.cards[0];
            if (c.suit == SUIT_DIAMOND) return true;
            return false;
        },
    },
    "lovedelux": {
        name: "ラブデラックス",
        text: "ハートのフラッシュを成立した",
        point: 10,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand != FLUSH) return false;
            var c = param.cards[0];
            if (c.suit == SUIT_HEART) return true;
            return false;
        },
    },
    "complete": {
        name: "コンプリート",
        text: "１ゲーム内でファイブカード以外の全役を成立した",
        point: 50,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            return param.complete;
        },
    },
    "grandslam": {
        name: "グランドスラム",
        text: "１ゲーム内で全ての役を成立した",
        point: 80,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            return param.complete;
        },
    },
    "three7": {
        name: "スリーセブン",
        text: "７のスリーカードを成立した",
        point: 15,
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
    "big7": {
        name: "ビッグセブン",
        text: "７がハイカードであるフォーカードを成立した",
        point: 20,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand != FOURCARD) return false;
            var seven = 0;
            for (var i = 0; i < param.cards.length; i++) {
                var c = param.cards[i];
                if (c.number == 7)  seven++;
                if (c.number > 7) return false;
            }
            if (seven == 4) return true;
            return false;
        },
    },
    "killerqueen": {
        name: "キラークイーン",
        text: "Ｑのフォーカードを成立した",
        point: 20,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand != FOURCARD) return false;
            var num = 0;
            for (var i = 0; i < param.cards.length; i++) {
                var c = param.cards[i];
                if (c.number == 12) num++;
            }
            if (num == 4) return true;
            return false;
        },
    },
    "wing": {
        name: "ウィング",
        text: "３０回連続でミス無しだった",
        point: 30,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (!param.noMissCount || param.noMissCount < 30) return false;
            return true;
        },
    },
    "bigwing": {
        name: "ビッグウィング",
        text: "５０回連続ミス無しだった",
        point: 50,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (!param.noMissCount || param.noMissCount < 50) return false;
            return true;
        },
    },

    /*
     * 複合条件系
     * total: 95 points
     */
    "123": {
        name: "１－２－３",
        text: "ワンペア、ツーペア、スリーカードの順で役を成立した",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.handLog.length < 3) return false;
            var len = param.handLog.length;
            if (param.handLog[len-3].hand == ONEPAIR &&
                param.handLog[len-2].hand == TWOPAIR &&
                param.handLog[len-1].hand == THREECARD) {
                return true;
            }
            return false;
        },
    },
    "1234": {
        name: "１－２－３－４",
        text: "ワンペア、ツーペア、スリーカード、フォーカードの順で役を成立した",
        point: 20,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.handLog.length < 4) return false;
            var len = param.handLog.length;
            if (param.handLog[len-4].hand == ONEPAIR &&
                param.handLog[len-3].hand == TWOPAIR &&
                param.handLog[len-2].hand == THREECARD &&
                param.handLog[len-1].hand == FOURCARD) {
                return true;
            }
            return false;
        },
    },
    "primenumber": {
        name: "素数を数えるんだ",
        text: "素数のカードだけで役を成立した",
        point: 10,
        percent: "0",
        secret: true,
        id: "",
        check: function(param) {
            if (param.lastHand < 1) return false;
            for (var i = 0; i < param.cards.length; i++) {
                var c = param.cards[i];
                if (c.number == 1 || c.number % 2 == 0 || c.number % 3 == 0)  return false;
            }
            return false;
        },
    },
    "love4211": {
        name: "恋の２－４－１１",
        text: "役が成立した手札の中に２、４、Ｊがあった",
        point: 20,
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
    "acesup": {
        name: "エーシーズアップ",
        text: "エースのペアと別のペアの組み合わせのツーペアを成立した",
        point: 10,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand != TWOPAIR) return false;
            if (param.cards[0].number == 1 && param.cards[1].number == 1) return true;
            return false;
        },
    },
    "doubleroyal": {
        name: "ダブルロイヤル",
        text: "ロイヤルストレートフラッシュを２回成立した",
        point: 50,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (param.lastHand != ROYALSTRAIGHTFLUSH) return false;
            if (this.handCound[ROYALSTRAIGHTFLUSH] == 2) return true;
            return false;
        },
    },
    "extend": {
        name: "エクステンド",
        text: "エクステンド条件を達成した",
        point: 30,
        percent: "0",
        secret: false,
        id: "",
        check: function(param) {
            if (this.extend === undefined) return false;
            if (this.extend > 0) return true;
            return false;
        },
    },
};
