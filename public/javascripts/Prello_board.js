var current_card = 0;
var current_list = 0;
var board_id = window.location.pathname.substring(7);

var data = {};

//menu code
var main = function() {
  // load page
  $.ajax({
    url: "http://localhost:3000/board/" + board_id +"/list/",
    type: "GET",
    dataType: "json",
  })
    .done(function(json) {
      for(var l = 0; l < json.length; l++) {
        data[json[l]._id] = {"name" : json[l].name, "cards" : {}};
        add_list_func(json[l].name, json[l]._id);
        for(var c = 0; c < json[l].cards.length; c++) {
          var card = json[l].cards[c];
          if(card.labels[0] === '') {
            var labels = [];
          }
          else {
            var labels = card.labels;
          }
          if(card.members[0] === '') {
            var members = [];
          }
          else {
            var members = card.members;
          }
          if (card.comments[0] === '') {
            var comments = [];
          }
          else {
            var comments = card.comments;
          }
          data[json[l]._id].cards[card._id] = { "title" : card.title,
                                                "author": card.author,
                                                "labels" : {},
                                                "members": members,
                                                "description" : card.description,
                                                "comments" : comments};
          for(var x = 0; x < comments.length; x++) {
            data[json[l]._id].cards[card._id].comments[x].date = new Date(data[json[l]._id].cards[card._id].comments[x].date);
          }
          for(var y = 0; y < card.labels.length; y++) {
            data[json[l]._id].cards[card._id].labels[card.labels[y]._id] = {"name": card.labels[y].name, "color": card.labels[y].color};
          }
          data[json[l]._id].cards[card._id].labels
          add_card_func(json[l]._id, json[l].cards[c]._id);
        }
      }
    });

  //toggle menus
  $("#opt-menu-btn").click(function() {
    $("#opt-menu").toggle();
  });
  $("#board-list-btn").click(function() {
    $("#board-list").toggle();
  });
  $("#menu-open").click(function() {
    $("#menu").animate({
      right: 0
    }, 200);
  });
  $("#close").click(function() {
    $("#menu").animate({
      right: -500
    }, 200);
    $("#mem-success").hide();
    $("#mem-fail").hide();
  });

  //close modal and modal clean-up
  $("#modal").on("click", ".modal-close", function() {
    $("#modal").hide();
    close_modal($("#card-left"));
  });

  // add card event
  $("#lol").on("click", ".add-card", function() {
    current_list = this.parentNode;
    var title = current_list.firstChild.textContent;
    $("#left-list").before($("<p>in list " + title +"</p>"));

    $("#card-head-form").show();
    $("#modal").show();
    $("#card-show").show();
  });
  $("#card-head-form").submit( function(f) {
    f.preventDefault();
    var card_title = $("#card-title")[0].value;
    var card_data = data[$(current_list).attr("id")].cards;
    $("#card-head-form")[0].reset();
    $("#card-head-form").hide();
    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + $(current_list).attr("id") + "/card",
      data: {
        title: card_title,
      },
      type: "POST",
      dataType: "json",
    })
      .done(function(json) {
        var username = $("#username")[0].textContent;
        card_data[json.cards[json.cards.length-1]._id] = { "title" : card_title, "author": username, "labels" : new Array(), "members": new Array(), "description" : "", "comments": new Array()};
        var $title_h = $("<h3>"+card_title+"</h3>");
        $("#card-head-form").after($title_h);

        add_card_func($(current_list).attr("id"), json.cards[json.cards.length-1]._id);
      });
  });

  // delete card event
  $("#delete-card").click( function() {
    var card_id = $(current_card).attr("id");
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    $(current_card).remove();
    $("#modal").hide();

    //reset card page
    $("#card-left").children("p").remove();
    $("#card-left").children("h3").remove();
    $("#card-left").find(".labels").empty();
    $("#card-show").hide();

    data[list_id].cards[card_id] = null;

    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + list_id + "/card/" + card_id,
      type: "DELETE",
      dataType: "json",
    });
  });

  // show card event
  $("#lol").on("click", ".lol-card", function() {
    current_card = this;
    show_card(this);
  });

  // delete list event
  $("#lol").on("click", ".delete-list", function() {
    var list = this.parentNode;
    data[$(list).attr("id")] = null;
    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + $(list).attr("id"),
      type: "DELETE",
      dataType: "json",
    });
    $(list).remove();
  });

  // add list event
  $("#final").click(function() {
    $("#list-add-p").hide();
    $("#list-form").show();
  });
  $("#list-form").submit(function(f) {
    f.preventDefault();
    var l_name = $("#list-name")[0].value;
    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/",
      data: {
        name: l_name
      },
      type: "POST",
      dataType: "json",
    })
      .done(function(json){
        data[json._id] = {"name" : l_name, "cards" : []};
        add_list_func(l_name, json._id);
      });
    $("#list-form").hide();
    $("#list-add-p").show();
    $("#list-form")[0].reset();
  });

  // add labels
  $("#modal").on("click", ".add-label", function() {
    if($("#card-head-form").css("display") === "block"){
      alert("Name your card first!");
    }
    else {
      $("#label-form").toggle();
    }
  });
  $("#label-form").on("click", "button", function(f) {

    var name = $("#label-text")[0].value;
    if (name.length === 0) name = " ";
    console.log(name);
    var color = $(this).attr("class");
    var new_label_li = $("<li></li>");
    new_label_li.addClass("label " + color);
    var $left = $("#card-left");
    var $left_list = $("#left-list");
    $(current_card.firstChild).append(new_label_li);

    var card_id = $(current_card).attr("id");
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    var card = data[list_id].cards[card_id];

    var labels_list = $left_list.find(".labels")[0];
    if(data[list_id].cards[card_id].labels.length === 0) {
      $(labels_list).append($("<p>Labels</p>"));
    }

    var new_label = $("<button>"+name+"</button>");
    new_label.addClass("label-del " + color);
    $(labels_list).append(new_label);

    $("#label-form").hide();

    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + list_id + "/card/" + card_id + "/label",
      data: {
        name: name,
        color: color
      },
      type: "POST",
      dataType: "json",
    })
      .done(function(json) {
        console.log(json);
        new_label.addClass(json._id);
        new_label.attr("id", json._id);
        new_label_li.addClass(json._id);
        card.labels[json._id] = {"name": name, "color": color};
      });
  });

  //delete labels
  $(".card").on("click", ".label-del", function() {
    var label_id = $(this).attr("id");
    var card_id = $(current_card).attr("id");
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    $("."+label_id).remove();
    $(this).remove();

    $.ajax({
      url: "http://localhost:3000/board/" + board_id + "/list/" + list_id + "/card/" + card_id + "/label/" + label_id,
      type: "DELETE",
      dataType: "json"
    })
      .done(function(json) {
        data[list_id].cards[card_id].labels[label_id] = null;
      });
  });
  $("#label-form").submit(function(f) {
    f.preventDefault();
    $("#label-form").reset;
  });

  // edit description
  $(".description").on("click", "span", function() {
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    var card_id = $(current_card).attr("id");
    var card_desc = data[list_id].cards[card_id].description;

    $("#desc").val($("#cur-desc")[0].textContent);
    $("#desc-form").show();
    $("#cur-desc").hide();
  });
  $("#desc-form").submit(function(f) {
    f.preventDefault();
    var card_id = $(current_card).attr("id");
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    $("#cur-desc")[0].textContent = $("#desc").val();

    $("#desc-form").hide();
    $("#cur-desc").show();

    data[list_id].cards[card_id].description = $("#cur-desc")[0].textContent;
    var card = data[list_id].cards[card_id];


    if(card.members.length === 0) {
      var card_members = [""];
    }
    else {
      var card_members = card.members;
    }


    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + list_id + "/card/" + card_id,
      data: {
        title: card.title,
        members: card_members,
        description: card.description,
      },
      type: "PATCH",
      dataType: "json",
    });
  });

  //logout
  $('#logout').click(function(){
    $.ajax({
      url: "http://localhost:3000/logout",
      type: "GET",
      dataType:"json",
    })
      .done(function(json) {
        window.location.replace('http://localhost:3000/login')
      });
  });

  //write comments
  $('#new-write-comment').submit(function(f) {
    f.preventDefault();
    var cardid = $(current_card).attr('id');
    var listid = $(current_card.parentNode.parentNode).attr('id');
    var comment = $("#comment-textarea").val();
    var time = new Date();
    $("#new-write-comment")[0].reset();

    $.ajax({
      url: "http://localhost:3000/board/" + board_id +"/list/" + listid + "/card/" + cardid + "/comment",
      data: {
        content: comment,
        date: time,
      },
      type: "POST",
      dataType: "json"
    })
      .done(function(json) {
        data[listid].cards[cardid].comments.push({content: comment, author: $("#username")[0].textContent, date: time});
      });
    var com_author = $("<h5>"+$("#username")[0].textContent+"</h5>");
    var com_content = $("<p class=comment>"+ comment + "</p>");
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = "am";
    if(hours > 12) {
      hours -= 12;
      ampm = "pm";
    }
    else if( hours == 12) {
      ampm = "pm";
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var com_time = $("<p class=date>" + time.toDateString() + " " + hours + ":" + minutes + ampm + "</p>");

    $("#activity").after(com_time);
    $("#activity").after(com_content);
    $("#activity").after(com_author);
  });

  //add board member
  $("#add-mem").click(function() {
    $("#add-mem-form").toggle();
    $("#mem-success").hide();
    $("#mem-fail").hide();
  });
  $("#add-mem-form").submit(function(f) {
    f.preventDefault();
    $.ajax({
      url: "http://localhost:3000/board/" + board_id + "/member",
      data: {
        member: $("#mem-username")[0].value
      },
      type: "POST",
      dataType: "json"
    })
      .done(function(json) {
        if(json.err) {
          $("#mem-fail").show();
        }
        else {
          $("#mem-success").show();
        }
      });
  $("#add-mem-form").hide();
  $("#add-mem-form")[0].reset();
  });
};

