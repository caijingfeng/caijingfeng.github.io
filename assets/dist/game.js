/*找茬游戏*/
function FullScreen(box){
	this.isFull = false; ////是否全屏
	this.text = "全屏"; ////按钮显示的文字
	this.$ele = $("<span></span>"); /////按钮标签
	this.$ele.css({
		width:"80px",
        height:"30px",
        lineHeight:"30px",
        backgroundColor:"orange",
        color:"white",
        textAlign:"center",
        position:"absolute",
        bottom:"40px",
        right:"20px",
        borderRadius:"8px",
        fontWeight:"bolder",
		zIndex:"1"
	});
	this.$ele.text(this.text);
	box.append(this.$ele);

	
	//////通过bind(this)方法把 this变量传递到click的处理函数中
	this.$ele.click(this.Switch.bind(this));
}

FullScreen.prototype.constructor = FullScreen;
FullScreen.prototype.Switch = function(){
	this.isFull = !this.isFull;
	this.text = this.isFull?"退出全屏":"全屏";
	this.$ele.text(this.text);
	$(document).fullScreen(this.isFull);
}
FullScreen.prototype.hide = function(){
	this.$ele.remove();
}
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
function Scene(game,img){
	this.game = game;
	this.img = img;
}

Scene.prototype.constructor = Scene;

/////加载
/////$ele只是一种命名方式而已,
////通常在使用jquery的时候用到(表示一个jquery对象)
Scene.prototype.load = function(){
	this.$ele = $('<img src="'+this.img+'"/>');
	this.$ele.css({
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
    });
	
	this.game.box.append(this.$ele);

	//this.game.box.click(this.chkClickListener.bind(this));	
	//
	
    this.game.clickListener = this.clickListener.bind(this);
}

// 表示点击事件监听函数，由子类负责实现
Scene.prototype.clickListener = function(){}

////卸载场景
Scene.prototype.unload = function(){
	this.$ele.remove();
}
function SceneStart(game, src) {
    src = src || 'assets/images/0.jpg';

    ////调用Scene的构造函数
    Scene.call(this, game, src);
    this.load();
}

SceneStart.prototype = Object.create(Scene.prototype);
SceneStart.prototype.constructor = SceneStart;

SceneStart.prototype.clickListener = function (x, y) {
    if(this.game.started){
        return false;
    }
    if (y > 335 && y < 415 && x > 640 && x < 860) {
        this.game.fullScreen.hide();
        this.game.started = true;
        //var sceneGame = new SceneGame(this.game);

        this.$ele.fadeOut(1500, function () {
            this.$ele.remove();
            //this.game.audio.playPass();
            var sceneGame = new SceneGame(this.game);
            sceneGame.load();
        }.bind(this))
    }
}

function SceneComplete(game, src){
    src = src || 'assets/images/complete.jpg'
    Scene.call(this, game, src)
}

// 构造原型链，实现继承
SceneComplete.prototype = Object.create(Scene.prototype);
SceneComplete.prototype.constructor = SceneComplete;

// 重写load方法，添加下滑效果
SceneComplete.prototype.load = function(append){
    Scene.prototype.load.call(this, append);
    this.$ele.hide().delay(300).slideDown(1000, function(){
        // 删除通关场景后面的所有标签元素
        // 即之前的游戏场景留下的内容
        this.$ele.prevAll().remove();
    }.bind(this));
}

// 重写点击事件监听函数，点击重新开始时加载开始场景，
// 让游戏通关图片上滑并卸载通关场景
SceneComplete.prototype.clickListener = function(x, y){
    if(x > 351 && x < 548 && y > 480 && y < 551){
        this.game.loadStartScene();
        this.$ele.slideUp(1000, function(){
            this.unload();
        }.bind(this));
    }
}
function SecondManager(box, total, options){
    this.box = box
    this.total = total || 60

    this.options = {
        position: 'absolute',
        left: '270px',
        bottom: '19px',
        fontSize: '36px',
        display: 'inline-block',
        zIndex:"1"
    }
}


// 将倒计时显示在页面上
SecondManager.prototype.show = function(){
    this.$ele = $('<span>').text(this.total < 10 ? '0' + this.total : this.total).css(this.options).prependTo(this.box)
}


