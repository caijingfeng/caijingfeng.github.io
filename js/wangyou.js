//  var navLi = document.querySelectorAll('#main_nav li')
//  var mainLi = document.querySelectorAll('#main_content ul')
 

 
//  for(var i=0;i <navLi.length;i++){
//       var arr = [-160,-320,480,-600]
//      navLi[i].index =i 
//     //  mainLi[i].index =i
//      navLi[i].addEventListener("mouseover",function(){
          
          
//           mainLi.style.marginTop = 15 + "px";
//           console.log(mainLi.style.marginTop)
//      })
//       navLi[i].addEventListener("mouseover",function(){
          
          
//           mainLi.style.marginTop = 50+ "px";
//      })
//  }


$(function() {

    $("#footer_img").mouseover(function() {
        if ($("#footer_img").css("display") == "block") {
            $("#footer_img").hide()
        }
        else {
            $("#footer_img").show()
        }

    })
    $("#footer_img").mouseout(function() {
        if ($("#footer_img").css("display") == "block") {
            $("#footer_img").hide()
        }
        else {
            $("#footer_img").show()
        }

    })
    
    $

    // $("#main_nav ul li").each(function() {
    //     $(this).mouseover(function() {
          
    //        $("#main_content ul").animate({
    //                 marginTop:"-=160px"
    //        },1000)
            
    //     })        
    //     $(this).mouseout(function() {
           
    //            $("#main_content ul ").animate({
    //                 marginTop:"+=160px"
    //             },1000)
    //        setInterval
    //     })
    // })

})