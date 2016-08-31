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
            this.isFound = false;
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
                    // that.secondManager.set(that.timeout.bind(this), that.seconds);
                    // that.secondManager.start();
                });
                that.$ele.fadeOut(2500, function() {

                    that.gameData = that.gameDataList[that.currentIndex]; ////重新指定游戏数据
                    that.img = that.gameData.src; ///获取当前关卡的图
                    // that.unload();
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
