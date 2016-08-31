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