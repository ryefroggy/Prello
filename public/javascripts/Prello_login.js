//register account
$("#register-form").children("form").submit( function(f) {
  if($("#reg-password").val() !== $("#password-confirm").val()) {
    f.preventDefault();
    alert("Passwords don't match");
  }
  else{
    $.ajax({
      url: "http://localhost:3000/users",
      type: "GET",
      dataType: "json"
    })
      .done(function(json) {
        for(var i = 0; i < json.length; i++) {
          if(json[i].username === $("reg-username").val()) {
            f.preventDefault();
            alert("Username already in use!");
            break;
          }
        }
      });

  }
});
