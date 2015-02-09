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

    check: function(param) {
        var acList = [];
        var ac = shotgun.achievementList;
        var len = shotgun.achievementList.length;
        for (var i = 0; i < len; i++) {
            var a = ac[i];
            if (a.percent != "100" && a.check(param)) {
                a.percent = "100";
                acList.push(a);
            }
        }
        if (acList.length == 0) return null;
        return acList;
    },

    //ローカルストレージへ保存
    save: function() {
        var saveObj = {};
        var list = shotgun.achievementList;
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            saveObj[obj.id] = {
                "id": obj.id,
                "percent": obj.percent,
            }
        }
        localStorage.setItem("achievement", JSON.stringify(saveObj));
    },

    //ローカルストレージから読み込み
    load: function() {
        var ac = localStorage.getItem("achievement");
    },

    //ゲームセンターから実績情報を読み込み
    loadFromGamecenter: function() {
    },

    //ゲームセンターと実績情報同期
    syncGamecenter: function() {
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
    },
});
