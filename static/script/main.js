var countP = 0 ;
var countZ = 0 ;
$("#addPole").click(function(e){
    // $("#uCircle").addClass("active")
    countP= countP+1;
    console.log(countP);
    $("#hiddenPole").val(countP)
});
$("#addZero").click(function(e){
    // $("#uCircle").addClass("active")
    countZ= countZ+1;
    console.log(countZ);
    $("#hiddenZero").val(countZ)
});
// $("html").click(function(e){    
//     // $("#uCircle").click(function(e){
//     //     var input = $("#pole_zero").val();
//     //     if($("#uCircle").hasClass("active"))
//     //     {
//     //         console.log(input)
//     //         console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
//     //         if (input == "zero")
//     //         {
//     //             console.log("hossam")
//     //             $(".circle2").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//     //                 left: e.pageX  ,
//     //                 top: e.pageY 
//     //             });
//     //             $("#hiddenx2").val(e.pageX);
//     //             $("#hiddeny2").val(e.pageY);
//     //         }else if (input == "pole")
//     //         {
//     //             console.log("ahmed")
//     //             $(".x2").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//     //                 left: e.pageX,
//     //                 top: e.pageY-30 
//     //             });
//     //             $("#hiddenx2").val(e.pageX);
//     //             $("#hiddeny2").val(e.pageY);
//     //         }
//     //     }
//         else
//         {
//             console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
//             if (input == "zero")
//             {
//                 console.log("hossam2")
//                 $(".circle").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//                     left: e.pageX  ,
//                     top: e.pageY 
//                 });
//                 $("#hiddenx").val(e.pageX);
//                 $("#hiddeny").val(e.pageY);
//             }else if (input == "pole")
//             {
//                 console.log("ahmed2")
//                 $(".x").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//                     left: e.pageX  ,
//                     top: e.pageY-30 
//                 });
//                 $("#hiddenx").val(e.pageX);
//                 $("#hiddeny").val(e.pageY);
//             }
//         }
//     });
// });
$("#uCircle").click(function(e){
    var input = $("#pole_zero").val();
    console.log(input)
    console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
    if (input == "zero")
    {
        for (var i = 0 ; i< $("#hiddenZero").val() ; i++){
            console.log("hossam")
            $(".circle"+i).css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                left: e.pageX  ,
                top: e.pageY 
            });
            $("#hiddenZx"+i).val(e.pageX);
            $("#hiddenZy"+i).val(e.pageY);
        }
    }else if (input == "pole")
    {
        for (var i = 0 ; i< $("#hiddenPole").val() ; i++)
        {
            console.log("ahmed")
            $(".x" + i).css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                left: e.pageX,
                top: e.pageY-30 
            });
            $("#hiddenPx").val(e.pageX);
            $("#hiddenPy").val(e.pageY);
        }
    }
});