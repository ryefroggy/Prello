var opt_menu_btn = document.querySelector("#opt-menu-btn");
var opt_menu = document.querySelector("#opt-menu");
var board_list_btn = document.querySelector("#board-list-btn");
var board_list = document.querySelector("#board-list");
var menu_btn = document.querySelector("#menu-open");
var menu = document.querySelector("#menu");
var close_menu = document.querySelector("#close");

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
})
