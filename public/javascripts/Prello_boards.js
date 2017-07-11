var main = function() {
  $.ajax({
    url: "http://localhost:3000/board",
    type: "GET",
    dataType: "json"
  })
    .done(function(json) {
      for(var i = 0; i < json.length; i++) {
        var box = $("<div/>");
        var name = $("<p>"+json[i].name+"</p>")
        box.attr("class", "board");
        box.attr("id", json[i]._id);
        box.append(name);
        $("section").append(box);
      }
    });

  $("#add-board").click(function() {
    $("#add-board-menu").toggle();
  });

  $("#add-board-menu").submit(function(f) {
    f.preventDefault();
    $("#add-board-menu").hide();
      $.ajax({
        url: "http://localhost:3000/board",
        data: {
          name: $("#board-name")[0].value
        },
        type: "POST",
        dataType: "json"
      })
        .done(function(json) {
          var box = $("<div/>");
          var name = $("<p>"+json.name+"</p>")
          box.attr("class", "board");
          box.attr("id", json._id);
          box.append(name);
          $("section").append(box);
          $("#add-board-menu")[0].reset();
        });
  });

  $("section").on("click", ".board", function() {
    var id = $(this).attr("id");
    window.location.href = "http://localhost:3000/board/"+id;
  });

  $("#logout").click(function() {
    $.ajax({
      url: "http://localhost:3000/logout",
      type: "GET",
      dataType:"json",
    })
      .done(function(json) {
        window.location.replace('http://localhost:3000/login')
      });
  });
}

$(document).ready(main);
