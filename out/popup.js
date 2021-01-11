// Sets up the popup using jQuery
//From Free Frontend
var elements = $(".modal-overlay, .modal");

$("#about").click(function () {
  elements.addClass("active");
});

$(".close-modal").click(function () {
  elements.removeClass("active");
});