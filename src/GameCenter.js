/*
 *  GameCenter.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//定数
//GAMECENTER使用可能フラグ
ENABLE_GAMECENTER = false;
DEBUG_GAMECENTER = false;

// GAMECENTER CallBack
var onGamecenterSuccess = function() {
    if (DEBUG_GAMECENTER) AdvanceAlert('GameCenter connect success');
    ENABLE_GAMECENTER = true;
}

var onGamecenterFailure = function(result) {
    if (DEBUG_GAMECENTER) AdvanceAlert('GameCenterに接続できませんでした\n'+result);
    ENABLE_GAMECENTER = false;
}

//リーダーズボード参照
var showLeadersBoard = function(id) {
    id = id || "";

    if (!ENABLE_PHONEGAP) {
        appMain.pushScene(shotgun.AlertDialog({
            height: SC_H*0.2,
            text1: "GameCenterに接続できませんでした",
            fontSize: 32,
            button: "OK"
        }));
        return false;
    }

    //GAMECENTERに接続してない場合は再接続
    if (!ENABLE_GAMECENTER) {
        gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);

        //再接続失敗
        if (!ENABLE_GAMECENTER) {
            appMain.pushScene(shotgun.AlertDialog({
                height: SC_H*0.2,
                text1: "GameCenterに接続できませんでした",
                fontSize: 32,
                button: "OK"
            }));
            return false;
        }
    }

    var data = {
//        period: "today",
        leaderboardId: id,
    };
    gamecenter.showLeaderboard(function(){}, function(){}, data);
    return true;
}

//GameCenterにスコアを登録
registScore: function(mode, score) {
    //GAMECENTERにスコアを登録
    if (ENABLE_GAMECENTER) {
        var lb = "Normal";
        if (mode == GAMEMODE_HARD) lb = "Hard";
        if (appMain.returnJoker) lb += "_ReturnJoker";
        var data = {
            score: score,
            leaderboardId: lb,
        };
        gamecenter.submitScore(
            function() {
                if (DEBUG_GAMECENTER) AdvanceAlert('スコア登録に成功しました');
            },
            function() {
                if (DEBUG_GAMECENTER) AdvanceAlert('スコア登録に失敗しました');
            }, data);
    }
}
