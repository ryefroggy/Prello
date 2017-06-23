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
var card_title_form = document.querySelector("#card-head-form");

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
  });
}

modal_bg.addEventListener("click", function() {
  modal.style.display = "none";
  var left = document.querySelector("#card-left");
  var list_title = left.querySelector("p");
  left.removeChild(list_title);
});

modal_close.addEventListener("click", function() {
  modal.style.display = "none";
  var left = document.querySelector("#card-left");
  var list_title = left.querySelector("p");
  left.removeChild(list_title);
});

card_title_form.addEventListener("submit", function(f) {
  f.preventDefault();
  var card_title = document.querySelector("#card-title");
  var title = card_title.value;
  var parent = card_title_form.parentNode;
  var list_str = parent.querySelector("p");
  var list_name = list_str.textContent.substr(8);
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
    }
  }
});
