var main = function() {
  $("#reset").submit(function(f) {
    f.preventDefault();
    if($("#password").val() !== $("#conf-password").val()) {
      alert("Passwords do not match!");
    }
    else {
      $.ajax({
        url: "http://localhost:3000/forgot_password/" + window.location.pathname.substring(17),
        data: {
          password: $("#password").val()
        },
        type: "POST",
        dataType: "json"
      })
        .done(function(json) {
          if(json.success) {
            $("#reset").before($("<p id=success>"+json.success+"</p>"));
          }
        });
    }
  });
  $("h1").click(function() {
    window.location.href = "http://localhost:3000/";
  });
};

$(document).ready(main);
