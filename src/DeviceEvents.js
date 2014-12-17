/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//PhoneGap Device Events
var onDeviceReady = function () {
    if (DEBUG_PHONEGAP) {
        AdvanceAlert('devicereadyイベントが発火しました');
        AdvanceAlert('Device:'+device.name+" "+device.platform);
    }

    PHONEGAP = true;

    //Admob option set
    prepareAdmob();
    createBanner();

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
    GAMECENTER = true;
}

var onGamecenterFailure = function(result) {
    if (DEBUG_GAMECENTER) AdvanceAlert('GAMECENTERに接続できませんでした。\n'+result);
    GAMECENTER = false;
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

var bannerIsReady = false;
var createBanner = function() {
    if(!bannerIsReady && PHONEGAP && AdMob) {
        AdMob.createBanner({
            adId:admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER
//            autoShow:true,
//            isTesting: true
        }, function() {
            bannerIsReady = true;
        }, function() {
        });
    }
}

var prepareAdmob = function() {
    var defaultOptions = {
        bannerId: admobid.banner,
        interstitialId: admobid.interstitial,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black',
        isTesting: true,
        autoShow: true
    };
    AdMob.setOptions(defaultOptions);
}

//UsingPluginList
//Gamecenter
//https://github.com/leecrossley/cordova-plugin-game-center.git
//Admob
//https://github.com/floatinghotpot/cordova-admob-pro.git
//StatusBar
//https://github.com/apache/cordova-plugin-statusbar.git
//Device
//https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
//WKWebView
//https://github.com/Telerik-Verified-Plugins/WKWebView.git
