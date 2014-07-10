/*
 *  phonegap.js
 *  2014/07/10
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
var onDeviceready = function () {
    if (DEBUG_PHONEGAP) alert('devicereadyイベントが発火しました');
    PHONEGAP = true;

    //Game Center Plubin
    gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);

    //実行環境取得
    appMain.isPad = (navigator.userAgent.indexOf('iPad')+1?true:false);
    appMain.isPod = (navigator.userAgent.indexOf('iPod')+1?true:false);
    appMain.isPhone = (navigator.userAgent.indexOf('iPhone')+1?true:false);
    appMain.isAndroid = (navigator.userAgent.indexOf('Android')+1?true:false);
    appMain.isiOS4 = navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i)!==null;
    appMain.isiOS5 = navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i)!==null;
    appMain.isiOS6 = navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i)!==null;
    appMain.version = window.device.version;
    appMain.model = window.device.model;
    appMain.name = window.device.name;
    appMain.uuid = window.device.uuid;

    appMain.windowWidth = window.innerWidth;
    appMain.windowHeight = window.innerHeight;
}

var onPause = function() {
    if (DEBUG_PHONEGAP) alert('pauseイベントが発火しました');
    var scene = appMain.currentScene;
    if (scene instanceof shotgun.MainScene) {
        appMain.pushScene(shotgun.PauseScene(scene));
    }
}

var onResume = function() {
    if (DEBUG_PHONEGAP) alert('resumeイベントが発火しました');
}

var onOnline = function() {
}

var onOffline = function() {
}

var onGamecenterSuccess = function() {
    if (DEBUG_PHONEGAP) alert('GAMECENTER connect success');
}

var onGamecenterFailure = function() {
    if (DEBUG_PHONEGAP) alert('GAMECENTER connect failure');
}

//Phonegap Event listener
document.addEventListener('deviceready', onDeviceready, false);
document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('online', onOnline, false);
document.addEventListener('offline', onOffline, false);

