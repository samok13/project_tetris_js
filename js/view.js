var view = {

  init: function(){

  },

  render: function(){
    $("#board").html("");

    var board = controller.getBoard();

    for (var y = 0; y < board.length; y++) {
      $("#board").append('<div class="row'+ y + '">This is a row.</div>');
      for(var x = 0; x < 10; x++){
        $('.row'+ y).append('<div class="col-xs-1" data-x='+ x +' data-y='+ y +' >This is a col.</div>');
      }
    }   
  }

}

