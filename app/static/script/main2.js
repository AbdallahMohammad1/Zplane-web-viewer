var countP = 0 ;
var countZ = 0 ;
var input =1;
var last_div = "";
var conjugate = 0;
var circle_centerY =532;
var countCP = 0
var countCZ = 0


$("#addPole").on("click" ,function(){input =1;
    $(last_div).unbind()
 });
$("#addZero").on("click" ,function(){input =0;
$(last_div).unbind()
});
 $(document).on('click','#addConjugate',function(){
    conjugate = 1
    console.log("2kdkdkk")
});
$(document).on('click','#uCircle',function(){
    var Ucircle =  $("#uCircle").offset();
    var bottom = Ucircle.top + $('#uCircle').outerHeight();
    var right = Ucircle.left + $('#uCircle').outerWidth();
    console.log("ucircle.top" + Ucircle.top)
    console.log("ucircle.left" + Ucircle.left)
    console.log("ucircle.bottom" +bottom)
    console.log("ucircle.right" + right)
    $("#top").val(Ucircle.top);
    $("#bottom").val(bottom);
    $("#left").val(Ucircle.left);
    $("#right").val(right);
});



$(document).on('click','#addPole',function(e){
    // $("#uCircle").addClass("active")
    countP= countP+1;
    $(".x").after(        '<div class='+'"allPoles hidden pole '+ 'x'+countP+'">x</div>'    )
    last_div = (".x"+countP+"")
    console.log("before" + countP)
        $(document).on('click','#uCircle',function(p){
            if( input == 1 && conjugate == 0)
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
            $("#hiddenPx").after('<input class='+"hiddenPx"+countP+' " type="hidden" value = "0"  name='+"locPx"+countP+'>')
            $("#hiddenPy").after('<input class='+"hiddenPy"+countP+' " type="hidden" value = "0"  name='+"locPy"+countP+'>')
            $(".hiddenPx"+countP+"").val(p.pageX);
            $(".hiddenPy"+countP+"").val(p.pageY);
            console.log("#hiddenPx"+countP+"")
            allPoles = $( ".allPoles" ).length;
            
            $( ".allPoles" ).each(function() {
                $(this).on("click", function(){
                    console.log(22)
                    $(this).remove()
                    countP =countP -1;
                });
            });
            }  
            else if(conjugate ==1 && input == 1 ){
                countCP ++
                $(".x").after(        '<div class='+'"allPoles hidden pole '+ 'cx'+countCP+'">x</div>'    )
                $(".cx"+countCP+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                    left: p.pageX-5  ,
                    top: p.pageY-20 
                });
            console.log((".cx"+countP+""))
            console.log(input)
            // $("#hiddenZero").val(countZ)
            $("#hiddenPx").after('<input class='+"hiddenPx"+countCP+' " type="hidden" value = "0"  name='+"locPx"+countCP+'>')
            $("#hiddenPy").after('<input class='+"hiddenPy"+countCP+' " type="hidden" value = "0"  name='+"locPy"+countCP+'>')
            $(".hiddenPx"+countCP+"").val(p.pageX);
            $(".hiddenPy"+countCP+"").val(p.pageY);
            console.log("#hiddenPx"+countCP+"")
            console.log("dllssllw")
            allPoles = $( ".allPoles" ).length;
            $( ".allPoles" ).each(function() {
                $(this).on("click", function(){
                    console.log(22)
                    $(this).remove()
                    countCP =countCP -1;
                });
        });
        countCP ++
        $(".x").after(        '<div class='+'"allPoles hidden pole '+ 'cx'+countCP+'">x</div>'    )
        $(".cx"+countCP+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
            left: p.pageX-5  ,
            top: (circle_centerY -(p.pageY-circle_centerY))-30
        });
                console.log((".cx"+countCP+""))
                console.log(input)
                // $("#hiddenZero").val(countZ)
                $("#hiddenPx").after('<input class='+"hiddenPx"+countCP+' " type="hidden" value = "0"  name='+"locPx"+countCP+'>')
                $("#hiddenPy").after('<input class='+"hiddenPy"+countCP+' " type="hidden" value = "0"  name='+"locPy"+countCP+'>')
                $(".hiddenPx"+countCP+"").val(p.pageX);
                $(".hiddenPy"+countCP+"").val(circle_centerY -(p.pageY-circle_centerY));
                console.log("#hiddenPx"+countCP+"")
                allPoles = $( ".allPoles" ).length;
                
                $( ".allPoles" ).each(function() {
                    $(this).on("click", function(){
                        console.log(22)
                        $(this).remove()
                        countCP =countCP -1;
                    });
                });
                conjugate = 0
                }  
        });
});
$(document).on('click','#addZero',function(e){
    // $("#uCircle").addClass("active")
    countZ= countZ+1;
    $(".circle").after(        '<div class='+'"allZeros hidden cir '+ 'circle'+countZ+'"></div>'    )
    last_div = (".circle"+countZ+"")
    console.log("before" + countZ)
        $(document).on('click','#uCircle',function(z){
            if( input == 0 && conjugate == 0)
            {
            console.log("zero")
        // $("#uCircle").click(function(e){
            $(".circle"+countZ+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                        left: z.pageX  ,
                        top: z.pageY 
                    });
            console.log((".x"+countZ+""))
            console.log(input)
            // $("#hiddenZero").val(countZ)
            $("#hiddenZx").after('<input class='+"hiddenZx"+countZ+' " type="hidden" value = "0"  name='+"locZx"+countZ+'>')
            $("#hiddenZy").after('<input class='+"hiddenZy"+countZ+' " type="hidden" value = "0"  name='+"locZy"+countZ+'>')
            $(".hiddenZx"+countZ+"").val(z.pageX);
            $(".hiddenZy"+countZ+"").val(z.pageY);
            console.log("#hiddenZx"+countZ+"")
            allZeros = $( ".allZeros" ).length;
            
            $( ".allZeros" ).each(function() {
                $(this).on("click", function(){
                    console.log(23)
                    $(this).remove()
                    countZ =countZ -1;
                });
            });
            }  
            else if(conjugate ==1 && input == 0 ){
                countCZ ++
                $(".circle").after(        '<div class='+'"allZeros hidden cir '+ 'ccircle'+countCZ+'"></div>'    )
                $(".ccircle"+countCZ+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
                    left: z.pageX  ,
                    top: z.pageY 
                });
                
            console.log(input)
            // $("#hiddenZero").val(countZ)
            $("#hiddenZx").after('<input class='+"hiddenZx"+countCZ+' " type="hidden" value = "0"  name='+"locZx"+countCZ+'>')
            $("#hiddenZy").after('<input class='+"hiddenZy"+countCZ+' " type="hidden" value = "0"  name='+"locZy"+countCZ+'>')
            $(".hiddenZx"+countCZ+"").val(z.pageX);
            $(".hiddenZy"+countCZ+"").val(z.pageY);
            console.log("#hiddenZx"+countCZ+"")
            console.log("dllssllw")
            allZeros = $( ".allZeros" ).length;
            $( ".allZeros" ).each(function() {
                $(this).on("click", function(){
                    console.log(22)
                    $(this).remove()
                    countCZ =countCZ -1;
                });
        });
        countCZ ++
        $(".circle").after(        '<div class='+'"allZeros hidden cir '+ 'ccircle'+countCZ+'"></div>'    )
        $(".ccircle"+countCZ+"").css("display", "block").offset({  //offset bt77dle el div hyzhr fen
            left: z.pageX  ,
            top: (circle_centerY -(z.pageY-circle_centerY)) -10
        });
                console.log((".ccircle"+countCZ+""))
                console.log(input)
                // $("#hiddenZero").val(countZ)
                $("#hiddenZx").after('<input class='+"hiddenZx"+countCZ+' " type="hidden" value = "0"  name='+"locZx"+countCZ+'>')
                $("#hiddenZy").after('<input class='+"hiddenZy"+countCZ+' " type="hidden" value = "0"  name='+"locZy"+countCZ+'>')
                $(".hiddenZx"+countCZ+"").val(z.pageX);
                $(".hiddenZy"+countCZ+"").val(circle_centerY -(z.pageY-circle_centerY));
                console.log("#hiddenZx"+countCP+"")
                allZeros = $( ".allZeros" ).length;
                $( ".allZeros" ).each(function() {
                    $(this).on("click", function(){
                        console.log(22)
                        $(this).remove()
                        countCZ =countCZ -1;
                    });
                });
                conjugate = 0
                }  
        });
});
$("form").submit(function(e){
    $("#hidden_countZ").val(countZ);
    $("#hidden_countP").val(countP);
    $("#hidden_countCP").val(countCP);
    $("#hidden_countCZ").val(countCZ);
});


$(document).on('click','#deleteZeros',function(e){
    console.log("delete_zeros")
    console.log(allZeros)
    $( ".allZeros" ).remove();
    countZ = 0;
}); 
$(document).on('click','#deletePoles',function(e){
    console.log("delete_Poles")
    $( ".allPoles" ).remove();
    countP = 0;
});   
$(document).on('click','#deleteAll',function(e){
    console.log("delete_all")
    $( ".allPoles" ).remove();
    $( ".allZeros" ).remove();
    countP = 0; 
    countZ = 0;
});
