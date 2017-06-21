var main = function() {
  $('#board-list-but').click(function() {
    $('#board-list').toggle();
  });

  $('#menu-open').click(function() {
    $('#menu').animate({
      width: "300px"
    },
    200);
  });

  $('#close').click(function() {
    $('#menu').animate({
      width: "0"
    },
    200);
  });
};

$(document).ready(main);
