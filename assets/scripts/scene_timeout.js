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