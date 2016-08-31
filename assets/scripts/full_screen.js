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