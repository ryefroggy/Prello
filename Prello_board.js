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


// webpage data structure
function list(name) {
  this.name = name;
  this.cards = [];
}

function card(title) {
  this.title = title;
  this.members = [];
  this.label = [];
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
  title_h.textContent = title;
  title_p.textContent = title;
  parent.insertBefore(title_h, list_str);
  var li = document.createElement("li");
  for (var i = 0; i < add_cards.length; ++i) {
    var a_parent = add_cards[i].parentNode;
    var title = a_parent.firstChild;
    if(list_name === title.textContent) {
      title.nextElementSibling.appendChild(li);
      li.appendChild(title_p);
      break;
    }
  }
  title_p.addEventListener("click", function() {
    show_card(i, title_p);
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
  console.log(card_left_show);
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
  var new_li = document.createElement("li");
  var first_p = document.createElement("p");
  var new_ul = document.createElement("ul");
  var last_p = document.createElement("p");
  last_p.setAttribute("class", "add-card");
  first_p.textContent = l_name;
  last_p.textContent = "Add a card...";
  lol.insertBefore(new_li, add_list);
  new_li.appendChild(first_p);
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
  list_form.style.display = "none";
  list_add.style.display = "block";
  list_form.reset();
});
