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
        var list = Object.getOwnPropertyNames(ac);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var a = ac[list[i]];
            if (a.percent != "100" && a.check(param)) {
                a.percent = "100";
                acList.push(a);
            }
        }
        if (acList.length == 0) return null;
        this.save();
        return acList;
    },

    //ローカルストレージへ保存
    save: function() {
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

        //ローカルストレージのデータを消してセーブしなおす
        localStorage.removeItem("achievement");
        this.save();
    },
});
