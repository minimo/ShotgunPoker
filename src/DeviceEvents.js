/*
 *  DeviceEvents.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//実行ＯＳ種別
DEVICE_IOS = false;
DEVICE_ANDROID = false;

//定数
//PhoneGap使用可能フラグ
ENABLE_PHONEGAP = false;
DEBUG_PHONEGAP = false;

//GAMECENTER(GooglePlay)使用可能フラグ
ENABLE_GAMECENTER = false;
DEBUG_GAMECENTER = false;

//AdMob使用可能フラグ
ENABLE_ADMOB = false;
DEBUG_ADMOB = false;
TEST_ADMOB = false;

//Social Message
ENABLE_SOCIAL = false;

//PhoneGap Device Events
var onDeviceReady = function () {

    //使用ＯＳの判別
    DEVICE_IOS = ( /(android)/i.test(navigator.userAgent) )? false: true;
    if (!DEVICE_IOS) DEVICE_ANDROID = true;

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
    if (DEVICE_IOS) {
        gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
    }
    if (DEVICE_ANDROID) {
    }

    //Social Message
    ENABLE_SOCIAL = true;
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
    if (DEVICE_IOS) {
        if (!ENABLE_GAMECENTER) {
            gamecenter.auth(onGamecenterSuccess, onGamecenterFailure);
        }
        return;
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

/*
 *
 * iOS GameCenter
 * Android Google Play
 *
 */

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
var registScore = function(mode, returnJoker, score) {
    if (!ENABLE_GAMECENTER) return false;
    if (DEVICE_IOS) {
        var lb = "Normal";
        if (mode == GAMEMODE_HARD) lb = "Hard";
        if (returnJoker) lb += "_ReturnJoker";
        gamecenter.submitScore(
            function() {
                if (DEBUG_GAMECENTER) AdvanceAlert('スコア登録に成功しました');
            },
            function() {
                if (DEBUG_GAMECENTER) AdvanceAlert('スコア登録に失敗しました');
            }, {
                score: score,
                leaderboardId: lb,
            });
    }
    if (DEVICE_ANDROID) {
    }
}

//GameCenterに実績登録
var reportAchievements = function(id, percent) {
    if (!ENABLE_GAMECENTER) return false;
    if (DEVICE_IOS) {
        gamecenter.reportAchievement(
            function(){
                if (DEBUG_GAMECENTER) AdvanceAlert('実績登録に成功しました');
            },
            function(){
                if (DEBUG_GAMECENTER) AdvanceAlert('実績登録に失敗しました');
            }, {
                achievementId: a.id,
                percent: "100"
            });
    }
    if (DEVICE_ANDROID) {
    }
    return true;
}

//GameCenterの実績をリセット
var resetAchievements = function() {
    if (!ENABLE_GAMECENTER) return false;
    if (DEVICE_IOS) {
        gamecenter.resetAchievements(
            function(){
                if (DEBUG_GAMECENTER) AdvanceAlert('実績リセットに成功しました');
            },
            function(){
            if (DEBUG_GAMECENTER) AdvanceAlert('実績リセットに失敗しました');
            });
    }
    if (DEVICE_ANDROID) {
    }
}

/*
 *
 * AdMob
 *
 */

var ad_units = {
    ios : {
        banner:       'ca-app-pub-4753786498901311/3019381180', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-4753786498901311/7270571985'
//        banner: '/6253334/dfp_example_ad', // or DFP format "/6253334/dfp_example_ad"
//        interstitial: 'ca-app-pub-3940256099942544/4411468910'
    },
    android : {
        banner:       'ca-app-pub-4753786498901311/3019381180', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-4753786498901311/7270571985'
    }
};
// select the right Ad Id according to platform
var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;

// AdMob CallBack
var onBannerLeaveApp = function(result) {
    if (DEBUG_ADMOB) AdvanceAlert('OnBannerLeaveApp\n'+result);
}

var onBannerDismiss = function(result) {
    if (DEBUG_ADMOB) AdvanceAlert('OnBannerDismiss\n'+result);
}

var onInterstitialPresent = function(result) {
    if (DEBUG_ADMOB) AdvanceAlert('onInterstitialPresent\n'+result);
}

var onInterstitialLeaveApp = function(result) {
    if (DEBUG_ADMOB) AdvanceAlert('onInterstitialLeaveApp\n'+result);
}

var onInterstitialDissmiss = function(result) {
    if (DEBUG_ADMOB) AdvanceAlert('onInterstitialDissmiss\n'+result);
}

//AdMob Event listener
document.addEventListener('onBannerLeaveApp', onBannerLeaveApp, false);
document.addEventListener('onBannerDismiss', onBannerDismiss, false);
document.addEventListener('onInterstitialPresent', onInterstitialPresent, false);
document.addEventListener('onInterstitialLeaveApp', onInterstitialLeaveApp, false);
document.addEventListener('onInterstitialDissmiss', onInterstitialDissmiss, false);

/*
 *
 * Social Message
 *
 */

//ソーシャルにメッセージを送る
var sendSocialMessage = function() {
    if (!ENABLE_SOCIAL) return false;

    var message = {
        text: "This is a test message",
//        activityTypes: ["PostToTwitter"],
    };
    window.socialmessage.send(message);
}
