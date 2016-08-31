

$(function() {

    $("#search").click(function() {
        
        // $.ajax({
        //     url: "http://apis.baidu.com/apistore/weatherservice/cityinfo",  /////请求的地址 
        //     headers: { ///请求头
        //         apikey: "17120600e2b2aa68a0c942c5e4cc0251",


        //     },
        //     type: "get",    ////请求类型 post,get,delete...
        //     //async:false, ////是否异步 true,false 默认是异步方式的
        //     //data:{phone:"15000043945"}, /////传递的参数 
        //     data: { cityname: $("#city").text() }, /////序列化表单的数据,使用url参数拼接的形式
        //     dataType: "json", ////返回值的类型json,xml.text...
        //     //timeout:20,////设置请求超时时间（毫秒）
        //     beforeSend: function() { ////在ajax请求提交之前调用
        //         ///
        //     },
        //     success: function(res) { /////成功后的回调函数
        //         console.log(res);

        //     },
        //     error: function(err) { /////失败的回调函数
        //         console.log(err);
        //     }
        // });
        
        $.ajax({
        url: "http://apis.baidu.com/apistore/weatherservice/recentweathers",  /////请求的地址 
        headers: { ///请求头
            apikey: "b25f38db393ff8bf6167dc4e57c99803",


        },
        type: "get",    ////请求类型 post,get,delete...
        //async:false, ////是否异步 true,false 默认是异步方式的
        //data:{phone:"15000043945"}, /////传递的参数 
        data: { cityname: $("#city").text(), cityid: 101230201 }, /////序列化表单的数据,使用url参数拼接的形式
        dataType: "json", ////返回值的类型json,xml.text...
        //timeout:20,////设置请求超时时间（毫秒）
        beforeSend: function() { ////在ajax请求提交之前调用
            ///
        },
        success: function(res) { /////成功后的回调函数
           
            var resData = []
            //  console.log(res.retData)
            resData = res.retData.forecast
            resData.unshift(res.retData.today)
            resData = res.retData.history.concat(resData)

            // resData.unshift(res.retData.history)

            var charData = {}
            charData.date = []
            charData.hightemp = []
            charData.lowtemp = []
            charData.aqi = []
            //    console.log(charData)
            resData.forEach(function(item) {

                item.hightemp = Number(item.hightemp.replace('℃', ''))
                item.lowtemp = Number(item.lowtemp.replace('℃', ''))
                charData.date.push(item.date)
                charData.hightemp.push(item.hightemp)
                charData.lowtemp.push(item.lowtemp)
                charData.aqi.push(item.aqi)

            })


            var chat = new Highcharts.Chart({
                chart: {
                    type: 'line',
                    renderTo: 'container'
                },
                title: {
                    text: 'city temperature'
                },
                xAxis: {
                    categories: charData.date
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'hightemp',
                    data: charData.hightemp
                }, {
                        name: 'lowtemp',
                        data: charData.lowtemp
                    }, {
                        name: 'aqi',
                        data: charData.aqi
                    }

                ]
            });




        },
        error: function(err) { /////失败的回调函数
            console.log(err);
        }
    });


    })






    


})









