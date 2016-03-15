var view = {

  init: function(piece){
    this.renderBoard();
    this.renderPiece(piece);
    // register event listeners
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
    var divToRemove = $('[data-y=' + y-1 + '][data-x=' + x + ']');
    $(divToRemove).removeClass('block');
  },

}