var close_modal = function($left) {
    $left.find(".labels").empty();
    $left.children("p").remove();
    $left.children("h3").remove();
    $(".activity").children("p").remove();
    $(".activity").children("h5").remove();
    $(".description").children()[1].textContent = "Add a description!";
    $("#cur-desc").show();
    $("#desc-form").hide();
    $("card-head-form").hide();
    $("#card-show").hide();
};

var add_list_func = function(l_name, list_id) {
  var $new_li = $("<li></li>");
  var $first_p = $("<p>"+l_name+"</p>");
  var $delete_btn = $("<button>Delete</button>");
  var $new_ul = $("<ul></ul>");
  var $last_p = $("<p>Add a card...</p>");

  $new_li.attr("id", list_id);
  $first_p.addClass("list-head");
  $last_p.addClass("add-card");
  $delete_btn.addClass("list-head delete-list");

  $("#final").before($new_li);
  $new_li.append($first_p);
  $new_li.append($delete_btn);
  $new_li.append($new_ul);
  $new_li.append($last_p);
};

var show_card = function(card) {
  $("#card-head-form").hide();

  var label_list = $("#left-list")[0].lastElementChild;
  var l_temp = $(card.parentNode.parentNode);
  var list_id = l_temp.attr("id");
  var card_id = $(card).attr("id");
  var l_cards = $(l_temp).children("ul")[0];

  $("#card-left").prepend($("<p> by " + $(current_card).children('button')[0].textContent + "</p>"));
  $("#card-left").prepend($("<p>"+"in list " + data[list_id].name + "</p>"));
  $("#card-left").prepend($("<h3>"+card.lastElementChild.previousElementSibling.textContent+"</h3>"));

  if(Object.keys(data[list_id].cards[card_id].labels).length > 0) {
    $(label_list).append($("<p>Labels</p>"));

    for(var l in data[list_id].cards[card_id].labels) {
      var $new_label = $("<button>"+data[list_id].cards[card_id].labels[l].name+"</button>");
      $new_label.addClass("label-del " + data[list_id].cards[card_id].labels[l].color);
      $new_label.attr("id", l);
      $(label_list).append($new_label);
    }
  }

  var $desc = $("#cur-desc");
  if(data[list_id].cards[card_id].description !== "") {
    $("#cur-desc")[0].textContent = data[list_id].cards[card_id].description;
  }

  var comments = data[list_id].cards[card_id].comments;
  for(var i = 0; i < comments.length; i++) {
    var comment = comments[i].content;
    var time = comments[i].date;
    var com_author = $("<h5>"+comments[i].author+"</h5>");
    var com_content = $("<p class=comment>"+ comment + "</p>");
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = "am";
    if(hours > 12) {
      hours -= 12;
      ampm = "pm";
    }
    else if( hours == 12) {
      ampm = "pm";
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var com_time = $("<p class=date>" + time.toDateString() + " " + hours + ":" + minutes + ampm + "</p>");


    $("#activity").after(com_time);
    $("#activity").after(com_content);
    $("#activity").after(com_author);
  }

  $("#modal").show();
  $("#card-show").show();
};

var add_card_func = function(list_id, card_id) {
  var l_cards = $("#"+list_id).children("ul")[0];
  var card_data = data[list_id].cards[card_id];
  var card = $("<li />");
  var label_l = $("<ul />");
  var card_name = $("<p>"+card_data.title+"<p/>")[0];
  var author_name = $("<button class=author>"+card_data.author+"</button>");
  card.addClass("lol-card");
  label_l.addClass("labels");
  card.attr("id", card_id);

  for(var i in card_data.labels) {
    var new_label = $("<li />");
    new_label.addClass(i + " label " + card_data.labels[i].color);
    $(label_l).append(new_label);
  }

  $(l_cards).append(card);
  $(card).append(label_l);
  $(card).append(card_name);
  $(card).append(author_name);
  current_card = card[0];
}

$(document).ready(main);
