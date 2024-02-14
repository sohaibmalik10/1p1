
$("h1").css("font-size","5rem");
$("h1").addClass("big-title");

// $("button").on("click",function(){
//     $("h1").slideUp.slideDown().animate({opacity:0.5});

// });

// $("button").on("click",function(){
//     $("h1").css("color","purple")
// });

// for(var i=0;i<5;i++)
// {
//     document.querySelectorAll("button")[i].addEventListener ("click",function() {
//     document.querySelector("h1").style.color="purple" 
//     });
// }
$(document).keypress (function(event)
{   
    $("h1").text(event.key);
});

$("h1").prepend("<button>prepend</button>")
$("h1").append("<button>append</button>")
// $("button").on("click",function()
// {
//     $("h1").hide();
 
// });

$("button").on("click",function()
{
//     $("h1").fadeToggle();
$("h1").slideUp().slideDown().animate({opacity:0.5});
$("h1").animate({margin:"10%"});
});