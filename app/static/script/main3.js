var countP = 0 ;
var countZ = 0 ;
var input = "pole";
$(document).on('click','#addPole',function(e){
    // $("#uCircle").addClass("active")
    var input ="pole";
    countP= countP+1;
    $(".x").after(        '<div class='+'"hidden pole '+ 'x'+countP+'">x</div>'    )
    console.log("before" + countP)
});
$(document).on('click','#addZero',function(e){
// $("#addZero").click(function(e){
    var input = "zero";
    // $("#uCircle").addClass("active")
    countZ= countZ+1;
    $(".circle").after(        '<div class='+'"hidden cir '+ 'circle'+countZ+'"></div>'    )
    console.log("before" + countZ)
});
$(document).on('click','#uCircle',function(p){
    if( input == "pole")
    {
        console.log("input")
    // $("#uCircle").click(function(e){
        $(".x"+countP+"").css("display", "block").offset({  
                    left: p.pageX-5  ,
                    top: p.pageY-20 
                });
        // $("#hiddenZero").val(countZ)
        $("#hiddenPx").after('<input id='+"hiddenPx"+countP+' class="visually-hidden " type="text" value="0" name='+"locZx"+countP+'>')
        $("#hiddenPy").after('<input id='+"hiddenPy"+countP+' class="visually-hidden " type="text" value="0" name='+"locZx"+countP+'>')
        $("#hiddenPx"+countP).val(p.pageX);
        $("#hiddenPy"+countP).val(p.pageY);
        console.log("after" + countP)
    }
    else if(input == "zero")
    {
        $(".circle"+countZ+"").css("display", "block").offset({  
            left: p.pageX  ,
            top: p.pageY 
        });
        // $("#hiddenZero").val(countZ)
        $("#hiddenZx").after('<input id='+"hiddenZx"+countZ+' class="visually-hidden " type="text" value="0" name='+"locZx"+countZ+'>')
        $("#hiddenZy").after('<input id='+"hiddenZy"+countZ+' class="visually-hidden " type="text" value="0" name='+"locZx"+countZ+'>')
        $("#hiddenZx"+countZ).val(p.pageX);
        $("#hiddenZy"+countZ).val(p.pageY);
        console.log("after" + countZ)
    }
});