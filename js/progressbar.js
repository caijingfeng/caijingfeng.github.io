
/**
 *  Progressbar 
 * 进度条控件,倒计时
 * author:arivin
 * @param {number} total        计时的总时间 单位为毫秒 
 * @param {bool} isDesc         是否倒计时(false为正序,true为倒序)
 * @param {function} callBack   计时中间的回调函数,参数为当前的计时数量
 */
function Progressbar(total, isDesc, callBack) {
    this.total = total
    this.callBack = callBack
    this.isDesc = isDesc
    this.seed = 0
}
Progressbar.prototype.beginTime = function () {
    this.timer = setInterval(function () {
        if (!this.isDesc) {
            this.seed++;
            this.callBack(this.seed)
            if (this.seed >= this.total) {
                clearInterval(this.timer)
            }
        }
        else {
            this.total--;
            this.callBack(this.total)
            if (this.total <= 0) {
                clearInterval(this.timer)
            }
        }
    }.bind(this), 1);
}

/***
 * 
 * 通过回调函数
 * 实现了逻辑功能的封装
 * 实现了页面展示效果的分离
 * 所有的页面处理只需要在回调函数中进行就可以,不需要修改处理逻辑
 * 
 */

var p = new Progressbar(5000, false, function (params) {
    //alert('计时结束');
    console.log(params)
    $("#progressbar").progressbar({
        value: ((params / 5000) * 100)
    })
})
p.beginTime();