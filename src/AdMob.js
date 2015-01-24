/*
 *  AdMob.js
 *  2014/07/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

//定数
//AdMob使用可能フラグ
ENABLE_ADMOB = false;
DEBUG_ADMOB = false;
TEST_ADMOB = false;

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
