var main = function() {
  $('#form').submit(function(f) {
    f.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/forgot_password',
      data: {
        email: $("#email").val()
      },
      type: "POST",
      dataType: "json"
    })
      .done(function(json) {
        if(json.error) {
          $("#form").reset();
          $("#error").remove();
          $('#form').before($("<p id=error>"+json.error+"</p>"));
        }
        else {
          window.location.href = "http://localhost:3000/reset_link/" + json.hash;
        }
      });
  });
};

$(document).ready(main);
