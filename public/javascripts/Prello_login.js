//register account
$("#register-form").children("form").submit( function(f) {
  f.preventDefault();
  if($("#reg-password").val() !== $("#password-confirm").val()) {
    alert("Passwords don't match");
  }
  else{
    $.ajax({
      url: "http://localhost:3000/users",
      data: {
        username: $("#reg-username").val(),
        email: $("#reg-email").val(),
        password: $("#reg-password").val()
      },
      type: "POST",
      dataType: "json"
    })
      .done(function(json) {
        console.log(json.error);
        if(json.error === "yes") {
          alert("Username is already in use.");
        }
        else {
          window.location.replace('http://localhost:3000');
        }
      });
  }
});

//login
$("#login-form").children("form").submit( function(f) {
  f.preventDefault();
  $.ajax({
    url: "http://localhost:3000/users",
    data: {
      username: $("#login-username").val(),
      password: $("#login-password").val()
    },
    type: "POST",
    dataType: "json"
  })
    .done(function(json) {
      if(json.error === 'invalid') {
        alert("Password is invalid.");
      }
      else if(json.error === 'exist') {
        alert("Username is invalid.");
      }
      else {
        window.location.replace('http://localhost:3000');
      }
    });
});
