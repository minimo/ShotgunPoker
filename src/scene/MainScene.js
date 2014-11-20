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
    life: 2,        //ライフ
    lifeMax: 5,     //ライフ最大値
    pick: false,    //カードピック可能フラグ
    level: 1,       //ゲームレベル
    levelReset: 0,  //レベルリセット回数
    handCount: null,//役の回数
    onePair: 0,     //ワンペアの連続回数
    gameend: false, //ゲーム終了フラグ
    complete: false,//役コンプリートフラグ

    //カウンタ
    count: 10,      //カード選択カウントダウン用
    limitCount: 9*44,
    limitMax: 9*44,

    //経過時間
    time: 1,
    absTime: 1,

    //遷移情報
    exitGame: false,

    //ラベル用パラメータ
    labelParamBasic: {fontFamily: "'azuki'", align: "left", baseline: "middle",outlineWidth: 3},
    labelParamBasicCenter: {fontFamily: "'azuki'", align: "center", baseline: "middle",outlineWidth: 3},
    labelParamPoker: {fontFamily: "'KS-Kohichi-FeltPen'",align: "center", baseline: "middle", outlineWidth: 3},
    labelParamHand:  {fontFamily: "'KS-Kohichi-FeltPen'",align: "left", baseline: "middle", outlineWidth: 3},
    labelParamBefore:{fontFamily: "'azuki'",align: "left", baseline: "top", outlineWidth: 3},

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Shape(SC_W, SC_H)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)
            .renderRectangle({fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor});

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
        this.scoreLabel = tm.display.OutlineLabel("SCORE:", 50)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 72);
        this.scoreLabel.score = 0;
        this.scoreLabel.update = function() {
            this.text = "SCORE:"+this.score;
            if (this.score < that.score) {
                var s = ~~((that.score-this.score)/11);
                if (s < 3) s=3;
                this.score += s;
                if (this.score > that.score)this.score = that.score;
            }
        }

        //ライフ表示
        this.lifeLabel = tm.display.OutlineLabel("LIFE:", 50)
            .addChildTo(this)
            .setParam(this.labelParamBasic)
            .setPosition(8, 128);
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

        //タイムリミットゲージ
        var color = "hsla({0}, 100%, 50%, 1.0)".format(300);
        this.meter = tm.display.Shape(30, 500)
            .addChildTo(this)
            .setPosition(20, SC_H*0.7)
            .setOrigin(0.5, 1.0);
        this.meter.update = function() {
            var limit = that.limitCount*(500/that.limitMax);
            var hsl = ~~(that.limitCount*(120/that.limitMax));
            var color = "hsla({0}, 100%, 50%, 1.0)".format(hsl);
            var c = this.canvas;

            c.clear(0,0,30,500);

            // パラメータセット
            c.fillStyle = color;
            c.strokeStyle = color;
            c.lineWidth = 1;

            // 描画
            var lw      = Number(c.lineWidth);
            var lw_half = lw/2;
            c.fillRect(0, 500-limit, this.width, this.height-(500-limit));
            c.restore();
        }
        tm.display.Shape(30, 500)
            .addChildTo(this)
            .setPosition(20, SC_H*0.7)
            .renderRectangle({fillStyle: "rgba(0,0,0,0)", strokeStyle: "Black", lineWidth: 3})
            .setOrigin(0.5, 1.0);

        //直前の役表示
        var by = SC_H*0.8+CARD_H*CARD_SCALE*0.5;
        this.beforeLabel = tm.display.OutlineLabel("BEFORE:", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(8, by);
        this.beforeHand = tm.display.OutlineLabel("nothing", 30)
            .addChildTo(this)
            .setParam(this.labelParamBefore)
            .setPosition(120, by);
        this.beforeHand.name = "";
        this.beforeHand.alert = false;
        this.beforeHand.update = function() {
            if (this.alert) {
                this.fillStyle = "Red";
            } else {
                this.fillStyle = "White";
            }
            this.text = this.name;
        }

        //ポーズボタン
        this.pause = shotgun.Button(200, 60, "PAUSE")
            .addChildTo(this)
            .setPosition(SC_W*0.84, 72)
            .addEventListener("pushed", function() {
                appMain.pushScene(shotgun.PauseScene(this));
            }.bind(this));

        //目隠し
        this.mask = tm.display.Sprite("blackback", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(200);

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this.mainLayer);

        //BGM再生
        appMain.playBGM("mainBGM");

        //スタートアップ
        var lb = this.readyLabel = tm.display.OutlineLabel("READY", 100)
            .addChildTo(this.upperLayer)
            .setParam(this.labelParamPoker)
            .setPosition(SC_W/2, SC_H/2);
        lb.tweener.clear().wait(500).fadeOut(500).wait(300);
        lb.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
            that.pick = true;
        });

        //カウントダウン表示
        var lb = this.countDown = tm.display.OutlineLabel("5", 300)
            .addChildTo(this.upperLayer)
            .setParam(this.labelParamPoker)
            .setPosition(SC_W/2, SC_H/2);
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
            var lb = this.creditLabel = tm.display.OutlineLabel("", 40)
                .addChildTo(this)
                .setParam(this.labelParamBasic)
                .setPosition(SC_W*0.0, 15);
            lb.update = function() {
                this.text = "Level:"+that.level;
            }
        }
    },
    
    update: function() {
        if (!this.start) return;
        if (this.deck.busy) return;

        if (this.pick && !this.gameend) {
            //カウントダウン間隔
            var interval = 45-~~(this.level*10);
            if (interval < 10) interval = 10;

            //タイムリミットゲージ用カウンタ
            if (this.count == 10) {
                this.limitMax = this.limitCount = interval*10;
            } else if (this.count < 10) {
                this.limitCount--;
                if (this.limitCount < 0) this.limitCount = 0;
            }

            //カウントダウン
            if (this.time % interval == 0) this.count--;
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
            if (sc == NOPAIR) penalty = 1;
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
                lb.setParam(this.labelParamPoker);
                lb.setPosition(SC_W*0.8, SC_H*0.8);
                lb.alpha = 0;
                lb.tweener.clear().wait(1200).fadeIn(1).to({x: SC_W*0.8, y: SC_H*0.8-20, alpha:0.0},1000).call(lb.remove());
                appMain.playSE("nopair");
            } else {
                appMain.playSE("hand");
            }

            //役コンプリート判定
            if (!this.complete) {
                var cp = true;
                for (var i = 0; i < 12; i++) {
                    if (i == 9)continue;    //ファイブカードは対象外
                    if (this.handCount[appMain.handList[i].point] == 0) cp = false;
                }
                if (cp) {
                    this.complete = true;
                    var lb = tm.display.OutlineLabel("HAND COMPLETE!", 100).addChildTo(this);
                    lb.setParam(this.labelParamPoker);
                    lb.setPosition(SC_W*0.5, SC_H*0.5);
                    lb.tweener.clear().wait(1000).call(lb.remove());
                }
            }

            //初回R.S.Fの場合はライフ＋１
            if (sc == ROYALSTRAIGHTFLASH && this.handCount[sc] == 1) {
                this.life++;
                if (this.life > this.lifeMax) {
                    this.life = this.lifeMax;
                } else {
                    var lb = tm.display.OutlineLabel("1UP!!", 50).addChildTo(this);
                    lb.setParam(this.labelParamPoker);
                    lb.setPosition(SC_W*0.8, SC_H*0.8);
                    lb.alpha = 0;
                    lb.tweener.clear().wait(1200).fadeIn(1).to({x: SC_W*0.8, y: SC_H*0.8-20, alpha:0.0},1000).call(lb.remove());
                }
            }

            //早上がりボーナス
            if (this.count > 7 && sc > 0) {
                sc = ~~(sc*2);
                var lb = tm.display.OutlineLabel("FANTASTIC!", 100).addChildTo(this);
                lb.setParam(this.labelParamPoker);
                lb.setPosition(SC_W*0.5, SC_H*0.5);
                lb.tweener.clear().wait(1000).call(function(){lb.remove();});
            } else if (this.count > 4 && sc > 0) {
                sc = ~~(sc*1.5);
                var lb = tm.display.OutlineLabel("EXCELLENT!", 100).addChildTo(this);
                lb.setParam(this.labelParamPoker);
                lb.setPosition(SC_W*0.5, SC_H*0.5);
                lb.tweener.clear().wait(1000).call(lb.remove());
            }

            //得点がプラスの時のみスコアに加算
            if (sc > 0) this.score += sc;

            //ゲームオーバー判定
            if (this.life < 0) {
                appMain.stopBGM();
                this.gameover();
            }

            this.count = 10;
            this.time = 0;

            //レベル処理
            this.level = Math.sqrt(this.absTime*(0.0004*(this.levelReset+1)))+1;
            if (this.level > 2 && this.levelReset < 1) {
                this.absTime = 0;
                this.level = 1;
                this.levelReset++;
            }
        }

        //カードピック可能時のみ時間を進める
        if (this.pick) {
            this.time++;
            this.absTime++;
        }

        //ゲーム終了処理
        if (this.exitGame) {
            appMain.stopBGM();
            appMain.replaceScene(shotgun.TitleScene());
        }

        //スクリーンショット保存
        var kb = appMain.keyboard;
        if (kb.getKeyDown("s")) appMain.canvas.saveAsImage();
    },

    //ゲームオーバー
    gameover: function() {
        this.start = false;
        this.pick = false;
        this.gameend = true;

        this.pause.lock = true;

        //スコア情報更新
        appMain.lastScore = this.score;
        if (this.score > appMain.highScore) appMain.highScore = this.score;

        //GAMECENTERにスコアを登録
        if (GAMECENTER) {
            var data = {
                score: this.score,
                leaderboardId: "board"
            };
            gamecenter.submitScore(
                function() {
                    if (PHONEGAP_DEBUG) AdvanceAlert('スコア登録に成功しました');
                },
                function() {
                    AdvanceAlert('GAMECENTERへのスコア登録に失敗しました');
                }, data);
        }

        //メッセージ
        var that = this;
        var lb = this.title2 = tm.display.OutlineLabel("GAME OVER", 100).addChildTo(this.upperLayer);
        lb.setParam(this.labelParamBasicCenter);
        lb.setPosition(SC_W*0.5, SC_H*0.5-SC_H);
        lb.tweener.wait(500).move(SC_W*0.5, SC_H*0.5, 4000,"easeOutBounce").wait(2000);
        lb.tweener.call(function(){appMain.replaceScene(shotgun.GameoverScene(that));});

        //設定保存
        appMain.saveConfig();
    },

    //役名表示
    dispHand: function(hand, wait) {
        wait = wait || 1200;
        var name1 = "", name2 = "", name3 = "";
        var size = 80; offset = 10;
        switch (hand) {
            case MISS:          name1 = "MISS!"; offset = 50; break;
            case NOPAIR:        name1 = "NO PAIR"; size = 70; break;
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
        if (appMain.language == ENGLISH) {
            switch (hand) {
                case NOPAIR:        name1 = "NO PAIR"; size = 70; break;
                case THREECARD:     name1 = "THREE OF"; name2 = "A KIND"; offset = 50; break;
                case FOURCARD:      name1 = "FOUR OF"; name2 = "A KIND"; size = 70; offset = 60; break;
                case FIVECARD:      name1 = "FIVE OF"; name2 = "A KIND"; size = 70; offset = 60; break;
                case ROYALSTRAIGHTFLASH: name1 = "ROYAL"; name2 = "FLASH!"; size = 70; break;
                default:
                    break;
            }
        }

        //役名表示
        var that = this;
        var x = SC_W*0.55+offset, y = SC_H*0.8;
        if (name2 != "") y-=SC_H*0.04;
        if (name3 != "") y-=SC_H*0.04;

        //１行目
        var lb1 = tm.display.OutlineLabel(name1, size).addChildTo(this);
        lb1.setParam(this.labelParamHand);
        lb1.setPosition(x, y);
        lb1.tweener.clear().wait(wait)
            .call(function(){
                lb1.remove();
                that.deck.clearHand();
                that.pick = true;
                that.beforeHand.name = that.deck.handName(hand);
                if (that.onePair % 2 == 1)
                    that.beforeHand.alert = true;
                else
                    that.beforeHand.alert = false;
        });

        //２行目
        y += SC_H*0.08;
        var lb2 = tm.display.OutlineLabel(name2, size).addChildTo(this);
        lb2.setParam(this.labelParamHand);
        lb2.setPosition(x, y);
        lb2.tweener.clear().wait(wait).call(function(){lb2.remove();});

        //３行目
        y += SC_H*0.08;
        var lb3 = tm.display.OutlineLabel(name3, size).addChildTo(this);
        lb3.setParam(this.labelParamHand);
        lb3.setPosition(x, y);
        lb3.tweener.clear().wait(wait).call(function(){lb3.remove();});
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
            var c = this.deck.pick(sx, sy);
            if (c) this.deck.addHand(c);
        }
        this.shuffled = false;
    },
});

