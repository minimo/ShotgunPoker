/*
 *  AchievementList.js
 *  2015/02/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

//実績判定
shotgun.achievementList = [
    {
        id:     "onepair",
        name:   "ワンペア",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == ONEPAIR) return true;
            return false;
        },
    },{
        id:     "twopair",
        name:   "ツーペア",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == TWOPAIR) return true;
            return false;
        },
    },{
        id:     "threecard",
        name:   "スリーカード",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == THREECARD) return true;
            return false;
        },
    },{
        id:     "fourcard",
        name:   "フォーカード",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == FOURCARD) return true;
            return false;
        },
    },{
        id:     "threecard",
        name:   "ファイブカード",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == FIVECARD) return true;
            return false;
        },
    },{
        id:     "flash",
        name:   "フラッシュ",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == FLASH) return true;
            return false;
        },
    },{
        id:     "fullhouse",
        name:   "フルハウス",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == FULLHOUSE) return true;
            return false;
        },
    },{
        id:     "straight",
        name:   "ストレート",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == STRAIGHT) return true;
            return false;
        },
    },{
        id:     "straightflash",
        name:   "ストレートフラッシュ",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == STRAIGHTFLASH) return true;
            return false;
        },
    },{
        id:     "royalstraightflash",
        name:   "Ｒ．ストレートフラッシュ",
        percent: "0",
        secret: false,
        check: function(param) {
            if (param.lastHand == ROYALSTRAIGHTFLASH) return true;
            return false;
        },
    },{
        id:     "complete",
        name:   "コンプリート",
        percent: "0",
        secret: false,
        check: function(param) {
            var handCount = param.handCount;
            var cp = false;
            if (handCount[ONEPAIR] == 0) cp = false;
            if (handCount[FLASH] == 0) cp = false;
            if (handCount[TWOPAIR] == 0) cp = false;
            if (handCount[THREECARD] == 0) cp = false;
            if (handCount[FULLHOUSE] == 0) cp = false;
            if (handCount[STRAIGHT] == 0) cp = false;
            if (handCount[FOURCARD] == 0) cp = false;
            if (handCount[STRAIGHTFLASH] == 0) cp = false;
            if (handCount[ROYALSTRAIGHTFLASH] == 0) cp = false;
            return cp;
        },
    },{
        id:     "123",
        name:   "１－２－３",
        percent: "0",
        secret: false,
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
    },{
        id:     "4211",
        name:   "恋の２－４－１１",
        percent: "0",
        secret: false,
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
];
