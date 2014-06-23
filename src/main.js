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

//スクリーンサイズ
SC_W = 640;
SC_H = 960;

//カードサイズ
CARD_W = 200;
CARD_H = 300;
CARD_SCALE = 0.6;

//スート
SUIT_SPADE = 0;
SUIT_CLOVER = 1;
SUIT_DIAMOND = 2;
SUIT_HEART = 3;

//役一覧
MISS = -50;
NOHAND = -30;
ONEPAIR = 5;
FLASH = 10;
TWOPAIR = 20;
THREECARD = 50;
FULLHOUSE = 80;
STRAIGHT = 100;
FOURCARD = 150;
STRAIGHTFLASH = 300;
ROYALSTRAIGHTFLASH = 500;
FIVECARD = 1000;

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
app = {};

//アプリケーションメイン
tm.main(function() {
    app = shotgun.CanvasApp("#world");
    app.run();
});

