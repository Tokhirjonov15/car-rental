console.log("Signup frontend javascript file");

$(document).on("focusout", ".sign-up-frame", function () {
  $(this).removeClass("active-field");
  if ($(this).val().length > 0) {
    $(this).addClass("active-field");
  }
});

jQuery(".sign-up-frame").on("focus", function (e) {
  $(this).addClass("active-field");
});
