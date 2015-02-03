/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//定数
//PhoneGap使用可能フラグ
ENABLE_PHONEGAP = false;
DEBUG_PHONEGAP = false;

//GAMECENTER使用可能フラグ
ENABLE_GAMECENTER = false;
DEBUG_GAMECENTER = false;

//PhoneGap Device Events
var onDeviceReady = function () {
    if (DEBUG_PHONEGAP) {
        AdvanceAlert('devicereadyイベントが発火しました');
        AdvanceAlert('Device:'+device.name+" "+device.platform);
    }

    ENABLE_PHONEGAP = true;

    //AdMob plugin
    if (AdMob) {
        var defaultOptions = {
            bannerId: admobid.banner,
            interstitialId: admobid.interstitial,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black',
            isTesting: TEST_ADMOB,
            autoShow: true
        };
        AdMob.setOptions(defaultOptions);
        ENABLE_ADMOB = true;
    }

    //Game Center Plugin
    if (USE_GAMECENTER) {
        gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
    }
}

var onPause = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('pauseイベントが発火しました');

    //ゲーム中の場合ポーズシーンに移行
    var scene = appMain.currentScene;
    if (scene instanceof shotgun.MainScene && !scene.gameend) {
        appMain.pushScene(shotgun.PauseScene(scene));
    }
}

var onResume = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('resumeイベントが発火しました');

    //GAME CENTERに再度接続を行う
    if (!ENABLE_GAMECENTER) {
        gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
    }
}

var onOnline = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('onlineイベントが発火しました');
}

var onOffline = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('offlineイベントが発火しました');
}

//Phonegap Event listener
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('online', onOnline, false);
document.addEventListener('offline', onOffline, false);

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
var registScore = function(mode, score) {
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

