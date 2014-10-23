/*
 *  language.js
 *  2014/10/23
 *  @auther minimo  
 *  This Program is MIT license.
 */

//メッセージ言語変換
var lang = function(msg) {
    //英語変換
    if (LANGUAGE == ENGLISH) {
        if (msg == "得点表") return "SCORE LIST";
        if (msg == "GAMECENTERのアクセスに失敗しました") return "I failed to access the GAMECENTER";
        if (msg == "GAMECENTERの準備が出来ていません") return "I failed to access the GAMECENTER";
    }
    return msg;
}
