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