/**
 * 重新设置倒计时的初始值，和倒计时到0时的回调函数
 * @param 回调函数
 * @param total 时间
 */
SecondManager.prototype.set = function(complete, total){
    this.complete = complete;
    this.seconds = this.total = total || 60;

    var text = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    this.$ele.text(text);

    clearInterval(this.timer);
}

// 启动倒计时，当倒计时到0后，调用回调函数
SecondManager.prototype.start = function(){
    this.timer = setInterval(function(){
        this.seconds--;

        text = this.seconds < 10 ? '0' + (this.seconds < 0 ? 0 : this.seconds) : this.seconds;
        this.$ele.text(text);

        if(this.seconds <= -1){
            clearInterval(this.timer);
            if(typeof this.complete == 'function'){
                this.complete(this);
            }
        }
    }.bind(this), 1000)
}

// 停止倒计时
SecondManager.prototype.stop = function(){
    clearInterval(this.timer);
}

////超时画面

function SceneTimeout(game,sceneGame,src){
    this.sceneGame = sceneGame
    src = src || 'assets/images/timeout.jpg'

    Scene.call(this, game, src);
}

///原型链
SceneTimeout.prototype = Object.create(Scene.prototype);
SceneTimeout.prototype.constructor = SceneTimeout;

/////重写load方法
SceneTimeout.prototype.load = function(append){
    Scene.prototype.load.call(this, append);
    this.$ele.prevAll().remove();
    // 实现下滑动画效果
    this.$ele.hide().delay(300).slideDown(1000)
}

SceneTimeout.prototype.clickListener = function(x,y){
    if(x > 351 && x < 548 && y > 480 && y < 551){
        this.game.loadStartScene();
        this.$ele.slideUp(1000, function(){
            this.unload();
        }.bind(this));
    }
}
// 表示“还有X次不同”中的数字
function Label(box, total, options){
    this.box = box;
    // 总共有几处不同，即初始值
    this.total = total || 5;
    // 还剩几处不同，即当前值
    this.value = this.total;

    this.options = {
        position: 'absolute',
        left: '556px',
        bottom: '23px',
        fontSize: '32px',
        display: 'inline-block',
        color: 'white',
        zIndex:'1'
    }
}
// 把数字显示到页面上
Label.prototype.show = function(){
    this.$ele = $('<span>').text(this.value).css(this.options).prependTo(this.box);
}

// 重新设置初始值和值变成0时的回调函数
Label.prototype.set = function(value){  
    this.value = value;  
    this.$ele.text(this.value);
}
/**
 * 创建game对象 
 * @param {any} box 游戏内容的容器
 */
function Game(box){
    this.box = box;
    
    ////音效控制文件
    this.audio = new Audio();
    this.audio.playMusic();

    /////标识游戏是否开始
    this.started = false;


    /////全屏按钮
    this.fullScreen = new FullScreen(this.box);

    ////开始监听点击事件
    this.listen();

    this.loadStartScene();
    
}

// 对容器添加点击事件 播放点击音效
Game.prototype.listen = function(){
    this.box.click(function(e){
        var x = e.offsetX;
        var y = e.offsetY;

        console.log('click-x:%d,click-y:%d',x,y);

        /////播放点击音效
        this.audio.playClick();
        if(typeof this.clickListener == 'function'){
            this.clickListener(x, y)
        }

    }.bind(this));
}

Game.prototype.loadStartScene = function(){
    /////创建开始场景
    var sceneStart = new SceneStart(this);
    this.started = false;
}

