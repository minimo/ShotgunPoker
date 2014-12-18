/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//定数
//PhoneGap使用フラグ
ENABLE_PHONEGAP = false;
DEBUG_PHONEGAP = false;

//GAMECENTER使用フラグ
ENABLE_GAMECENTER = false;
DEBUG_GAMECENTER = true;

//PhoneGap Device Events
var onDeviceReady = function () {
    if (DEBUG_PHONEGAP) {
        AdvanceAlert('devicereadyイベントが発火しました');
        AdvanceAlert('Device:'+device.name+" "+device.platform);
    }

    PHONEGAP = true;

    //Admob setting
    if(AdMob) {
        var defaultOptions = {
            bannerId: admobid.banner,
            interstitialId: admobid.interstitial,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black',
            isTesting: true,
            autoShow: true
        };
        AdMob.setOptions(defaultOptions);

        AdMob.createBanner({
            adId:admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER
//            autoShow:true,
//            isTesting: true
        });
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
    if (DEBUG_GAMECENTER) AdvanceAlertt('GAMECENTER connect success');
    ENABLE_GAMECENTER = true;
}

var onGamecenterFailure = function(result) {
    if (DEBUG_GAMECENTER) AdvanceAlert('GAMECENTERに接続できませんでした。\n'+result);
    ENABLE_GAMECENTER = false;
}

//Phonegap Event listener
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('online', onOnline, false);
document.addEventListener('offline', onOffline, false);


function cordovaPath() {
    var path = window.location.pathname
    return path.slice(0, path.indexOf("/www/") + 5)
}

var ad_units = {
    ios : {
        banner: '/6253334/dfp_example_ad', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-3940256099942544/4411468910'
    },
    android : {
        banner: 'ca-app-pub-4753786498901311/7270571985', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-4753786498901311/7270571985'
    }
};

// select the right Ad Id according to platform
var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;

