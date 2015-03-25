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

    defaultParam: {
        mode:-1,
        cards:null,
        lastHand:-100,
        handLog:[0,0,0,0,0,0,0,0,0,0],
        score:0,
        handCount:0,
        complete: false,
        gameover: false,
        useJoker: false,
        leftTime: -99,
    },

    //実績達成チェック
    check: function(param) {
        if (!ENABLE_ACHIEVEMENT) return null;
        param.$safe(this.defaultParam);
        var acList = [];
        var ac = shotgun.achievementList;
        var list = Object.getOwnPropertyNames(ac);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var a = ac[list[i]];
            if (a.check(param)) {
                if (a.percent != "100") {
                    a.percent = "100";
                    acList.push(a);
                    //ゲームセンターに実績登録
                    if (ENABLE_GAMECENTER) reportAchievements(list[i], "100");
                }
            }
        }
        if (acList.length == 0) return null;0
        this.save();
        return acList;
    },

    //実績の強制登録
    put: function(name) {
        var ac = shotgun.achievementList;
        var list = Object.getOwnPropertyNames(ac);
        if (ac[name]) {
            if (ac[name].percent != "100") {
                ac[name].percent = "100";
                //ゲームセンターに実績登録
                if (ENABLE_GAMECENTER) reportAchievements(name, "100");
                return true;
            }
        }
        return false;
    },

    //ローカルストレージへ保存
    save: function() {
        if (!ENABLE_ACHIEVEMENT) return;
        var saveObj = {};
        var ac = shotgun.achievementList;
        var list = Object.getOwnPropertyNames(ac);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var obj = ac[list[i]];
            saveObj[list[i]] = {
                "percent": obj.percent,
            }
        }
        localStorage.setItem("achievement", JSON.stringify(saveObj));
    },

    //ローカルストレージから読み込み
    load: function() {
        if (!ENABLE_ACHIEVEMENT) return;
        var ac = localStorage.getItem("achievement");
        if (!ac) return;
        var data = JSON.parse(ac);

        //達成実績を反映
        var list = Object.getOwnPropertyNames(data);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var id = list[i];
            var obj = shotgun.achievementList[id];
            if (obj) obj.percent = data[id].percent;
        }

        //ゲームセンター実績情報同期
        this.syncGamecenter();
    },

    //ゲームセンターと実績情報同期
    syncGamecenter: function() {
        if (!ENABLE_GAMECENTER) return false;
        gamecenter.getAchievements(function(results) {
            if (results) {
                //実績リストの達成状況を全クリア
                shotgun.achievementList.$forIn(function(key, value, index) {
                    value.percent = "0";
                });

                var ac = shotgun.achievementList;
                var len = results.length;
                for (var i = 0; i < len; i++) {
                    var res = results[i];
                    var id = res.identifier;
                    if (ac[id]) {
                        //実績達成状況をGAMECENTER側の情報にあわせる
                        if (res.completed) {
                            ac[id].percent = "100";
                        }
                    }
                    //results[i].identifier
                    //results[i].percentComplete
                    //results[i].completed
                    //results[i].lastReportedDate
                    //results[i].showsCompletionBanner
                    //results[i].playerID
                }
            }
        }, function(){});
    },

    //全実績をリセット
    reset: function() {

        //実績リストの達成状況を全クリア
        shotgun.achievementList.$forIn(function(key, value, index) {
            value.percent = "0";
        });

        //ローカルストレージのデータを消してセーブしなおす
        localStorage.removeItem("achievement");
        this.save();

        //ゲームセンターの実績を消去
        if (ENABLE_GAMECENTER) resetAchievements();
    },
})