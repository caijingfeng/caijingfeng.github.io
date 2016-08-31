function SceneStart(game, src) {
    src = src || 'assets/images/0.jpg';

    ////调用Scene的构造函数
    Scene.call(this, game, src);
    this.load();
    // this.game = game;
	// this.img = img;
}

SceneStart.prototype = Object.create(Scene.prototype);
// SceneStart.prototype.constructor = SceneStart;

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
