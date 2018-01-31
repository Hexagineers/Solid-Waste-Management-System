$(document).ready(function(){
$("#myNavbar .dropdown").click(function(){
  $("#myNavbar .dropdown>ul.dropdown-menu").slideToggle("fast");
});
var navOffset = jQuery("nav").offset().top;
jQuery(window).scroll(function(){
  var scrollPos = jQuery(window).scrollTop();
  if(scrollPos>=navOffset){
    jQuery("nav").addClass("sticky");
  }else{
    jQuery("nav").removeClass("sticky");
  }
});
});
