function Audio(){
	this.audios = $.makeArray($("audio"));

	// 背景音乐
	this.music = this.audios[0];

	////点击音乐
	this.click = this.audios[1];

    // 过关时的声音
    this.pass = this.audios[2];

    // 游戏通关时的声音
    this.complete = this.audios[3];

    // 超时的声音
    this.timeout = this.audios[4];
}

Audio.prototype.constructor = Audio;
////暂停所有的音乐
Audio.prototype.pauseAll = function(){
	this.audios.forEach(function(audio){
		audio.pause();
	})
}

////播放背景音乐
Audio.prototype.playMusic = function(){
	this.pauseAll();

	this.music.load();
	this.music.play();
}

////播放点击按钮生效
Audio.prototype.playClick = function(){
	this.click.load();
	this.click.play();

	this.muteMusic();

	setTimeout(function(){
		this.recoverMusic();
	}.bind(this),500);
}

// 播放过关音效
Audio.prototype.playPass = function(){
    this.muteMusic(true);
    // 在过关音效播放时阻止恢复背景音乐
    // 防止点击鼠标时背景音乐提前恢复

    this.pass.load();
    this.pass.play();

    // 6秒之后恢复背景音乐
    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 6 * 1000);
}

// 播放通关音效
Audio.prototype.playComplete = function(){
    this.muteMusic(true);

    this.complete.load();
    this.complete.play();

    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 8 * 1000);
}

// 播放超时音效
Audio.prototype.playTimeout = function(){
    this.muteMusic(true)

    this.timeout.load()
    this.timeout.play()

    setTimeout(function() {
        this.recoverMusic(true)
    }.bind(this), 4 * 1000);
}


//////背景音乐静音
Audio.prototype.muteMusic = function(preventRecover){
	this.music.volume = 0;

	////禁止恢复背景音效 防止在播放过场效果的时候 因为鼠标点击而直接恢复背景音乐
	this.preventRecover = preventRecover
}

////恢复背景音效
Audio.prototype.recoverMusic = function(force){
	////强行恢复背景音效
	if(force){
		this.preventRecover = false;
	}
	/////如果禁止恢复为true直接返回
	if(this.preventRecover){
		return
	}
	this.music.volume = 1;
}