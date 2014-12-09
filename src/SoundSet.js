/*
 *  SoundSet.js
 *  2014/11/28
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

//MEDIA TYPE
MEDIA_ASSET = 0;    //tmlib Asset
MEDIA_CORDOVA = 1;  //CordovaMediaPlugin
MEDIA_LLA = 2;      //LawLaytensyAudioPlugin

//サウンド管理
tm.define("shotgun.SoundSet", {
    defaultType: MEDIA_ASSET,
    elements: null,

    bgm: null,
    bgmIsPlay: false,

    volumeBGM: 3,
    volumeSE: 3,

    init: function(type) {
        this.defaultType = type || MEDIA_ASSET;
        this.elements = [];
    },

    add: function(name, url) {
        if (name === undefined) return null;
        url = url || null;
        var e = null;
        switch(this.defaultType) {
            case MEDIA_ASSET:
                e = shotgun.SoundElement_WebAudio(name);
                break;
            case MEDIA_CORDOVA:
                e = shotgun.SoundElement_Cordova(name, url);
                break;
            case MEDIA_LLA:
                e = shotgun.SoundElement_LLA(name, url);
                break;
        }
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
            this.bgmIsPlay = false;
        }
        var media = this.find(name);
        if (media) {
            media.play(true);
            media.setVolume(this.volumeBGM);
            this.bgm = media;
            this.bgmIsPlay = true;
        }
        return this;
    },

    stopBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.stop();
                this.bgmIsPlay = false;
            }
            this.bgm = null;
        }
        return this;
    },

    pauseBGM: function() {
        if (this.bgm) {
            if (this.bgmIsPlay) {
                this.bgm.pause();
                this.bgmIsPlay = false;
            }
        }
        return this;
    },

    resumeBGM: function() {
        if (this.bgm) {
            if (!this.bgmIsPlay) {
                this.bgm.volume = this.volumeBGM*0.34;
                this.bgm.resume();
                this.bgmIsPlay = true;
            }
        }
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

//SoundElement Basic
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
        this.url = url || null;
    },

    play: function(loop) {
        return this;
    },

    playClone: function() {
        return this;
    },

    pause: function () {
        if (!this.media) return this;
        this.media.pause();
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

//SoundElement(WebAudio/tmlibAsset)
tm.define("shotgun.SoundElement_WebAudio", {
    superClass: shotgun.SoundElement,

    init: function(name) {
        this.superInit(MEDIA_ASSET, name);
        this.media = tm.asset.AssetManager.get(name);
    },

    play: function(loop) {
        if (!this.media) return this;
        this.media.loop = loop;
        this.media.play();
        return this;
    },

    playClone: function() {
        this.media.loop = false;
        this.media.clone().play();
        return this;
    },
});

//SoundElement(CordovaMediaPlugin)
tm.define("shotgun.SoundElement_CordovaMedia", {
    superClass: shotgun.SoundElement,

    init: function(name, url) {
        this.superInit(MEDIA_CORDOVA, name, url);

        var that = this;
        this.media = new Media(url, function(){
            that.status="OK";
//            AdvanceAlert("OK:"+url);
        }, function(err){
            that.status="NG";
//            AdvanceAlert("NG:"+err+":"+url);
        });
    },

    play: function(loop) {
        if (!this.media) return this;
        if (loop) {
            this.media.play({numberOfLoops:9999, playAudioWhenScreenIsLocked : false});
        } else {
            this.media.play({playAudioWhenScreenIsLocked : false});
        }
        return this;
    },

    playClone: function() {
        if (!this.media) return this;
        var tmp = new Media(this.url);
        tmp.play();
        tmp = null;
        return this;
    },
});

//SoundElement(LowLaytensyAudioPlugin)
tm.define("shotgun.SoundElement_LLA", {
    init: function(name, url) {
        this.superInit(MEDIA_LLA, name, url);

        window.plugins.LowLatencyAudio.preloadFX(this.name, url, function(msg){}, function(msg){alert( 'Error: ' + msg)});
    },

    play: function(loop) {
        if (!this.media) return this;
        if (loop) {
            window.plugins.LowLatencyAudio.loop(this.name);
        } else {
            window.plugins.LowLatencyAudio.play(this.name);
        }
        return this;
    },

    playClone: function() {
        if (!this.media) return this;
        window.plugins.LowLatencyAudio.play(this.name);
        return this;
    },

    stop: function() {
        if (!this.media) return this;
        window.plugins.LowLatencyAudio.stop(this.name);
        return this;
    },

    pause: function () {
        if (!this.media) return this;
        window.plugins.LowLatencyAudio.stop(this.name);
    },

    setVolume: function(vol) {
        if (!this.media) return this;
        vol = vol || 1.0;
        this.volume = vol;
        window.plugins.LowLatencyAudio.unload(this.name);
        window.plugins.LowLatencyAudio.preloadAudio(this.name, url, vol, 1, function(msg){}, function(msg){alert( 'Error: ' + msg)});
        return this;
    },
});
