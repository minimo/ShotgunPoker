/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//Confirm dialog
var setConf = function(str) {
    var tmpFrame = document.createElement('iframe');
    tmpFrame.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(tmpFrame);

    var result = window.frames[0].window.confirm(str);
    tmpFrame.parentNode.removeChild(tmpFrame);

    return result;
};

//PhoneGap Device Events
var onDeviceready = function () {
    if (DEBUG_PHONEGAP) alert('devicereadyイベントが発火しました');
    PHONEGAP = true;

    //Game Center Plugin
    gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
}

var onPause = function() {
    if (DEBUG_PHONEGAP) alert('pauseイベントが発火しました');
    var scene = appMain.currentScene;
    if (scene instanceof shotgun.MainScene && !scene.gameend) {
        appMain.pushScene(shotgun.PauseScene(scene));
    }
}

var onResume = function() {
    if (DEBUG_PHONEGAP) alert('resumeイベントが発火しました');
}

var onOnline = function() {
    if (DEBUG_PHONEGAP) alert('onlineイベントが発火しました');
}

var onOffline = function() {
    if (DEBUG_PHONEGAP) alert('offlineイベントが発火しました');
}

var onGamecenterSuccess = function() {
    if (DEBUG_PHONEGAP) alert('GAMECENTER connect success');
    GAMECENTER = true;
}

var onGamecenterFailure = function(result) {
    alert('GAMECENTERに接続できませんでした。\n'+result);
    GAMECENTER = false;
}

//Phonegap Event listener
document.addEventListener('deviceready', onDeviceready, false);
document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('online', onOnline, false);
document.addEventListener('offline', onOffline, false);

//GamecenterPlungin
//https://github.com/leecrossley/cordova-plugin-game-center.git