var gameDataList = [{
    src: "assets/images/1.jpg",
    diffs: [{
        x: 660,
        y: 80,
        r: 30
    }, {
        x: 790,
        y: 75,
        r: 35
    }, {
        x: 865,
        y: 120,
        r: 25
    }, {
        x: 495,
        y: 405,
        r: 45
    }, {
        x: 620,
        y: 415,
        r: 40
    }]
}, {
    src: "assets/images/2.jpg",
    diffs: [{
        x: 550,
        y: 100,
        r: 30
    }, {
        x: 635,
        y: 370,
        r: 25
    }, {
        x: 566,
        y: 420,
        r: 48
    }, {
        x: 723,
        y: 424,
        r: 33
    }, {
        x: 862,
        y: 406,
        r: 31
    }]
}, {
    src: "assets/images/3.jpg",
    diffs: [{
        x: 85,
        y: 395,
        r: 30
    }, {
        x: 379,
        y: 338,
        r: 35
    }, {
        x: 629,
        y: 415,
        r: 33
    }, {
        x: 707,
        y: 393,
        r: 35
    }, {
        x: 869,
        y: 385,
        r: 30
    }]
}]


function SceneGame(game, src) {
    /////当前游戏进度
    this.gameDataList = gameDataList
    this.currentIndex = 0;
    this.seconds = 30;
    $(this.gameDataList).each(function(){
        $(this.diffs).each(function(){
            this.isFound =false;
        })
    })
    this.gameData = this.gameDataList[this.currentIndex];
    src = src || this.gameData.src;



    ////调用Scene的构造函数
    Scene.call(this, game, src);

    this.secondManager = new SecondManager(this.game.box, this.seconds);
    this.secondManager.show();

    this.secondManager.set(this.timeout.bind(this), this.seconds);
    this.secondManager.start();

    this.label = new Label(this.game.box,this.gameData.diffs.length);
    this.label.show();
    //this.load();
}
SceneGame.prototype = Object.create(Scene.prototype);
SceneGame.prototype.constructor = SceneGame;
SceneGame.prototype.clickListener = function(x, y) {
    /////坐标范围判断
    var that = this;
    $(this.gameData.diffs).each(function() {
        var maxX = this.x * 1 + this.r * 1;
        var minX = this.x * 1 - this.r * 1;
        var minY = this.y * 1 - this.r * 1;
        var maxY = this.y * 1 + this.r * 1;

        /////坐标位置判断
        if (x > minX && x < maxX && y > minY && y < maxY && !!!this.isFound) {
            if (!!!this.isFound) {
                var $cicle = $("<div></div>");
                $cicle.css({
                    position: "absolute",
                    left: minX + "px",
                    top: minY + "px",
                    border: "5px solid red",
                    borderRadius: "50%",
                    width: 2 * this.r + "px",
                    height: 2 * this.r + "px"
                });
                this.isFound = true;
            }
            that.game.box.append($cicle);

            var lengthValidated = that.gameData.diffs.filter(function(item) {
                return item.isFound == true
            }).length;

            that.label.set(that.gameData.diffs.length - lengthValidated);

            if (lengthValidated == that.gameData.diffs.length) {
                //alert("您已经过关!");
                //
                
                 // 停止倒计时，播放音效
                that.secondManager.stop();


                that.currentIndex += 1; ////当前游戏关卡前进一个

                if(that.currentIndex == that.gameDataList.length){
                        var end = new SceneComplete(that.game);
                        that.game.audio.playComplete();
                        end.load();
                        return false;
                }

                
               

                that.game.audio.playPass();
                that.game.box.find("div").fadeOut(2500, function() {
                    that.game.box.find("div").remove();
                    that.secondManager.set(that.timeout.bind(this), that.seconds);
                    that.secondManager.start();
                });
                that.$ele.fadeOut(2500, function() {

                    that.gameData = that.gameDataList[that.currentIndex]; ////重新指定游戏数据
                    that.img = that.gameData.src; ///获取当前关卡的图
                    that.unload();
                    that.load();     
                    that.secondManager.set(that.timeout.bind(this), that.seconds);   
                    that.secondManager.start();
                });

                /////把计时器显示出来
                that.secondManager.$ele.fadeOut(2500,function(){
                    that.secondManager.$ele.fadeIn();
                });

                that.label.$ele.fadeOut(2500,function(){
                    that.label.$ele.fadeIn();
                });





            }

            return false;
        }

    })
}

// 处理游戏超时的方法
SceneGame.prototype.timeout = function(){
    this.game.audio.playTimeout();
    var scene = new SceneTimeout(this.game, this);
    scene.load(true);
}
