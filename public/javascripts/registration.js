$.ajax({
  url: "http://localhost:3000/users",
  data: {

  },
  type: "POST",
  dataType: "json"
})
  .done(function(json) {
    if(json.failure) {
      alert("Username is already in use!");
    }
  });
