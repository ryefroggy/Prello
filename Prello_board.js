var modal = document.querySelector("#modal");
var modal_bg = document.querySelector("#modal-bg");
var modal_close = document.querySelector("#close-card");
var card_close = document.querySelector("#close-card-show");
var card_title_form = document.querySelector("#card-head-form");
var card_reg = document.querySelector("#card-reg");
var card_show = document.querySelector("#card-show");
var add_list = document.querySelector("#final");
var list_add = document.querySelector("#list-add-p");
var list_form = document.querySelector("#list-form");
var list_name_sub = document.querySelector("#list-name-submit");
var list_name = document.querySelector("#list-name");
var lol = document.querySelector("#lol");
var list_deletes = document.querySelectorAll(".delete-list");
var delete_card = document.querySelector("#delete-card");
var label_btn = document.querySelectorAll(".add-label");
var label_form = document.querySelector("#label-form");
var label_text = document.querySelector("#label-text");
var label_color = document.querySelector("#label-color");


var current_card = 0;
var current_list = 0;
// webpage data structure
function list(name) {
  this.name = name;
  this.cards = [];
}

function card(title) {
  this.title = title;
  this.members = [];
  this.labels = [];
}

function label(name, color) {
  this.name = name;
  this.color = color;
}

var data = [];

//dummy data
data.push(new list("First"));
data.push(new list("Second"));
data.push(new list("Third"));
data.push(new list("Fourth"));

var card_one = new card("Card_1");
card_one.labels.push(new label("pink", "pink"));

var card_two = new card("Card_2");
card_two.labels.push(new label("blue", "blue"));
card_two.labels.push(new label("green", "green"));

var card_three = new card("Card_3");

data[0].cards.push(card_one);
data[0].cards.push(card_two);
data[1].cards.push(card_three);

//menu code
var main = function() {

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
};

var close_modal = function($left) {
    $left.find(".labels").empty();
    $left.children("p").remove();
    $left.children("h3").remove();
    $("#card-reg").hide();
    $("#card-show").hide();
};

card_title_form.addEventListener("submit", function(f) {
  f.preventDefault();
  var card_title = document.querySelector("#card-title");
  var title = card_title.value;
  var parent = card_title_form.parentNode;
  var list_str = parent.querySelector("p");
  var list_children = lol.children;
  card_title_form.reset();
  for (var i = 0; i < list_children.length; i++) {
    if(current_list === list_children[i]) {
      data[i].cards.push(new card(title));
      break;
    }
  }
  card_title_form.style.display = "none";
  var title_h = document.createElement("h3");
  var title_p = document.createElement("p");
  var label_l = document.createElement("ul");
  label_l.setAttribute("class", "labels");
  title_h.textContent = title;
  title_p.textContent = title;
  parent.insertBefore(title_h, list_str);
  var li = document.createElement("li");
  list_children[i].lastChild.previousElementSibling.appendChild(li);
  li.appendChild(label_l);
  li.appendChild(title_p);
  current_card = li;

  title_p.parentNode.addEventListener("click", function() {
    current_card = title_p.parentNode;
    show_card(i, title_p);
  });
});

var show_card = function(list_num, title_p) {
  card_reg.style.display = "none";
  var card_list = data[list_num].cards;
  var card_left_show = document.querySelector("#card-left-show");
  var left_list_show = document.querySelector("#left-list-show");
  var label_list = left_list_show.lastElementChild;
  var l_cards = lol.children[list_num].querySelector("ul").children;

  var title_h = document.createElement("h3");
  var list_title = document.createElement("p");
  title_h.textContent = title_p.textContent;
  list_title.textContent = "in list " + data[list_num].name;
  card_left_show.insertBefore(title_h, left_list_show );
  card_left_show.insertBefore(list_title, left_list_show);

  for(var i = 0; i < l_cards.length ; i++) {
    if(l_cards[i] === title_p.parentNode) {
      var card = data[list_num].cards[i];
      break;
    }
  }

  if(card.labels.length > 0) {
    var label_heading = document.createElement("p");
    label_heading.textContent = "Labels";
    label_list.appendChild(label_heading);

    for(var l = 0; l < card.labels.length; l++) {
      var new_label = document.createElement("button");
      new_label.setAttribute("class", card.labels[l].color);
      new_label.textContent = card.labels[l].name;
      label_list.appendChild(new_label);
    }
  }

  modal.style.display = "block";
  card_show.style.display = "block";
};

add_list.addEventListener("click", function() {
  list_add.style.display = "none";
  list_form.style.display ="block";
});

list_form.addEventListener("submit", function(f) {
  f.preventDefault();
  var l_name = list_name.value;
  data.push(new list(l_name));
  add_list_func(l_name);
  list_form.style.display = "none";
  list_add.style.display = "block";
  list_form.reset();
});

