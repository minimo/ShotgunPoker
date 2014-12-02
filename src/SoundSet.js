/*
 *  SoundSet.js
 *  2014/11/28
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

//メディアタイプ
MEDIA_ASSET = 0;    //tmlibアセット
MEDIA_URL = 1;      //PhoneGapMedia

//音声メディア管理
tm.define("shotgun.SoundSet", {
    elements: null,

    bgm: null,
    bgmIsPlay: false,

    volumeBGM: 3,
    volumeSE: 3,

    init: function() {
        this.elements = [];
    },

    add: function(name, url) {
        if (name === undefined) return null;
        url = url || null;
        var type = 0;
        if (url) type = MEDIA_URL; else type = MEDIA_ASSET;
        var e = shotgun.SoundElement(type, name, url);
        this.elements.push(e);
        return this;
    },

    find: function(name) {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name == name) return this.elements[i];
        }
        return null;
    },

    playBGM: function(name) {
        if (this.bgm) {
            this.bgm.stop();
        }
        var media = this.find(name);
        if (media) {
            media.play(true);
            media.setVolume(this.volumeBGM);
            this.bgm = media;
        }
        return this;
    },

    stopBGM: function() {
        if (this.bgm) {
            this.bgm.stop();
            this.bgm = null;
        }
        return this;
    },

    pauseBGM: function() {
        return this;
    },

    resumeBGM: function() {
        return this;
    },

    setVolumeBGM: function(v) {
        this.volumeSE = Math.Clamp(v, 0, 1);
        return this;
    },

    playSE: function(name) {
        var media = this.find(name);
        if (media) {
            media.setVolume(this.volumeSE);
            media.playClone();
        }
        return this;
    },

    setVolumeSE: function(v) {
        this.volumeSE = Math.Clamp(v, 0, 1);
        return this;
    },
});

tm.define("shotgun.SoundElement", {
    type: 0,
    name: null,
    url: null,
    media: null,
    volume: 1.0,
    status: null,
    init: function(type, name, url) {
        this.type = type;
        this.name = name;
        this.url = url;

        if (type == MEDIA_ASSET) {
            this.media = tm.asset.AssetManager.get(name);
        } else if (type == MEDIA_URL) {
            var that = this;
            this.media = new Media(getPath()+url, function(){that.status="OK"}, function(){that.status="NG"});
        }
    },

    //再生
    play: function(loop) {
        if (!this.media) return this;
        if (this.type == MEDIA_URL) {
            if (loop) {
                this.media.play({numberOfLoops:9999, playAudioWhenScreenIsLocked : false});
            } else {
                this.media.play({playAudioWhenScreenIsLocked : false});
            }
        } else {
            this.media.loop = loop;
            this.media.play();
        }
        return this;
    },

    //クローンを作って再生（リピート無し）
    playClone: function() {
        if (!this.media) return this;
        if (this.type == MEDIA_URL) {
            var tmp = new Media(getPath()+this.url);
            tmp.play();
            tmp = null;
        } else {
            this.media.loop = false;
            this.media.clone().play();
        }
        return this;
    },

    stop: function() {
        if (!this.media) return this;
        this.media.stop();
        return this;
    },

    setVolume: function(vol) {
        if (!this.media) return this;
        vol = vol || 1.0;
        this.volume = Math.clamp(vol, 0.0, 1.0);
        this.media.volume = this.volume;
        return this;
    },
});
