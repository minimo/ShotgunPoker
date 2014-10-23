/*
 *  language.js
 *  2014/10/23
 *  @auther minimo  
 *  This Program is MIT license.
 */

//言語変換
var $trans = function(text) {
    //英語変換
    if (appMain.language == ENGLISH) {
        //tutorial
        if (text == "得点表") return "SCORE LIST";
        if (text == "プレイ画面の説明") return "Description";

        //GAMECENTER
        if (text == "GAMECENTERのアクセスに失敗しました") return "I failed to access the GAMECENTER";
        if (text == "GAMECENTERの準備が出来ていません") return "I failed to access the GAMECENTER";

        //POKER HANDS
        if (text == "NO HAND") return "NO PAIR";
        if (text == "FOUR CARD") return "FOUR OF A KIND";
        if (text == "THREE CARD") return "THREE OF A KIND";
        if (text == "R.STRAIGHT FLASH") return "ROYAL FLASH";
    }
    return text;
}
