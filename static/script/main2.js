var countP = 0 ;
var countZ = 0 ;
var input =1;
var last_div = "";
$("#addPole").on("click" ,function(){input =1;
    $(last_div).unbind()
 });
$(document).on('click','#addPole',function(e){
    // $("#uCircle").addClass("active")
    countP= countP+1;
    $(".x").after(        '<div class='+'"hidden pole '+ 'x'+countP+'">x</div>'    )
    last_div = (".x"+countP+"")
    console.log("before" + countP)
    
        $(document).on('click','#uCircle',function(p){
            if( input == 1)
            {
            console.log("pole")
        // $("#uCircle").click(function(e){
            $(".x"+countP+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                        left: p.pageX-5  ,
                        top: p.pageY-20 
                    });
            console.log((".x"+countP+""))
            console.log(input)
            // $("#hiddenZero").val(countZ)
            $("#hiddenPx").after('<input class='+"hiddenPx"+countP+' " type="hidden" value = "0"  name='+"locZx"+countP+'>')
            $("#hiddenPy").after('<input class='+"hiddenPy"+countP+' " type="hidden" value = "0"  name='+"locZy"+countP+'>')
            $(".hiddenPx"+countP+"").val(p.pageX);
            $(".hiddenPy"+countP+"").val(p.pageY);
            console.log("#hiddenPx"+countP+"")
            }   
        });
});
$("#addZero").on("click" ,function(){
    input =0 ;
    $(last_div).unbind()
});
$(document).on('click','#addZero',function(e){
// $("#addZero").click(function(e){
    // $("#uCircle").addClass("active")
    countZ= countZ+1;
    $(".circle").after(        '<div class='+'"hidden cir '+ 'circle'+countZ+'"></div>'    )
    console.log("before" + countZ)
    last_div = (".circle"+countZ+"")
        $(document).on('click','#uCircle',function(z){
            if(input ==0)
            {
            console.log("zero")
            console.log(input)
        // $("#uCircle").click(function(e){
            $(".circle"+countZ+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                        left: z.pageX  ,
                        top: z.pageY 
                    });
            console.log((".circle"+countZ+""))
            // $("#hiddenZero").val(countZ)
            $("#hiddenZx").after('<input class='+"hiddenZx"+countZ+' " type="hidden" value="0" name='+"locPx"+countZ+'>')
            $("#hiddenZy").after('<input class='+"hiddenZy"+countZ+' " type="hidden" value="0" name='+"locPy"+countZ+'>')
            $(".hiddenZx"+countZ).val(z.pageX);
            $(".hiddenZy"+countZ).val(z.pageY);
            console.log("after" + countZ)
            }

        });
});
$("form").submit(function(e){
    $("#hidden_countZ").val(countZ);
    $("#hidden_countP").val(countP);
});
//$("#hiddenx2").val(e.pageX);
//     //             $("#hiddeny2").val(e.pageY);
    // for (var i = 0 ;i <countZ ; i++)
    // {
    //     console.log("hossam")
    //     $(".circle"+i+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
    //         left: e.pageX  ,
    //         top: e.pageY 
    //     });
    //     $("#hiddenZx").after('<input id='+"hiddenZx"+i+' " type="text" value="0" name='+"locZx"+i+'>')
    //     $("#hiddenZy").after('<input id='+"hiddenZy"+i+' " type="text" value="0" name='+"locZx"+i+'>')
    //     $("#hiddenZx"+i+"").val(e.pageX);
    //     $("#hiddenZy"+i+"").val(e.pageY);
    //     // console.log(input)
    //     console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
    // }
// $(document).on('change','#pole_zero',function(){
//     var input = $("#pole_zero").val(); 
//     console.log(input);
//     $("#uCircle").click(function(e){
//         console.log("count poles" +countP);
//         console.log("count zeros" +countZ);
//         if (input == "zero")
//         {
//             console.log("hey")
//             for (var i = 0 ;i <countZ ; i++){
//                 console.log("hossam")
//                 $(".circle"+i+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//                     left: e.pageX  ,
//                     top: e.pageY 
//                 });
//                 $("#hiddenZx").after('<input id='+"hiddenZx"+i+' " type="text" value="0" name='+"locZx"+i+'>')
//                 $("#hiddenZy").after('<input id='+"hiddenZy"+i+' " type="text" value="0" name='+"locZx"+i+'>')
//                 $("#hiddenZx"+i+"").val(e.pageX);
//                 $("#hiddenZy"+i+"").val(e.pageY);
//                 console.log(input)
//                 console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
//             }
            
//         }else if (input == "pole")
//         {   
//             console.log("hey2")
//             for (var i = 0 ; i< $("#hiddenPole").val() ; i++)
//             {
//                 console.log("ahmed")
//                 $(".x" + i).css("display", "block").offset({  //offset bt77dle el div hyzhr fen
//                     left: e.pageX,
//                     top: e.pageY-30 
//                 });
//                 $("#hiddenPx").val(e.pageX);
//                 $("#hiddenPy").val(e.pageY);
//             }
//         }
//         else{
//             $(".circle").fadeIn(1000).offset({  //offset bt77dle el div hyzhr fen
//                 left: e.pageX  ,
//                 top: e.pageY 
//             });
//             $("#hiddenZx").val(e.pageX);
//             $("#hiddenZy").val(e.pageY);
//             console.log(input)
//             console.log("pagex is: "+ e.pageX + " & pageY is: " + e.pageY)
//         }
//     });
// });  
