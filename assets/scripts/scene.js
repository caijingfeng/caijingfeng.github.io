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