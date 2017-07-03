//register account
$("#register-form").children("form").submit( function(f) {
  f.preventDefault();
  if($("#reg-password").val() !== $("#password-confirm").val()) {
    alert("Passwords don't match");
  }
  else{
    $.ajax({
      url: "http://localhost:3000/users",
      type: "GET",
      dataType: "json"
    })
      .done(function(json) {
        var inuse = false;
        for(var i = 0; i < json.length; i++) {
          if(json[i].username == $("#reg-username").val()) {
            alert("Username already in use!");
            inuse = true;
            break;
          }
        }
        if(!inuse) {
          $.ajax({
            url: "http://localhost:3000/users",
            data: {
              username: $("#reg-username").val(),
              email: $("#reg-email").val(),
              password: $("#reg-password").val()
            },
            type: "POST",
            dataType: "json"
          });
          window.location.replace("http://localhost:3000");
        }
      });
  }
});

//login
$("#login-form").children("form").submit( function(f) {
  f.preventDefault();
  $.ajax({
    url: "http://localhost:3000/users",
    type: "GET",
    dataType: "json"
  })
    .done(function(json) {
      var correct = false;
      for(var i = 0; i < json.length; i++) {
        if(json[i].username == $("#login-username").val() && json[i].password == $("#login-password").val()) {
          correct = true;
          break;
        }
      }
      if(correct) {
        $.ajax({
          url: "http://localhost:3000/users",
          data: {
            username: $("#reg-username").val(),
            email: $("#reg-email").val(),
            password: $("#reg-password").val()
          },
          type: "POST",
          dataType: "json"
        });
        window.location.replace("http://localhost:3000");
      }
      else {
        alert("Username/Password is invalid. Try again!");
      }
    });
});
