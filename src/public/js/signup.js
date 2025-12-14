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

$(function () {});

function validateSignupForm() {
    const userId = $(".member-nick").val();
    const userPhone = $(".member-phone").val();
    const userAge = $(".member-age").val();
    const userPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();

    if(
         userId === "" ||
         userPhone === "" || 
         userAge === "" || 
         userPassword === "" || 
         confirmPassword === ""
      ) {
        alert("Please insert all required inputs!");
        return false;
      }

      if (userPassword !== confirmPassword) {
        alert("Password differs, please check!");
        return false;
      }   
}
