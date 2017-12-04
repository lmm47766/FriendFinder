$("#submit").on("click", function() {

  event.preventDefault();


  if ($("#name").val().trim() === "" || $("#photo").val().trim() === "") {
    alert('Complete all fields');
  } 
  else {
      var scores = [];
      for (var i = 1; i < 11; i++) {
        scores.push(parseInt($('#q' + i).val()));
      }

      var newFriend = {
        "name": $("#name").val().trim(),
        "photo": $("#photo").val().trim(),
        "scores": scores
      };

      $.post("/api/newfriend", newFriend, function(data) {
        $('#matchName').html(data.name)
        $('#matchImg').attr("src", data.photo);
        $("#matchModal").modal("show");
      });
  }

});