/*
 *  MainScene.js
 *  2014/06/19
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("shotgun.MainScene", {
    superClass: tm.app.Scene,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,

    //タッチ情報
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //デッキ
    deck: null,
    shuffled: false,

    //ゲーム内情報
    start: false,   //ゲームスタートフラグ
    score: 0,       //スコア
    life: 3,        //ライフ
    lifeMax: 5,     //ライフ最大値
    pick: false,    //カードピック可能フラグ
    count: 9,       //カード選択カウントダウン用
    level: 1,       //ゲームレベル
    levelReset: 0,  //レベルリセット回数
    handCount: null,//役の回数
    onePair: 0,     //ワンペアの連続回数
    gameend: false, //ゲーム終了フラグ

    //経過時間
    time: 0,
    absTime: 0,

    //遷移情報
    exitGame: false,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("greenback", SC_W, SC_H).addChildTo(this);
        this.bg.setPosition(SC_W/2, SC_H/2);

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);

        //レイヤー準備
        this.lowerLayer = tm.app.Object2D().addChildTo(this);
        this.mainLayer = tm.app.Object2D().addChildTo(this);
        this.upperLayer = tm.app.Object2D().addChildTo(this);

        //上がり回数配列
        this.handCount = [];
        for (var i = 0; i < 12; i++) {
            this.handCount[appMain.handList[i].point] = 0;
        }

        //スコア表示
        var that = this;
        var lb = this.scoreLabel = tm.display.OutlineLabel("SCORE:", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 3;
        lb.setPosition(8, 72);
        lb.update = function() {
            this.text = "SCORE:"+that.score;
        }

        //ライフ表示
        var lb = this.lifeLabel = tm.display.OutlineLabel("LIFE:", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 3;
        lb.setPosition(8, 128);
        this.lg = [];
        for (var i = 0; i < 7; i++ ) {
            var c = this.lg[i] = shotgun.Card(SUIT_HEART, 0).addChildTo(this);
            c.setScale(0.2);
            c.setPosition( 155+i*45, 128);
            c.life = i;
            c.update = function() {
                this.pattern = that.life+this.suit*13-1;
                if (this.life < that.life) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            }
        }

        //ポーズボタン
        var sh = this.credit = tm.display.RoundRectangleShape(200, 50, {fillStyle:'rgba(0,80,0,1)', lineWidth:4}).addChildTo(this);
        sh.setPosition(SC_W*0.84, 72);
        sh.interactive = true;
        var lb = this.creditLabel = tm.display.OutlineLabel("pause", 50).addChildTo(this);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.84, 64);

        //ステータスバー
        var sh = tm.display.RectangleShape(SC_W, STATUSBAR_HEIGHT, {strokeStyle: STATUSBAR_COLOR,fillStyle: STATUSBAR_COLOR}).addChildTo(this);
        sh.originX = sh.originY = 0;

        //目隠し
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this.mainLayer);

        //BGM再生
        appMain.playBGM("mainBGM");

        //スタートアップ
        var lb = this.readyLabel = tm.display.OutlineLabel("READY", 100).addChildTo(this.upperLayer);
        lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline  = "middle"; lb.outlineWidth = 2;
        lb.setPosition(SC_W/2, SC_H/2);
        lb.tweener.clear().wait(500).fadeOut(500).wait(300);
        lb.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
            that.pick = true;
        });

        //カウントダウン表示
        var lb = this.countDown = tm.display.OutlineLabel("5", 300).addChildTo(this.upperLayer);
        lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline  = "middle"; lb.outlineWidth = 3;
        lb.setPosition(SC_W/2, SC_H/2);
        lb.beforeCount = 9;
        lb.alpha = 1.0;
        lb.update = function() {
            if (that.count < 6) {
                this.visible = true;
                if (this.beforeCount == that.count) {
                    this.alpha -= 0.05;
                    if (this.alpha < 0)this.alpha = 0;
                } else {
                    this.alpha = 1.0;
                    tm.asset.AssetManager.get("countdown").clone().play();
                }
            } else {
                this.visible = false;
            }
            this.text = ""+that.count;
            this.beforeCount = that.count;
        }

        if (DEBUG) {
            var lb = this.creditLabel = tm.display.OutlineLabel("", 40).addChildTo(this);
            lb.fontFamily = "'azuki'"; lb.align = "left"; lb.baseline = "middle"; lb.outlineWidth = 4;
            lb.setPosition(SC_W*0.0, SC_H*0.9);
            lb.update = function() {
                this.text = "Level:"+that.level;
            }
        }
    },
    
    update: function() {
        if (!this.start) return;
        if (this.deck.busy) return;

        var interval = 45-~~(this.level*10);
        if (interval < 10) interval = 10;
        if (this.time % interval == 0 && this.pick) {
            this.count--;
        }

        //手札が五枚揃ったor時間切れ
        if (this.deck.numHand == 5 || this.count < 0) {
            this.pick = false;
            this.deck.sortHand();
            this.deck.numHand = 0;
            var sc = this.deck.checkHand();
            this.dispHand(sc);
            this.handCount[sc]++;

            //役無し、手札未成立、ワンペア２連続はペナルティ
            var penalty = 0;
            if (sc == NOHAND) penalty = 1;
            if (sc == MISS) penalty = 1;
            if (sc == ONEPAIR) {
                this.onePair++;
                if (this.onePair % 2 == 0) penalty = 1;
            } else {
                this.onePair = 0;
            }
            if (penalty > 0) {
                this.life -= penalty;
                var lb = tm.display.OutlineLabel("LIFE -"+penalty, 50).addChildTo(this);
                lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 3;
                lb.setPosition(SC_W*0.8, SC_H*0.8);
                lb.alpha = 0;
                lb.tweener.clear().wait(1200).fadeIn(1).to({x: SC_W*0.8, y: SC_H*0.8-20, alpha:0.0},1000).call(function(){lb.remove();});
                appMain.playSE("nohand");
            } else {
                appMain.playSE("hand");
            }

            //初回R.S.Fの場合はライフ＋１
            if (sc == ROYALSTRAIGHTFLASH && this.handCount[sc] == 1) {
                this.life++;
                if (this.life > this.lifeMax) {
                    this.life = this.lifeMax;
                } else {
                    var lb = tm.display.OutlineLabel("1UP!!"+penalty, 50).addChildTo(this);
                    lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 3;
                    lb.setPosition(SC_W*0.8, SC_H*0.8);
                    lb.alpha = 0;
                    lb.tweener.clear().wait(1200).fadeIn(1).to({x: SC_W*0.8, y: SC_H*0.8-20, alpha:0.0},1000).call(function(){lb.remove();});
                }
            }

            //早上がりボーナス
            if (this.count > 7 && sc > 0) {
                sc = ~~(sc*2);
                var lb = tm.display.OutlineLabel("FANTASTIC!", 100).addChildTo(this);
                lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 3;
                lb.setPosition(SC_W*0.5, SC_H*0.5);
                lb.tweener.clear().wait(1000).call(function(){lb.remove();});
            } else if (this.count > 4 && sc > 0) {
                sc = ~~(sc*1.5);
                var lb = tm.display.OutlineLabel("EXCELLENT!", 100).addChildTo(this);
                lb.fontFamily = "'KS-Kohichi-FeltPen'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 3;
                lb.setPosition(SC_W*0.5, SC_H*0.5);
                lb.tweener.clear().wait(1000).call(function(){lb.remove();});
            }
            this.score += sc;
            if (this.score < 0) this.score = 0;

            //ゲームオーバー判定
            if (this.life < 0) {
                appMain.stopBGM();
                this.gameover();
            }

            this.count = 10;
            this.time = 0;

            //レベル処理
            this.level = Math.sqrt(this.absTime*(0.0002*(this.levelReset+1)))+1;
            if (this.level > 2 && this.levelReset < 2) {
                this.absTime = 0;
                this.level = 1;
                this.levelReset++;
            }
        }

        if (this.pick) {
            this.time++;
            this.absTime++;
        }

        if (this.exitGame) {
            appMain.stopBGM();
            appMain.replaceScene(shotgun.TitleScene());
        }
    },

    //ゲームオーバー
    gameover: function() {
        this.start = false;
        this.pick = false;
        this.gameend = true;

        //スコア情報更新
        appMain.lastScore = this.score;
        if (this.score > appMain.highScore) appMain.highScore = this.score;

        //GAMECENTERにスコアを登録
        if (GAMECENTER) {
            var data = {
                score: this.score,
                leaderboardId: "board"
            };
            gamecenter.submitScore(function() {AdvanceAlert('スコア登録に成功しました')}, function() {AdvanceAlert('スコア登録に失敗しました')}, data);
        }

        //メッセージ
        var that = this;
        var lb = this.title2 = tm.display.OutlineLabel("GAME OVER", 100).addChildTo(this.upperLayer);
        lb.fontFamily = "'azuki'"; lb.align = "center"; lb.baseline = "middle"; lb.outlineWidth = 4;
        lb.setPosition(SC_W*0.5, SC_H*0.5-SC_H);
        lb.tweener.wait(500).move(SC_W*0.5, SC_H*0.5, 4000,"easeOutBounce").wait(2000);
        lb.tweener.call(function(){appMain.replaceScene(shotgun.GameoverScene(that));});
    },

    //役名表示
    dispHand: function(hand) {
        var name1 = "", name2 = "", name3 = "", size = 80; offset = 10;
        switch (hand) {
            case MISS:          name1 = "MISS!"; offset = 50; break;
            case NOHAND:        name1 = "NO HAND"; size = 70; break;
            case ONEPAIR:       name1 = "ONE"; name2 = "PAIR"; offset = 60; break;
            case FLASH:         name1 = "FLASH"; offset = 60; break;
            case TWOPAIR:       name1 = "TWO"; name2 = "PAIR"; offset = 60; break;
            case THREECARD:     name1 = "THREE"; name2 = "CARD"; offset = 50; break;
            case FULLHOUSE:     name1 = "FULL"; name2 = "HOUSE"; offset = 50; break;
            case STRAIGHT:      name1 = "STRAIGHT"; size = 70; break;
            case FOURCARD:      name1 = "FOUR"; name2 = "CARD"; offset = 60; break;
            case FIVECARD:      name1 = "FIVE"; name2 = "CARD"; offset = 60; break;
            case STRAIGHTFLASH: name1 = "STRAIGHT"; name2 = "FLASH"; size = 70; break;
            case ROYALSTRAIGHTFLASH: name1 = "ROYAL"; name2 = "STRAIGHT"; name3 = "FLASH!"; size = 70; break;
        }
        //役名表示
        var that = this;
        var x = SC_W*0.55+offset, y = SC_H*0.8;
        if (name2 != "") y-=SC_H*0.04;
        if (name3 != "") y-=SC_H*0.04;

        var lb1 = tm.display.OutlineLabel(name1, size).addChildTo(this);
        lb1.fontFamily = "'KS-Kohichi-FeltPen'"; lb1.align = "left"; lb1.baseline  = "middle"; lb1.outlineWidth = 3;
        lb1.setPosition(x, y);
        lb1.tweener.clear().wait(1200).call(function(){lb1.remove(); that.deck.clearHand();that.pick = true;});

        y += SC_H*0.08;
        var lb2 = tm.display.OutlineLabel(name2, size).addChildTo(this);
        lb2.fontFamily = "'KS-Kohichi-FeltPen'"; lb2.align = "left"; lb2.baseline  = "middle"; lb2.outlineWidth = 3;
        lb2.setPosition(x, y);
        lb2.tweener.clear().wait(1200).call(function(){lb2.remove();});

        y += SC_H*0.08;
        var lb3 = tm.display.OutlineLabel(name3, size).addChildTo(this);
        lb3.fontFamily = "'KS-Kohichi-FeltPen'"; lb3.align = "left"; lb3.baseline  = "middle"; lb3.outlineWidth = 3;
        lb3.setPosition(x, y);
        lb3.tweener.clear().wait(1200).call(function(){lb3.remove();});
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;

        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;
        this.moveX = 0;
        this.moveY = 0;

        this.beforeX = sx;
        this.beforeY = sy;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;

        var sx = e.pointing.x;
        var sy = e.pointing.y;
        var moveX = Math.abs(sx - this.beforeX);
        var moveY = Math.abs(sx - this.beforeY);

        if (!this.shuffled) {
            if (moveX > 300) {
                this.deck.shuffle();
                this.shuffled = true;
            }
        }

        if (this.time % 10 == 0) {
            this.beforeX = sx;
            this.beforeY = sy;
        }
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        this.touchID = -1;

        var sx = e.pointing.x;
        var sy = e.pointing.y;

        if (this.pick && !this.shuffled && !this.deck.busy && !this.gameend) {
            var c = this.deck.pickCard(sx, sy);
            if (c) this.deck.addHand(c);
        }
        this.shuffled = false;

        //ポーズボタン
        if (SC_W*0.8-100 < sx && sx < SC_W*0.8+100 && 39 < sy && sy < 89 && !this.gameend) {
            appMain.pushScene(shotgun.PauseScene(this));
        }
    },
});

