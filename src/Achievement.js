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
        complete:false,
        gameover: false,
        useJoker: false,
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
            if (a.percent != "100" && a.check(param)) {
                a.percent = "100";
                acList.push(a);

                //ゲームセンターに実績登録
                if (ENABLE_GAMECENTER) reportAchievements(list[i], a.percent);
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
        if (ac[name] && ac[name].percent != "100") {
            ac[name].percent = "100";
            //ゲームセンターに実績登録
            if (ENABLE_GAMECENTER) reportAchievements(name, a.percent);
            return true;
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
            obj.percent = data[id].percent;
        }
    },

    //ゲームセンターと実績情報同期
    syncGamecenter: function() {
        if (!ENABLE_GAMECENTER) return false;
        var successCallback = function (results) {
            if (results) {
                var len = results.length;
                for (var i = 0; i < len; i++) {
                    //results[i].identifier
                    //results[i].percentComplete
                    //results[i].completed
                    //results[i].lastReportedDate
                    //results[i].showsCompletionBanner
                    //results[i].playerID
                }
            }
        }
        gamecenter.getAchievements(function(){}, function(){});
    },

    //全実績をリセット
    reset: function() {
        var acList = [];
        var ac = shotgun.achievementList;
        var len = shotgun.achievementList.length;
        for (var i = 0; i < len; i++) {
            var obj = ac[i];
            ac.percent = "0";
        }

        //ローカルストレージのデータを消してセーブしなおす
        localStorage.removeItem("achievement");
        this.save();

        //ゲームセンターの実績を消去
        if (ENABLE_GAMECENTER) resetAchievements();
    },
});
