var reg_password = document.querySelector("#reg-password");
var password_confirm = document.querySelector("#password-confirm");
var register_form = document.querySelector("#register-form");

register_form.addEventListener("submit", function(f) {
  if(reg_password.value !== password_confirm.value) {
    f.preventDefault();
    alert("Passwords don't match");
  }
});
