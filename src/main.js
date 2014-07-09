/*
 *  main.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//乱数発生器
mt = new MersenneTwister();

//定数
//デバッグフラグ
DEBUG = false;
DEBUG_PHONEGAP = false;
PHONEGAP = false;

//スクリーンサイズ
SC_W = 640;
SC_H = 960;

//カードサイズ
CARD_W = 200;
CARD_H = 300;
CARD_SCALE = 0.5;

//スート
SUIT_SPADE = 0;
SUIT_CLOVER = 1;
SUIT_DIAMOND = 2;
SUIT_HEART = 3;
SUIT_JOKER = 4;

//シャッフルが発生する残りカード枚数
SHUFFLE_LIMIT = 25;

//ジョーカー使用フラグ
USE_JOKER = true;
RETURN_JOKER = false;   //使用したジョーカーを場に戻すか

//役一覧
MISS = -20;
NOHAND = -10;
ONEPAIR = 10;
FLASH = 20;
TWOPAIR = 50;
THREECARD = 100;
FULLHOUSE = 200;
STRAIGHT = 300;
FOURCARD = 500;
STRAIGHTFLASH = 700;
FIVECARD = 800;
ROYALSTRAIGHTFLASH = 1000;

//フレームレート
fps = 30;

//使用フォント
FONT1 = "'KS-Kohichi-FeltPen'";
FONT2 = "'azuki'";

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(fps * s);}    //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生

//距離計算
var distance = function(from, to) {
    var x = from.x-to.x;
    var y = from.y-to.y;
    return Math.sqrt(x*x+y*y);
}

//距離計算（ルート無し版）
var distanceSq = function(from, to) {
    var x = from.x-to.x;
    var y = from.y - to.y;
    return x*x+y*y;
}

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//インスタンス
appMain = {};

//アプリケーションメイン
tm.main(function() {
    if (PHONEGAP && DEBUG_PHONEGAP) alert('tm.main entry');

    appMain = shotgun.CanvasApp("#world");
    appMain.run();
});

//iPhone device event message
document.addEventListener('deviceready', function () {
    if (DEBUG_PHONEGAP) alert('devicereadyイベントが発火しました');
    PHONEGAP = true;
    checkDevice();
    if (DEBUG_PHONEGAP) alert(appMain.windowWidth+":"+appMain.windowHeight);
}, false);

document.addEventListener('pause', function() {
    if (DEBUG_PHONEGAP) alert('pauseイベントが発火しました');
    var scene = appMain.currentScene;
    if (scene instanceof shotgun.MainScene) {
        appMain.pushScene(shotgun.PauseScene(scene));
    }
}, false);

document.addEventListener('resume', function() {
    if (DEBUG_PHONEGAP) alert('resumeイベントが発火しました');
}, false);

/*
document.addEventListener(‘online’, PENQs.online, false);
document.addEventListener(‘offline’, PENQs.offline, false);
*/

//実行環境チェック
checkDevice = function() {
    appMain.isPad = (navigator.userAgent.indexOf('iPad')+1?true:false);
    appMain.isPod = (navigator.userAgent.indexOf('iPad')+1?true:false);
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

