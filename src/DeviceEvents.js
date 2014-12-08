/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//PhoneGap Device Events
var onDeviceready = function () {
    if (DEBUG_PHONEGAP) {
        AdvanceAlert('devicereadyイベントが発火しました');
        AdvanceAlert('Device:'+device.name+" "+device.platform);
    }

    PHONEGAP = true;

    //音声ファイル読み込み
    if (Media) {
        var cp = cordovaPath();
        appMain.sounds.add("titleBGM",    cp+"assets/game_maoudamashii_5_casino02.mp3");
        appMain.sounds.add("mainBGM",     cp+"assets/game_maoudamashii_5_casino01.mp3");
        appMain.sounds.add("tutorialBGM", cp+"assets/game_maoudamashii_5_casino04.mp3");
        appMain.sounds.add("countdown",   cp+"assets/se_countdown.mp3");
        appMain.sounds.add("deal",        cp+"assets/se_deal.mp3");
        appMain.sounds.add("dist",        cp+"assets/se_maoudamashii_se_paper01.mp3");
        appMain.sounds.add("hand",        cp+"assets/se_hand.mp3");
        appMain.sounds.add("nopair",      cp+"assets/se_nopair.mp3");
    }

    //スクリーンサイズ調整
    if (appMain) {
        SC_W = window.innerWidth*2;
        SC_H = window.innerHeight*2;
        appMain.resize(SC_W, SC_H).fitWindow();
    }

    //Game Center Plugin
    gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
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
    if (!GAMECENTER) {
        gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
    }
}

var onOnline = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('onlineイベントが発火しました');
}

var onOffline = function() {
    if (DEBUG_PHONEGAP) AdvanceAlert('offlineイベントが発火しました');
}

var onGamecenterSuccess = function() {
    if (DEBUG_PHONEGAP) AdvanceAlertt('GAMECENTER connect success');
    GAMECENTER = true;
}

var onGamecenterFailure = function(result) {
    AdvanceAlert('GAMECENTERに接続できませんでした。\n'+result);
    GAMECENTER = false;
}

//Phonegap Event listener
document.addEventListener('deviceready', onDeviceready, false);
document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('online', onOnline, false);
document.addEventListener('offline', onOffline, false);

//UsingPluginList
//Gamecenter
//https://github.com/leecrossley/cordova-plugin-game-center.git
//Admob
//https://github.com/floatinghotpot/cordova-plugin-admob.git
//StatusBar
//https://github.com/apache/cordova-plugin-statusbar.git
//Device
//https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git

function cordovaPath() {
 var path = window.location.pathname
 return path.slice(0, path.indexOf("/www/") + 5)
}

