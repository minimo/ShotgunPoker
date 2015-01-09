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
    mode: 0,
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
    labelParamBasic: {fontFamily: "azuki", align: "left", baseline: "middle",outlineWidth: 3},
    labelParamBasicCenter: {fontFamily: "azuki'", align: "center", baseline: "middle",outlineWidth: 3},
    labelParamPoker: {fontFamily: "KS-Kohichi",align: "center", baseline: "middle", outlineWidth: 3},
    labelParamHand:  {fontFamily: "KS-Kohichi",align: "left", baseline: "middle", outlineWidth: 3},
    labelParamBefore:{fontFamily: "azuki",align: "left", baseline: "top", outlineWidth: 3},
    labelParamModeName: {fontFamily: "azuki'", align: "right", baseline: "middle",outlineWidth: 3},

    init: function(mode) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //ゲームモード
        if (mode === undefined) mode = GAMEMODE_NORMAL;
        this.mode = mode;

        //ボーナスライフ加算
        this.life += appMain.bonusLife;
        appMain.bonusLife = 0;

        //ハードモードはライフ無し
        if (this.mode == GAMEMODE_HARD) {
            this.life = 0;
            this.level = 2.5;
            this.levelReset = 1;
            this.absTime = ~~(30*60*3.5);
        }

        //バックグラウンド
        this.bg = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: appMain.bgColor, strokeStyle: appMain.bgColor})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5)

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
            .setPosition(8, 32);
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
        if (this.mode != GAMEMODE_HARD) {
            this.lifeLabel = tm.display.OutlineLabel("LIFE:", 50)
                .addChildTo(this)
                .setParam(this.labelParamBasic)
                .setPosition(8, 96);
            if (this.mode != GAMEMODE_PRACTICE) {
                this.lifeLabel.beforeLife = this.life;
                this.lifeLabel.lg = [];
                for (var i = 0; i < this.lifeMax; i++ ) {
                    var c = this.lifeLabel.lg[i] = tm.display.Sprite("card", CARD_W, CARD_H)
                        .addChildTo(this.lifeLabel)
                        .setScale(0.3)
                        .setPosition(150+i*45, 0)
                        .setFrameIndex(13*3+i);
                    c.alpha = 0;
                    if (i < this.life) c.alpha = 1;
                }
                this.lifeLabel.update = function() {
                    if (this.beforeLife == that.life || this.beforeLife == 0) return;
                    if (that.lifeMax < that.life ) return;
                    if (that.life < this.beforeLife) {
                        this.lg[this.beforeLife-1].tweener.clear().scale(0.0, 500);
                    } else if (that.life > this.beforeLife) {
                        this.lg[that.life-1].tweener.clear().scale(1,1).fadeIn(1).scale(0.3, 1000, "easeOutBounce");
                    }
                    this.beforeLife = that.life;
                }
            } else {
                tm.display.OutlineLabel("∞", 70)
                    .addChildTo(this)
                    .setParam(this.labelParamBasic)
                    .setPosition(130, 96);
            }
        }

        //タイムリミットゲージ
        var color = "hsla({0}, 100%, 50%, 1.0)".format(300);
        this.meter = tm.display.Shape(30, 500)
            .addChildTo(this)
            .setPosition(20, SC_H*0.65)
            .setOrigin(0.5, 1.0);
        this.meter.update = function() {
            var limit = that.limitCount*(500/that.limitMax);
            var hsl = ~~(that.limitCount*(120/that.limitMax));
            var color = "hsla({0}, 100%, 50%, 1.0)".format(hsl);

            var c = this.canvas;
            c.clear(0,0,30,500);
            c.fillStyle = color;
            c.strokeStyle = color;
            c.lineWidth = 1;

            var lw = Number(c.lineWidth);
            c.fillRect(0, 500-limit, this.width, this.height-(500-limit));
            c.restore();
        }
        tm.display.RectangleShape(30, 500, {fillStyle: "rgba(0,0,0,0)", strokeStyle: "Black", lineWidth: 3})
            .addChildTo(this)
            .setPosition(20, SC_H*0.65)
            .setOrigin(0.5, 1.0);

        //直前の役表示
        var by = SC_H*0.8+CARD_H*CARD_SCALE*0.5-10;
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
            .setPosition(SC_W*0.84, 90)
            .addEventListener("pushed", function() {
                appMain.pushScene(shotgun.PauseScene(this));
            }.bind(this));

        //モード名称表示
        var modeName;
        switch(mode) {
            case GAMEMODE_NORMAL:
                modeName = "NORMAL";
                break;
            case GAMEMODE_HARD:
                modeName = "HARD";
                break;
            case GAMEMODE_PRACTICE:
                modeName = "PRACTICE";
                break;
        }
        this.beforeLabel = tm.display.OutlineLabel(modeName, 40)
            .addChildTo(this)
            .setParam(this.labelParamModeName)
            .setPosition(SC_W, 32);

        //カードデッキ
        this.deck = shotgun.CardDeck().addChildTo(this.mainLayer);

        //BGM再生
        appMain.playBGM("mainBGM");

        //スタートアップ
        var lb = this.readyLabel = tm.display.Sprite("ready")
            .addChildTo(this.upperLayer)
            .setPosition(SC_W/2, SC_H/2)
            .setScale(1.5);
        lb.tweener.clear().wait(500).fadeOut(500).wait(300);
        lb.tweener.call(function(){
            that.deck.startup();
            that.deck.shuffle();
            that.start = true;
            that.pick = true;
        });

        //カウントダウン表示
        var lb = this.countDown = tm.display.Sprite("count", 256, 256)
            .addChildTo(this.upperLayer)
            .setPosition(SC_W/2, SC_H/2)
            .setFrameIndex(4);
        lb.beforeCount = 9;
        lb.alpha = 0.0;
        lb.update = function() {
            if (that.count < 6) {
                this.visible = true;
                if (this.beforeCount == that.count) {
                    this.alpha -= 0.05;
                    if (this.alpha < 0)this.alpha = 0;
                } else {
                    this.alpha = 1.0;
                    appMain.playSE("countdown");
                }
                this.setFrameIndex(that.count);
            } else {
                this.visible = false;
            }
            this.beforeCount = that.count;
        }

        //メッセージ表示用スタック
        var ms = this.messageStack = tm.display.OutlineLabel("", 100)
            .addChildTo(this.upperLayer)
            .setParam(this.labelParamPoker)
            .setPosition(SC_W*0.5, SC_H*0.5);
        ms.duration = -1;
        ms.stack = [];
        ms.update = function() {
            this.duration--;
            if (this.duration == 0) this.text = "";
            if (this.duration < 0) {
                if (this.stack.length > 0) {
                    var p = this.stack[0];
                    this.text = p.text;
                    this.setFontSize(p.size);
                    this.duration = p.duration;
                    this.stack.splice(0, 1);

                    this.tweener.clear().fadeIn(1);
                }
            }
        }
        ms.addMessage = function(text, size, duration) {
            duration = duration || 50;
            var param = {text: text, size: size, duration: duration};
            this.stack.push(param);
        }

        //デバッグ用レベル表示
        if (DEBUG) {
            var lb = tm.display.OutlineLabel("", 40)
                .addChildTo(this)
                .setParam(this.labelParamBasic)
                .setPosition(SC_W*0.0, SC_H-20);
            lb.update = function() {
                this.text = "Level:"+that.level;
            }
        }

        //目隠し
        this.mask = tm.display.RectangleShape(SC_W, SC_H, {fillStyle: "rgba(0, 0, 0, 1.0)", strokeStyle: "rgba(0, 0, 0, 1.0)"})
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.mask.tweener.clear().fadeOut(200);
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
                if (this.mode != GAMEMODE_PRACTICE) this.life -= penalty;
                appMain.playSE("nopair");
            } else {
                appMain.playSE("hand");
            }

            //得点がプラスの時のみスコアに加算
            if (sc > 0) {
                var ps = sc;    //加算スコア

                //早上がりボーナス判定
                var msg = "";
                if (this.count > 8) {
                    ps = ~~(sc*2);
                    msg = "FANTASTIC!";
                } else if (this.count > 7) {
                    ps = ~~(sc*1.5);
                    msg = "EXCELLENT!";
                } else if (this.count > 5) {
                    ps = ~~(sc*1.3);
                    msg = "GOOD!"
                }
                if (msg != "") {
                    this.messageStack.addMessage(msg, 100);
                }
                this.score += ps;
            }

            //Life1up判定
            var oneUp = false;

            //役コンプリート判定
            if (!this.complete) {
                var cp = true;
                for (var i = 0; i < 12; i++) {
                    if (i == 9)continue;    //ファイブカードは対象外
                    if (this.handCount[appMain.handList[i].point] == 0) cp = false;
                }
                if (cp) {
                    oneUp = true;
                    this.complete = true;
                    this.messageStack.addMessage("HAND COMPLETE!", 100);
                }
            }

            //初回R.S.Fの場合はライフ＋１
            if (sc == ROYALSTRAIGHTFLASH && this.handCount[sc] == 1) oneUp = true;

            if (oneUp && this.mode != GAMEMODE_PRACTICE) {
                this.life++;
                if (this.life > this.lifeMax) {
                    this.life = this.lifeMax;
                } else {
                    var tmp = tm.app.Object2D()
                        .addChildTo(this)
                        .tweener.clear()
                        .wait(1000)
                        .call(function(){
                            appMain.playSE("extend");
                        });
                }
            }

            //ゲームオーバー判定
            if (this.life < 0) {
                appMain.stopBGM();
                this.gameover();
            }

            this.count = 10;
            this.time = 0;

            //レベル処理
            this.level = Math.sqrt(this.absTime*(0.0002*(this.levelReset+1)))+1;
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
        if (ENABLE_GAMECENTER) {
            var data = {
                score: this.score,
                leaderboardId: "DefaultSetting"
            };
            gamecenter.submitScore(
                function() {
                    if (DEBUG_GAMECENTER) AdvanceAlert('スコア登録に成功しました');
                },
                function() {
                    AdvanceAlert('GAMECENTERへのスコア登録に失敗しました');
                }, data);
        }

        //メッセージ
        var that = this;
        var lb = tm.display.Sprite("gameover")
            .addChildTo(this.upperLayer)
            .setPosition(SC_W*0.5, SC_H*0.5-SC_H);
        lb.tweener
            .wait(500)
            .move(SC_W*0.5, SC_H*0.5, 4000, "easeOutBounce")
            .wait(2000)
            .call(function() {
                this.remove();
                appMain.replaceScene(shotgun.GameoverScene(that));
            }.bind(lb));

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

