var view = {

  init: function(piece){
    // register event listeners
    this.eventListeners();

  },

  renderBoard: function(){
    $("#board").html("");

    var board = controller.getBoard();

    for (var y = 0; y < board.length; y++) {
      $("#board").append('<div class="row row'+ y + '"></div>');
      for(var x = 0; x < 10; x++){
        $('.row'+ y).append('<div class="col-xs-1" data-x='+ x +' data-y='+ y +' ></div>');
      }
    }   
  },

  renderPiece: function(piece) {
    // set a class on the div that matches the piece's x and y coords
    var x = piece.x;
    var y = piece.y;

    var divToAdd = $('[data-y=' + y + '][data-x=' + x + ']');
    // add class to current block
    $(divToAdd).addClass('block');
    // remove class from row above
    var divToRemove = $('[data-y=' + (y-1) + '][data-x=' + x + ']');
    $(divToRemove).removeClass('block');
  },

  eventListeners: function(){
    $(document).keyup(function(event){
      switch(event.which){
        //left
        case 37:
        controller.direction = 'left';
        
        break;

        //right
        case 39:
        controller.direction = 'right';
        break;

        default: return;
      }
      event.preventDefault();
      controller.moveSideways();
    });
    
  }


}

