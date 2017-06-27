var current_card = 0;
var current_list = 0;

// webpage data structure
// function list(name) {
//   this.name = name;
//   this.cards = [];
// }
//
// function card(title) {
//   this.title = title;
//   this.members = [];
//   this.labels = [];
//   this.description = "";
// }
//
// function label(name, color) {
//   this.name = name;
//   this.color = color;
// }

var data = {};

//dummy data
// data.push(new list("First"));
// data.push(new list("Second"));
// data.push(new list("Third"));
// data.push(new list("Fourth"));
//
// var card_one = new card("Card_1");
// card_one.labels.push(new label("pink", "pink"));
//
// var card_two = new card("Card_2");
// card_two.labels.push(new label("blue", "blue"));
// card_two.labels.push(new label("green", "green"));
//
// var card_three = new card("Card_3");
//
// data[0].cards.push(card_one);
// data[0].cards.push(card_two);
// data[1].cards.push(card_three);

//menu code
var main = function() {
  // load page
  $.ajax({
    url: "http://thiman.me:1337/ryefroggy/list",
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
          data[json[l]._id].cards[card._id] = { "title" : card.title, "labels" : labels, "members": members, "description" : card.description};
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
  });

  //close modal and modal clean-up
  $("#modal").on("click", ".modal-close", function() {
    $("#modal").hide();
    if($("#card-reg").css("display") !== "none") {
      var $left = $("#card-left");
      $("#card-head-form").show();
    }
    else if($("#card-show").css("display") !== "none") {
      var $left = $("#card-left-show");
    }
    close_modal($left);
  });

  // add card event
  $("#lol").on("click", ".add-card", function() {
    current_list = this.parentNode;
    var title = current_list.firstChild.textContent;
    $("#left-list").before($("<p>in list " + title +"</p>"));

    $("#card-head-form").show();
    $("#modal").show();
    $("#card-reg").show();
  });
  $("#card-head-form").submit( function(f) {
    f.preventDefault();
    var card_title = $("#card-title")[0].value;
    var card_data = data[$(current_list).attr("id")].cards;
    $("#card-head-form")[0].reset();
    $("#card-head-form").hide();
    $.ajax({
      url: "http://thiman.me:1337/ryefroggy/list/" + $(current_list).attr("id") + "/card",
      data: {
        title: card_title,
	      labels: [''],
	      members: [''],
	      description : ""
      },
      type: "POST",
      dataType: "json",
    })
      .done(function(json) {
        card_data[json.cards[json.cards.length-1]._id] = { "title" : card_title, "labels" : new Array(), "members": new Array(), "description" : ""};
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
    $("#card-left-show").remove("p");
    $("#card-left-show").remove("h3");
    $("#card-reg").hide();
    $("#card-show").hide();

    data[list_id].cards[card_id] = null;

    $.ajax({
      url: "http://thiman.me:1337/ryefroggy/list/" + list_id + "/card/" + card_id,
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
      url: "http://thiman.me:1337/ryefroggy/list/" + $(list).attr("id"),
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
      url: "http://thiman.me:1337/ryefroggy/list/",
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
  $("#label-form").submit( function(f) {
    f.preventDefault();

    var name = $("#label-text")[0].value;
    var color = $("#label-color")[0].value;
    var new_label = $("<li></li>");
    new_label.addClass("label " + color);
    if($("#card-reg").css("display") === "block") {
      var $left = $("#card-left");
      var $left_list = $("#left-list");
    }
    else {
      var $left = $("#card-left-show");
      var $left_list = $("#left-list-show");
    }
    $(current_card.firstChild).append(new_label);

    var card_id = $(current_card).attr("id");
    var list_id = $(current_card.parentNode.parentNode).attr("id");
    var card = data[list_id].cards[card_id];

    var labels_list = $left_list.find(".labels")[0];
    if(data[list_id].cards[card_id].labels.length === 0) {
      $(labels_list).append($("<p>Labels</p>"));
    }

    var new_label = $("<button>"+name+"</button>");
    new_label.addClass(color);
    $(labels_list).append(new_label);

    card.labels.push({"name": name, "color": color});
    $("#label-form").hide();

    if(card.members.length === 0) {
      var card_members = [""];
    }
    else {
      var card_members = card.members;
    }

    $.ajax({
      url: "http://thiman.me:1337/ryefroggy/list/" + list_id + "/card/" + card_id,
      data: {
        title: card.title,
        labels: card.labels,
        members: card_members,
        description: card.description,
        _id: card_id,
      },
      type: "PATCH",
      dataType: "json",
    });
  });

  // add description
  $(".description").on("click", "span", function() {
    $(".empty-desc").hide();
  });
};

var close_modal = function($left) {
    $left.find(".labels").empty();
    $left.children("p").remove();
    $left.children("h3").remove();
    $("#card-reg").hide();
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
  $("#card-reg").hide();
  $("#card-head-form").hide();

  var label_list = $("#left-list-show")[0].lastElementChild;
  var l_temp = $(card.parentNode.parentNode);
  var list_id = l_temp.attr("id");
  var card_id = $(card).attr("id");
  var l_cards = $(l_temp).children("ul")[0];

  $("#card-left-show").prepend($("<p>"+"in list " + data[list_id].name + "</p>"));
  $("#card-left-show").prepend($("<h3>"+card.lastElementChild.textContent+"</h3>"));

  if(data[list_id].cards[card_id].labels.length > 0) {
    $(label_list).append($("<p>Labels</p>"));

    for(var l = 0; l < data[list_id].cards[card_id].labels.length; l++) {
      var $new_label = $("<button>"+data[list_id].cards[card_id].labels[l].name+"</button>");
      $new_label.addClass(data[list_id].cards[card_id].labels[l].color);
      $(label_list).append($new_label);
    }
  }

  $("#modal").show();
  $("#card-show").show();
};

var add_card_func = function(list_id, card_id) {
  // var lol_lists = $("#lol").children()[list_num];
  var l_cards = $("#"+list_id).children("ul")[0];
  var card_data = data[list_id].cards[card_id];
  var card = $("<li />");
  var label_l = $("<ul />");
  var card_name = $("<p>"+card_data.title+"<p/>")[0];
  card.addClass("lol-card");
  label_l.addClass("labels");
  card.attr("id", card_id);

  for(var i = 0; i < card_data.labels.length; ++i) {
    var new_label = $("<li />");
    new_label.addClass("label " + card_data.labels[i].color);
    $(label_l).append(new_label);
  }

  $(l_cards).append(card);
  $(card).append(label_l);
  $(card).append(card_name);
  current_card = card[0];
}

$(document).ready(main);
