var opt_menu_btn = document.querySelector("#opt-menu-btn");
var opt_menu = document.querySelector("#opt-menu");
var board_list_btn = document.querySelector("#board-list-btn");
var board_list = document.querySelector("#board-list");
var menu_btn = document.querySelector("#menu-open");
var menu = document.querySelector("#menu");
var close_menu = document.querySelector("#close");
var add_cards = document.querySelectorAll(".add-card");
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

data.push(new list("First"));
data.push(new list("Second"));
data.push(new list("Third"));
data.push(new list("Fourth"));

opt_menu_btn.addEventListener("click", function() {
  if(opt_menu.style.display === "none") {
    opt_menu.style.display = "block";
  }
  else {
    opt_menu.style.display = "none";
  }
});

board_list_btn.addEventListener("click", function() {
  if(board_list.style.display === "none") {
    board_list.style.display = "block";
  }
  else {
    board_list.style.display = "none";
  }
});

menu_btn.addEventListener("click", function() {
  menu.style.width = "300px";
});

close_menu.addEventListener("click", function() {
  menu.style.width = "0";
  menu.style.transition = "all .2s"
});

// Populate New Card card
for(var i = 0; i < add_cards.length; i++) {
  add_cards[i].addEventListener("click", function() {
      var parent = this.parentNode;
      var title = parent.firstChild;
      var form = document.querySelector("#card-head-form");
      var left_card = document.querySelector("#card-left");
      var left_list = document.querySelector("#left-list");
      var list = document.createElement("p");
      list.textContent = "in list " + title.textContent;
      left_card.insertBefore(list, left_list);
      modal.style.display = "block";
      card_reg.style.display = "block";
  });
}

for(var i = 0; i < list_deletes.length; i++) {
  list_deletes[i].addEventListener("click", function() {
    var parent = this.parentNode;
    var title = parent.firstChild.textContent;
    var grandparent = parent.parentNode;
    var index = data.indexOf(title);
    grandparent.removeChild(parent);
    data.splice(index, 1);
  });
}

modal_bg.addEventListener("click", function() {
  modal.style.display = "none";
  if( card_reg.style.display !== "none") {
    var left = document.querySelector("#card-left");
    var list_title = left.querySelector("p");
    var card_title = left.querySelector("h3");
    left.removeChild(list_title);
    left.removeChild(card_title);
    card_title_form.style.display = "block";

  }
  else if(card_show.style.display !== "none"){
    var left = document.querySelector("#card-left-show");
    var list_title = left.querySelector("p");
    var card_title = left.querySelector("h3");
    left.removeChild(list_title);
    left.removeChild(card_title);

  }
  card_reg.style.display = "none";
  card_show.style.display = "none";
});

modal_close.addEventListener("click", function() {
  modal.style.display = "none";
  var left = document.querySelector("#card-left");
  var list_title = left.querySelector("p");
  var card_title = left.querySelector("h3");
  left.removeChild(list_title);
  left.removeChild(card_title);
  card_title_form.style.display = "block";
  card_reg.style.display = "none";
  card_show.style.display = "none";
});

card_close.addEventListener("click", function() {
  modal.style.display = "none";
  var left = document.querySelector("#card-left-show");
  var list_title = left.querySelector("p");
  var card_title = left.querySelector("h3");
  left.removeChild(list_title);
  left.removeChild(card_title);
  card_reg.style.display = "none";
  card_show.style.display = "none";
});

card_title_form.addEventListener("submit", function(f) {
  f.preventDefault();
  var card_title = document.querySelector("#card-title");
  var title = card_title.value;
  var parent = card_title_form.parentNode;
  var list_str = parent.querySelector("p");
  var list_name = list_str.textContent.substr(8);
  card_title_form.reset();
  for (var i = 0; i < data.length; i++) {
    if(list_name === data[i].name) {
      data[i].cards.push(new card(title));
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
  for (var i = 0; i < add_cards.length; ++i) {
    var a_parent = add_cards[i].parentNode;
    var title = a_parent.firstChild;
    if(list_name === title.textContent) {
      title.nextElementSibling.nextElementSibling.appendChild(li);
      li.appendChild(label_l);
      li.appendChild(title_p);
      break;
    }
  }
  current_card = li;
  title_p.addEventListener("click", function() {
    show_card(i, title_p);
    current_card = title_p.parentNode;
  });
});

var show_card = function(list_num, title_p) {
  card_reg.style.display = "none";
  var card_list = data[list_num].cards;
  var card_left_show = document.querySelector("#card-left-show");
  var left_list_show = document.querySelector("#left-list-show");
  for(var i = 0; i < card_list.length; ++i) {
    if(card_list[i].title === title_p.textContent) {
      break;
    }
  }
  var title_h = document.createElement("h3");
  var list_title = document.createElement("p");
  title_h.textContent = title_p.textContent;
  list_title.textContent = "in list " + data[list_num].name;
  card_left_show.insertBefore(title_h, left_list_show );
  card_left_show.insertBefore(list_title, left_list_show);
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
  add_cards = document.querySelectorAll(".add-card");
  last_p.addEventListener("click", function() {
    var parent = this.parentNode;
    var title = parent.firstChild;
    var form = document.querySelector("#card-head-form");
    var left_card = document.querySelector("#card-left");
    var left_list = document.querySelector("#left-list");
    var list = document.createElement("p");
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
  }
  else {
    var left = document.querySelector("#card-left-show");
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

for(var l = 0; l < data.length; l++) {
  add_list_func(data[l].name);
}
