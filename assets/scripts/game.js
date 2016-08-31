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
