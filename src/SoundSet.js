/*
 *  SoundSet.js
 *  2014/11/28
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

//メディアタイプ
MEDIA_TMLIB = 0;    //tmlibアセット
MEDIA_PHONEGAP = 1; //PhoneGapメディア

//音声メディア管理
tm.define("shotgun.SoundSet", {
    elements: null,
    bgm: null,
    bgmIsPlay: false,
    volumeBGM: 3,
    volumeSE: 3,

    init: function() {
        elements = [];
    },

    add: function(type, name, url) {
        if (type === undefined) return null;
        name = name || null;
        url = url || null;
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
        return this;
    },

    stopBGM: function() {
        if (this.bgm) {
            this.bgm.stop();
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
        return this;
    },

    playSE: function(name) {
        return this;
    },

    setVolumeSE: function(v) {
        return this;
    },
});

tm.define("shotgun.SoundElement", {
    type: 0,
    name: null,
    media: null,
    status: null,
    init: function(type, name, url) {
        this.type = type;
        this.name = name;

        if (type == MEDIA_TMLIB) {
            this.media = tm.asset.AssetManager.get(name);
        } else if (type == MEDIA_PHONEGAP) {
            var that = this;
            this.media = new Media(getPath()+url, function(){that.status="OK"}, function(){that.status="NG"});
        }
    },

    play: function() {
        if (this.type == MEDIA_TMLIB) {
            this.media.play();
        } else {
        }
    },
});
