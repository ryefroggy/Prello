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
      var card = this.parentNode;
      var title = card.firstChild;
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