var add_list_func = function(l_name) {
  var new_li = document.createElement("li");
  var first_p = document.createElement("p");
  var delete_but = document.createElement("button");
  var new_ul = document.createElement("ul");
  var last_p = document.createElement("p");
  first_p.setAttribute("class", "list-head");
  last_p.setAttribute("class", "add-card");
  delete_but.setAttribute("class", "list-head delete-list");
  delete_but.textContent = "Delete"
  first_p.textContent = l_name;
  last_p.textContent = "Add a card...";
  lol.insertBefore(new_li, add_list);
  new_li.appendChild(first_p);
  new_li.appendChild(delete_but);
  new_li.appendChild(new_ul);
  new_li.appendChild(last_p);

  last_p.addEventListener("click", function() {
    var parent = this.parentNode;
    var title = parent.firstChild;
    var form = document.querySelector("#card-head-form");
    var left_card = document.querySelector("#card-left");
    var left_list = document.querySelector("#left-list");
    var list = document.createElement("p");
    current_list = parent;
    list.textContent = "in list " + title.textContent;
    left_card.insertBefore(list, left_list);
    modal.style.display = "block";
    card_reg.style.display = "block";
  });
  delete_but.addEventListener("click", function(){
    var parent = this.parentNode;
    var title = parent.firstChild.textContent;
    var grandparent = parent.parentNode;
    grandparent.removeChild(parent);
    for(var i = 0; i < data.length; i++) {
      if(data[i].name === title) {
        data.splice(i, 1);
      }
    }
  });
};

delete_card.addEventListener("click", function() {
  var card_index = 0;
  var list_index = 0;
  var left = document.querySelector("#card-left-show");
  var card_list = current_card.parentNode;
  var children_list = card_list.childNodes;
  //find index of child
  for(var c = 0; c < children_list.length; c++) {
    if(children_list[c] === current_card) {
      card_list.removeChild(current_card);
      card_index = c;
      break;
    }
  }
  //find index of list
  for(var l = 0; l < lol.childNodes.length; l++) {
    if(lol.childNodes[l] === card_list) {
      list_index = l;
      break;
    }
  }
  modal.style.display = "none";
  //reset card page
  var list_title = left.querySelector("p");
  var card_title = left.querySelector("h3");
  left.removeChild(list_title);
  left.removeChild(card_title);
  card_reg.style.display = "none";
  card_show.style.display = "none";

  data[list_index].cards.splice(card_index, 1);
});

label_form.addEventListener("submit", function(f) {
  f.preventDefault();
  var card_index = 0;
  var list_index = 0;
  var name = label_text.value;
  var color = label_color.value;
  var new_label = document.createElement("li");
  new_label.setAttribute("class", "label " + color);
  if(card_reg.style.display === "block") {
    var left = document.querySelector("#card-left");
    var left_list = document.querySelector("#left-list");
  }
  else {
    var left = document.querySelector("#card-left-show");
    var left_list = document.querySelector("#left-list-show");
  }
  var card_name = left.querySelector("h3").textContent;
  var list_name = left.querySelector("p").textContent.substr(8);
  var lists = document.getElementById("lol").children;

  current_card.firstChild.appendChild(new_label);
  //find index of child
  var children_list = current_card.parentNode.childNodes;
  for(var c = 0; c < children_list.length; c++) {
    if(children_list[c] === current_card) {
      card_index = c;
      break;
    }
  }
  //find index of list
  for(var l = 0; l < lol.childNodes.length; l++) {
    if(lol.childNodes[l] === current_card.parentNode) {
      list_index = l;
      break;
    }
  }

  var labels_list = left_list.querySelector(".labels");
  if(data[list_index].cards[card_index].labels.length === 0) {
    var labels_title = document.createElement("p");
    labels_title.textContent = "Labels";
    labels_list.appendChild(labels_title);
  }

  var new_label = document.createElement("button");
  new_label.setAttribute("class", color);
  new_label.textContent = name;
  labels_list.appendChild(new_label);

  data[list_index].cards[card_index].labels.push(new label(name, color));
  label_form.style.display = "none";

});

for(var i = 0; i < label_btn.length; i++) {
  label_btn[i].addEventListener("click", function() {
    if(label_form.style.display === "block") {
      label_form.style.display = "none";
    }
    else {
      label_form.style.display = "block";
    }
  });
}

var add_card_func = function(list_num, card_data) {
  var lol_lists = lol.children;
  var c_list = lol_lists[l];
  var l_cards = c_list.querySelector("ul");
  var card = document.createElement("li");
  var label_l = document.createElement("ul");
  label_l.setAttribute("class", "labels");
  var card_name = document.createElement("p");
  card_name.textContent = card_data.title;

  for(var i = 0; i < card_data.labels.length; ++i) {
    var new_label = document.createElement("li");
    new_label.setAttribute("class", "label " + card_data.labels[i].color);
    label_l.appendChild(new_label);
  }

  l_cards.appendChild(card);
  card.appendChild(label_l);
  card.appendChild(card_name);

  card.addEventListener("click", function() {
    current_card = card;
    show_card(list_num, card_name);
  });
}


// load page -> had to put it at the bottom for some reason
for(var l = 0; l < data.length; l++) {
  add_list_func(data[l].name);
  for(var c = 0; c < data[l].cards.length; c++) {
    add_card_func(l, data[l].cards[c]);
  }
}

$(document).ready(main);
