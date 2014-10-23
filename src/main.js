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
PHONEGAP = false;
DEBUG_PHONEGAP = true;

//フォント読み込み終了カウント
fontLoadEnd = 0;

//使用フォント
FONT = ["'KS-Kohichi-FeltPen'", "'azuki'", "'CasinoQueen'", "'CasinoRegular'"];

//GAMECENTER使用フラグ
GAMECENTER = false;

//スクリーンサイズ
SC_W = 640;
SC_H = 960;

//ステータスバー情報
STATUSBAR_HEIGHT = 30;
STATUSBAR_COLOR = 'rgba(0,0,0,1)';

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
RETURN_JOKER_TURN = 3;  //ジョーカーを戻すターン間隔

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

//使用言語
JAPANESE = 0;
ENGLISH = 1;
LANGUAGE = JAPANESE;

//フレームレート
fps = 30;

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

//タイトル無しダイアログ
var AdvanceAlert = function(str) {
    var tmpFrame = document.createElement('iframe');
    tmpFrame.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(tmpFrame);

    window.frames[0].window.alert(str);
    tmpFrame.parentNode.removeChild(tmpFrame);
};
var AdvanceConfirm = function(str) {
    var tmpFrame = document.createElement('iframe');
    tmpFrame.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(tmpFrame);

    var result = window.frames[0].window.confirm(str);
    tmpFrame.parentNode.removeChild(tmpFrame);

    return result;
};

//インスタンス
appMain = {};

//アプリケーションメイン
tm.main(function() {
    //PHONEGAPの場合スクリーンサイズ調整
    if (PHONEGAP) {
        SC_W = window.innerWidth*2;
        SC_H = window.innerHeight*2;
    }

    for (var i = 0; i < FONT.length; i++) {
        detectFontLoading(FONT[i]);
    }

    appMain = shotgun.CanvasApp("#world");
    appMain.run();
});

//フォント読み込み終了検出
detectFontLoading = function(fontName) {    
    var tester = document.createElement('span');
    tester.style.fontFamily = '"' + fontName + '", "Adobe Blank"';
    tester.style.position = 'absolute';
    tester.style.top = '-100px';
    tester.appendChild(document.createTextNode('a'));
    document.body.appendChild(tester);

    var timerId = setInterval(checkWidth, 500);
    function checkWidth() {
        if (tester.offsetWidth > 0) {
            clearInterval(timerId);
            document.documentElement.className += ' ' + fontName.toLowerCase().replace(/\s/g, '_');
            fontLoadEnd++;
            tester.parentNode.removeChild(tester);
        }
    }
}
